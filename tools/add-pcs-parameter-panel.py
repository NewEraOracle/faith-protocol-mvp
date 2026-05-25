from pathlib import Path

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

marker = '''      </section>

      <section className="mb-8 rounded-3xl border border-purple-400/20 bg-purple-400/[0.06] p-6 shadow-[0_0_60px_rgba(168,85,247,0.08)]">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-purple-200">PCS Stress Simulator</p>'''

parameter_panel = '''      </section>

      <section className="mb-8 rounded-3xl border border-blue-400/20 bg-blue-400/[0.06] p-6 shadow-[0_0_60px_rgba(59,130,246,0.08)]">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-200">PCS Control Layer</p>
            <h2 className="mt-2 text-2xl font-bold">PCS Risk Parameter Panel</h2>
            <p className="mt-2 max-w-4xl text-zinc-400">
              PCS translates protocol risk into suggested parameter responses for the current testnet state.
              These are protocol-level controls, not user financial advice.
            </p>
          </div>
          <div className={`rounded-full border px-4 py-2 text-sm font-bold ${pcsRisk.emergencyMode ? "border-red-400/30 bg-red-400/10 text-red-200" : "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"}`}>
            Emergency Mode: {pcsRisk.emergencyMode ? "Recommended" : "Off"}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Current LTV</p>
            <h3 className="mt-3 text-2xl font-black text-white">{pcsRisk.currentLTV}%</h3>
            <p className="mt-2 text-sm text-zinc-500">Current testnet borrow parameter.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Suggested LTV</p>
            <h3 className={`mt-3 text-2xl font-black ${pcsRisk.suggestedLTV < pcsRisk.currentLTV ? "text-orange-300" : "text-emerald-300"}`}>
              {pcsRisk.suggestedLTV}%
            </h3>
            <p className="mt-2 text-sm text-zinc-500">PCS suggested protocol-level LTV response.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Liquidation Threshold</p>
            <h3 className="mt-3 text-2xl font-black text-cyan-100">{pcsRisk.liquidationThreshold}%</h3>
            <p className="mt-2 text-sm text-zinc-500">Protocol solvency protection threshold.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Reserve Target</p>
            <h3 className="mt-3 text-2xl font-black text-blue-100">{pcsRisk.treasuryReserveTarget}%</h3>
            <p className="mt-2 text-sm text-zinc-500">PCS suggested treasury reserve target.</p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Borrow Utilization</p>
            <h3 className="mt-3 text-2xl font-black text-white">
              {(pcsRisk.borrowUtilization * 100).toFixed(2)}%
            </h3>
            <p className="mt-2 text-sm text-zinc-500">Debt supply relative to protocol collateral.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Debt Coverage</p>
            <h3 className="mt-3 text-2xl font-black text-white">
              {pcsRisk.debtCoverageRatio === null ? "No Debt" : `${pcsRisk.debtCoverageRatio.toFixed(2)}x`}
            </h3>
            <p className="mt-2 text-sm text-zinc-500">Collateral coverage against outstanding test credit.</p>
          </div>
        </div>
      </section>

      <section className="mb-8 rounded-3xl border border-purple-400/20 bg-purple-400/[0.06] p-6 shadow-[0_0_60px_rgba(168,85,247,0.08)]">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-purple-200">PCS Stress Simulator</p>'''

if "PCS Risk Parameter Panel" in s:
    print("PCS Risk Parameter Panel already exists.")
elif marker not in s:
    print("PCS Stress Simulator insertion marker not found.")
else:
    s = s.replace(marker, parameter_panel, 1)
    path.write_text(s, encoding="utf-8")
    print("PCS Risk Parameter Panel added.")
