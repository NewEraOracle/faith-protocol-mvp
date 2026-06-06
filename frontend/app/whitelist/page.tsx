"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const roles = ["Investor", "Builder", "Researcher", "Ecosystem", "Reviewer", "Other"];

export default function WhitelistPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const role = String(form.get("role") || "");
    const wallet = String(form.get("wallet") || "");
    const message = String(form.get("message") || "");

    const subject = encodeURIComponent("FAITH Access Request");
    const body = encodeURIComponent(
      [
        "FAITH Access Request",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Role: ${role}`,
        `Wallet: ${wallet || "N/A"}`,
        "",
        "Request / Message:",
        message || "N/A",
        "",
        "Requested through the FAITH access page.",
      ].join("\n")
    );

    window.location.href = `mailto:contact@faithdefi.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

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
            Back to FAITH
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="/docs"
              className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300 backdrop-blur-md transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-white"
            >
              Docs
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

        <div className="grid gap-10 py-20 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
              FAITH Protected Access
            </p>

            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Request FAITH Access
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Request testnet review, builder onboarding, investor materials, or private
              whitepaper access. FAITH reviews requests manually and only shares private
              materials with serious ecosystem partners, investors, and reviewers.
            </p>

            <div className="mt-8 rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.06] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
              <h2 className="text-xl font-semibold text-cyan-100">
                Current stage: Testnet MVP
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                FAITH does not currently manage real user capital, offer guaranteed
                yield, issue live treasury certificates, provide financial advice, or
                operate as a public investment product.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Direct contact:{" "}
                <a
                  href="mailto:contact@faithdefi.com"
                  className="font-semibold text-cyan-200 underline decoration-cyan-300/40 underline-offset-4 hover:text-white"
                >
                  contact@faithdefi.com
                </a>
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/docs"
                className="rounded-full border border-white/15 bg-black/35 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:border-cyan-300/70 hover:text-cyan-200"
              >
                Read Docs
              </Link>

              <Link
                href="/dashboard"
                className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
              >
                Enter Dashboard
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/45 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
            {submitted ? (
              <div className="flex min-h-[480px] flex-col justify-center">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                  Request prepared
                </p>

                <h2 className="mt-4 text-3xl font-semibold text-white">
                  Your FAITH access request has been prepared.
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Your email app should open with a pre-filled request to
                  contact@faithdefi.com. Send that email to complete the access request.
                  Private materials are reviewed manually before sharing.
                </p>

                <a
                  href="mailto:contact@faithdefi.com?subject=FAITH%20Access%20Request"
                  className="mt-8 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 text-center text-sm font-semibold text-cyan-200 transition hover:bg-cyan-300/20 hover:text-white"
                >
                  Email contact@faithdefi.com
                </a>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/70 hover:text-cyan-200"
                >
                  Submit another access request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div>
                  <label className="text-sm font-medium text-white/80">Name</label>
                  <input
                    required
                    name="name"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/70"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white/80">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/70"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white/80">Role</label>
                  <select
                    required
                    name="role"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-cyan-300/70"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-white/80">
                    Wallet address optional
                  </label>
                  <input
                    name="wallet"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/70"
                    placeholder="0x..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white/80">
                    Message optional
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/70"
                    placeholder="Tell us whether you are requesting testnet access, builder review, investor materials, or private whitepaper access."
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
                >
                  Request Access
                </button>

                <p className="text-xs leading-6 text-white/45">
                  No token, airdrop, investment return, yield, public sale, or access
                  guarantee is promised. FAITH may decline or delay access requests to
                  protect protocol IP and review quality.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
