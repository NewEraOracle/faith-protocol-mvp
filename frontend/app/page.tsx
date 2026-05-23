"use client";

import Link from "next/link";

const modules = [
  {
    title: "VAULTS",
    body: "Overcollateralized on-chain vaults for sustainable credit minting.",
    icon: "?",
  },
  {
    title: "PCS",
    body: "Protocol Control System governing risk, issuance, and system parameters.",
    icon: "?",
  },
  {
    title: "TREASURY",
    body: "Protocol-owned liquidity and reserves aligned for long-term solvency.",
    icon: "?",
  },
  {
    title: "tfUSD ACTIVATION",
    body: "Activate tfUSD for payments, trading, and composable real-time applications.",
    icon: "?",
  },
];

const loop = [
  ["COLLATERAL", "DEPOSITED", "?"],
  ["CREDIT", "MINTED", "?"],
  ["PCS", "MONITOR", "?"],
  ["tfUSD", "ACTIVATED", "?"],
  ["REAL-TIME", "UTILIZATION", "?"],
];

const stats = [
  ["TOTAL VALUE LOCKED", "$128.7M", "+12.3% 24H"],
  ["tfUSD SUPPLY", "$84.2M", "+9.7% 24H"],
  ["ACTIVE VAULTS", "2,431", "+8.1% 24H"],
  ["COLLATERAL RATIO", "176%", "HEALTHY"],
  ["PROTOCOL REVENUE", "$312.9K", "+15.4% 24H"],
  ["MEGAETH BLOCK TIME", "<10MS", "REAL-TIME"],
];

export default function Home() {
  return (
    <main className="faith-shell relative min-h-screen overflow-hidden text-white">
      <div className="faith-stars pointer-events-none fixed inset-0 opacity-30" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.2)_44%,rgba(0,0,0,.86)_100%)]" />

      <div className="relative mx-auto max-w-[1760px] px-4 py-4">
        <div className="faith-panel relative min-h-[calc(100vh-32px)] overflow-hidden rounded-[1.6rem]">
          <div className="pointer-events-none absolute left-1/2 top-24 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-14 h-px w-[70%] -translate-x-1/2 faith-divider" />

          <nav className="relative z-20 flex items-center justify-between border-b border-white/10 px-7 py-5">
            <div className="faith-gothic faith-chrome-text text-4xl font-black">
              Faith
            </div>

            <div className="hidden items-center gap-10 text-[11px] font-black uppercase tracking-[0.28em] text-slate-300 lg:flex">
              <a href="#protocol" className="hover:text-cyan-100">Protocol</a>
              <a href="#usdm" className="hover:text-cyan-100">tfUSD</a>
              <a href="#developers" className="hover:text-cyan-100">Developers</a>
              <a href="#docs" className="hover:text-cyan-100">Docs</a>
              <a href="#governance" className="hover:text-cyan-100">Governance</a>
              <a href="#about" className="hover:text-cyan-100">About</a>
            </div>

            <Link
              href="/dashboard"
              className="faith-button px-6 py-3 text-[11px] font-black uppercase tracking-[0.22em] transition"
            >
              Enter Dashboard ?
            </Link>
          </nav>

          <section className="relative z-10 px-5 pb-5 pt-10 text-center md:px-10">
            <div className="mx-auto mb-2 grid h-28 w-28 place-items-center rounded-full border border-cyan-100/30 bg-black/40 shadow-[0_0_70px_rgba(125,211,252,.28)]">
              <div className="faith-orb faith-pulse grid h-20 w-20 place-items-center rounded-full border border-white/20 text-4xl">
                ?
              </div>
            </div>

            <div className="mx-auto max-w-4xl">
              <h1 className="faith-gothic faith-chrome-text text-[6.2rem] font-black leading-[0.72] md:text-[9rem] lg:text-[11.5rem]">
                Faith
              </h1>

              <p className="mt-1 text-sm font-black uppercase tracking-[0.62em] text-cyan-100 md:text-base">
                Autonomous Credit
              </p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.43em] text-slate-300 md:text-sm">
                For The Real-Time Internet
              </p>

              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-300">
                MegaETH-native autonomous credit infrastructure that activates tfUSD across
                vaults, PCS risk monitoring, treasury reserves, oracle shocks, and real-time settlement.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="#protocol"
                  className="faith-button px-8 py-4 text-[11px] font-black uppercase tracking-[0.28em] transition"
                >
                  Read The Protocol
                </a>
                <Link
                  href="/dashboard"
                  className="faith-button px-8 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-cyan-50 transition"
                >
                  Enter Dashboard ?
                </Link>
              </div>
            </div>
          </section>

          <section id="protocol" className="relative z-10 grid gap-4 px-6 pb-5 md:grid-cols-2 xl:grid-cols-4 lg:px-10">
            {modules.map((item) => (
              <article key={item.title} className="faith-panel group p-5 transition hover:border-cyan-100/50">
                <div className="flex items-center gap-5">
                  <div className="grid h-20 w-20 shrink-0 place-items-center border border-cyan-100/20 bg-black/45 text-4xl text-cyan-100 shadow-[0_0_30px_rgba(125,211,252,.16)]">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <h2 className="text-sm font-black uppercase tracking-[0.28em] text-white">{item.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{item.body}</p>
                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-200">Learn More ?</p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="relative z-10 mx-6 mb-5 grid gap-5 lg:mx-10 lg:grid-cols-[1.35fr_.9fr]">
            <div className="faith-panel p-6" id="usdm">
              <p className="text-sm font-black uppercase tracking-[0.38em] text-slate-300">The Protocol Loop</p>

              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
                {loop.map(([top, bottom, icon], index) => (
                  <div key={top} className="relative text-center">
                    {index !== 0 && (
                      <div className="absolute -left-3 top-10 hidden h-px w-6 bg-cyan-100/40 md:block" />
                    )}
                    <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-cyan-100/25 bg-cyan-100/5 text-3xl text-cyan-100 shadow-[0_0_30px_rgba(125,211,252,.18)]">
                      {icon}
                    </div>
                    <p className="mt-3 text-[11px] font-black uppercase tracking-[0.2em] text-white">{top}</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{bottom}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="faith-panel p-6">
              <h2 className="text-3xl font-black uppercase leading-tight tracking-[0.16em] text-white">
                Credit That Moves At Internet Speed.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                FAITH is purpose-built for MegaETH: collateral in, credit out, PCS active,
                treasury aligned, liquidation visible, and settlement prepared for real-time utility.
              </p>
              <Link href="/dashboard" className="mt-5 inline-block text-[11px] font-black uppercase tracking-[0.28em] text-cyan-200">
                Explore The Loop ?
              </Link>
            </div>
          </section>

          <section className="relative z-10 mx-6 mb-5 grid border border-slate-300/20 bg-black/45 md:grid-cols-3 lg:mx-10 xl:grid-cols-6">
            {stats.map(([label, value, sub]) => (
              <div key={label} className="border-b border-r border-white/10 p-5 text-center xl:border-b-0">
                <p className="text-[9px] font-black uppercase tracking-[0.27em] text-slate-500">{label}</p>
                <p className="mt-3 text-2xl font-black tracking-[0.06em] text-white">{value}</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200">{sub}</p>
              </div>
            ))}
          </section>

          <section id="developers" className="relative z-10 mx-6 mb-8 faith-panel p-6 lg:mx-10">
            <div className="grid gap-6 lg:grid-cols-[.7fr_1fr_1fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.38em] text-slate-300">Token Identity</p>
              </div>

              <div className="flex items-center gap-5 border border-white/10 bg-white/[0.03] p-5">
                <div className="grid h-20 w-20 place-items-center rounded-full border border-cyan-100/30 bg-cyan-100/5 text-4xl shadow-[0_0_30px_rgba(125,211,252,.22)]">?</div>
                <div>
                  <h3 className="text-2xl font-black">FAITH</h3>
                  <p className="mt-1 text-sm text-slate-400">Protocol governance, collateral identity, and future coordination layer.</p>
                  <p className="mt-3 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-200">View Token ?</p>
                </div>
              </div>

              <div className="flex items-center gap-5 border border-white/10 bg-white/[0.03] p-5">
                <div className="grid h-20 w-20 place-items-center rounded-full border border-cyan-100/30 bg-cyan-100/5 text-xl font-black shadow-[0_0_30px_rgba(125,211,252,.22)]">tfUSD</div>
                <div>
                  <h3 className="text-2xl font-black">tfUSD</h3>
                  <p className="mt-1 text-sm text-slate-400">Autonomous credit asset minted by FAITH vaults on MegaETH testnet.</p>
                  <p className="mt-3 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-200">Learn More ?</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
