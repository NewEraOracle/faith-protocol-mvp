import Link from "next/link";
import { InfoCard, PublicPage } from "../components/PublicPage";

const boundaries = [
  "FAITH is currently a testnet MVP.",
  "FAITH does not currently manage real user capital.",
  "FAITH does not offer guaranteed yield or investment return.",
  "FAITH does not issue live treasury certificates.",
  "FAITH does not provide financial advice.",
  "FAITH is not currently a public investment product.",
  "Future production deployment requires legal, compliance, security, audit, and risk review.",
];

const readiness = [
  [
    "Smart Contract Review",
    "Production contracts require independent security review, formal testing, and audit readiness before real capital deployment.",
  ],
  [
    "Legal and Compliance Review",
    "Future RWA, treasury, certificate, or productive-capital modules require jurisdictional review and proper legal structuring.",
  ],
  [
    "Treasury Risk Controls",
    "Treasury systems must be reviewed for reserve management, capital protection, reporting standards, and governance controls.",
  ],
  [
    "PCS Risk Governance",
    "PCS risk scoring, stress logic, and emergency response mechanisms must be validated before any production usage.",
  ],
];

export default function SecurityPage() {
  return (
    <PublicPage
      label="SECURITY & COMPLIANCE"
      title="Safety boundary before production deployment."
      intro="FAITH Monetary Protocol is currently a testnet MVP. The protocol is being developed with a clear separation between public demonstration, private review, legal readiness, and future production deployment."
    >
      <section className="rounded-3xl border border-cyan-300/20 bg-black/45 p-8 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Current Boundary
        </p>

        <h2 className="mt-4 text-3xl font-semibold text-white">
          Testnet-only. No real user capital.
        </h2>

        <div className="mt-6 grid gap-3">
          {boundaries.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm font-semibold leading-7 text-slate-200"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-2">
        {readiness.map(([title, body]) => (
          <InfoCard key={title} title={title}>
            <p>{body}</p>
          </InfoCard>
        ))}
      </section>

      <section className="mt-6 rounded-3xl border border-yellow-300/20 bg-yellow-300/[0.06] p-8 shadow-2xl shadow-yellow-950/20 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-200">
          Production Readiness Principle
        </p>

        <h2 className="mt-4 text-3xl font-semibold text-white">
          Growth must remain disciplined.
        </h2>

        <p className="mt-5 max-w-5xl text-sm leading-8 text-slate-300">
          FAITH is designed around the idea that credit expansion should be balanced by
          treasury strength, PCS risk regulation, legal review, and transparent deployment
          standards. The protocol should not move into production capital until the proper
          security, audit, compliance, and risk controls are in place.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/litepaper"
            className="inline-flex rounded-full border border-cyan-300/25 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300 backdrop-blur-md transition hover:border-cyan-300/70 hover:bg-cyan-300/10 hover:text-white"
          >
            Read Litepaper
          </Link>

          <Link
            href="/whitelist"
            className="inline-flex rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md transition hover:border-cyan-300/70 hover:text-cyan-200"
          >
            Request Access
          </Link>
        </div>
      </section>
    </PublicPage>
  );
}
