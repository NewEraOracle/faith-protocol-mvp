import Link from "next/link";

export default function AccessRequestReceivedPage() {
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

      <section className="relative z-10 mx-auto flex min-h-[80vh] max-w-4xl flex-col justify-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
          Faith Monetary Protocol Access Request
        </p>

        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Request received.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Thank you for requesting access to Faith Monetary Protocol. Requests are reviewed manually.
          Private materials are only shared with serious ecosystem partners, investors,
          builders, and reviewers.
        </p>

        <p className="mt-4 text-sm leading-7 text-slate-400">
          If your request is aligned, FAITH may follow up from{" "}
          <a
            href="mailto:contact@faithdefi.com"
            className="font-semibold text-cyan-200 underline decoration-cyan-300/40 underline-offset-4 hover:text-white"
          >
            contact@faithdefi.com
          </a>
          .
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full border border-cyan-300/25 bg-black/35 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300/70 hover:bg-cyan-300/10 hover:text-white"
          >
            Back to Faith
          </Link>

          <Link
            href="/dashboard"
            className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
          >
            Enter Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}




