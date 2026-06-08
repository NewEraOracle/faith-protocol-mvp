import Link from "next/link";
import { InfoCard, PublicPage } from "../components/PublicPage";

const focus = [
  [
    "What FAITH Is",
    "FAITH is a MegaETH-native capital operating system connecting programmable credit, treasury resilience, and PCS protocol-risk regulation.",
  ],
  [
    "Why It Matters",
    "Many digital economies grow quickly but become fragile. FAITH is designed to support disciplined growth through credit control, treasury strength, and system-level risk intelligence.",
  ],
  [
    "Why MegaETH",
    "A machine-regulated economy benefits from fast execution, real-time state awareness, and low-latency protocol monitoring.",
  ],
  [
    "Current Stage",
    "FAITH is currently a testnet MVP focused on vault credit, FUSD borrowing, oracle shock simulation, liquidation-risk visibility, treasury mock accounting, and PCS monitoring.",
  ],
];

const lookingFor = [
  "MegaETH ecosystem alignment",
  "Strategic angels and long-term protocol partners",
  "Technical reviewers and security advisors",
  "Treasury, RWA, and productive-capital partners",
  "Builder teams working around credit, risk, AI agents, and financial automation",
];

export default function InvestorsPage() {
  return (
    <PublicPage
      label="INVESTOR & PARTNER SUMMARY"
      title="A disciplined economic operating system for productive digital growth."
      intro="FAITH Monetary Protocol is built for serious ecosystem review, strategic partners, MegaETH-aligned builders, and long-term investors who understand infrastructure, treasury resilience, and protocol-level risk control."
    >
      <section className="rounded-3xl border border-cyan-300/20 bg-black/45 p-8 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Core Thesis
        </p>

        <h2 className="mt-4 text-3xl font-semibold text-white">
          Humans build. PCS regulates. Treasury protects. MegaETH executes. The economy grows.
        </h2>

        <p className="mt-5 max-w-5xl text-sm leading-8 text-slate-300">
          FAITH is not positioned as a speculative lending application. It is designed as a
          capital operating system where credit, treasury, and protocol-risk intelligence work
          together. The objective is to let a digital economy grow while maintaining discipline
          through treasury protection and PCS risk regulation.
        </p>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-2">
        {focus.map(([title, body]) => (
          <InfoCard key={title} title={title}>
            <p>{body}</p>
          </InfoCard>
        ))}
      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-black/45 p-8 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
          What We Are Looking For
        </p>

        <h2 className="mt-4 text-3xl font-semibold text-white">
          Strategic validation before production scale.
        </h2>

        <div className="mt-6 grid gap-3">
          {lookingFor.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm font-semibold leading-7 text-slate-200"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/whitelist"
            className="inline-flex rounded-full border border-cyan-300/25 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300 backdrop-blur-md transition hover:border-cyan-300/70 hover:bg-cyan-300/10 hover:text-white"
          >
            Request Access
          </Link>

          <Link
            href="/litepaper"
            className="inline-flex rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md transition hover:border-cyan-300/70 hover:text-cyan-200"
          >
            Read Litepaper
          </Link>
        </div>
      </section>
      <section className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.06] p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Why FAITH Can Matter
        </p>

        <h2 className="mt-4 text-3xl font-semibold text-white">
          A protocol economy needs more than lending mechanics.
        </h2>

        <p className="mt-5 max-w-5xl text-sm leading-8 text-slate-300">
          FAITH is positioned around a broader thesis: digital economies need credit, but credit
          expansion becomes fragile when it is not paired with treasury resilience, protocol-level
          risk intelligence, and disciplined deployment standards. FAITH is designed to make
          economic growth programmable, observable, and controlled.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Investor View
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              A clear protocol thesis with public MVP proof, protected private materials, and a
              controlled access process.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Builder View
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Credit, treasury, PCS risk, AI agents, RWA pathways, and MegaETH-native execution
              can become modular ecosystem layers.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Partner View
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Private review is reserved for serious partners, strategic investors, auditors,
              technical reviewers, and ecosystem collaborators.
            </p>
          </div>
        </div>
      </section>



      <section className="mt-6 rounded-3xl border border-red-300/20 bg-red-300/[0.06] p-8 shadow-2xl shadow-red-950/20 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-200">
          Private Materials Boundary
        </p>

        <h2 className="mt-4 text-3xl font-semibold text-white">
          Public summary only.
        </h2>

        <p className="mt-5 max-w-5xl text-sm leading-8 text-slate-300">
          Private whitepaper materials, unreleased tokenomics, PCS formulas, treasury strategy,
          capital-routing mechanics, and investor-specific information are not published publicly.
          These materials are reserved for serious partners, investors, auditors, and reviewers
          through a controlled access process.
        </p>
      </section>
    </PublicPage>
  );
}


