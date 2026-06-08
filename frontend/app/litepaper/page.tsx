import Link from "next/link";

const sections = [
  {
    number: "01",
    title: "Vision",
    body:
      "FAITH Monetary Protocol is building a human-built, PCS-regulated economic operating system for disciplined digital growth. The protocol connects programmable credit, treasury resilience, risk regulation, and productive economic activity into one coordinated financial infrastructure layer.",
  },
  {
    number: "02",
    title: "Problem",
    body:
      "Many digital economies grow quickly but become fragile because they depend too heavily on speculation, unstable liquidity, uncontrolled incentives, and governance decisions made without real-time protocol risk intelligence.",
  },
  {
    number: "03",
    title: "FAITH Economic Operating System",
    body:
      "FAITH connects three major layers: a credit layer for programmable vault-based credit, a treasury layer for reserve strength and resilience, and PCS, the Protocol Control System, for protocol-level risk monitoring and disciplined system response.",
  },
  {
    number: "04",
    title: "FXMP / FUSD / FXTC",
    body:
      "The FAITH economy separates roles across three assets. FXMP coordinates growth and participation. FUSD powers internal credit activity. FXTC represents the treasury-aligned capital participation layer designed for long-term protocol resilience.",
  },
  {
    number: "05",
    title: "PCS Risk Regulation",
    body:
      "PCS observes protocol state, vault health, credit utilization, treasury coverage, collateral stress, liquidation pressure, reserve strength, and emergency risk conditions. PCS does not advise users. PCS advises the protocol.",
  },
  {
    number: "06",
    title: "Treasury Protection",
    body:
      "The treasury is designed to strengthen long-term protocol resilience through reserve protection, risk buffers, controlled growth, ecosystem development, and protection during stress conditions. It is a resilience layer, not a public guarantee.",
  },
  {
    number: "07",
    title: "MegaETH Execution",
    body:
      "FAITH is designed to be MegaETH-native. MegaETH provides the execution environment for fast state awareness, low-latency financial interactions, and high-performance protocol monitoring.",
  },
  {
    number: "08",
    title: "Build and Ecosystem Path",
    body:
      "FAITH is designed for MegaETH builders, RWA and productive infrastructure projects, DeFi credit developers, treasury analytics teams, earn and yield strategists, AI agents, automation builders, and strategic protocol partners.",
  },
  {
    number: "09",
    title: "Current Testnet MVP",
    body:
      "The current MVP focuses on FXMP testnet collateral, FUSD testnet credit, vault deposits, borrowing simulation, oracle shock simulation, liquidation-risk visibility, treasury mock accounting, PCS monitoring, dashboard experience, and public protocol pages.",
  },
  {
    number: "10",
    title: "Compliance Boundary",
    body:
      "FAITH is currently a testnet MVP. It does not manage real user capital, offer guaranteed yield, issue live treasury certificates, provide financial advice, or operate as a public investment product. Future real-capital modules require legal, compliance, audit, and risk review.",
  },
  {
    number: "11",
    title: "Roadmap",
    body:
      "The roadmap moves from testnet MVP to PCS expansion, treasury architecture, builder ecosystem growth, investor and ecosystem validation, then future production readiness through audits, legal structuring, security reviews, and controlled deployment pathways.",
  },
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

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-10">
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

            <Link
              href="/dashboard"
              className="faith-button px-6 py-3 text-[11px]"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <section className="mt-12 rounded-[2rem] border border-cyan-300/20 bg-black/55 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl md:p-12">
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
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section.number}
              className="rounded-3xl border border-white/10 bg-black/45 p-6 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.04]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Section {section.number}
              </p>

              <h2 className="mt-4 text-2xl font-semibold text-white">
                {section.title}
              </h2>

              <p className="mt-4 text-sm leading-8 text-slate-300">
                {section.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-red-300/20 bg-red-300/[0.06] p-6 shadow-2xl shadow-red-950/20 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-200">
            Public Disclosure Boundary
          </p>

          <h2 className="mt-4 text-2xl font-semibold text-white">
            Protected public documentation.
          </h2>

          <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-300">
            This litepaper intentionally does not disclose proprietary PCS formulas,
            private treasury strategy, unreleased tokenomics, future capital-routing mechanics,
            or confidential investor materials. Private materials are available only upon request
            for serious ecosystem partners, investors, and reviewers.
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
        </section>
      </section>
    </main>
  );
}
