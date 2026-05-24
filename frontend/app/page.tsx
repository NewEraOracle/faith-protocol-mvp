import Link from "next/link";

const modules = [
  {
    title: "VAULTS",
    body: "Overcollateralized on-chain vaults for sustainable credit minting.",
  },
  {
    title: "PCS MONITOR",
    body: "Protocol Control System for risk, issuance, oracle shocks, and liquidation monitoring.",
  },
  {
    title: "TREASURY",
    body: "Protocol-owned reserve layer designed for long-term liquidity and solvency.",
  },
  {
    title: "tfUSD ACTIVATION",
    body: "Credit asset activated by collateral, vault health, and real-time utility.",
  },
];

const stats = [
  ["NETWORK", "MegaETH"],
  ["COLLATERAL", "tFAITH"],
  ["CREDIT ASSET", "tfUSD"],
  ["MVP STATUS", "Live"],
  ["RISK ENGINE", "PCS"],
  ["SETTLEMENT", "Adapter"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative min-h-screen overflow-hidden">
        <img
          src="/faith/landing-hero.png"
          alt="FAITH Protocol"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        <nav className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-6 md:px-16">
          <div className="text-3xl font-black text-white drop-shadow-[0_0_22px_rgba(255,255,255,0.8)]">
            Faith
          </div>

          <div className="hidden items-center gap-9 text-xs font-black uppercase tracking-[0.25em] text-slate-100 md:flex">
            <a href="#protocol" className="hover:text-cyan-200">Protocol</a>
            <a href="#loop" className="hover:text-cyan-200">Credit Loop</a>
            <a href="#stats" className="hover:text-cyan-200">Stats</a>
            <a href="#tokens" className="hover:text-cyan-200">Tokens</a>
          </div>

          <Link
            href="/dashboard"
            className="border border-cyan-100/70 bg-black/40 px-6 py-3 text-xs font-black uppercase tracking-[0.22em] text-white shadow-[0_0_30px_rgba(125,211,252,0.35)] backdrop-blur-md transition hover:bg-cyan-100 hover:text-black"
          >
            Enter Dashboard
          </Link>
        </nav>

        <div className="absolute inset-x-0 bottom-10 z-20 flex justify-center px-5">
          <Link
            href="/dashboard"
            className="border border-cyan-100/60 bg-black/50 px-8 py-4 text-xs font-black uppercase tracking-[0.28em] text-white shadow-[0_0_35px_rgba(125,211,252,0.35)] backdrop-blur-md transition hover:bg-cyan-100 hover:text-black"
          >
            Launch Live MVP
          </Link>
        </div>
      </section>

      <section id="protocol" className="bg-[#02040a] px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-300">FAITH Protocol</p>
              <h2 className="mt-3 text-4xl font-black md:text-6xl">Autonomous credit infrastructure.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-400">
              FAITH is a MegaETH-native real-time credit MVP with collateralized vaults,
              tfUSD borrowing, oracle-based risk simulation, and liquidation flows.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {modules.map((item) => (
              <div
                key={item.title}
                className="relative overflow-hidden border border-cyan-100/20 bg-slate-950/70 p-6 shadow-[0_0_45px_rgba(14,165,233,0.08)]"
              >
                <div className="absolute left-0 top-0 h-10 w-10 border-l border-t border-cyan-100/70" />
                <div className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-cyan-100/70" />
                <h3 className="text-sm font-black uppercase tracking-[0.28em] text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{item.body}</p>
                <p className="mt-5 text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">
                  Learn More
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="loop" className="bg-black px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl border border-cyan-100/20 bg-slate-950/70 p-8">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-300">The Protocol Loop</p>

          <div className="mt-8 grid gap-5 md:grid-cols-5">
            {["Collateral Deposited", "Credit Minted", "PCS Monitoring", "tfUSD Activated", "Real-Time Utilization"].map((step, i) => (
              <div key={step} className="text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-cyan-100/30 bg-cyan-100/5 text-xl font-black text-cyan-100 shadow-[0_0_30px_rgba(125,211,252,0.18)]">
                  0{i + 1}
                </div>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-white">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stats" className="bg-[#02040a] px-6 py-14 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3 xl:grid-cols-6">
          {stats.map(([label, value]) => (
            <div key={label} className="border border-cyan-100/20 bg-black/60 p-5 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">{label}</p>
              <p className="mt-3 text-2xl font-black text-white">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tokens" className="bg-black px-6 py-14 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          <div className="border border-cyan-100/20 bg-slate-950/70 p-8">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-300">Token Identity</p>
            <h3 className="mt-4 text-4xl font-black">FAITH</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Protocol collateral identity and future governance coordination layer.
            </p>
          </div>

          <div className="border border-cyan-100/20 bg-slate-950/70 p-8">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-300">Credit Asset</p>
            <h3 className="mt-4 text-4xl font-black">tfUSD</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Autonomous credit minted against tFAITH collateral inside live MegaETH testnet vaults.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
