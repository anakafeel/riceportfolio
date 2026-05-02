"use client";

import React, { useEffect } from "react";
import SubpageHeader from "@/components/SubpageHeader";
import { PORTFOLIO_DATA } from "@/lib/data";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = PORTFOLIO_DATA.blog.find((b) => b.slug === slug);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "h" || e.key === "H" || e.key === "Escape") {
        window.location.href = "/";
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (!post) notFound();

  const idx = PORTFOLIO_DATA.blog.indexOf(post);
  const prev = PORTFOLIO_DATA.blog[idx - 1] ?? null;
  const next = PORTFOLIO_DATA.blog[idx + 1] ?? null;

  return (
    <div className="subpage min-h-screen bg-[#07060E] text-[#F2F0FF] selection:bg-[#FF2AB8] selection:text-[#07060E]">
      <div className="bg-stage">
        <div className="bg-grid animate-[sp-grid-drift_60s_linear_infinite]" />
        <div className="bg-scan opacity-90" />
      </div>

      <SubpageHeader
        title={`${post.slug}.md`}
        category="~/blog"
        path="~/blog"
      />

      <main className="max-w-[1280px] mx-auto p-6 sm:p-[80px_48px_60px] grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-20 relative z-10">
        <article>
          <div className="flex gap-3 font-mono text-[11px] text-[#FF2AB8] tracking-widest uppercase mb-[18px]">
            <span>04 · blog</span>
            <span className="text-[#26262c]">·</span>
            <span>{post.date}</span>
          </div>
          <h1 className="font-display text-[clamp(42px,7vw,96px)] leading-[0.95] tracking-tighter mb-6">
            {post.title}
          </h1>
          <p className="font-sans text-[18px] sm:text-[21px] text-[#F2F0FF] leading-normal max-w-[720px] mb-8 opacity-90">
            {post.excerpt}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 sm:items-center p-[16px_0] border-t border-b border-[#26262c] mb-12">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF2AB8] to-[#9A86C2] text-[#07060E] font-mono font-bold text-[12px] flex items-center justify-center tracking-tight">SH</div>
              <div>
                <div className="font-sans font-medium text-[#F2F0FF]">Saim Hashmi <span className="font-mono text-[#FF2AB8] text-[12px] ml-1 font-normal">@saim</span></div>
                <div className="font-mono text-[11px] text-[#5e5e68]">Fedora 42 · Niri · GMT+1</div>
              </div>
            </div>
            <div className="sm:ml-auto flex gap-2">
              <button className="font-mono text-[11px] p-[6px_12px] border border-[#26262c] text-[#9A86C2] transition-colors hover:text-[#FF2AB8] hover:border-[#FF2AB8]">⌘ copy link</button>
              <button className="font-mono text-[11px] p-[6px_12px] border border-[#26262c] text-[#9A86C2] transition-colors hover:text-[#FF2AB8] hover:border-[#FF2AB8]">☆ save</button>
            </div>
          </div>

          <div className="font-sans text-[17px] leading-[1.72] text-[#F2F0FF]/90 max-w-[720px] space-y-5">
            <p className="text-[19px]">
              <span className="float-left font-display text-[84px] leading-[0.8] pr-3.5 pt-3 text-[#FF2AB8]">
                {post.title.charAt(0)}
              </span>
              {post.excerpt} This article is a field note — something discovered while building, written after the fact, without the benefit of knowing how it would end.
            </p>

            <p>This entry explores the intersection of Linux tooling, interface design, and the philosophy behind building systems that feel native rather than web-ported. The constraint of the medium is also its character.</p>

            <h2 className="font-display text-[40px] text-[#F2F0FF] mt-12 mb-4 tracking-tight">On the approach</h2>
            <p>Working within the browser while refusing to look like a browser forces decisions that end up being the most interesting part of the project. Every interaction is a negotiation between what the platform affords and what the design demands.</p>

            <blockquote className="my-8 p-[20px_28px] border-l-2 border-[#FF2AB8] bg-[#FF2AB8]/5 font-display text-[24px] leading-relaxed text-[#F2F0FF]">
              &quot;The screen is not a page. The scroll is not a turn. A compositor is a narrative engine.&quot;
            </blockquote>

            <p>Full post content coming soon. This is a placeholder that will be replaced with the authored article once the writing pipeline is wired up to the data layer.</p>
          </div>

          <footer className="mt-[72px] pt-6 border-t border-dashed border-[#26262c] flex justify-between items-center flex-wrap gap-4">
            <div className="font-mono text-[13px] text-[#5e5e68]">
              <span className="text-[#9a9aa3]">—— $</span> <span className="text-[#FF2AB8]">echo</span> &quot;end-of-transmission&quot;
            </div>
            <div className="flex gap-2">
              {['#rice', '#linux', '#interface'].map(tag => (
                <span key={tag} className="font-mono text-[11px] p-[4px_10px] border border-[#26262c] text-[#9A86C2] rounded-full">{tag}</span>
              ))}
            </div>
          </footer>
        </article>

        <aside className="sticky top-[84px] self-start font-mono text-[12px]">
          <div className="text-[#FF2AB8] text-[10.5px] tracking-widest uppercase mb-3">// on this page</div>
          <ul className="flex flex-col gap-2 mb-6">
            {['On the approach', 'The constraint', 'What came next'].map(item => (
              <li key={item}><Link href="#" className="block p-[6px_10px] border-l border-[#26262c] text-[#9A86C2] transition-all hover:text-[#FF2AB8] hover:border-[#FF2AB8] hover:pl-3.5">{item}</Link></li>
            ))}
          </ul>
          <div className="mt-8 pt-4 border-t border-[#26262c]">
            <div className="text-[#FF2AB8] text-[10.5px] tracking-widest uppercase mb-3">// more posts</div>
            <ul className="flex flex-col gap-2">
              {PORTFOLIO_DATA.blog.filter(b => b.slug !== slug).slice(0, 3).map(b => (
                <li key={b.slug}>
                  <Link href={`/blog/${b.slug}`} className="block p-[6px_10px] border-l border-[#26262c] text-[#9A86C2] text-[11px] transition-all hover:text-[#FF2AB8] hover:border-[#FF2AB8] hover:pl-3.5 leading-snug">{b.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>

      <nav className="max-w-[1280px] mx-auto p-6 sm:p-[32px_48px] grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-6 border-t border-dashed border-[#26262c] relative z-10">
        {prev ? (
          <Link href={`/blog/${prev.slug}`} className="p-[18px_22px] border border-[#26262c] flex flex-col gap-1 transition-all hover:border-[#FF2AB8] hover:bg-[#FF2AB8]/5 group">
            <span className="font-mono text-[11px] text-[#5e5e68] tracking-widest uppercase">← previous</span>
            <span className="font-display text-[18px] sm:text-[22px] text-[#F2F0FF] group-hover:text-[#FF2AB8]">{prev.title}</span>
          </Link>
        ) : <div />}
        <Link href="/" className="self-center p-[14px_20px] font-mono text-[12px] text-[#FF2AB8] border border-[#FF2AB8]/50 uppercase tracking-widest flex items-center justify-center transition-all hover:bg-[#FF2AB8] hover:text-[#07060E]">⌂ workspace</Link>
        {next ? (
          <Link href={`/blog/${next.slug}`} className="p-[18px_22px] border border-[#26262c] flex flex-col gap-1 text-right transition-all hover:border-[#FF2AB8] hover:bg-[#FF2AB8]/5 group">
            <span className="font-mono text-[11px] text-[#5e5e68] tracking-widest uppercase">next →</span>
            <span className="font-display text-[18px] sm:text-[22px] text-[#F2F0FF] group-hover:text-[#FF2AB8]">{next.title}</span>
          </Link>
        ) : <div />}
      </nav>

      <footer className="max-w-[1280px] mx-auto p-6 sm:p-[24px_48px_40px] flex flex-col sm:flex-row gap-3 items-center sm:items-start font-mono text-[11px] text-[#5e5e68] tracking-tight relative z-10 text-center sm:text-left">
        <span>© 2026 saim hashmi</span>
        <span className="hidden sm:inline text-[#26262c]">·</span>
        <span>built with niri, gsap, and stubborn opinions</span>
        <span className="hidden sm:inline text-[#26262c]">·</span>
        <span><kbd className="bg-[#110F1F] border border-[#26262c] border-b-2 text-[#d8d8dd] px-1.5 py-0.5 rounded-sm">H</kbd> home</span>
      </footer>
    </div>
  );
}
