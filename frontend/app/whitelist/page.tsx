"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const roles = ["Builder", "Investor", "Researcher", "Ecosystem", "Other"];

export default function WhitelistPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-amber-300/80">
            FAITH Testnet Access
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Request FAITH Access
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Join the FAITH testnet whitelist for future access to PCS-regulated
            credit, treasury, and protocol-risk infrastructure experiments.
          </p>

          <div className="mt-8 rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-6">
            <h2 className="text-xl font-semibold text-amber-200">
              Current stage: Testnet MVP
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/70">
              FAITH does not currently manage real user capital, offer guaranteed
              yield, issue live treasury certificates, provide financial advice,
              or operate as a public investment product.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-amber-300/70 hover:text-amber-200"
            >
              Read Docs
            </Link>

            <Link
              href="/dashboard"
              className="rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
            >
              Enter Dashboard
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30">
          {submitted ? (
            <div className="flex min-h-[480px] flex-col justify-center">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
                Request received
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-white">
                Your FAITH access request has been received.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/70">
                FAITH is currently in testnet MVP stage. Access and follow-up
                will be reviewed manually.
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-amber-300/70 hover:text-amber-200"
              >
                Submit another access request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div>
                <label className="text-sm font-medium text-white/80">
                  Name
                </label>
                <input
                  required
                  name="name"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-amber-300/70"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white/80">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-amber-300/70"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white/80">
                  Role
                </label>
                <select
                  required
                  name="role"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-amber-300/70"
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
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-amber-300/70"
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
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-amber-300/70"
                  placeholder="Tell us whether you are requesting testnet access, builder review, investor materials, or private whitepaper access."
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
              >
                Request Access
              </button>

              <p className="text-xs leading-6 text-white/45">
                No token, airdrop, investment return, yield, or access guarantee
                is promised by joining this whitelist.
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

