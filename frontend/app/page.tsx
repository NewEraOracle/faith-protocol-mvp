import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <img
        src="/faith/landing-hero.png"
        alt="FAITH Protocol"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/10" />

      <nav className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-[8%] py-6">
        <div className="text-2xl font-black tracking-tight text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.6)]">
          Faith
        </div>

        <div className="hidden gap-10 text-xs font-bold uppercase tracking-[0.22em] text-slate-200 md:flex">
          <span>Protocol</span>
          <span>tfUSD</span>
          <span>Developers</span>
          <span>Docs</span>
          <span>Governance</span>
          <span>About</span>
        </div>

        <Link
          href="/dashboard"
          className="border border-cyan-100/60 bg-black/30 px-6 py-3 text-xs font-black uppercase tracking-[0.22em] text-white shadow-[0_0_28px_rgba(125,211,252,0.35)] backdrop-blur-md transition hover:bg-cyan-100 hover:text-black"
        >
          Enter Dashboard
        </Link>
      </nav>

      <Link
        href="/dashboard"
        aria-label="Enter Dashboard"
        className="absolute left-1/2 top-[45%] z-20 h-16 w-[280px] -translate-x-1/2 rounded-xl border border-cyan-100/20 bg-cyan-100/0 transition hover:bg-cyan-100/10"
      />

      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-cyan-100/70">
        MegaETH-Native Real-Time Credit Infrastructure
      </div>
    </main>
  );
}
