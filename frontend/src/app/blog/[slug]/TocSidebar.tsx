'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { List, Bot } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TocSidebar() {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const headings = document.querySelectorAll('#postContent h2, #postContent h3');
    const items: TocItem[] = [];
    
    headings.forEach((h, i) => {
      const id = `heading-${i}`;
      h.id = id;
      items.push({
        id,
        text: h.textContent || '',
        level: h.tagName === 'H3' ? 3 : 2
      });
    });
    
    setToc(items);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="hidden lg:flex lg:flex-col lg:col-span-4 lg:col-start-9 lg:translate-x-12 sticky top-24 self-start h-[calc(100vh-8rem)]">
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      {/* TOC (auto-generated) */}
      {toc.length >= 2 && (
        <div className="bg-[#faf5ff] border border-[#ede9fe] rounded-2xl p-6 mb-6 flex flex-col min-h-0">
          <div className="text-[0.8rem] font-bold uppercase tracking-wide text-[#7c3aed] mb-4 flex items-center gap-2 shrink-0">
            <List className="w-4 h-4" /> Contents
          </div>
          <ul className="space-y-1.5 overflow-y-auto pr-1 no-scrollbar flex-1 list-disc pl-4 text-[#7c3aed]">
            {toc.map((item) => (
              <li key={item.id} className={item.level === 3 ? 'ml-3' : ''}>
                <a 
                  href={`#${item.id}`} 
                  onClick={(e) => handleScroll(e, item.id)}
                  className="text-[0.75rem] leading-relaxed text-slate-700 hover:text-[#7c3aed] transition-colors"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA Card */}
      <div className="bg-gradient-to-br from-[#1a103c] to-[#4f46e5] rounded-2xl p-5 text-center text-white shrink-0 mt-auto">
        <Bot className="w-8 h-8 mx-auto mb-2 text-[#c4b5fd]" />
        <div className="text-[0.95rem] font-bold mb-1.5">Try Automation Cafe</div>
        <p className="text-[0.7rem] text-white/70 mb-4 leading-relaxed">
          Automate GST, Income Tax & client workflows for your CA firm.
        </p>
        <Link 
          href="/account/register" 
          className="bg-[#7c3aed] text-white px-4 py-2 rounded-lg text-[0.75rem] font-bold inline-block hover:bg-[#6c3fc9] transition-colors"
        >
          Start Free Trial
        </Link>
      </div>
    </div>
  );
}
