import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { User, Calendar, Clock, Tag, Share2, MessageCircle, Link as LinkIcon, ArrowLeft } from 'lucide-react';
import TocSidebar from './TocSidebar';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getBlog(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/blogs/public/${slug}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const blog = await getBlog(params.slug);
  
  if (!blog) {
    return {
      title: 'Post Not Found - StudyCafe Tools',
    };
  }

  const title = blog.MetaTitle || blog.Title;
  const description = blog.MetaDescription || '';
  const keywords = blog.MetaKeywords || blog.Tags || '';
  const image = blog.OgImage || blog.FeaturedImage || '/images/og-image.png';

  return {
    title: `${title} - StudyCafe Tools`,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [image],
      type: 'article',
      publishedTime: blog.PublishedAt || blog.CreatedAt,
      authors: [blog.AuthorName || 'Admin'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    }
  };
}

export default async function BlogPostPage(props: Props) {
  const params = await props.params;
  const blog = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  const firstTag = blog.Tags ? blog.Tags.split(',')[0].trim() : null;
  const canonical = `https://automationcafe.in/Blog/${blog.Slug}`;
  
  // Calculate read time roughly
  const wordCount = blog.Content?.replace(/<[^>]+>/g, ' ').split(/\s+/).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="bg-[#f8f7ff] border-b border-[#ede9fe] py-3">
        <div className="container mx-auto px-4 max-w-6xl">
          <ol className="flex items-center gap-2 text-sm text-[#7c3aed]">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li>/</li>
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            <li>/</li>
            <li className="text-slate-500 truncate max-w-[250px] sm:max-w-md" aria-current="page">
              {blog.Title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-[#1a103c] pt-16 pb-12 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center md:text-left">
            {firstTag && (
              <span className="inline-block bg-[#7c3aed]/25 text-[#c4b5fd] text-[0.72rem] font-bold tracking-[0.5px] uppercase px-3 py-1 rounded-full mb-4">
                {firstTag}
              </span>
            )}
            <h1 className="text-[2.2rem] font-extrabold text-white leading-[1.3] mb-5">
              {blog.Title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/60 text-[0.82rem]">
              <span className="flex items-center gap-1.5">
                <User className="w-[0.9rem] h-[0.9rem]" /> {blog.AuthorName || 'Admin'}
              </span>
              {(blog.PublishedAt || blog.CreatedAt) && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-[0.9rem] h-[0.9rem]" /> 
                  {new Date(blog.PublishedAt || blog.CreatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="w-[0.9rem] h-[0.9rem]" /> {readTime} min read
              </span>
              {blog.FocusKeyword && (
                <span className="flex items-center gap-1.5">
                  <Tag className="w-[0.9rem] h-[0.9rem]" /> {blog.FocusKeyword}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {blog.FeaturedImage && (
          <div className="container mx-auto px-4 max-w-5xl mt-8 -mb-20 relative z-10">
            <img 
              src={blog.FeaturedImage} 
              alt={blog.Title} 
              className="w-full h-auto rounded-2xl block" 
            />
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <section className={`container mx-auto px-4 max-w-[1300px] ${blog.FeaturedImage ? 'pt-28' : 'pt-12'} pb-12`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Article & Details */}
          <div className="lg:col-span-7 lg:col-start-2">
            <article 
              id="postContent"
              className="prose-custom text-[#1f2937] text-[1rem] leading-[1.6] font-sans"
              dangerouslySetInnerHTML={{ __html: blog.Content }}
            />

            {/* Tags */}
            {blog.Tags && (
              <div className="mt-8 pt-6 border-t border-[#f3f4f6] flex flex-wrap items-center gap-1">
                <span className="text-[0.78rem] font-bold text-[#6b7280] uppercase tracking-[0.5px] mr-2">Tags:</span>
                {blog.Tags.split(',').map((tag: string, i: number) => (
                  <Link 
                    key={i} 
                    href={`/blog?tag=${encodeURIComponent(tag.trim())}`}
                    className="inline-block bg-[#f3f4f6] text-[#374151] text-[0.75rem] px-3 py-1.5 rounded-full hover:bg-[#ede9fe] hover:text-[#7c3aed] transition-colors m-1"
                  >
                    {tag.trim()}
                  </Link>
                ))}
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-7 p-[20px] px-[22px] bg-[#f9f8ff] border border-[#ede9fe] rounded-2xl">
              <div className="text-[0.78rem] font-bold text-[#7c3aed] uppercase tracking-[0.5px] mb-3 flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share this post
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.Title)}&url=${encodeURIComponent(canonical)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[0.8rem] font-semibold bg-[#1da1f2] text-white hover:opacity-85 transition-opacity"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg> Twitter
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[0.8rem] font-semibold bg-[#0a66c2] text-white hover:opacity-85 transition-opacity"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> LinkedIn
                </a>
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(blog.Title + " " + canonical)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[0.8rem] font-semibold bg-[#25d366] text-white hover:opacity-85 transition-opacity"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Author Card */}
            <div className="mt-10 bg-[#f9f8ff] border border-[#ede9fe] rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start">
              {blog.AuthorImage ? (
                <img src={blog.AuthorImage} className="w-16 h-16 rounded-full object-cover shrink-0" alt={blog.AuthorName} />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#4f46e5] text-white text-[1.6rem] font-extrabold flex items-center justify-center shrink-0">
                  {blog.AuthorName ? blog.AuthorName.charAt(0).toUpperCase() : 'A'}
                </div>
              )}
              <div>
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.5px] text-[#9ca3af] mb-1">About the author</div>
                <div className="text-base font-bold text-[#111827]">{blog.AuthorName || 'Admin'}</div>
                {blog.AuthorBio && (
                  <p className="text-[0.875rem] text-[#6b7280] mt-1.5 leading-[1.6] font-sans">
                    {blog.AuthorBio}
                  </p>
                )}
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-7">
              <Link href="/blog" className="text-[#7c3aed] text-[0.875rem] font-semibold flex items-center gap-1.5 hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to all posts
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <TocSidebar />

        </div>
      </section>

      {/* Global styles for the custom prose to match old website */}
      <style dangerouslySetInnerHTML={{__html: `
        .prose-custom h1, .prose-custom h2, .prose-custom h3, 
        .prose-custom h4, .prose-custom h5, .prose-custom h6 {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-weight: 700; color: #111827; margin: 2rem 0 .75rem;
        }
        .prose-custom h2 { font-size: 1.55rem; border-left: 4px solid #7c3aed; padding-left: 16px; }
        .prose-custom h3 { font-size: 1.25rem; }
        .prose-custom p { margin-bottom: 0.85rem; }
        .prose-custom p:has(> br:first-child:last-child) { margin-bottom: 0; }
        .prose-custom img { max-width: 100%; border-radius: 12px; margin: 1rem 0; }
        .prose-custom blockquote {
            border-left: 4px solid #7c3aed;
            background: #faf5ff;
            padding: 16px 20px;
            border-radius: 0 12px 12px 0;
            margin: 1.5rem 0;
            color: #4c1d95;
            font-style: italic;
        }
        .prose-custom pre, .prose-custom code {
            background: #1a103c; color: #e9d5ff;
            border-radius: 8px; font-size: .9rem;
        }
        .prose-custom pre { padding: 16px 20px; overflow-x: auto; margin: 1.5rem 0; font-family: monospace; }
        .prose-custom code { padding: 2px 6px; font-family: monospace; }
        .prose-custom ul, .prose-custom ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
        .prose-custom li { margin-bottom: .4rem; }
        .prose-custom a { color: #7c3aed; text-decoration: underline; }
        .prose-custom a:hover { color: #5b21b6; }
        .prose-custom table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
        .prose-custom th, .prose-custom td { border: 1px solid #e5e7eb; padding: 10px 14px; }
        .prose-custom th { background: #f9fafb; font-weight: 700; }
      `}} />
    </div>
  );
}
