import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white lg:px-10">
      <Link href="/" className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
        ? Back to FAITH
      </Link>

      <section className="mx-auto mt-12 max-w-5xl">
        <p className="text-sm font-black uppercase tracking-[0.38em] text-cyan-300">
          About FAITH
        </p>

        <h1 className="mt-5 text-5xl font-black uppercase tracking-[0.12em] text-white">
          A Machine-Regulated Economy
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-400">
          FAITH is not only about borrowing. It is about designing an economy that can
          grow without losing discipline. Human productivity creates value. PCS regulates
          risk. Treasury protects the system. MegaETH executes in real time.
        </p>

        <div className="mt-10 faith-card p-6">
          <h2 className="text-2xl font-black uppercase tracking-[0.16em] text-white">
            Vision
          </h2>
          <p className="mt-5 text-sm leading-7 text-slate-400">
            FAITH aims to become a capital operating system for disciplined economic growth,
            where credit expansion is balanced by treasury strength and PCS risk control.
          </p>
        </div>
      </section>
    </main>
  );
}
