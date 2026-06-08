import Link from "next/link";

const buildPaths = [
  {
    title: "Build with the Economic Engine",
    text: "Create applications around FXMP growth exposure, FUSD credit activity, FXTC treasury capital, PCS risk monitoring, and MegaETH real-time execution.",
  },
  {
    title: "Integrate FUSD Credit",
    text: "Explore future integrations for borrowing, repayments, liquidity routing, productive credit, and programmable economic activity.",
  },
  {
    title: "Connect to PCS Risk Signals",
    text: "Build tools that respond to protocol health, collateral stress, treasury coverage, utilization, and risk state changes.",
  },
  {
    title: "Treasury-Aligned Applications",
    text: "Design long-term applications that support treasury resilience, economic discipline, and sustainable protocol growth.",
  },
];

const opportunities = [
  "MegaETH ecosystem builders",
  "RWA and productive infrastructure projects",
  "DeFi credit and liquidity developers",
  "Treasury and risk analytics teams",
  "Earn and yield strategists",
  "AI agents and automation builders",
  "Strategic protocol partners",
];

export default function BuildPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <img
        src="/faith/design/background-cosmic.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="mb-8 flex items-center justify-between gap-6">
          <Link
            href="/"
            className="inline-flex rounded-full border border-cyan-300/25 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300 backdrop-blur-md transition hover:border-cyan-300/70 hover:bg-cyan-300/10 hover:text-white"
          >
            Back to Faith
          </Link>
          <Link href="/dashboard" className="faith-button px-6 py-3 text-[11px]">
            Enter Dashboard
          </Link>
        </div>

        <section className="faith-card p-8 lg:p-10">
          <p className="text-[11px] font-black uppercase tracking-[0.42em] text-cyan-300">
            Build
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-black uppercase tracking-[0.12em] text-white md:text-6xl">
            Build on Faith Monetary Protocol
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300">
            Faith Monetary Protocol is opening a builder pathway for teams creating around programmable credit,
            treasury resilience, PCS risk regulation, and MegaETH-native real-time financial infrastructure.
          </p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {buildPaths.map((item) => (
            <div key={item.title} className="faith-card p-6">
              <h2 className="text-xl font-black uppercase tracking-[0.12em] text-white">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                {item.text}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="faith-card p-6 lg:p-8">
            <p className="text-[11px] font-black uppercase tracking-[0.34em] text-cyan-300">
              Submit Application
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase tracking-[0.12em] text-white">
              Apply to Build, Integrate, or Partner
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              Submit an application if you are building a product, integration, infrastructure layer,
              analytics system, RWA pathway, AI agent, or strategic partnership around the Faith Monetary Protocol economy.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:contact@faithdefi.com?subject=Faith%20Monetary%20Protocol%20Build%20Application"
                className="faith-button px-7 py-4 text-[11px]"
              >
                Submit Application
              </a>
              <Link href="/docs" className="faith-button px-7 py-4 text-[11px]">
                Read Docs
              </Link>
            </div>
          </div>

          <div className="faith-card p-6 lg:p-8">
            <p className="text-[11px] font-black uppercase tracking-[0.34em] text-cyan-300">
              Who Should Apply
            </p>
            <div className="mt-5 grid gap-3">
              {opportunities.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}








