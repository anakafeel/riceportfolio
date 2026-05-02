"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/lib/data";
import BootSequence from "@/components/BootSequence";
import Terminal from "@/components/Terminal";
import { HomeColumn, AboutColumn, ProjectsColumn, BlogColumn, RiceColumn, ContactColumn } from "@/components/Columns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const COLUMNS_DEF = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "projects", label: "projects" },
  { id: "blog", label: "blog" },
  { id: "rice", label: "rice" },
  { id: "contact", label: "contact" },
];

function KeybindOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(panelRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3, ease: "expo.out" });
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="bg-[#110F1F] border border-[#FF2AB8] p-8 max-w-[480px] w-full font-mono shadow-[0_24px_60px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#26262c]">
          <span className="font-label text-[10px] text-[#FF2AB8] tracking-[0.2em] uppercase">// keybinds</span>
          <button className="text-[#9A86C2] hover:text-[#FF2AB8] transition-colors" onClick={onClose}>
            <span className="font-label text-[8px]">ESC</span>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <div className="font-label text-[8px] text-[#5e5e68] mb-3 tracking-widest uppercase">Navigation</div>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[#F2F0FF]">→ / L</span>
                <span className="text-[#9A86C2] text-sm">next column</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#F2F0FF]">← / H</span>
                <span className="text-[#9A86C2] text-sm">previous column</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#F2F0FF]">1 – 6</span>
                <span className="text-[#9A86C2] text-sm">jump to column</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#F2F0FF]">Escape</span>
                <span className="text-[#9A86C2] text-sm">home column</span>
              </div>
            </div>
          </div>

          <div>
            <div className="font-label text-[8px] text-[#5e5e68] mb-3 tracking-widest uppercase">Terminal</div>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[#F2F0FF]">Ctrl+`</span>
                <span className="text-[#9A86C2] text-sm">toggle terminal</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#F2F0FF]">Ctrl+W</span>
                <span className="text-[#9A86C2] text-sm">close terminal</span>
              </div>
            </div>
          </div>

          <div>
            <div className="font-label text-[8px] text-[#5e5e68] mb-3 tracking-widest uppercase">Interface</div>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[#F2F0FF]">?</span>
                <span className="text-[#9A86C2] text-sm">show/hide this overlay</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#F2F0FF]">F</span>
                <span className="text-[#9A86C2] text-sm">fullscreen focused card</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#F2F0FF]">~</span>
                <span className="text-[#9A86C2] text-sm">return to boot screen</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#F2F0FF]">T</span>
                <span className="text-[#9A86C2] text-sm">toggle light / dark mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 15000);
    return () => clearInterval(id);
  }, []);
  return <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>;
}

export default function PortfolioPage() {
  const [phase, setPhase] = useState<"boot" | "terminal" | "revealed">("boot");
  const [activeCol, setActiveCol] = useState(0);
  const [terminalClosed, setTerminalClosed] = useState(false);
  const [keybindOpen, setKeybindOpen] = useState(false);
  const [focusCardIdx, setFocusCardIdx] = useState<number | null>(null);
  const [fullscreenIdx, setFullscreenIdx] = useState<number | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const wrapRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const themeToggleRef = useRef<HTMLButtonElement>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const aboutPanelsRef = useRef<HTMLDivElement>(null);
  const aboutStepsRef = useRef<HTMLDivElement>(null);
  const laptopCanvasRef = useRef<any>(null);
  const projCardsRef = useRef<HTMLDivElement>(null);
  const blogRowsRef = useRef<HTMLDivElement>(null);
  const riceBlocksRef = useRef<HTMLDivElement>(null);
  const contactIntroRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);

  const [wipeState, setWipeState] = useState<{ active: boolean; nextTheme: "dark" | "light" } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("sr:phase");
    if (saved === "terminal" || saved === "revealed") {
      setPhase(saved as any);
    }
    const savedTheme = localStorage.getItem("newport-theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    if (document.documentElement.classList.contains("theme-transitioning")) return;
    
    const next = theme === "dark" ? "light" : "dark";
    
    const btn = themeToggleRef.current;
    const rect = btn?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    document.documentElement.style.setProperty("--wipe-x", `${x}px`);
    document.documentElement.style.setProperty("--wipe-y", `${y}px`);
    document.documentElement.classList.add("theme-transitioning");

    setWipeState({ active: false, nextTheme: next });
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setWipeState({ active: true, nextTheme: next });
        
        setTimeout(() => {
          setTheme(next);
          document.documentElement.setAttribute("data-theme", next);
          localStorage.setItem("newport-theme", next);
        }, 300);
        
        setTimeout(() => {
          document.documentElement.classList.remove("theme-transitioning");
          setWipeState(null);
        }, 650);
      });
    });
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("sr:phase", phase);
  }, [phase]);

  const jumpToIdx = useCallback((idx: number) => {
    if (idx < 0 || idx >= COLUMNS_DEF.length) return;
    setPhase("revealed");
    
    // Use a small delay to ensure the DOM is rendered if we were in terminal phase
    setTimeout(() => {
      const pinST = ScrollTrigger.getAll().find(st => st.pin && st.trigger === wrapRef.current);
      if (!pinST) return;
      
      const targetProgress = idx / (COLUMNS_DEF.length - 1);
      const scrollY = pinST.start + (pinST.end - pinST.start) * targetProgress;
      
      window.scrollTo({ top: scrollY, behavior: "smooth" });
    }, 100);
  }, []);

  const openColumn = useCallback((colId: string) => {
    const idx = COLUMNS_DEF.findIndex((c) => c.id === colId);
    if (idx >= 0) jumpToIdx(idx);
  }, [jumpToIdx]);

  // GSAP Workspace Orchestration
  useEffect(() => {
    if (phase !== "revealed" || !wrapRef.current || !stripRef.current) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".column");
      const total = sections.length;
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        // Mobile: Vertical reveal
        sections.forEach((section, i) => {
          if (i === 0) return; // Home always visible
          gsap.fromTo(section, { opacity: 0, y: 30 }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true
            }
          });
        });

        // Simple progress bar update based on vertical scroll
        gsap.to(fillRef.current, {
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
              const idx = Math.round(self.progress * (total - 1));
              setActiveCol(idx);
            }
          }
        });

        return;
      }

      // Main Horizontal Tween
      const horizTween = gsap.to(sections, {
        xPercent: -100 * (total - 1),
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          end: () => "+=" + (stripRef.current!.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (total - 1));
            setActiveCol(idx);
            if (fillRef.current) fillRef.current.style.width = (self.progress * 100) + "%";
            if (laptopCanvasRef.current && laptopCanvasRef.current.setProgress) {
              laptopCanvasRef.current.setProgress(self.progress);
            }
          },
        },
      });

      // ─── Individual Column Animations ───

      // HOME
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: "expo.out", delay: 0.2,
        });
      }
      if (sideRef.current) {
        gsap.from(sideRef.current.children, {
          x: 60, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.4,
        });
      }

      // ABOUT
      const aboutPanels = aboutPanelsRef.current?.querySelectorAll(".about-panel");
      const aboutSteps = aboutStepsRef.current?.querySelectorAll("div");
      if (aboutPanels?.length) {
        aboutPanels.forEach((panel, i) => {
          gsap.set(panel, { y: -160 - i * 30, opacity: 0, scale: 0.95, zIndex: i });
        });

        const tl = gsap.timeline();
        // Reveal the section itself
        tl.to(sections[1], { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0);
        
        aboutPanels.forEach((panel, i) => {
          tl.to(panel, { y: 0, opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.7)" }, i + 0.1)
            .call(() => { 
              if (aboutSteps) aboutSteps.forEach((s, j) => s.classList.toggle("bg-[#FF2AB8]", j <= i)); 
              if (aboutSteps) aboutSteps.forEach((s, j) => s.classList.toggle("shadow-[0_0_12px_#FF2AB8]", j <= i)); 
            }, undefined, i + 0.4)
            .to(panel, { y: -50, opacity: 0.18, scale: 0.9, duration: 0.7, ease: "power2.in" }, i + 1.05);
        });

        if (!isMobile) {
          ScrollTrigger.create({
            trigger: sections[1], // About column
            containerAnimation: horizTween,
            start: "left 90%",
            end: "right 20%",
            scrub: 1,
            animation: tl
          });
        } else {
          ScrollTrigger.create({
            trigger: sections[1],
            start: "top center",
            end: "bottom center",
            scrub: 1,
            animation: tl
          });
        }
      }

      // PROJECTS
      const cards = projCardsRef.current?.children;
      if (cards?.length) {
        Array.from(cards).forEach((c) => gsap.set(c, { opacity: 0, rotationY: 45, transformPerspective: 800, transformOrigin: "50% 50%" }));
        const tl = gsap.timeline();
        tl.to(sections[2], { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0);
        Array.from(cards).forEach((c, i) => tl.to(c, { opacity: 1, rotationY: 0, duration: 1, ease: "expo.out" }, i * 0.12 + 0.1));
        
        ScrollTrigger.create({
          trigger: sections[2],
          containerAnimation: !isMobile ? horizTween : undefined,
          start: !isMobile ? "left 90%" : "top 80%",
          end: !isMobile ? "right center" : "bottom center",
          scrub: 1,
          animation: tl
        });
      }

      // BLOG
      const rows = blogRowsRef.current?.children;
      if (rows?.length) {
        Array.from(rows).forEach((r) => gsap.set(r, { opacity: 0, x: 40 }));
        const tl = gsap.timeline();
        tl.to(sections[3], { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0);
        Array.from(rows).forEach((r, i) => tl.to(r, { opacity: 1, x: 0, duration: 0.8, ease: "expo.out" }, i * 0.18 + 0.1));
        
        ScrollTrigger.create({
          trigger: sections[3],
          containerAnimation: !isMobile ? horizTween : undefined,
          start: !isMobile ? "left 90%" : "top 80%",
          end: !isMobile ? "right center" : "bottom center",
          scrub: 1,
          animation: tl
        });
      }

      // RICE
      const blocks = riceBlocksRef.current?.children;
      if (blocks?.length) {
        Array.from(blocks).forEach((b) => gsap.set(b, { opacity: 0, y: 60 }));
        const tl = gsap.timeline();
        tl.to(sections[4], { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0);
        Array.from(blocks).forEach((b, i) => tl.to(b, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }, i * 0.15 + 0.1));
        
        ScrollTrigger.create({
          trigger: sections[4],
          containerAnimation: !isMobile ? horizTween : undefined,
          start: !isMobile ? "left 90%" : "top 80%",
          end: !isMobile ? "right center" : "bottom center",
          scrub: 1,
          animation: tl
        });
      }

      // CONTACT
      if (contactIntroRef.current && contactFormRef.current) {
        gsap.set(contactIntroRef.current, { opacity: 0, x: -50 });
        gsap.set(contactFormRef.current, { opacity: 0, x: 50 });
        const tl = gsap.timeline();
        tl.to(sections[5], { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0);
        tl.to(contactIntroRef.current, { opacity: 1, x: 0, duration: 0.9, ease: "expo.out" }, 0.1)
          .to(contactFormRef.current, { opacity: 1, x: 0, duration: 0.9, ease: "expo.out" }, 0.4);
        
        ScrollTrigger.create({
          trigger: sections[5],
          containerAnimation: !isMobile ? horizTween : undefined,
          start: !isMobile ? "left 90%" : "top 80%",
          end: !isMobile ? "right center" : "bottom center",
          scrub: 1,
          animation: tl
        });
      }

    }, wrapRef);

    return () => ctx.revert();
  }, [phase]);

  // Keybinds
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (phase === "boot") return;
      const tag = (e.target as HTMLElement)?.tagName;
      const inInput = tag === "INPUT" || tag === "TEXTAREA";
      const isCtrl = e.ctrlKey || e.metaKey;

      if (isCtrl && (e.key === "`" || e.code === "Backquote")) {
        e.preventDefault();
        if (phase === "terminal") setPhase("revealed");
        else setTerminalClosed((v) => !v);
        return;
      }
      
      if (e.key === "Escape") {
        if (keybindOpen) { setKeybindOpen(false); return; }
        if (fullscreenIdx !== null) { setFullscreenIdx(null); return; }
        if (focusCardIdx !== null) { setFocusCardIdx(null); return; }
        if (phase === "revealed") jumpToIdx(0);
        return;
      }

      if (inInput) return;

      if (e.key === "?") { setKeybindOpen((v) => !v); return; }

      if (/^[1-6]$/.test(e.key)) {
        e.preventDefault();
        jumpToIdx(parseInt(e.key, 10) - 1);
        return;
      }

      if (phase !== "revealed") return;

      if (e.key === "f" || e.key === "F") {
        if (activeCol === 2 && focusCardIdx !== null) {
          setFullscreenIdx(focusCardIdx);
        } else if (activeCol === 2) {
          setFullscreenIdx(0);
        }
        return;
      }

      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        toggleTheme();
        return;
      }

      if (e.key === "ArrowRight" || e.key === "l" || e.key === "L") {
        e.preventDefault();
        jumpToIdx(Math.min(COLUMNS_DEF.length - 1, activeCol + 1));
      }
      if (e.key === "ArrowLeft" || e.key === "h" || e.key === "H") {
        e.preventDefault();
        jumpToIdx(Math.max(0, activeCol - 1));
      }

      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        // Reverse reveal animation
        const ctx = gsap.context(() => {
          gsap.to(".column", {
            x: 100,
            opacity: 0,
            duration: 0.5,
            ease: "expo.in",
            onComplete: () => {
              setPhase("terminal");
              localStorage.removeItem("sr:phase");
            }
          });
        });
        return;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [phase, activeCol, focusCardIdx, fullscreenIdx, keybindOpen, jumpToIdx]);

  return (
    <>
      {wipeState && (
        <div 
          className={`theme-wipe ${wipeState.active ? "active" : ""}`} 
          style={{ background: wipeState.nextTheme === "light" ? "#F4F4F4" : "#07060E" }}
        />
      )}
      <div className="bg-stage">
        <div className="bg-grid" />
        <div className="bg-scan" />
        <div className="bg-noise" />
      </div>

      {phase !== "boot" && (
        <div className="fixed top-0 left-0 right-0 h-9 z-40 flex items-center gap-3.5 px-4.5 bg-[#07060E]/92 backdrop-blur-[10px] border-b border-[#FF2AB8] font-label text-[9px] text-[#9A86C2] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF2AB8] shadow-[0_0_10px_#FF2AB8] shrink-0" />
          <span className="text-[#9A86C2] shrink-0">niri</span>
          <span className="text-[#5e5e68] shrink-0 hidden sm:inline">0.1.10</span>
          <div className="flex gap-0.5 ml-3 overflow-x-auto scrollbar-hide whitespace-nowrap max-sm:text-[11px]">
            {COLUMNS_DEF.map((c, i) => (
              <span 
                key={c.id}
                className={cn(
                  "px-2 py-1 text-[#9A86C2] cursor-pointer relative overflow-hidden transition-all hover:text-[#F2F0FF] shrink-0",
                  phase === "revealed" && i === activeCol && "bg-[#FF2AB8] text-[#07060E] shadow-[0_0_18px_rgba(255,42,184,0.5)]"
                )}
                onClick={() => jumpToIdx(i)}
              >
                {String(i + 1).padStart(2, "0")} {c.label}
              </span>
            ))}
          </div>
          <span className="flex-1" />
          <button 
            ref={themeToggleRef}
            onClick={toggleTheme}
            className="mr-6 font-label text-[8px] text-[#9A86C2] hover:text-[#FF2AB8] transition-colors uppercase tracking-widest"
          >
            [{theme}]
          </button>
          <span className="text-[#9A86C2] mr-4 shrink-0 hidden sm:inline">{phase === "revealed" ? `ws ${activeCol + 1}/${COLUMNS_DEF.length}` : "tty0"}</span>
          <span className="text-[#9A86C2] mr-4 font-bold text-[#FF2AB8] shrink-0">{PORTFOLIO_DATA.user.handle}</span>
          <span className="text-[#9A86C2] shrink-0 hidden sm:inline"><Clock /></span>
        </div>
      )}

      {phase === "revealed" && (
        <div className="gsap-container">
          <div className="strip-wrap" ref={wrapRef}>
            <div className="strip" ref={stripRef}>
              <section className="column" data-idx="0">
                <span className="col-gutter">01 / home · ~/</span>
                <span className="col-number">01</span>
                <div className="col-title-eyebrow">portfolio · v0.4 · arcade</div>
                <HomeColumn heroRef={heroRef} sideRef={sideRef} laptopCanvasRef={laptopCanvasRef} />
              </section>
              <section className="column" data-idx="1">
                <span className="col-gutter">02 / about · ~/about.md</span>
                <span className="col-number">02</span>
                <div className="col-title-eyebrow">story · four beats</div>
                <AboutColumn panelsRef={aboutPanelsRef} stepsRef={aboutStepsRef} />
              </section>
              <section className="column" data-idx="2">
                <span className="col-gutter">03 / projects · ~/projects/</span>
                <span className="col-number">03</span>
                <div className="col-title-eyebrow">experiments · dotfiles</div>
                <ProjectsColumn cardsRef={projCardsRef} focusCardIdx={focusCardIdx} onCardFocusChange={setFocusCardIdx} />
              </section>
              <section className="column" data-idx="3">
                <span className="col-gutter">04 / blog · ~/blog/</span>
                <span className="col-number">04</span>
                <div className="col-title-eyebrow">field notes</div>
                <BlogColumn rowsRef={blogRowsRef} />
              </section>
              <section className="column" data-idx="4">
                <span className="col-gutter">05 / rice · ~/rice/</span>
                <span className="col-number">05</span>
                <div className="col-title-eyebrow">screenshots · 2026</div>
                <RiceColumn blocksRef={riceBlocksRef} />
              </section>
              <section className="column" data-idx="5">
                <span className="col-gutter">06 / contact · /dev/contact</span>
                <span className="col-number">06</span>
                <div className="col-title-eyebrow">listening</div>
                <ContactColumn introRef={contactIntroRef} formRef={contactFormRef} />
              </section>
            </div>
          </div>
        </div>
      )}

      {phase === "revealed" && (
        <div className="scroll-rail">
          <span>scroll</span>
          <div className="w-[220px] h-1 bg-[#07060E] border border-[#26262c] relative overflow-hidden mx-3.5">
            <div className="absolute left-0 top-0 bottom-0 bg-[#FF2AB8] shadow-[0_0_12px_#FF2AB8] transition-all" ref={fillRef} />
          </div>
          <span>niri ws</span>
        </div>
      )}

      {phase !== "boot" && (
        <Terminal
          floating={phase === "revealed"}
          closed={terminalClosed && phase === "revealed"}
          setClosed={setTerminalClosed}
          onReveal={() => setPhase("revealed")}
          onOpenColumn={openColumn}
        />
      )}

      {phase === "revealed" && terminalClosed && (
        <button 
          className="fixed bottom-3.5 right-5 z-[60] font-label text-[8px] tracking-wider bg-[#FF2AB8] text-[#07060E] border border-[#FF2AB8] p-[8px_12px] cursor-pointer shadow-[4px_4px_0_#07060E] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#07060E]"
          onClick={() => setTerminalClosed(false)}
        >
          ▸ ctrl+` open term
        </button>
      )}

      {phase !== "boot" && (
        <div className="fixed bottom-3.5 left-5 z-30 font-mono text-[16px] text-[#9A86C2] flex gap-3.5 items-center p-[6px_12px] bg-[#07060E]/70 border border-[#26262c] backdrop-blur-[8px]">
          {phase === "terminal" ? (
            <>
              <span className="flex gap-1.5 items-center"><kbd className="font-label text-[8px] bg-[#07060E] border border-[#FF2AB8] text-[#FF2AB8] p-[2px_6px]">Ctrl</kbd>+<kbd className="font-label text-[8px] bg-[#07060E] border border-[#FF2AB8] text-[#FF2AB8] p-[2px_6px]">`</kbd> reveal</span>
              <span className="text-[#26262c]">│</span>
              <span className="flex gap-1.5 items-center"><kbd className="font-label text-[8px] bg-[#07060E] border border-[#FF2AB8] text-[#FF2AB8] p-[2px_6px]">?</kbd> keybinds</span>
              <span className="text-[#26262c]">│</span>
              <span className="flex gap-1.5 items-center"><kbd className="font-label text-[8px] bg-[#07060E] border border-[#FF2AB8] text-[#FF2AB8] p-[2px_6px]">help</kbd></span>
            </>
          ) : (
            <>
              <span className="flex gap-1.5 items-center"><kbd className="font-label text-[8px] bg-[#07060E] border border-[#FF2AB8] text-[#FF2AB8] p-[2px_6px]">↓</kbd> scroll</span>
              <span className="text-[#26262c]">│</span>
              <span className="flex gap-1.5 items-center"><kbd className="font-label text-[8px] bg-[#07060E] border border-[#FF2AB8] text-[#FF2AB8] p-[2px_6px]">→</kbd>/<kbd className="font-label text-[8px] bg-[#07060E] border border-[#FF2AB8] text-[#FF2AB8] p-[2px_6px]">L</kbd> next</span>
              <span className="text-[#26262c]">│</span>
              <span className="flex gap-1.5 items-center"><kbd className="font-label text-[8px] bg-[#07060E] border border-[#FF2AB8] text-[#FF2AB8] p-[2px_6px]">~</kbd> boot</span>
              <span className="text-[#26262c]">│</span>
              <span className="flex gap-1.5 items-center"><kbd className="font-label text-[8px] bg-[#07060E] border border-[#FF2AB8] text-[#FF2AB8] p-[2px_6px]">?</kbd> keys</span>
            </>
          )}
        </div>
      )}

      {phase === "boot" && <BootSequence onDone={() => setPhase("terminal")} />}

      {/* ── Keybind Overlay (? key) ───────────────────────────── */}
      <KeybindOverlay open={keybindOpen} onClose={() => setKeybindOpen(false)} />

      {/* ── Project Fullscreen Overlay (F key) ────────────────── */}
      {fullscreenIdx !== null && PORTFOLIO_DATA.projects[fullscreenIdx] && (() => {
        const p = PORTFOLIO_DATA.projects[fullscreenIdx];
        return (
          <div
            className="fixed inset-0 z-[190] bg-[#07060E]/92 backdrop-blur-[18px] flex items-center justify-center p-8"
            onClick={() => setFullscreenIdx(null)}
          >
            <div
              className="bg-[#110F1F] border border-[#FF2AB8] shadow-[8px_8px_0_#FF2AB8] max-w-[860px] w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[21/9] overflow-hidden">
                {p.image && <img src={p.image} className="absolute inset-0 w-full h-full object-cover opacity-70" alt={p.title} />}
                <div className="absolute inset-0 bg-gradient-to-t from-[#110F1F] via-transparent to-transparent" />
                <button
                  className="absolute top-3.5 right-3.5 font-label text-[8px] text-[#FF2AB8] border border-[#FF2AB8] bg-[#07060E] px-2.5 py-1.5 hover:bg-[#FF2AB8] hover:text-[#07060E] transition-colors z-10"
                  onClick={() => setFullscreenIdx(null)}
                >Esc ✕</button>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end p-4">
                  <div className="flex gap-1.5">
                    {p.tags.map((t) => <span key={t} className="font-label text-[7.5px] text-[#FF2AB8] border border-[#FF2AB8] bg-[#07060E]/80 px-1.5 py-0.5 tracking-wider">{t}</span>)}
                  </div>
                  <span className="font-label text-[8px] text-[#9A86C2]">{fullscreenIdx + 1} / {PORTFOLIO_DATA.projects.length}</span>
                </div>
              </div>
              <div className="p-6 flex items-start justify-between gap-6">
                <div>
                  <div className="font-label text-[9px] text-[#FF2AB8] tracking-[0.15em] uppercase mb-2">03 · projects / {p.slug}</div>
                  <h3 className="font-display text-[clamp(18px,3vw,28px)] text-[#F2F0FF] uppercase mb-3">{p.title}</h3>
                  <p className="font-mono text-[16px] text-[#F2F0FF]/90 max-w-[560px] leading-relaxed">{p.blurb}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <div className="flex gap-2">
                    <button
                      className="font-label text-[8px] text-[#9A86C2] border border-[#26262c] px-3 py-1.5 hover:border-[#FF2AB8] hover:text-[#FF2AB8] transition-colors"
                      onClick={() => setFullscreenIdx(Math.max(0, fullscreenIdx - 1))}
                      disabled={fullscreenIdx === 0}
                    >← prev</button>
                    <button
                      className="font-label text-[8px] text-[#9A86C2] border border-[#26262c] px-3 py-1.5 hover:border-[#FF2AB8] hover:text-[#FF2AB8] transition-colors"
                      onClick={() => setFullscreenIdx(Math.min(PORTFOLIO_DATA.projects.length - 1, fullscreenIdx + 1))}
                      disabled={fullscreenIdx === PORTFOLIO_DATA.projects.length - 1}
                    >next →</button>
                  </div>
                  <a href={`/projects/${p.slug}`} className="font-label text-[8px] bg-[#FF2AB8] text-[#07060E] border border-[#FF2AB8] px-3 py-1.5 text-center hover:bg-transparent hover:text-[#FF2AB8] transition-colors">→ case study</a>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
