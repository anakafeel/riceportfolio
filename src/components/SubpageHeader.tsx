"use client";

import Link from "next/link";
import { PORTFOLIO_DATA } from "@/lib/data";

interface SubpageHeaderProps {
  title: string;
  category: string;
  path: string;
  status?: string;
}

export default function SubpageHeader({ title, category, path, status }: SubpageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center gap-[18px] p-[12px_28px] bg-[var(--bg)]/78 backdrop-blur-[14px] border-b border-[var(--border)] font-mono text-[12px] text-[var(--text-secondary)]">
      <Link href="/" className="flex gap-2 items-center p-[6px_12px] border border-[var(--border)] text-[var(--text-primary)] transition-all hover:text-[#FF2AB8] hover:border-[#FF2AB8]">
        <span className="text-[#FF2AB8]">←</span>
        <span>{category}</span>
      </Link>
      <div className="flex gap-2 text-[var(--text-secondary)] opacity-60 flex-1">
        <span>saim@niriarch</span>
        <span className="text-[var(--border)]">:</span>
        <span>{path}</span>
        <span className="text-[var(--border)]">/</span>
        <span className="text-[#FF2AB8]">{title}</span>
      </div>
      <div className="flex gap-2 items-center text-[var(--text-secondary)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF2AB8] shadow-[0_0_10px_#FF2AB8]" />
        {status || "reading"}
      </div>
    </header>
  );
}
