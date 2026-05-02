import SubpageHeader from "@/components/SubpageHeader";
import { PORTFOLIO_DATA } from "@/lib/data";
import Link from "next/link";

export default function BlogIndex() {
  return (
    <div className="subpage min-h-screen bg-[#07060E] text-[#F2F0FF] selection:bg-[#FF2AB8] selection:text-[#07060E]">
      <div className="bg-stage">
        <div className="bg-grid animate-[sp-grid-drift_60s_linear_infinite]" />
        <div className="bg-scan opacity-90" />
      </div>

      <SubpageHeader
        title="blog --all"
        category="~/blog"
        path="~/blog"
      />

      <main className="max-w-[1280px] mx-auto p-[80px_48px_60px] relative z-10">
        <div className="flex items-baseline gap-6 mb-14">
          <h1 className="font-display text-[clamp(56px,8vw,104px)] leading-[0.95] tracking-tighter">
            field <em className="text-[#FF2AB8]">notes</em>.
          </h1>
          <span className="font-mono text-[11px] text-[#5e5e68] tracking-widest uppercase self-end pb-3">
            {PORTFOLIO_DATA.blog.length} entries
          </span>
        </div>

        <div className="flex flex-col">
          {PORTFOLIO_DATA.blog.map((b) => (
            <Link
              key={b.slug}
              href={`/blog/${b.slug}`}
              className="grid grid-cols-[110px_1fr_auto] gap-7 items-baseline p-[28px_0] border-t border-[#26262c] last:border-b relative group hover:pl-6 transition-all duration-300"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FF2AB8] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300" />
              <div className="font-label text-[9px] text-[#9A86C2] tracking-wider uppercase">{b.date}</div>
              <div>
                <div className="font-display text-[clamp(22px,3vw,34px)] text-[#F2F0FF] group-hover:text-[#FF2AB8] transition-colors leading-[1.1] mb-2">
                  {b.title}
                </div>
                <div className="font-mono text-[16px] text-[#F2F0FF]/70 max-w-[680px]">{b.excerpt}</div>
              </div>
              <div className="font-label text-[18px] text-[#FF2AB8] self-center">→</div>
            </Link>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-dashed border-[#26262c] font-mono text-[12px] text-[#5e5e68]">
          <span className="text-[#9a9aa3]">$</span> <span className="text-[#FF2AB8]">ls</span> ~/blog/ <span className="text-[#9A86C2]">— {PORTFOLIO_DATA.blog.length} posts, last updated {PORTFOLIO_DATA.blog[0]?.date}</span>
        </div>
      </main>

      <footer className="max-w-[1280px] mx-auto p-[24px_48px_40px] flex gap-3 font-mono text-[11px] text-[#5e5e68] tracking-tight relative z-10 border-t border-dashed border-[#26262c]">
        <Link href="/" className="text-[#FF2AB8] hover:underline">⌂ workspace</Link>
        <span className="text-[#26262c]">·</span>
        <span>© 2026 saim hashmi</span>
        <span className="text-[#26262c]">·</span>
        <span>built with niri, gsap, and stubborn opinions</span>
      </footer>
    </div>
  );
}
