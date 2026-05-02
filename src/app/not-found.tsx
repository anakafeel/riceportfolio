import Link from "next/link";
import SubpageHeader from "@/components/SubpageHeader";

export default function NotFound() {
  return (
    <div className="subpage min-h-screen bg-[#07060E] text-[#F2F0FF] flex flex-col">
      <div className="bg-stage">
        <div className="bg-grid" />
        <div className="bg-scan opacity-90" />
      </div>

      <SubpageHeader 
        title="???" 
        category="~/" 
        path="~" 
        status="route not found"
      />

      <main className="flex-1 grid place-items-center p-12 relative z-10">
        <div className="max-w-[640px] text-center">
          <div className="font-mono text-[12px] text-[#ff5f6e] tracking-[0.3em] uppercase mb-5">signal 11 · SIGSEGV</div>
          <h1 className="font-display italic text-[clamp(140px,22vw,280px)] leading-none text-transparent [text-stroke:2px_#FF2AB8] tracking-tighter mb-0">404</h1>
          <h2 className="font-display italic text-[clamp(32px,4vw,52px)] text-[#F2F0FF] mt-4 mb-3 uppercase">this column does not exist.</h2>
          <p className="font-sans text-[17px] text-[#9A86C2] leading-relaxed mb-8 max-w-[480px] mx-auto">
            The workspace you tried to focus is not mapped. It may have been renamed,
            moved to another branch, or it was never real to begin with.
          </p>

          <div className="max-w-[540px] mx-auto mb-7 p-[16px_20px] bg-[#07060E]/70 border border-[#26262c] text-left font-mono text-[13px] leading-relaxed">
            <div><span className="text-[#FF2AB8]">saim@niriarch</span><span className="text-[#d8d8dd]">:</span><span className="text-[#9A86C2]">~</span><span className="text-[#FF2AB8]"> λ </span><span className="text-[#d8d8dd]">niri-focus /requested/path</span></div>
            <div><span className="text-[#ff5f6e]">error:</span> <span className="text-[#d8d8dd]">no matching column in workspace strip</span></div>
            <div><span className="text-[#ff5f6e]">hint:</span> <span className="text-[#d8d8dd]">try</span> <span className="text-[#FF2AB8]">help</span><span className="text-[#d8d8dd]">,</span> <span className="text-[#FF2AB8]">ls</span><span className="text-[#d8d8dd]">, or</span> <span className="text-[#FF2AB8]">reveal</span></div>
            <div><span className="text-[#FF2AB8]">saim@niriarch</span><span className="text-[#d8d8dd]">:</span><span className="text-[#9A86C2]">~</span><span className="text-[#FF2AB8]"> λ </span><span className="border-r-2 border-[#FF2AB8] animate-pulse">_</span></div>
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/" className="p-[12px_18px] bg-[#FF2AB8] text-[#07060E] border border-[#FF2AB8] font-mono text-[12px] tracking-widest uppercase">⌂ back to workspace</Link>
            <Link href="/blog" className="p-[12px_18px] border border-[#26262c] text-[#F2F0FF] font-mono text-[12px] tracking-widest uppercase hover:border-[#FF2AB8] hover:text-[#FF2AB8] transition-all">~/blog</Link>
          </div>
        </div>
      </main>

      <footer className="max-w-[1280px] mx-auto p-[24px_48px_40px] flex gap-3 font-mono text-[11px] text-[#5e5e68] tracking-tight relative z-10 w-full">
        <span>© 2026 saim hashmi</span>
        <span className="text-[#26262c]">·</span>
        <span>segfault is a feature</span>
        <span className="text-[#26262c]">·</span>
        <span><kbd className="bg-[#110F1F] border border-[#26262c] border-b-2 text-[#d8d8dd] px-1.5 py-0.5 rounded-sm">H</kbd> home</span>
      </footer>
    </div>
  );
}
