import Link from "next/link";

const sections = [
  {
    title: "What is Faith Monetary Protocol?",
    body:
      "Faith Monetary Protocol is PCS-regulated credit and treasury infrastructure for autonomous onchain economies on MegaETH. The current product is a testnet MVP focused on vault-based borrowing, treasury visibility, oracle shock simulation, liquidation-risk visibility, and protocol-level risk monitoring.",
  },
  {
    title: "What is PCS?",
    body:
      "PCS, the Protocol Control System, observes protocol state, scores systemic risk, explains risk drivers, simulates stress scenarios, and recommends protocol-level responses. PCS does not advise users. PCS advises the protocol.",
  },
  {
    title: "Current MVP",
    body:
      "The current MVP demonstrates FXMP testnet collateral, FUSD testnet credit, vault deposits, borrowing, oracle shock simulation, liquidation-risk visibility, treasury mock accounting, and PCS monitoring.",
  },
  {
    title: "Why MegaETH?",
    body:
      "FAITH is designed for real-time financial infrastructure. MegaETH gives the execution environment for fast state awareness, low-latency protocol monitoring, and high-performance onchain financial interactions.",
  },
  {
    title: "Safety Boundary",
    body:
      "FAITH is currently a testnet MVP. It does not manage real user capital, offer guaranteed yield, issue live treasury certificates, provide financial advice, or operate as a public investment product. Future RWA, treasury, certificate, or productive-capital modules require legal, compliance, audit, and risk review before real deployment.",
  },
];

const roadmap = [
  "Phase 1 — Testnet MVP: FXMP collateral, FUSD borrowing, oracle shock simulation, liquidation demo, treasury mock accounting, and PCS monitoring.",
  "Phase 2 — PCS v2: deterministic risk scoring, treasury coverage scoring, liquidation pressure scoring, borrow utilization scoring, action queue, and stress timeline.",
  "Phase 3 — Treasury Architecture: treasury design, controlled capital models, quarterly review concepts, PCS treasury monitoring, and legal-safe documentation.",
  "Phase 4 — Ecosystem Layer: Build-on-FAITH framework, project vault concepts, developer modules, UtopiaByFaith integration, and future USDm marketplace support.",
  "Phase 5 — Funding and Validation: demo video, pitch deck, investor memo, MegaETH outreach, grants, strategic angels, and accelerators.",
  "Phase 6 — Future RWA / Productive Capital: legal structure, compliance review, partner due diligence, audited reporting, PCS controls, and controlled capital routing.",
];

export default function DocsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-10 text-white lg:px-10">
      <div className="pointer-events-none fixed inset-0">
        <img
          src="/faith/design/background-cosmic.png"
          alt=""
          className="h-full w-full object-cover opacity-80"
        />
      </div>

      <div className="pointer-events-none fixed inset-0 bg-black/60" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_34%),linear-gradient(to_bottom,rgba(2,6,23,0.25),rgba(0,0,0,0.94))]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:96px_96px] opacity-20" />

      <section className="relative z-10 mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex rounded-full border border-cyan-300/25 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300 backdrop-blur-md transition hover:border-cyan-300/70 hover:bg-cyan-300/10 hover:text-white"
          >
            Back to Faith Monetary Protocol
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="/whitelist"
              className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300 backdrop-blur-md transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-white"
            >
              Request Access
            </Link>

            <a
              href="https://github.com/NewEraOracle/faith-protocol-mvp"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300 backdrop-blur-md transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-white"
            >
              GitHub
            </a>

            <Link
              href="/dashboard"
              className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200 backdrop-blur-md transition hover:border-cyan-300/70 hover:bg-cyan-300/20 hover:text-white"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <div className="py-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
            Faith Monetary Protocol Docs
          </p>

          <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            PCS-regulated credit and treasury infrastructure for autonomous onchain economies.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            FAITH is a MegaETH-native testnet MVP built around programmable credit,
            treasury resilience, oracle shock simulation, liquidation-risk visibility,
            and PCS protocol-risk intelligence.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
            >
              Enter Dashboard
            </Link>

            <Link
              href="/whitelist"
              className="rounded-full border border-white/15 bg-black/35 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:border-cyan-300/70 hover:text-cyan-200"
            >
              Request Access
            </Link>

            <a
              href="https://github.com/NewEraOracle/faith-protocol-mvp"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-black/35 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:border-cyan-300/70 hover:text-cyan-200"
            >
              GitHub
            </a>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-3xl border border-white/10 bg-black/45 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
              >
                <h2 className="text-xl font-semibold text-cyan-100">{section.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">{section.body}</p>
              </article>
            ))}
          </div>

          <section className="mt-8 rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.06] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Roadmap</h2>
            <div className="mt-6 grid gap-3">
              {roadmap.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/35 p-4 text-sm leading-7 text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-white/10 bg-black/45 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Private Whitepaper Access</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              The investor whitepaper is available upon request for serious ecosystem
              partners, investors, and reviewers. Public documentation intentionally keeps
              proprietary PCS scoring, treasury strategy, tokenomics, and future capital-routing
              mechanics private.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/whitelist"
                className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-300/20 hover:text-white"
              >
                Request Whitepaper Access
              </Link>

              <a
                href="mailto:contact@faithdefi.com?subject=FAITH%20Whitepaper%20Access%20Request"
                className="inline-flex rounded-full border border-white/15 bg-black/35 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/70 hover:text-cyan-200"
              >
                Email contact@faithdefi.com
              </a>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}


