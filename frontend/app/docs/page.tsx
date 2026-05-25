import Link from "next/link";

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white lg:px-10">
      <Link href="/" className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
        Back to FAITH
      </Link>

      <section className="mx-auto mt-12 max-w-5xl">
        <p className="text-sm font-black uppercase tracking-[0.38em] text-cyan-300">
          Public Docs v0.1
        </p>

        <h1 className="mt-5 text-5xl font-black uppercase tracking-[0.12em] text-white">
          FAITH Public Whitepaper
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-400">
          This public documentation explains FAITH Protocol's vision, architecture, and
          economic thesis. Proprietary PCS scoring models, treasury parameters, advanced
          risk thresholds, and private economic strategy are intentionally excluded from
          this public version.
        </p>

        <div className="mt-10 space-y-5">
          <div className="faith-card p-6">
            <h2 className="text-2xl font-black uppercase tracking-[0.16em] text-white">
              Core Positioning
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              FAITH is building a growing and flourishing machine-regulated economy,
              not through speculation, but through productive value, programmable credit,
              treasury resilience, PCS risk regulation, and real utility.
            </p>
          </div>

          <div className="faith-card p-6">
            <h2 className="text-2xl font-black uppercase tracking-[0.16em] text-white">
              Economic Flywheel
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              Vaults create credit. Credit creates activity. Activity strengthens the
              treasury. Treasury protects the system. PCS regulates risk. Stronger
              infrastructure attracts more usage. The economy grows.
            </p>
          </div>

          <div className="faith-card p-6">
            <h2 className="text-2xl font-black uppercase tracking-[0.16em] text-white">
              Public Safety Boundary
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              Public docs explain the system, not the private engine. Exact PCS formulas,
              treasury defense thresholds, advanced liquidation parameters, and private
              strategy are intentionally kept outside this public version.
            </p>
          </div>

          <div className="faith-card p-6">
            <h2 className="text-2xl font-black uppercase tracking-[0.16em] text-white">
              Core Line
            </h2>
            <p className="mt-5 text-xl font-black leading-8 text-white">
              Humans build. PCS regulates. Treasury protects. MegaETH executes. The economy grows.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
