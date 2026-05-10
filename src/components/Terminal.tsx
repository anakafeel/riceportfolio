"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { PORTFOLIO_DATA } from "@/lib/data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BANNER = [
  "  ███████╗  █████╗  ██╗ ███╗   ███╗",
  "  ██╔════╝ ██╔══██╗ ██║ ████╗ ████║",
  "  ███████╗ ███████║ ██║ ██╔████╔██║",
  "  ╚════██║ ██╔══██║ ██║ ██║╚██╔╝██║",
  "  ███████║ ██║  ██║ ██║ ██║ ╚═╝ ██║",
  "  ╚══════╝ ╚═╝  ╚═╝ ╚═╝ ╚═╝     ╚═╝",
].join("\n");

const ALL_COMMANDS = ["help", "ls", "cat", "neofetch", "reveal", "contact", "blog", "projects", "about", "rice", "clear", "whoami"];

const SIZE_PRESETS = {
  compact: { w: 280, h: 180 },
  default: { w: 400, h: 280 },
  wide:    { w: 600, h: 360 },
};

const DOCK_POSITIONS = {
  tl: () => ({ x: 16, y: 50 }),
  tr: (w: number) => ({ x: typeof window !== 'undefined' ? window.innerWidth - w - 16 : 0, y: 50 }),
  bl: (w: number, h: number) => ({ x: 16, y: typeof window !== 'undefined' ? window.innerHeight - h - 50 : 0 }),
  br: (w: number, h: number) => ({ x: typeof window !== 'undefined' ? window.innerWidth - w - 16 : 0, y: typeof window !== 'undefined' ? window.innerHeight - h - 50 : 0 }),
};

function useUptime(start: number) {
  const [uptime, setUptime] = useState("");
  useEffect(() => {
    const calc = () => {
      const ms = Date.now() - start;
      const h = Math.floor(ms / 3600000);
      const m = Math.floor((ms % 3600000) / 60000);
      setUptime(`${h}h ${m}m`);
    };
    calc();
    const id = setInterval(calc, 30000);
    return () => clearInterval(id);
  }, [start]);
  return uptime;
}

interface TerminalProps {
  floating: boolean;
  closed: boolean;
  setClosed: (v: boolean) => void;
  onReveal: () => void;
  onOpenColumn: (colId: string) => void;
}

export default function Terminal({ floating, onReveal, onOpenColumn, closed, setClosed }: TerminalProps) {
  const D = PORTFOLIO_DATA;
  const uptime = useUptime(D.user.uptimeStart);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const termRef = useRef<HTMLDivElement>(null);

  const [history, setHistory] = useState<{ type: string; text?: string; lines?: [string, string][] }[]>([{ type: "welcome" }]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  // Persisted state
  const [size, setSize] = useState(SIZE_PRESETS.default);
  const [dock, setDock] = useState("tr");
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [activePreset, setActivePreset] = useState<string | null>("default");
  const [showDockZones, setShowDockZones] = useState(false);
  const [hotZone, setHotZone] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem("sr:term");
    if (raw) {
      try {
        const persisted = JSON.parse(raw);
        setSize(persisted.size || SIZE_PRESETS.default);
        setDock(persisted.dock || "tr");
        setPos(persisted.pos || DOCK_POSITIONS.tr(SIZE_PRESETS.default.w));
        setActivePreset(persisted.preset || "default");
      } catch {}
    } else {
      setPos(DOCK_POSITIONS.tr(SIZE_PRESETS.default.w));
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem("sr:term", JSON.stringify({ size, dock, pos, preset: activePreset }));
  }, [size, dock, pos, activePreset]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSize({ w: window.innerWidth - 32, h: 220 });
        setPos({ x: 16, y: 50 });
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  useEffect(() => {
    if (closed) return;
    inputRef.current?.focus();
  }, [closed]);

  const push = (...items: { type: string; text?: string; lines?: [string, string][] }[]) => setHistory((h) => [...h, ...items]);

  const goTo = (col: string) => {
    push({ type: "text", lines: [["text-[#FF2AB8]", `→ scrolling to ${col}`]] });
    setTimeout(() => onOpenColumn(col), 200);
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    push({ type: "cmd", text: raw });
    if (!cmd) return;
    setCmdHistory((ch) => [...ch, cmd]);
    setHistIdx(-1);

    const [name, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ");

    switch (name) {
      case "help":
        push({ type: "text", lines: [
          ["text-[#FF2AB8] font-bold", "available commands"],
          ["", "  ls [dir]             list contents"],
          ["", "  cat <file>           read a file"],
          ["", "  neofetch             system summary"],
          ["", "  reveal               open the workspace strip"],
          ["", "  about|projects|blog|rice|contact  jump to column"],
          ["", "  clear                clear the buffer"],
          ["text-[#9A86C2]", "  ─ tip: ↑/↓ history · tab complete · ? keybinds"],
        ] });
        break;
      case "ls": {
        const dir = arg || ".";
        if (!dir || dir === "." || dir === "~") {
          push({ type: "text", lines: [["", "about.md    projects/    blog/    rice.md    contact"]] });
        } else if (dir.startsWith("projects")) {
          push({ type: "text", lines: [["", D.projects.map((p) => p.slug + ".md").join("    ")]] });
        } else if (dir.startsWith("blog")) {
          push({ type: "text", lines: [["", D.blog.map((b) => b.date).join("\n")]] });
        } else push({ type: "text", lines: [["text-[#ff5f6e]", `ls: cannot access '${dir}'`]] });
        break;
      }
      case "cat": {
        if (!arg) { push({ type: "text", lines: [["text-[#ff5f6e]", "cat: missing file operand"]] }); break; }
        if (arg === "about.md") {
          push({ type: "text", lines: [
            ["text-[#FF2AB8] font-bold", "# about"],
            ["", D.user.bio], ["", ""],
            ...D.about.flatMap((a) => [["text-[#9A86C2]", `## ${a.h}`], ["", a.p], ["", ""]] as [string, string][]),
          ] });
        } else if (arg === "rice.md" || arg === "uses.md") {
          push({ type: "text", lines: [
            ["text-[#FF2AB8] font-bold", "# rice"],
            ...D.uses.flatMap((u) => [
              ["text-[#9A86C2]", `[${u.h}]`],
              ...u.items.map(([k, v]) => ["", `  ${k.padEnd(10)} ${v}`] as [string, string]),
              ["", ""],
            ] as [string, string][]),
          ] });
        } else {
          const slug = arg.replace("projects/", "").replace(".md", "");
          const p = D.projects.find((p) => p.slug === slug);
          if (p) {
            push({ type: "text", lines: [
              ["text-[#FF2AB8] font-bold", `# ${p.title}`],
              ["text-[#9A86C2]", `tags: ${p.tags.join(", ")}`], ["", ""],
              ["", p.blurb],
            ] });
          } else push({ type: "text", lines: [["text-[#ff5f6e]", `cat: ${arg}: No such file`]] });
        }
        break;
      }
      case "neofetch": push({ type: "neofetch" }); break;
      case "reveal":
        push({ type: "text", lines: [["text-[#FF2AB8]", "→ transitioning to niri workspace strip…"]] });
        setTimeout(onReveal, 320);
        break;
      case "about": goTo("about"); break;
      case "projects": goTo("projects"); break;
      case "blog": goTo("blog"); break;
      case "rice":
      case "uses": goTo("rice"); break;
      case "contact": goTo("contact"); break;
      case "home": goTo("home"); break;
      case "clear": setHistory([]); break;
      case "whoami": push({ type: "text", lines: [["", D.user.handle]] }); break;
      case "exit":
      case "quit": setClosed(true); break;
      default:
        push({ type: "text", lines: [["text-[#ff5f6e]", `${name}: command not found. try 'help'`]] });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { run(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const idx = histIdx === -1 ? cmdHistory.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx); setInput(cmdHistory[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= cmdHistory.length) { setHistIdx(-1); setInput(""); }
      else { setHistIdx(idx); setInput(cmdHistory[idx]); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/);
      if (parts.length === 1) {
        const match = ALL_COMMANDS.find((c) => c.startsWith(parts[0]));
        if (match) setInput(match + " ");
      } else if (parts[0] === "cat") {
        const options = ["about.md", "rice.md", ...D.projects.map((p) => "projects/" + p.slug + ".md")];
        const match = options.find((o) => o.startsWith(parts[1]));
        if (match) setInput("cat " + match);
      }
    } else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); setHistory([]); }
  };

  const suggestions = useMemo(() => {
    const t = input.trim();
    if (!t) return ALL_COMMANDS.slice(0, 7);
    const parts = t.split(/\s+/);
    if (parts.length === 1) {
      return ALL_COMMANDS.filter((c) => c.startsWith(parts[0])).slice(0, 8);
    }
    if (parts[0] === "cat") {
      const opts = ["about.md", "rice.md", ...D.projects.map((p) => "projects/" + p.slug + ".md")];
      return opts.filter((o) => o.startsWith(parts[1] || "")).slice(0, 6);
    }
    if (parts[0] === "ls") return ["projects/", "blog/", "."].filter(x => x.startsWith(parts[1] || ""));
    return [];
  }, [input, D]);

  const applyChip = (text: string) => {
    const parts = input.trim().split(/\s+/);
    if (parts.length <= 1) setInput(text);
    else { parts[parts.length - 1] = text; setInput(parts.join(" ")); }
    inputRef.current?.focus();
  };

  const currentWord = input.trim().split(/\s+/).pop() || "";

  if (closed) return null;

  return (
    <>
      <div className={cn("fixed inset-0 z-40 pointer-events-none hidden", showDockZones && "block")}>
        <div className={cn("absolute top-10 left-0 w-1/2 h-[calc(50vh-20px)] border-dashed border-[var(--accent-primary)] flex items-center justify-center text-[var(--accent-primary)] bg-[var(--accent-primary)]/5", hotZone === "tl" && "bg-[var(--accent-primary)]/20 border-solid")}>TOP-LEFT</div>
        <div className={cn("absolute top-10 right-0 w-1/2 h-[calc(50vh-20px)] border-dashed border-[var(--accent-primary)] flex items-center justify-center text-[var(--accent-primary)] bg-[var(--accent-primary)]/5", hotZone === "tr" && "bg-[var(--accent-primary)]/20 border-solid")}>TOP-RIGHT</div>
        <div className={cn("absolute bottom-0 left-0 w-1/2 h-1/2 border-dashed border-[var(--accent-primary)] flex items-center justify-center text-[var(--accent-primary)] bg-[var(--accent-primary)]/5", hotZone === "bl" && "bg-[var(--accent-primary)]/20 border-solid")}>BOTTOM-LEFT</div>
        <div className={cn("absolute bottom-0 right-0 w-1/2 h-1/2 border-dashed border-[var(--accent-primary)] flex items-center justify-center text-[var(--accent-primary)] bg-[var(--accent-primary)]/5", hotZone === "br" && "bg-[var(--accent-primary)]/20 border-solid")}>BOTTOM-RIGHT</div>
      </div>

      <div
        ref={termRef}
        className={cn(
          "fixed flex flex-col z-50 transition-all shadow-[0_24px_80px_rgba(0,0,0,0.6)]",
          "bg-[#110F1F]/95 backdrop-blur-[10px] border border-[#FF2AB8] shadow-[0_0_20px_rgba(255,42,184,0.15)]",
          "max-md:hidden",
          floating ? "rounded-none" : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(880px,88vw)] h-[min(640px,80vh)] z-[100]"
        )}
        style={floating ? { top: pos.y, left: pos.x, width: size.w, height: size.h } : {}}
      >
        <div className="bg-[#07060E] border-b border-[#26262c] p-2 flex items-center gap-2 cursor-grab active:cursor-grabbing select-none relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: 'repeating-linear-gradient(45deg, #FF2AB8 0 4px, transparent 4px 8px)'}} />
          <div className="flex gap-2 relative z-10 items-center">
            <span
              className="w-4 h-4 rounded-full bg-[#FF5F57] cursor-pointer shadow-[0_0_8px_rgba(255,95,87,0.7)] hover:brightness-110 active:brightness-75 transition-all"
              title="close"
              onClick={() => setClosed(true)}
            />
            <span
              className="w-4 h-4 rounded-full bg-[#FEBC2E] shadow-[0_0_6px_rgba(254,188,46,0.5)] cursor-default"
              title="minimize"
            />
            <span
              className="w-4 h-4 rounded-full bg-[#28C840] shadow-[0_0_6px_rgba(40,200,64,0.5)] cursor-default"
              title="maximize"
            />
          </div>
          <div className="flex-1 text-center font-label text-[8px] text-[#9A86C2] tracking-[0.15em] uppercase relative z-10">
            {D.user.handle}@{D.user.host} — alacritty
          </div>
          <div className="border border-[#FF2AB8] text-[#FF2AB8] px-1.5 py-0.5 text-[7.5px] uppercase tracking-wider bg-[#FF2AB8]/5 relative z-10 shadow-[0_0_10px_rgba(255,42,184,0.2)]">newport</div>
          {floating && (
            <div className="flex gap-1 ml-auto">
              {Object.keys(SIZE_PRESETS).map((p) => (
                <button
                  key={p}
                  className={cn("border border-[#9A86C2] text-[#9A86C2] px-1.5 py-0.5 text-[7px] transition-colors", activePreset === p && "bg-[#FF2AB8] text-[#07060E] border-[#FF2AB8]")}
                  onClick={() => {
                    const sz = SIZE_PRESETS[p as keyof typeof SIZE_PRESETS];
                    setSize(sz);
                    setActivePreset(p);
                  }}
                >
                  {p[0].toUpperCase()}
                </button>
              ))}
              <button className="w-[18px] h-[18px] border border-[#9A86C2] text-[#9A86C2] text-[8px] flex items-center justify-center" onClick={() => setClosed(true)}>×</button>
            </div>
          )}
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden font-mono text-[17px] text-[#d8d8dd] scrollbar-hide" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
          {history.map((item, idx) => {
            if (item.type === "welcome" || item.type === "neofetch") {
              return (
                <div key={idx} className="mb-4 overflow-x-hidden">
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <pre className="text-[#FF2AB8] text-[10px] sm:text-[13px] leading-none mb-4 whitespace-pre sm:whitespace-pre">{BANNER}</pre>
                    <div className="text-[14px] sm:text-[16px] leading-relaxed min-w-0">
                      <div className="text-[#FF2AB8] font-bold truncate">{D.user.handle}@{D.user.host}</div>
                      <div>─────────────────────────────</div>
                      <div><span className="text-[#9A86C2] inline-block w-[70px] sm:w-[90px]">OS</span> Fedora 42</div>
                      <div><span className="text-[#9A86C2] inline-block w-[70px] sm:w-[90px]">Kernel</span> 6.13.8</div>
                      <div><span className="text-[#9A86C2] inline-block w-[70px] sm:w-[90px]">WM</span> Niri 0.1.10</div>
                      <div><span className="text-[#9A86C2] inline-block w-[70px] sm:w-[90px]">Uptime</span> {uptime}</div>
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {[0,1,2,3,4,5,6,7].map(i => <span key={i} className="w-3 sm:w-4 h-2 sm:h-3 bg-[#9A86C2]" style={{ opacity: 0.3 + i * 0.1 }} />)}
                      </div>
                    </div>
                  </div>
                  {item.type === "welcome" && (
                    <div className="mt-4 text-[#9A86C2] text-[14px] sm:text-[16px]">
                      welcome to the <span className="text-[#FF2AB8]">newport</span> shell.
                      <div className="mt-1">
                        type <span className="text-[#FF2AB8]">help</span>, hit <kbd className="bg-[#07060E] border border-[#FF2AB8] text-[#FF2AB8] px-1.5 py-0.5 rounded-none text-[8px]">Ctrl</kbd>+<kbd className="bg-[#07060E] border border-[#FF2AB8] text-[#FF2AB8] px-1.5 py-0.5 rounded-none text-[8px]">`</kbd>, or <kbd className="bg-[#07060E] border border-[#FF2AB8] text-[#FF2AB8] px-1.5 py-0.5 rounded-none text-[8px]">?</kbd> for keybinds.
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            if (item.type === "cmd") return <div key={idx} className="text-[#F2F0FF] mb-1 break-all"><span className="text-[#FF2AB8]">λ </span>{item.text}</div>;
            if (item.type === "text" && item.lines) {
              return (
                <div key={idx} className="mb-2 text-[14px] sm:text-[17px]">
                  {item.lines.map((l, i) => <div key={i} className={cn(l[0].replace('text-[#FF2AB8]', 'text-[#FF2AB8]').replace('text-[#9A86C2]', 'text-[#9A86C2]'), "break-words")}>{l[1]}</div>)}
                </div>
              );
            }
            return null;
          })}
          
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-[#FF2AB8] shrink-0">{D.user.handle}</span>
            <span className="text-[#5e5e68] shrink-0">@</span>
            <span className="text-[#9A86C2] shrink-0">{D.user.host}</span>
            <span className="text-[#9A86C2] shrink-0"> ~</span>
            <span className="text-[#FF2AB8] shrink-0"> λ </span>
            <input
              ref={inputRef}
              className="bg-transparent border-none outline-none text-[#F2F0FF] flex-1 min-w-0 caret-[#FF2AB8] text-[14px] sm:text-[17px]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>

        {suggestions.length > 0 && (
          <div className="border-t border-dashed border-[#26262c] bg-[#07060E] p-2 px-4 flex flex-wrap gap-1.5 items-center">
            {suggestions.map((s) => (
              <span
                key={s}
                className={cn(
                  "font-label text-[7.5px] px-2 py-0.5 border border-[#9A86C2] text-[#9A86C2] cursor-pointer transition-colors hover:bg-[#9A86C2] hover:text-[#07060E]",
                  currentWord && s.startsWith(currentWord) && "border-[#FF2AB8] text-[#FF2AB8]"
                )}
                onClick={() => applyChip(s)}
              >
                {s}
              </span>
            ))}
            <span className="ml-auto font-label text-[7px] text-[#9A86C2] opacity-50">tab ⇥</span>
          </div>
        )}
      </div>
    </>
  );
}
