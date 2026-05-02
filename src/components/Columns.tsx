"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/lib/data";
import ThreeLaptop from "./ThreeLaptop";

export function HomeColumn({ heroRef, sideRef, laptopCanvasRef }: { heroRef: React.RefObject<HTMLDivElement | null>; sideRef: React.RefObject<HTMLDivElement | null>; laptopCanvasRef: React.RefObject<any> }) {
  const U = PORTFOLIO_DATA.user;
  return (
    <div className="flex flex-col sm:flex-row gap-8 md:gap-16 items-center justify-between flex-1 relative">
      <div className="flex-1 will-change-transform transform-gpu z-10 max-w-2xl" ref={heroRef}>
        <div className="font-label text-[9px] text-[#FF2AB8] tracking-[0.12em] mb-5 flex gap-2.5 items-center">
          <span>● available · 2026 Q2</span>
          <span className="text-[var(--text-secondary)]">— remote / warsaw · GMT+1</span>
        </div>
        <h1 className="text-[clamp(36px,6vw,96px)] leading-[1.05] tracking-normal text-[var(--text-primary)] [text-shadow:4px_4px_0_#FF2AB8] mb-2">
          saim<br/>
          <em className="font-italic text-[0.85em] text-[#FF2AB8] [text-shadow:0_0_22px_rgba(255,42,184,0.55)]">hashmi</em><span className="inline-block w-[0.35em] h-[0.35em] rounded-full bg-[#FF2AB8] shadow-[0_0_24px_#FF2AB8] ml-[0.05em] align-baseline" />
        </h1>
        <div className="font-mono text-[22px] text-[var(--text-secondary)] max-w-[560px] mt-7">
          <span className="inline-block px-2.5 py-1 border border-[#FF2AB8] text-[#FF2AB8] font-label text-[8px] tracking-[0.1em] uppercase rounded-none mr-2 align-middle relative overflow-hidden group">
            <span className="relative z-10">creative</span>
            <div className="absolute inset-0 bg-[#FF2AB8] scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100 -z-0" />
          </span>
          <span className="inline-block px-2.5 py-1 border border-[#FF2AB8] text-[#FF2AB8] font-label text-[8px] tracking-[0.1em] uppercase rounded-none mr-2 align-middle relative overflow-hidden group">
            <span className="relative z-10">technologist</span>
            <div className="absolute inset-0 bg-[#FF2AB8] scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100 -z-0" />
          </span>
          building web-native interpretations of linux ricing culture — tiling layouts,
          agentic workflows, and high-fidelity terminals. currently on {U.location}.
        </div>
      </div>
      <div className="flex-1 w-full h-[300px] sm:h-full min-h-[300px] sm:min-h-[420px] relative grid place-items-center will-change-transform transform-gpu pointer-events-none" ref={sideRef}>
        <div className="hidden sm:block w-full h-full">
          <ThreeLaptop ref={laptopCanvasRef} />
        </div>
        <div className="sm:hidden w-[280px] h-[180px] bg-[#110F1F] border border-[#26262c] p-4 flex flex-col gap-2 font-mono text-[10px] text-[#9A86C2] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex gap-1.5 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#FF2AB8]" />
            <div className="w-2 h-2 rounded-full bg-[#26262c]" />
            <div className="w-2 h-2 rounded-full bg-[#26262c]" />
          </div>
          <div>$ neofetch</div>
          <div className="text-[#F2F0FF]">saim@niriarch</div>
          <div className="text-[#5e5e68]">----------</div>
          <div>OS: Fedora 42</div>
          <div>Host: Mobile Handheld</div>
          <div>Kernel: 6.13.8</div>
          <div>WM: niri</div>
          <div className="mt-auto text-[#FF2AB8] opacity-50 animate-pulse">_</div>
        </div>
        <div className="absolute bottom-1.5 left-0 right-0 flex gap-[18px] justify-center font-mono text-[16px] text-[#9A86C2]">
          <span>$ systemctl status lid</span>
          <span className="text-[#FF2AB8]">● active</span>
        </div>
      </div>
    </div>
  );
}

export function AboutColumn({ panelsRef, stepsRef }: { panelsRef: React.RefObject<HTMLDivElement | null>; stepsRef: React.RefObject<HTMLDivElement | null> }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const photoUrl = "https://images.prismic.io/new-portfolio-website/Z6ZwppbqstJ9-YZ5_cropped_image.png?auto=format&compress&q=90&fit=max&w=1200";

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxOpen(false); };
    if (lightboxOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [lightboxOpen]);

  const beats = [
    { idx: "beat 01", title: "now.", body: "Shipping a Niri-native shell and writing about agentic dev loops. The browser is my compositor.", tag: "// april · 2026" },
    { idx: "beat 02", title: "focus.", body: "Interfaces that feel like native systems — predictable, spatial, keyboard-first. One thousand no's for every yes.", tag: "// design principle" },
    { idx: "beat 03", title: "origin.", body: "Started on Arch, moved to Fedora for atomic updates, stayed for the kernel velocity. Rice is a love language.", tag: "// ~/.dotfiles" },
    { idx: "beat 04", title: "reading.", body: "Bret Victor essays on dynamic media, Niri's design notes, papers on scrollable layouts and focus metaphors.", tag: "// library.md" },
  ];
  return (
    <div className="flex flex-col items-center justify-center flex-1 max-w-4xl mx-auto">
      <div className="w-full">
        <div className="bg-[var(--bg-surface)] border border-[#FF2AB8] p-3.5 shadow-[6px_6px_0_oklch(0.28_0.04_305)] mb-12">
          <div className="flex gap-2 items-center mb-2.5 text-[#FF2AB8]">
            <span className="font-label text-[8px] tracking-wider">/ profile</span>
            <span className="w-1.5 h-1.5 bg-[#FF2AB8] shadow-[0_0_8px_#FF2AB8]" />
            <span className="font-label text-[8px] text-[var(--text-secondary)]">online</span>
          </div>
          <div className="grid grid-cols-[110px_1fr] gap-3.5">
            <div 
              className="h-[130px] border border-[var(--border)] relative overflow-hidden bg-[var(--bg)] cursor-pointer group/photo rounded-[4px]"
              onClick={() => setLightboxOpen(true)}
            >
              <img 
                src={photoUrl} 
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/photo:scale-[1.04] group-hover/photo:grayscale-0" 
                alt="Saim Hashmi" 
              />
              <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: 'repeating-linear-gradient(45deg, #FF2AB8 0 6px, transparent 6px 12px)'}} />
              <div className="absolute top-2 left-2 border border-[#FF2AB8] bg-[var(--bg)] text-[#FF2AB8] font-label text-[8px] px-1 py-0.5 z-10">[ zoom ]</div>
              <div className="ps-shimmer" />
            </div>
            {lightboxOpen && (
              <div 
                className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-md flex items-center justify-center p-8 animate-in fade-in duration-350"
                onClick={() => setLightboxOpen(false)}
              >
                <div className="relative max-w-[90vw] max-h-[90vh] animate-in zoom-in-92 duration-350 ease-out">
                  <img src={photoUrl} className="w-full h-full object-contain border border-[#FF2AB8] shadow-[0_32px_80px_rgba(0,0,0,0.8)]" alt="Saim Hashmi" />
                  <button className="absolute -top-12 right-0 text-[#FF2AB8] font-label text-[10px] tracking-widest uppercase hover:text-white transition-colors">Esc ✕ close</button>
                </div>
              </div>
            )}
            <div>
              <div className="font-display text-[13px] text-[var(--text-primary)] mb-1.5 uppercase">saim hashmi</div>
              <div className="font-mono text-[18px] text-[#FF2AB8] mb-2 uppercase">creative technologist · niri ricer</div>
              <div className="grid grid-cols-2 gap-x-3.5 gap-y-1 font-mono text-[16px]">
                <div><span className="text-[var(--text-secondary)] mr-1.5 uppercase">host</span><span className="text-[var(--text-primary)]">niriarch</span></div>
                <div><span className="text-[var(--text-secondary)] mr-1.5 uppercase">tz</span><span className="text-[var(--text-primary)]">GMT+1</span></div>
                <div><span className="text-[var(--text-secondary)] mr-1.5 uppercase">uptime</span><span className="text-[var(--text-primary)]">47d 12h</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-[clamp(24px,3.4vw,48px)] leading-[1.2] text-[var(--text-primary)] mb-6 tracking-normal">
            a portfolio is a <em className="font-italic text-[#FF2AB8]">rice</em>.
          </h2>
          <p className="text-[21px] text-[var(--text-primary)] font-mono">
            I treat the browser like a Wayland compositor. This site is a four-beat
            story — scroll right to pull each panel forward.
          </p>
        </div>

        <div className="relative h-[440px]" ref={panelsRef}>
          {beats.map((b, i) => (
            <div className="about-panel absolute inset-0 p-[30px_34px] bg-[var(--bg-surface)] border border-[var(--border)] flex flex-col gap-3.5 shadow-[6px_6px_0_#FF2AB8,0_16px_40px_rgba(0,0,0,0.55)] will-change-transform" key={i}>
              <div className="font-label text-[9px] text-[#FF2AB8] uppercase tracking-wider">{b.idx}</div>
              <h3 className="text-[20px] text-[var(--text-primary)] leading-[1.3] uppercase">{b.title}</h3>
              <p className="text-[20px] text-[var(--text-primary)] font-mono leading-[1.4]">{b.body}</p>
              <div className="font-label text-[8px] text-[var(--text-secondary)] tracking-[0.12em] mt-auto uppercase">{b.tag}</div>
            </div>
          ))}
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2.5" ref={stepsRef}>
            {beats.map((_, i) => <div className="w-[3px] h-[26px] bg-[var(--border)] transition-all duration-300" key={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsColumn({ cardsRef, focusCardIdx, onCardFocusChange }: { cardsRef: React.RefObject<HTMLDivElement | null>; focusCardIdx: number | null; onCardFocusChange: (i: number | null) => void }) {
  return (
    <div className="flex-1 flex flex-col gap-7 perspective-[1600px]">
      <div className="flex justify-between items-end">
        <h2 className="text-[clamp(22px,3vw,36px)] text-[#F2F0FF] tracking-normal">
          rices & <em className="font-italic text-[#FF2AB8]">experiments</em>
        </h2>
        <div className="font-label text-[9px] text-[#9A86C2] uppercase">
          {PORTFOLIO_DATA.projects.length} · dotfile repos · <span className="text-[#FF2AB8]">F</span> fullscreen · grid ▦
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-[18px] flex-1 transform-style-3d" ref={cardsRef}>
        {PORTFOLIO_DATA.projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className={`relative bg-[#110F1F] border border-[#26262c] flex flex-col will-change-transform transform-gpu transition-all duration-300 group hover:-translate-y-1 hover:border-[#FF2AB8] hover:shadow-[0_0_0_1px_#FF2AB8,0_12px_40px_rgba(255,42,184,0.15)] ${focusCardIdx === i ? 'focused' : ''}`}
            onMouseEnter={() => onCardFocusChange(i)}
            onMouseLeave={() => onCardFocusChange(null)}
          >
            <div className="flex-1 min-h-0 relative flex items-center justify-center overflow-hidden bg-[#07060E] group-hover:bg-[#FF2AB8]/5">
              {p.image && <img src={p.image} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" alt={p.title} />}
              <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage: 'repeating-linear-gradient(45deg, #FF2AB8 0 8px, transparent 8px 16px)'}} />
              <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage: 'radial-gradient(circle at 50% 50%, #9A86C2, transparent 70%)'}} />
              <div className="absolute inset-[14px] border border-dashed border-[#9A86C2] opacity-35" />
              {!p.image && <div className="font-label text-[10px] text-[#9A86C2] tracking-[0.15em] uppercase z-10">{p.slug.toUpperCase()}</div>}
            </div>
            <div className="p-[14px_16px_16px] border-t border-[#26262c]">
              <h4 className="font-display text-[13px] text-[#F2F0FF] mb-2 leading-[1.4] uppercase">{p.title}</h4>
              <p className="font-mono text-[17px] text-[#F2F0FF]/90">{p.blurb}</p>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {p.tags.map((t) => (
                  <span key={t} className="font-label text-[7.5px] text-[#FF2AB8] border border-[#FF2AB8] px-1.5 py-0.5 tracking-wider transition-colors hover:bg-[#FF2AB8] hover:text-[#07060E]">{t}</span>
                ))}
              </div>
            </div>
            <div className="absolute right-3.5 bottom-3.5 z-[3] font-label text-[8px] text-[#FF2AB8] border border-[#FF2AB8] bg-[#07060E] p-[4px_8px] uppercase tracking-[0.18em] opacity-0 translate-y-1 transition-all duration-250 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0">
              → case study
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function BlogColumn({ rowsRef }: { rowsRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-20 items-center flex-1">
      <div>
        <h2 className="text-[clamp(28px,4vw,56px)] text-[#F2F0FF] tracking-normal mb-6">
          field <em className="font-italic text-[#FF2AB8]">notes</em>
        </h2>
        <p className="font-mono text-[20px] text-[#F2F0FF]/90 mb-8 max-w-[340px]">Essays on tiling compositors, agentic development, and the aesthetic of terminals. Updated when something worth saying lands.</p>
        <Link className="blog-cmd-link inline-flex gap-2 items-baseline font-mono text-[18px] text-[#FF2AB8] tracking-tight group hover:underline underline-offset-4 decoration-[#FF2AB8] hover:[text-shadow:0_0_10px_rgba(0,255,204,0.4)] transition-all" href="/blog">
          <span className="text-[#9A86C2] font-medium">$</span> open <span className="text-[#F2F0FF] opacity-85">blog --all</span>
        </Link>
      </div>
      <div className="flex flex-col" ref={rowsRef}>
        {PORTFOLIO_DATA.blog.map((b) => (
          <Link className="grid grid-cols-[110px_1fr_auto] gap-7 items-baseline p-[22px_0] border-t border-[#26262c] last:border-b will-change-transform relative group hover:pl-[22px] transition-all duration-300" key={b.slug} href={`/blog/${b.slug}`}>
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FF2AB8] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300" />
            <div className="font-label text-[9px] text-[#9A86C2] tracking-wider uppercase">{b.date}</div>
            <div>
              <div className="font-italic italic text-[30px] text-[#F2F0FF] group-hover:text-[#FF2AB8] transition-colors leading-[1.15]">{b.title}</div>
              <div className="font-mono text-[18px] text-[#F2F0FF]/90 mt-1 max-w-[620px]">{b.excerpt}</div>
            </div>
            <div className="font-label text-[14px] text-[#FF2AB8]">→</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function RiceColumn({ blocksRef }: { blocksRef: React.RefObject<HTMLDivElement | null> }) {
  const shots = [
    { id: "niri-overview",  label: "workspace overview" },
    { id: "dank-shell-bar", label: "dank-shell bar" },
    { id: "alacritty-tmux", label: "alacritty + tmux" },
    { id: "astronvim",      label: "astronvim + copilot" },
    { id: "matugen-wall",   label: "matugen wallpaper" },
    { id: "anyrun",         label: "anyrun launcher" },
  ];
  return (
    <div className="flex-1 flex flex-col gap-5 min-h-0">
      <div className="flex justify-between items-baseline">
        <h2 className="text-[clamp(22px,3vw,36px)] text-[#F2F0FF] tracking-normal">
          the <em className="font-italic text-[#FF2AB8]">rice</em>.
        </h2>
        <div className="font-label text-[9px] text-[#9A86C2] uppercase">/ screenshots · 06 · oklch-tuned</div>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-3.5 perspective-[1200px]" ref={blocksRef}>
        {PORTFOLIO_DATA.rice.map((s) => (
          <div key={s.id} className="relative aspect-[16/10] border border-[#FF2AB8] bg-[#110F1F] overflow-hidden cursor-pointer transition-all duration-500 transform-gpu group hover:scale-[1.04] hover:border-[#FF2AB8] hover:shadow-[0_0_32px_rgba(255,42,184,0.4),inset_0_0_0_1px_#FF2AB8] hover:z-10" data-rice-id={s.id}>
            <img src={s.url} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" alt={s.label} />
            <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent 0 14px, #FF2AB8 14px 15px)'}} />
            <div className="absolute inset-0 opacity-[0.18]" style={{backgroundImage: 'radial-gradient(circle at 50% 0%, #FF2AB8, transparent 60%)'}} />
            <div className="absolute top-2 left-2 font-label text-[8px] text-[#FF2AB8] border border-[#FF2AB8] bg-[#07060E] px-1.5 py-0.5 transition-all duration-500 group-hover:scale-[1.6] group-hover:-translate-y-3 group-hover:tracking-[0.4em] z-[2]">[ screenshot ]</div>
            <div className="ps-shimmer group-hover:duration-900 group-hover:opacity-90" />
            <div className="absolute bottom-0 left-0 right-0 bg-[#07060E]/85 border-t border-[#FF2AB8] p-[7px_10px] transform-gpu transition-transform duration-350 group-hover:bg-[#FF2AB8]/12">
              <div className="font-label text-[8px] text-[#FF2AB8] tracking-[0.1em] uppercase">~/rice/{s.id}.png</div>
              <div className="font-mono text-[14px] text-[#9A86C2]">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="font-italic text-[22px] text-[#F2F0FF] italic text-center mt-1.5">
        <em className="text-[#FF2AB8]">Fedora 42 · Niri 0.1.10 · Alacritty · AstroNvim · Matugen · Noctalia palette.</em>
      </p>
    </div>
  );
}

export function ContactColumn({ introRef, formRef }: { introRef: React.RefObject<HTMLDivElement | null>; formRef: React.RefObject<HTMLFormElement | null> }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="grid lg:grid-cols-2 gap-20 items-center flex-1">
      <div ref={introRef}>
        <h2 className="text-[clamp(28px,4vw,64px)] text-[#F2F0FF] tracking-normal mb-6">
          let&apos;s <em className="font-italic text-[#FF2AB8]">talk</em>.
        </h2>
        <p className="font-mono text-[21px] text-[#F2F0FF]/90 mb-7 max-w-[460px]">Open to freelance, collaborations, or a conversation about tiling compositors. Pick a channel or type into the buffer — both reach me.</p>
        <div className="grid gap-[1px] bg-[#26262c] border border-[#26262c] overflow-hidden">
          {PORTFOLIO_DATA.contactChannels.map((c) => (
            <Link key={c.label} href="#" className="flex justify-between items-center p-[14px_18px] bg-[#110F1F] font-mono text-[18px] text-[#9A86C2] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#FF2AB8] scale-y-0 origin-bottom transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 -z-10" />
              <span className="font-label text-[9px] tracking-[0.12em] group-hover:text-[#07060E] uppercase transition-colors">{c.label}</span>
              <span className="font-mono text-[16px] text-[#9A86C2] group-hover:text-[#07060E] transition-colors">{c.handle}</span>
            </Link>
          ))}
        </div>
      </div>
      <form
        className="p-7 border border-[#26262c] bg-[#110F1F] flex flex-col gap-3.5 relative"
        ref={formRef}
        onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 2400); }}
      >
        <div className="flex justify-between font-label text-[8px] text-[#9A86C2] tracking-[0.12em] uppercase pb-2 border-b border-dashed border-[#26262c] mb-2">
          <span>/dev/contact</span>
          <span className="text-[#FF2AB8]">○ listening</span>
        </div>
        <label className="font-label text-[8px] text-[#9A86C2] tracking-[0.15em] uppercase">
          from <input type="text" placeholder="you@domain.tld" className="w-full mt-1.5 bg-transparent border-b border-[#26262c] text-[#F2F0FF] font-mono text-[18px] p-0 pb-2 outline-none focus:border-[#FF2AB8] transition-colors" />
        </label>
        <label className="font-label text-[8px] text-[#9A86C2] tracking-[0.15em] uppercase">
          subject <input type="text" placeholder="re: ..." className="w-full mt-1.5 bg-transparent border-b border-[#26262c] text-[#F2F0FF] font-mono text-[18px] p-0 pb-2 outline-none focus:border-[#FF2AB8] transition-colors" />
        </label>
        <label className="font-label text-[8px] text-[#9A86C2] tracking-[0.15em] uppercase">
          buffer <textarea placeholder="> your message" className="w-full mt-1.5 bg-transparent border-b border-[#26262c] text-[#F2F0FF] font-mono text-[18px] p-0 pb-2 outline-none focus:border-[#FF2AB8] transition-colors resize-none min-h-[80px]" />
        </label>
        <button className="mt-2 p-[12px_18px] font-label text-[9px] tracking-[0.15em] uppercase bg-[#FF2AB8] text-[#07060E] border border-[#FF2AB8] cursor-pointer relative overflow-hidden group" type="submit">
          <span className="relative z-10 transition-colors group-hover:text-[#FF2AB8]">{sent ? "✓ sent. expect a reply within 48h." : "▶ send — or Ctrl+D"}</span>
          <div className="absolute inset-0 bg-[#07060E] scale-y-0 origin-bottom transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 z-0" />
        </button>
      </form>
    </div>
  );
}
