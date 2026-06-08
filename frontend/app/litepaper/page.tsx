import Link from "next/link";

const principles = [
  "Humans build productive value.",
  "PCS regulates protocol-level risk.",
  "Treasury protects long-term resilience.",
  "MegaETH executes real-time economic activity.",
];

const economyAssets = [
  {
    title: "FXMP",
    label: "Growth and Coordination",
    body:
      "FXMP is the public growth and coordination asset of the FAITH economy. It is designed around ecosystem exposure, participation, access, and future governance direction.",
  },
  {
    title: "FUSD",
    label: "Internal Credit Asset",
    body:
      "FUSD is the internal credit asset used for borrowing, repayments, vault activity, and productive on-chain economic movement inside the protocol.",
  },
  {
    title: "FXTC",
    label: "Treasury Capital Layer",
    body:
      "FXTC represents the treasury-aligned capital participation layer. It is designed for long-term protocol resilience and controlled capital participation, subject to legal and compliance review before any real deployment.",
  },
];

const roadmap = [
  "Testnet MVP: vaults, testnet credit, treasury visibility, oracle shock simulation, liquidation-risk visibility, and PCS monitoring.",
  "PCS Expansion: deeper risk scoring, stress timelines, action queues, treasury coverage monitoring, and emergency response visibility.",
  "Treasury Architecture: controlled reserve models, capital protection systems, class-based review concepts, and legal-safe documentation.",
  "Builder Ecosystem: developer modules, RWA pathways, treasury analytics, AI agents, yield strategists, and MegaETH-native applications.",
  "Production Readiness: audits, legal structuring, security reviews, partner due diligence, and controlled deployment pathways.",
];

export default function LitepaperPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <img
        src="/faith/design/background-cosmic.png"
        alt=""
        className="pointer-events-none fixed inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="pointer-events-none fixed inset-0 bg-black/70" />

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/docs"
            className="inline-flex rounded-full border border-cyan-300/25 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300 backdrop-blur-md transition hover:border-cyan-300/70 hover:bg-cyan-300/10 hover:text-white"
          >
            Back to Docs
          </Link>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/about"
              className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300 backdrop-blur-md transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-white"
            >
              Contact
            </Link>

            <Link href="/dashboard" className="faith-button px-6 py-3 text-[11px]">
              Dashboard
            </Link>
          </div>
        </div>

        <article className="mt-12 rounded-[2rem] border border-cyan-300/20 bg-black/55 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-cyan-300">
            FAITH Monetary Protocol
          </p>

          <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
            FAITH Litepaper
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300 md:text-lg">
            A public overview of FAITH Monetary Protocol, a human-built,
            PCS-regulated economic operating system for programmable credit,
            treasury resilience, MegaETH execution, and productive digital growth.
          </p>

          <div className="mt-8 rounded-2xl border border-yellow-300/20 bg-yellow-300/[0.08] p-5 text-sm font-semibold leading-7 text-yellow-100">
            Humans build. PCS regulates. Treasury protects. MegaETH executes. The economy grows.
          </div>
        </article>

        <article className="mt-8 rounded-3xl border border-white/10 bg-black/45 p-8 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Executive Summary
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-white">
            A capital operating system for disciplined economic growth.
          </h2>

          <p className="mt-5 text-sm leading-8 text-slate-300">
            FAITH Monetary Protocol is a MegaETH-native economic operating system that connects
            programmable credit, treasury resilience, and PCS risk regulation. The protocol separates
            growth, credit, and treasury capital into distinct economic roles through FXMP, FUSD,
            and FXTC.
          </p>

          <p className="mt-4 text-sm leading-8 text-slate-300">
            FAITH is not designed as a speculative lending application. It is designed as infrastructure
            for disciplined economic growth, where credit expansion is monitored by PCS and supported
            by treasury strength.
          </p>
        </article>

        <article className="mt-8 rounded-3xl border border-white/10 bg-black/45 p-8 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Vision
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-white">
            Building an economy that can grow without losing discipline.
          </h2>

          <p className="mt-5 text-sm leading-8 text-slate-300">
            Many digital economies grow quickly but become fragile because they depend too heavily on
            speculation, unstable liquidity, uncontrolled incentives, and governance decisions made
            without real-time risk intelligence.
          </p>

          <p className="mt-4 text-sm leading-8 text-slate-300">
            FAITH is designed to address this by connecting credit, treasury, and risk regulation
            into one coordinated protocol economy. The objective is not uncontrolled expansion. The
            objective is productive, treasury-aware, machine-regulated growth.
          </p>
        </article>

        <article className="mt-8 rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.05] p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            How the System Works
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-white">
            Productive value, credit, treasury, PCS, and execution.
          </h2>

          <p className="mt-5 text-sm leading-8 text-slate-300">
            FAITH is designed around a controlled economic loop. Productive value and collateral can
            support credit creation. FUSD circulates as the internal credit asset. Treasury strength
            supports system resilience. PCS monitors protocol conditions, identifies stress, and helps
            guide protocol-level risk responses. MegaETH provides the execution layer for fast state
            awareness and real-time protocol activity.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {principles.map((principle) => (
              <div
                key={principle}
                className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm font-semibold text-slate-200"
              >
                {principle}
              </div>
            ))}
          </div>
        </article>

        <article className="mt-8 rounded-3xl border border-white/10 bg-black/45 p-8 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Economic Model
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-white">
            Three assets. One PCS-regulated economy.
          </h2>

          <p className="mt-5 text-sm leading-8 text-slate-300">
            FAITH separates economic roles instead of forcing one token to do everything. This gives
            the protocol a clearer structure for growth, credit activity, treasury alignment, and
            long-term participation.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {economyAssets.map((asset) => (
              <div
                key={asset.title}
                className="rounded-2xl border border-white/10 bg-black/45 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  {asset.label}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{asset.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{asset.body}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="mt-8 rounded-3xl border border-white/10 bg-black/45 p-8 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            PCS Risk Regulation
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-white">
            The protocol risk brain.
          </h2>

          <p className="mt-5 text-sm leading-8 text-slate-300">
            PCS, the Protocol Control System, observes protocol state, vault health, credit utilization,
            treasury coverage, collateral stress, liquidation pressure, reserve strength, and emergency
            risk conditions.
          </p>

          <p className="mt-4 text-sm leading-8 text-slate-300">
            PCS does not advise users. PCS advises the protocol. Its purpose is to improve protocol
            awareness, support disciplined growth, and help the system understand when conditions
            are becoming risky.
          </p>
        </article>

        <article className="mt-8 rounded-3xl border border-white/10 bg-black/45 p-8 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Treasury Protection
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-white">
            Resilience before uncontrolled expansion.
          </h2>

          <p className="mt-5 text-sm leading-8 text-slate-300">
            The treasury is designed to strengthen long-term protocol resilience through reserve
            protection, risk buffers, controlled growth, ecosystem development, and protection during
            stress conditions.
          </p>

          <p className="mt-4 text-sm leading-8 text-slate-300">
            Treasury protection is not presented as a guarantee. It is a resilience layer that must
            evolve with legal review, audits, governance, risk controls, and transparent reporting
            before any production deployment.
          </p>
        </article>

        <article className="mt-8 rounded-3xl border border-white/10 bg-black/45 p-8 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            MegaETH Execution
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-white">
            Real-time infrastructure for a machine-regulated economy.
          </h2>

          <p className="mt-5 text-sm leading-8 text-slate-300">
            FAITH is designed to be MegaETH-native. MegaETH provides the execution environment for
            fast state awareness, low-latency financial interactions, and high-performance protocol
            monitoring.
          </p>

          <p className="mt-4 text-sm leading-8 text-slate-300">
            A machine-regulated economy becomes more powerful when protocol risk, credit activity,
            treasury conditions, and execution can be observed quickly and acted on with discipline.
          </p>
        </article>

        <article className="mt-8 rounded-3xl border border-white/10 bg-black/45 p-8 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Current Testnet MVP
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-white">
            Public demo stage, not production capital.
          </h2>

          <p className="mt-5 text-sm leading-8 text-slate-300">
            The current MVP focuses on FXMP testnet collateral, FUSD testnet credit, vault deposits,
            borrowing simulation, oracle shock simulation, liquidation-risk visibility, treasury mock
            accounting, PCS monitoring, dashboard experience, and public protocol pages.
          </p>

          <p className="mt-4 text-sm leading-8 text-slate-300">
            FAITH does not currently manage real user capital, offer guaranteed yield, issue live
            treasury certificates, provide financial advice, or operate as a public investment product.
          </p>
        </article>

        <article className="mt-8 rounded-3xl border border-white/10 bg-black/45 p-8 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Roadmap
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-white">
            From MVP to controlled production readiness.
          </h2>

          <div className="mt-6 grid gap-3">
            {roadmap.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm leading-7 text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="mt-8 rounded-3xl border border-red-300/20 bg-red-300/[0.06] p-8 shadow-2xl shadow-red-950/20 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-200">
            Public Disclosure Boundary
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-white">
            Clear enough to understand. Protected enough to build safely.
          </h2>

          <p className="mt-5 text-sm leading-8 text-slate-300">
            This litepaper intentionally does not disclose proprietary PCS formulas, private treasury
            strategy, unreleased tokenomics, risk thresholds, future capital-routing mechanics, or
            confidential investor materials.
          </p>

          <p className="mt-4 text-sm leading-8 text-slate-300">
            Private materials are reserved for serious partners, investors, auditors, and ecosystem
            reviewers through a controlled access process.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/whitelist"
              className="inline-flex rounded-full border border-cyan-300/25 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300 backdrop-blur-md transition hover:border-cyan-300/70 hover:bg-cyan-300/10 hover:text-white"
            >
              Request Access
            </Link>

            <Link
              href="/docs"
              className="inline-flex rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md transition hover:border-cyan-300/70 hover:text-cyan-200"
            >
              Back to Docs
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}

