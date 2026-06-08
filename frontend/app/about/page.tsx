import Link from "next/link";
import { InfoCard, PublicPage } from "../components/PublicPage";

const contacts = [
  [
    "Email",
    "Official company email for investors, partnerships, builders, and serious project inquiries.",
    "mailto:contact@faithdefi.com",
  ],
  [
    "X / Twitter",
    "Official public updates, build logs, ecosystem announcements, and FAITH Monetary Protocol progress.",
    "https://x.com/FaithMonetary",
  ],
  [
    "Telegram",
    "Official Telegram channel for community updates, protocol discussion, and early ecosystem coordination.",
    "https://t.me/faithmonetary",
  ],
  [
    "Builder Applications",
    "For developers, RWA projects, AI agents, yield strategists, and MegaETH ecosystem builders.",
    "mailto:contact@faithdefi.com?subject=Faith%20Monetary%20Protocol%20Builder%20Application",
  ],
];

export default function AboutPage() {
  return (
    <PublicPage
      label="CONTACT"
      title="Connect with Faith Monetary Protocol."
      intro="Faith Monetary Protocol is open to serious conversations with investors, builders, MegaETH ecosystem teams, infrastructure partners, treasury participants, and long-term strategic collaborators."
    >
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
            <p className="mt-4 text-sm leading-7 text-slate-400">
              {body}
            </p>
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
          <div className="mt-8 rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.06] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
        <h2 className="text-2xl font-semibold text-white">Submit an Access Request</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          Use the request form for builder access, investor materials, private litepaper review,
          testnet review, or strategic partnership discussions.
        </p>

        <div className="mt-6">
          <Link
            href="/whitelist"
            className="inline-flex rounded-full border border-cyan-300/25 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300 backdrop-blur-md transition hover:border-cyan-300/70 hover:bg-cyan-300/10 hover:text-white"
          >
            Submit Request
          </Link>
        </div>
      </div>
    </PublicPage>
  );
}




