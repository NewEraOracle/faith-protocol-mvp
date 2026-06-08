"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Docs", href: "/docs" },
  { label: "Litepaper", href: "/litepaper" },
  { label: "Security", href: "/security" },
  { label: "Investors", href: "/investors" },
  { label: "Whitelist", href: "/whitelist" },
  { label: "Dashboard", href: "/dashboard" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed inset-x-3 top-3 z-[100] md:hidden">
      <div className="rounded-2xl border border-cyan-300/25 bg-black/80 px-3 py-3 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200"
            onClick={() => setOpen(false)}
          >
            FAITH
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
              aria-expanded={open}
              aria-label="Open mobile menu"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {open ? (
          <div className="mt-3 grid gap-2 rounded-2xl border border-white/10 bg-black/70 p-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/50 hover:text-cyan-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

