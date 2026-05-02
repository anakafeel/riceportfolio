"use client";

import React, { useEffect } from "react";
import SubpageHeader from "@/components/SubpageHeader";
import { PORTFOLIO_DATA } from "@/lib/data";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

export default function ProjectDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const project = PORTFOLIO_DATA.projects.find((p) => p.slug === slug);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "h" || e.key === "H" || e.key === "Escape") {
        window.location.href = "/";
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (!project) {
    notFound();
  }

  return (
    <div className="subpage min-h-screen bg-[var(--bg)] text-[var(--text-primary)] selection:bg-[#FF2AB8] selection:text-[#07060E]">
      <div className="bg-stage">
        <div className="bg-grid animate-[sp-grid-drift_60s_linear_infinite]" />
        <div className="bg-scan opacity-90" />
      </div>

      <SubpageHeader 
        title={project.slug} 
        category="~/projects" 
        path="~/projects" 
        status="active · v2.4.1"
      />

      <main className="max-w-[1400px] mx-auto p-4 sm:p-[48px_48px_40px] relative z-10">
        <section className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-[72px] items-center p-6 sm:p-[60px_0_80px]">
          <div className="order-2 lg:order-1">
            <div className="font-mono text-[11px] text-[#FF2AB8] tracking-[0.22em] uppercase mb-5">03 · projects / {project.slug}</div>
            <h1 className="font-display text-[clamp(42px,8vw,128px)] leading-[0.92] tracking-tighter mb-6 uppercase text-[var(--text-primary)]">
              {project.title.split(' ')[0]} <em className="italic text-[#FF2AB8] not-italic">{project.title.split(' ')[1]}</em>.
            </h1>
            <p className="font-sans text-[18px] text-[var(--text-primary)] leading-[1.55] max-w-[500px] mb-8 opacity-90">
              {project.blurb} A scrollable-tiling window manager config with dynamic keybinds, floating
              overlay rules, and a Matugen-reactive theme pipeline. Daily-driven on
              Fedora 42.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-[var(--border)] border border-[var(--border)] rounded-none overflow-hidden mb-7 max-w-[440px]">
              {[
                { k: "status", v: "● shipping", status: true },
                { k: "version", v: "2.4.1" },
                { k: "license", v: "MIT" },
                { k: "stars", v: "1,842 ↗" },
              ].map((m, i) => (
                <div key={i} className="p-[14px_18px] bg-[var(--bg-surface)] flex justify-between font-mono text-[12px]">
                  <span className="text-[var(--text-secondary)] tracking-widest uppercase text-[10.5px]">{m.k}</span>
                  <span className={m.status ? "text-[#FF2AB8]" : "text-[var(--text-primary)]"}>{m.v}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap">
              <button className="p-[12px_18px] font-mono text-[12px] tracking-widest uppercase bg-[#FF2AB8] text-[#07060E] border border-[#FF2AB8] font-medium shadow-[0_0_20px_rgba(255,42,184,0.4)] transition-all">⌘ clone repo</button>
              <button className="p-[12px_18px] font-mono text-[12px] tracking-widest uppercase border border-[var(--border)] text-[var(--text-primary)] hover:border-[#FF2AB8] hover:text-[#FF2AB8] transition-all">↗ live demo</button>
            </div>
          </div>

          <div className="relative bg-[var(--bg-surface)] border border-[var(--border)] shadow-[0_32px_80px_rgba(0,0,0,0.5)] aspect-[16/10] overflow-hidden group order-1 lg:order-2">
            <img src={project.image} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700" alt={project.title} />
            <div className="flex items-center gap-3 p-[10px_14px] bg-[var(--bg-surface)]/90 backdrop-blur-sm border-b border-[var(--border)] font-mono text-[11px] text-[var(--text-secondary)] relative z-10">
              <div className="flex gap-1.5">
                <span className="w-[9px] h-[9px] rounded-full bg-[#ff5f56]" />
                <span className="w-[9px] h-[9px] rounded-full bg-[#ffbd2e]" />
                <span className="w-[9px] h-[9px] rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 text-center text-[var(--text-secondary)]">niri · workspace-1</div>
              <div className="text-[#FF2AB8]">~/.config/niri</div>
            </div>
            <div className="grid grid-cols-[1fr_1.2fr_1fr] gap-2.5 p-4 bg-gradient-to-br from-[#FF2AB8]/5 to-[var(--text-secondary)]/5 h-[calc(100%-42px)]">
               {/* Mockup content */}
               <div className="flex flex-col gap-2 p-3 bg-[var(--bg)]/50 border border-[var(--border)]">
                  <div className="flex gap-1 h-1.5"><span className="flex-1 bg-[var(--border)]" /><span className="flex-[0_0_40%] bg-[#FF2AB8]/40" /><span className="flex-[0_0_60%] bg-[var(--border)]" /></div>
                  <div className="h-1.5 bg-[var(--border)] w-[80%]" />
                  <div className="h-20 bg-[#FF2AB8]/5 border border-dashed border-[var(--border)]" />
               </div>
               <div className="flex flex-col gap-2 p-3 bg-[var(--bg)]/50 border border-[#FF2AB8] shadow-[0_0_20px_rgba(255,42,184,0.15)]">
                  <div className="h-1.5 bg-[var(--border)] w-[60%]" />
                  <div className="h-[110px] bg-[#FF2AB8]/5 border border-dashed border-[var(--border)]" />
               </div>
               <div className="flex flex-col gap-2 p-3 bg-[var(--bg)]/50 border border-[var(--border)]">
                  <div className="h-1.5 bg-[var(--border)] w-[30%]" />
                  <div className="h-1.5 bg-[var(--border)] w-[70%]" />
                  <div className="h-15 bg-[#FF2AB8]/5 border border-dashed border-[var(--border)]" />
               </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-14 pt-12 border-t border-dashed border-[var(--border)]">
          <div>
            <div className="mb-12">
              <h3 className="font-mono text-[11px] text-[#FF2AB8] tracking-[0.25em] uppercase mb-4">// overview</h3>
              <p className="font-sans text-[16px] leading-[1.7] text-[var(--text-primary)] opacity-90 max-w-[680px] mb-4">Niri is a scrollable-tiling Wayland compositor that lays windows out in an infinite horizontal strip. This dotfile repo packages a ready-to-run configuration plus the supporting services — DankMaterialShell bar, Matugen theming pipeline, anyrun launcher, and a focused keybind map optimized for HHKB layouts.</p>
              <p className="font-sans text-[16px] leading-[1.7] text-[var(--text-primary)] opacity-90 max-w-[680px]">The key decision was making every visible piece of chrome — the bar, the notifications, the rofi menus — reactive to the wallpaper's extracted palette. Change the wallpaper; the whole system re-tints in ~120ms.</p>
            </div>

            <div className="mb-12">
              <h3 className="font-mono text-[11px] text-[#FF2AB8] tracking-[0.25em] uppercase mb-4">// features</h3>
              <ul className="flex flex-col gap-2.5">
                {[
                  { b: "scrollable strip", d: "native niri layout, no overrides. Windows live in a single infinite row." },
                  { b: "matugen theming", d: "wallpaper → oklch palette → CSS / kdl / toml, all regenerated on change." },
                  { b: "floating overlays", d: "specific window classes (picker, calculator, claude) auto-float with rules." },
                  { b: "agentic keybinds", d: "Super+a opens a Claude Code session scoped to the focused project." },
                ].map((f, i) => (
                  <li key={i} className="p-3 bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg)] border border-[var(--border)]">
                    <b className="text-[#FF2AB8] font-medium font-mono text-[13px] mr-2 uppercase">{f.b}</b>
                    <span className="font-sans text-[16px] opacity-90">{f.d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="flex flex-col gap-4.5 lg:sticky lg:top-[84px] self-start">
             <div className="p-4.5 bg-[var(--bg-surface)]/85 border border-[var(--border)]">
                <div className="font-mono text-[10.5px] text-[#FF2AB8] tracking-[0.25em] uppercase mb-3.5">// metrics</div>
                {[
                  { k: "contributors", v: "14" },
                  { k: "issues open", v: "3" },
                  { k: "last commit", v: "2h ago" },
                  { k: "loc", v: "1,248" },
                ].map((m, i) => (
                  <div key={i} className="flex justify-between font-mono text-[12px] py-1.5 text-[var(--text-secondary)]">
                    <span>{m.k}</span>
                    <span className="text-[var(--text-primary)]">{m.v}</span>
                  </div>
                ))}
             </div>

             <div className="p-4.5 bg-[var(--bg-surface)]/85 border border-[var(--border)]">
                <div className="font-mono text-[10.5px] text-[#FF2AB8] tracking-[0.25em] uppercase mb-3.5">// install</div>
                <pre className="font-mono text-[11.5px] leading-relaxed p-3 bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] overflow-x-auto">
                  $ git clone gh:anakafeel/{project.slug}{"\n"}
                  $ cd {project.slug} && ./install.sh{"\n"}
                  $ niri-session
                </pre>
             </div>
          </aside>
        </section>
      </main>

      <nav className="max-w-[1280px] mx-auto p-6 sm:p-[32px_48px] grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-6 border-t border-dashed border-[var(--border)] relative z-10 mt-10">
        <Link href="#" className="p-[18px_22px] border border-[var(--border)] flex flex-col gap-1 transition-all hover:border-[#FF2AB8] hover:bg-[#FF2AB8]/5 group">
          <span className="font-mono text-[11px] text-[var(--text-secondary)] tracking-widest uppercase">← previous project</span>
          <span className="font-display italic text-[18px] sm:text-[22px] text-[var(--text-primary)] group-hover:text-[#FF2AB8] uppercase">matugen-web</span>
        </Link>
        <Link href="/" className="self-center p-[14px_20px] font-mono text-[12px] text-[#FF2AB8] border border-[#FF2AB8]/50 uppercase tracking-widest flex items-center justify-center transition-all hover:bg-[#FF2AB8] hover:text-[#07060E]">⌂ workspace</Link>
        <Link href="#" className="p-[18px_22px] border border-[var(--border)] flex flex-col gap-1 text-right transition-all hover:border-[#FF2AB8] hover:bg-[#FF2AB8]/5 group">
          <span className="font-mono text-[11px] text-[var(--text-secondary)] tracking-widest uppercase">next project →</span>
          <span className="font-display italic text-[18px] sm:text-[22px] text-[var(--text-primary)] group-hover:text-[#FF2AB8] uppercase">dank-shell</span>
        </Link>
      </nav>

      <footer className="max-w-[1280px] mx-auto p-6 sm:p-[24px_48px_40px] flex flex-col sm:flex-row gap-3 items-center sm:items-start font-mono text-[11px] text-[var(--text-secondary)] tracking-tight relative z-10 text-center sm:text-left">
        <span>© 2026 saim hashmi</span>
        <span className="hidden sm:inline text-[var(--border)]">·</span>
        <span>a rice is a love language</span>
        <span className="hidden sm:inline text-[var(--border)]">·</span>
        <span><kbd className="bg-[var(--bg-surface)] border border-[var(--border)] border-b-2 text-[var(--text-primary)] px-1.5 py-0.5 rounded-sm">H</kbd> home</span>
      </footer>
    </div>
  );
}
