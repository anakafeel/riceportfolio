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
    <header className="sticky top-0 z-40 flex items-center gap-[18px] p-[12px_28px] bg-[#07060E]/78 backdrop-blur-[14px] border-b border-[#26262c] font-mono text-[12px] text-[#9A86C2]">
      <Link href="/" className="flex gap-2 items-center p-[6px_12px] border border-[#26262c] text-[#F2F0FF] transition-all hover:text-[#FF2AB8] hover:border-[#FF2AB8]">
        <span className="text-[#FF2AB8]">←</span>
        <span>{category}</span>
      </Link>
      <div className="flex gap-2 text-[#5e5e68] flex-1">
        <span>saim@niriarch</span>
        <span className="text-[#26262c]">:</span>
        <span>{path}</span>
        <span className="text-[#26262c]">/</span>
        <span className="text-[#FF2AB8]">{title}</span>
      </div>
      <div className="flex gap-2 items-center text-[#9A86C2]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF2AB8] shadow-[0_0_10px_#FF2AB8]" />
        {status || "reading"}
      </div>
    </header>
  );
}
