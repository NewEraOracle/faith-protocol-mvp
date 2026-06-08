import Link from "next/link";
import { InfoCard, PublicPage } from "../components/PublicPage";

const contacts = [
  [
    "Email",
    "Official company email for investors, partnerships, builders, and serious project inquiries.",
    "contact@faithdefi.com",
  ],
  [
    "X / Twitter",
    "Official public updates, build logs, ecosystem announcements, and FAITH Monetary Protocol progress.",
    "Follow FAITH on X",
  ],
  [
    "Telegram",
    "Official Telegram channel for community updates, protocol discussion, and early ecosystem coordination.",
    "Join FAITH Telegram",
  ],
  [
    "Join the Community",
    "Connect with builders, early supporters, reviewers, and FAITH ecosystem members inside the official Discord community.",
    "Join the FAITH Discord",
  ],
];

export default function AboutPage() {
  return (
    <PublicPage
      label="CONTACT"
      title="Connect with Faith Monetary Protocol."
      intro="Faith Monetary Protocol is open to serious conversations with investors, builders, MegaETH ecosystem teams, infrastructure partners, treasury participants, and long-term strategic collaborators."
    >
      <section className="mb-6 rounded-3xl border border-cyan-300/25 bg-cyan-300/[0.06] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
        <h2 className="text-2xl font-semibold text-white">Submit an Access Request</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          Use the request form for builder access, investor materials, private litepaper review,
          testnet review, or strategic partnership discussions.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/whitelist"
            className="inline-flex rounded-full border border-cyan-300/25 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300 backdrop-blur-md transition hover:border-cyan-300/70 hover:bg-cyan-300/10 hover:text-white"
          >
            Submit Request
          </Link>

          <a
            href="mailto:contact@faithdefi.com"
            className="inline-flex rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md transition hover:border-cyan-300/70 hover:text-cyan-200"
          >
            Email Directly
          </a>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        {contacts.map(([title, body, href]) => (
          <a
            key={title}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="rounded-2xl border border-cyan-300/20 bg-black/40 p-6 transition hover:border-cyan-300/60 hover:bg-cyan-300/5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              {title}
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-400">{body}</p>
            <p className="mt-5 break-all text-sm font-semibold text-cyan-200">
              {href.replace("mailto:", "").replace("?subject=Faith%20Monetary%20Protocol%20Builder%20Application", "")}
            </p>
          </a>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <InfoCard title="What We Are Looking For">
          <p>
            FAITH is especially interested in partners building around productive credit,
            treasury infrastructure, risk analytics, real-world asset pathways, AI automation,
            yield strategies, and MegaETH-native financial applications.
          </p>
        </InfoCard>

        <InfoCard title="Current Stage">
          <p>
            Faith Monetary Protocol is currently a testnet MVP. The protocol is not managing
            real user capital, issuing live treasury certificates, or offering public investment
            products. Strategic conversations are focused on validation, ecosystem alignment,
            technical review, and future deployment readiness.
          </p>
        </InfoCard>
      </div>
    </PublicPage>
  );
}









