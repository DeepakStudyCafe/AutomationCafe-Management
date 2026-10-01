import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - StudyCafe Tools',
  description: 'Guides, tips and updates for CA firms & tax professionals automating their workflows.',
};

async function getBlogs() {
  try {
    // Next.js fetch with revalidation
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/blogs/public?page=1&pageSize=100`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return { data: [] };
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function BlogIndexPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-[#f8f7ff] font-sans">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a103c] via-[#3b1f8c] to-[#6c3fc9] pt-[72px] pb-[56px] text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-[2.5rem] font-extrabold text-white flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8" /> Our Blog
          </h1>
          <p className="text-white/75 text-[1.05rem] max-w-[520px] mx-auto mt-3">
            Guides, tips and updates for CA firms & tax professionals automating their workflows.
          </p>
        </div>
      </section>

      {/* Blog grid */}
      <section className="py-[56px] md:py-[72px]">
        <div className="container mx-auto px-4 max-w-6xl">
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-slate-300 mx-auto" />
              <h3 className="mt-6 text-xl font-semibold text-slate-600">No posts yet</h3>
              <p className="text-slate-500 mt-2">Check back soon for articles and guides.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog: any) => {
                let excerpt = blog.MetaDescription || blog.Content?.replace(/<[^>]+>/g, ' ').trim() || '';
                if (excerpt.length > 130) excerpt = excerpt.substring(0, 130).trim() + '…';
                
                const firstTag = blog.Tags ? blog.Tags.split(',')[0].trim() : null;

                return (
                  <Link href={`/blog/${blog.Slug}`} key={blog.BlogID} className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-[#f1f0fa] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(124,58,237,0.12)] transition-all duration-200">
                    {blog.FeaturedImage ? (
                      <img src={blog.FeaturedImage} alt={blog.Title} className="aspect-video w-full object-cover bg-[#f3f0ff]" />
                    ) : (
                      <div className="aspect-video w-full bg-gradient-to-br from-[#ede9fe] to-[#ddd6fe] flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-[#7c3aed]/40" />
                      </div>
                    )}
                    
                    <div className="p-[20px] px-[22px] flex flex-col flex-1">
                      {firstTag && (
                        <div className="mb-2.5">
                          <span className="inline-block bg-[#ede9fe] text-[#7c3aed] text-[0.7rem] font-bold tracking-[0.4px] px-[10px] py-[3px] rounded-full uppercase">
                            {firstTag}
                          </span>
                        </div>
                      )}
                      
                      <h2 className="text-[1.05rem] font-bold text-[#111827] leading-[1.4] mb-2 group-hover:text-[#7c3aed] transition-colors">
                        {blog.Title}
                      </h2>
                      
                      <p className="text-[0.875rem] text-[#6b7280] leading-[1.6] flex-1">
                        {excerpt}
                      </p>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-[28px] h-[28px] rounded-full bg-[#7c3aed] text-white flex items-center justify-center text-[0.72rem] font-bold shrink-0">
                            {blog.AuthorName ? blog.AuthorName.charAt(0).toUpperCase() : 'A'}
                          </div>
                          <div>
                            <div className="text-[0.78rem] font-semibold text-[#374151]">{blog.AuthorName || 'Admin'}</div>
                            <div className="text-[0.72rem] text-[#9ca3af]">
                              {new Date(blog.PublishedAt || blog.CreatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                          </div>
                        </div>
                        <span className="text-[#7c3aed] text-[0.8rem] font-semibold group-hover:text-[#4f46e5]">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
