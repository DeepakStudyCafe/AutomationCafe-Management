import { Request, Response, NextFunction } from 'express';
import { getDbPool } from '../config/db';
import { BadRequestError, NotFoundError } from '../utils/errors';
import slugify from 'slugify';

export const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 50;
    const offset = (page - 1) * pageSize;
    
    const isPublic = req.originalUrl.includes('/public');
    const statusFilter = isPublic ? "WHERE b.Status = 'Published'" : "";

    const pool = await getDbPool();
    const countRes = await pool.request().query(`SELECT COUNT(*) as total FROM [dbo].[Blogs] b ${statusFilter}`);
    const total = countRes.recordset[0].total;

    const dataRes = await pool.request()
      .input('offset', offset)
      .input('pageSize', pageSize)
      .query(`
        SELECT b.*, a.FullName as AuthorName 
        FROM [dbo].[Blogs] b
        LEFT JOIN [dbo].[Authors] a ON b.AuthorID = a.AuthorID
        ${statusFilter}
        ORDER BY b.CreatedAt DESC
        OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
      `);

    res.status(200).json({
      success: true,
      data: dataRes.recordset,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = await getDbPool();
    const result = await pool.request()
      .input('BlogID', parseInt(req.params.id as string))
      .query('SELECT * FROM [dbo].[Blogs] WHERE BlogID = @BlogID');

    if (result.recordset.length === 0) {
      throw new NotFoundError('Blog post not found');
    }

    res.status(200).json({
      success: true,
      data: result.recordset[0]
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = await getDbPool();
    const result = await pool.request()
      .input('Slug', req.params.slug as string)
      .query(`
        SELECT b.*, a.FullName as AuthorName, a.Bio as AuthorBio, a.ProfileImageUrl as AuthorImage 
        FROM [dbo].[Blogs] b
        LEFT JOIN [dbo].[Authors] a ON b.AuthorID = a.AuthorID
        WHERE b.Slug = @Slug AND b.Status = 'Published'
      `);

    if (result.recordset.length === 0) {
      throw new NotFoundError('Blog post not found or not published');
    }

    res.status(200).json({
      success: true,
      data: result.recordset[0]
    });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, slug, content, featuredImage, metaTitle, metaDescription, metaKeywords, focusKeyword, tags, status, ogImage } = req.body;
    
    if (!title) throw new BadRequestError('Title is required');
    if (!content) throw new BadRequestError('Content is required');
    
    let finalSlug = slug as string;
    if (!finalSlug) {
      finalSlug = slugify(title, { lower: true, strict: true });
    }

    const pool = await getDbPool();
    
    const checkRes = await pool.request()
      .input('Slug', finalSlug)
      .query('SELECT BlogID FROM [dbo].[Blogs] WHERE Slug = @Slug');
      
    if (checkRes.recordset.length > 0) {
      finalSlug = `${finalSlug}-${Date.now()}`;
    }

    const authorId = req.body.authorId || 1; 

    const result = await pool.request()
      .input('AuthorID', authorId)
      .input('Title', title)
      .input('Slug', finalSlug)
      .input('Content', content)
      .input('FeaturedImage', featuredImage || null)
      .input('MetaTitle', metaTitle || null)
      .input('MetaDescription', metaDescription || null)
      .input('MetaKeywords', metaKeywords || null)
      .input('FocusKeyword', focusKeyword || null)
      .input('Tags', tags || null)
      .input('Status', status || 'Draft')
      .input('OgImage', ogImage || null)
      .input('PublishedAt', status === 'Published' ? new Date() : null)
      .query(`
        INSERT INTO [dbo].[Blogs] 
        (AuthorID, Title, Slug, Content, FeaturedImage, MetaTitle, MetaDescription, MetaKeywords, FocusKeyword, Tags, Status, OgImage, PublishedAt, CreatedAt, UpdatedAt)
        OUTPUT INSERTED.BlogID
        VALUES (@AuthorID, @Title, @Slug, @Content, @FeaturedImage, @MetaTitle, @MetaDescription, @MetaKeywords, @FocusKeyword, @Tags, @Status, @OgImage, @PublishedAt, GETDATE(), GETDATE())
      `);

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: { id: result.recordset[0].BlogID }
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogId = parseInt(req.params.id as string);
    const { title, slug, content, featuredImage, metaTitle, metaDescription, metaKeywords, focusKeyword, tags, status, ogImage } = req.body;
    
    if (!title) throw new BadRequestError('Title is required');
    if (!content) throw new BadRequestError('Content is required');

    const pool = await getDbPool();
    
    const existRes = await pool.request()
      .input('BlogID', blogId)
      .query('SELECT Status FROM [dbo].[Blogs] WHERE BlogID = @BlogID');
      
    if (existRes.recordset.length === 0) throw new NotFoundError('Blog post not found');
    const oldStatus = existRes.recordset[0].Status;

    let setPublishedAt = '';
    if (oldStatus !== 'Published' && status === 'Published') {
      setPublishedAt = ', PublishedAt = GETDATE()';
    }

    await pool.request()
      .input('BlogID', blogId)
      .input('Title', title)
      .input('Slug', slug as string)
      .input('Content', content)
      .input('FeaturedImage', featuredImage || null)
      .input('MetaTitle', metaTitle || null)
      .input('MetaDescription', metaDescription || null)
      .input('MetaKeywords', metaKeywords || null)
      .input('FocusKeyword', focusKeyword || null)
      .input('Tags', tags || null)
      .input('Status', status || 'Draft')
      .input('OgImage', ogImage || null)
      .query(`
        UPDATE [dbo].[Blogs] SET
          Title = @Title,
          Slug = @Slug,
          Content = @Content,
          FeaturedImage = @FeaturedImage,
          MetaTitle = @MetaTitle,
          MetaDescription = @MetaDescription,
          MetaKeywords = @MetaKeywords,
          FocusKeyword = @FocusKeyword,
          Tags = @Tags,
          Status = @Status,
          OgImage = @OgImage,
          UpdatedAt = GETDATE()
          ${setPublishedAt}
        WHERE BlogID = @BlogID
      `);

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = await getDbPool();
    await pool.request()
      .input('BlogID', parseInt(req.params.id as string))
      .query('DELETE FROM [dbo].[Blogs] WHERE BlogID = @BlogID');

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const toggleBlogStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pool = await getDbPool();
    const blogId = parseInt(req.params.id as string);
    
    const checkRes = await pool.request()
      .input('BlogID', blogId)
      .query('SELECT Status FROM [dbo].[Blogs] WHERE BlogID = @BlogID');
      
    if (checkRes.recordset.length === 0) throw new NotFoundError('Blog post not found');
    
    const currentStatus = checkRes.recordset[0].Status;
    const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published';
    const publishedAtClause = newStatus === 'Published' ? ', PublishedAt = GETDATE()' : '';

    await pool.request()
      .input('BlogID', blogId)
      .input('Status', newStatus)
      .query(`UPDATE [dbo].[Blogs] SET Status = @Status, UpdatedAt = GETDATE() ${publishedAtClause} WHERE BlogID = @BlogID`);

    res.status(200).json({
      success: true,
      message: `Blog status updated to ${newStatus}`,
      data: { status: newStatus }
    });
  } catch (error) {
    next(error);
  }
};
