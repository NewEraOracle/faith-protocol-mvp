import Link from "next/link";

const sections = [
  {
    title: "What is FAITH?",
    body:
      "FAITH Protocol is PCS-regulated credit and treasury infrastructure for autonomous onchain economies on MegaETH. The current product is a testnet MVP focused on vault-based borrowing, treasury visibility, oracle shock simulation, liquidation-risk visibility, and protocol-level risk monitoring.",
  },
  {
    title: "What is PCS?",
    body:
      "PCS, the Protocol Control System, observes protocol state, scores systemic risk, explains risk drivers, simulates stress scenarios, and recommends protocol-level responses. PCS does not advise users. PCS advises the protocol.",
  },
  {
    title: "Current MVP",
    body:
      "The current MVP demonstrates tFAITH testnet collateral, tfUSD testnet credit, vault deposits, borrowing, oracle shock simulation, liquidation-risk visibility, treasury mock accounting, and PCS monitoring.",
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
  "Phase 1 — Testnet MVP: tFAITH collateral, tfUSD borrowing, oracle shock simulation, liquidation demo, treasury mock accounting, and PCS monitoring.",
  "Phase 2 — PCS v2: deterministic risk scoring, treasury coverage scoring, liquidation pressure scoring, borrow utilization scoring, action queue, and stress timeline.",
  "Phase 3 — Treasury Architecture: treasury design, controlled capital models, quarterly review concepts, PCS treasury monitoring, and legal-safe documentation.",
  "Phase 4 — Ecosystem Layer: Build-on-FAITH framework, project vault concepts, developer modules, UtopiaByFaith integration, and future USDm marketplace support.",
  "Phase 5 — Funding and Validation: demo video, pitch deck, investor memo, MegaETH outreach, grants, strategic angels, and accelerators.",
  "Phase 6 — Future RWA / Productive Capital: legal structure, compliance review, partner due diligence, audited reporting, PCS controls, and controlled capital routing.",
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-amber-300/80">
            FAITH Protocol Docs
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
            PCS-regulated credit and treasury infrastructure for autonomous onchain economies.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
            FAITH is a MegaETH-native testnet MVP built around programmable credit,
            treasury resilience, oracle shock simulation, liquidation-risk visibility,
            and PCS protocol-risk intelligence.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
            >
              Enter Dashboard
            </Link>

            <Link
              href="/whitelist"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-amber-300/70 hover:text-amber-200"
            >
              Join Whitelist
            </Link>

            <a
              href="https://github.com/NewEraOracle/faith-protocol-mvp"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-amber-300/70 hover:text-amber-200"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20"
            >
              <h2 className="text-xl font-semibold text-amber-200">{section.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/70">{section.body}</p>
            </article>
          ))}
        </div>

        <section className="rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-6">
          <h2 className="text-2xl font-semibold text-white">Roadmap</h2>
          <div className="mt-6 grid gap-3">
            {roadmap.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-7 text-white/70"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl font-semibold text-white">Whitepaper</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70">
            The Delphi submission whitepaper explains the testnet MVP, PCS risk architecture,
            treasury direction, roadmap, and safety boundaries. Add the final PDF link here
            when the public download path is ready.
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-amber-300/70 hover:text-amber-200"
            >
              Whitepaper download coming soon
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
