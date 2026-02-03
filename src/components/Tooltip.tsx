"use client";

import { useState } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  side?: "top" | "bottom";
}

export function Tooltip({ text, children, side = "top" }: TooltipProps) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex">
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="cursor-help rounded border border-dashed border-slate-400 px-1"
        tabIndex={0}
        role="tooltip"
        aria-label={text}
      >
        {children}
      </span>
      {show && (
        <span
          className={`absolute z-50 max-w-xs rounded bg-slate-800 px-2 py-1.5 text-sm text-white shadow-lg ${
            side === "top" ? "bottom-full left-1/2 -translate-x-1/2 mb-1" : "top-full left-1/2 -translate-x-1/2 mt-1"
          }`}
        >
          {text}
        </span>
      )}
    </span>
  );
}
