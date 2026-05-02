"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface BootSequenceProps {
  onDone: () => void;
}

const BOOT_LINES = [
  { t: 0,   tag: "ok",      msg: "started Load Kernel Modules." },
  { t: 50,  tag: "ok",      msg: "started udev Coldplug all Devices." },
  { t: 100, tag: "ok",      msg: "reached target Local File Systems." },
  { t: 150, tag: "ok",      msg: "reached target System Initialization." },
  { t: 200, tag: "kernel",  msg: "Linux version 6.13.8-300.fc42.x86_64 (gcc 14.2.1)" },
  { t: 250, tag: "systemd", msg: "systemd 255.4-1.fc42 running in system mode (+PAM)" },
  { t: 300, tag: "ok",      msg: "started Accounts Service." },
  { t: 350, tag: "niri",    msg: "niri 0.1.10: starting Wayland compositor on :wayland-0" },
  { t: 400, tag: "ok",      msg: "reached target graphical.target" },
  { t: 450, tag: "user",    msg: "session 2 of user saim opened (seat0)" },
  { t: 500, tag: "matugen", msg: "theme pipeline: extracted 8 colors from wallpaper" },
  { t: 550, tag: "waybar",  msg: "dank-shell bar started on output HDMI-A-1" },
  { t: 600, tag: "ok",      msg: "alacritty: terminal initialized with JetBrains Mono 13" },
];

export default function BootSequence({ onDone }: BootSequenceProps) {
  const [lines, setLines] = useState<typeof BOOT_LINES>([]);
  const [complete, setComplete] = useState(false);
  const doneRef = useRef(false);

  const displayLines = typeof window !== 'undefined' && window.innerWidth < 768 
    ? BOOT_LINES.filter((_, i) => i % 2 === 0) 
    : BOOT_LINES;

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLines(displayLines);
    setComplete(true);
    setTimeout(onDone, 280);
  }, [onDone, displayLines]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const isMobile = window.innerWidth < 768;
    const speedMult = isMobile ? 1.3 : 1;

    displayLines.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setLines((prev) => [...prev, line]);
        if (i === displayLines.length - 1) {
          setComplete(true);
          timers.push(setTimeout(() => {
            if (!doneRef.current) { doneRef.current = true; onDone(); }
          }, 700));
        }
      }, line.t * speedMult));
    });
    return () => timers.forEach(clearTimeout);
  }, [onDone, displayLines]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        finish();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finish]);

  return (
    <div
      className="fixed inset-0 z-[999] bg-[#000] p-10 md:p-12 font-mono text-[18px] overflow-y-auto cursor-pointer"
      onClick={finish}
    >
      <div className="grid grid-cols-[max-content_max-content_1fr] gap-x-3.5 gap-y-0.5">
        {lines.map((line, i) => (
          <React.Fragment key={i}>
            <span className="text-[#5e5e68]">[ {((i + 1) * 0.03).toFixed(6)} ]</span>
            <span className={`uppercase ${
              line.tag === "ok"      ? "text-[#27c93f]" :
              line.tag === "kernel" || line.tag === "systemd" ? "text-[#FF2AB8]" :
              "text-[#9a9aa3]"
            }`}>{line.tag}</span>
            <span className="text-[#F2F0FF]">{line.msg}</span>
          </React.Fragment>
        ))}
      </div>
      {!complete && lines.length > 0 && (
        <div className="mt-6 text-[#5e5e68] text-[9px] uppercase tracking-[0.1em]">
          press <span className="text-[#9a86c2]">Esc</span> · <span className="text-[#9a86c2]">Enter</span> · or click to skip
        </div>
      )}
      {complete && (
        <div className="mt-10 pt-4 border-t border-dashed border-[#26262c] text-[#9a86c2] text-[9px] uppercase tracking-[0.12em]">
          login: <span className="text-[#FF2AB8]">saim</span> — booting workspace...
        </div>
      )}
    </div>
  );
}
