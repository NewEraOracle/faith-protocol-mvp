from pathlib import Path

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

marker = '''      </section>

      <section className="mb-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-bold">Your tVault</h2>'''

stress_section = '''      </section>

      <section className="mb-8 rounded-3xl border border-purple-400/20 bg-purple-400/[0.06] p-6 shadow-[0_0_60px_rgba(168,85,247,0.08)]">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-purple-200">PCS Stress Simulator</p>
            <h2 className="mt-2 text-2xl font-bold">Projected Collateral Shock Scenarios</h2>
            <p className="mt-2 max-w-4xl text-zinc-400">
              PCS projects protocol risk under additional collateral price shocks. This is a testnet risk simulation for protocol-level monitoring only.
            </p>
          </div>
          <div className="rounded-full border border-purple-300/30 bg-purple-300/10 px-4 py-2 text-sm font-bold text-purple-100">
            Stress Projection
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {pcsStressScenarios.map((scenario) => (
            <div key={scenario.dropPercent} className="rounded-3xl border border-white/10 bg-black/30 p-5">
              <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">
                -{scenario.dropPercent}% Shock
              </p>
              <h3 className={`mt-3 text-2xl font-black ${
                scenario.projectedRiskLevel === "Critical" || scenario.projectedRiskLevel === "High Risk"
                  ? "text-red-300"
                  : scenario.projectedRiskLevel === "Warning"
                    ? "text-orange-300"
                    : "text-emerald-300"
              }`}>
                {scenario.projectedRiskLevel}
              </h3>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500">Projected Price</span>
                  <span className="text-white">${scenario.projectedOraclePrice.toFixed(3)}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500">Risk Score</span>
                  <span className="text-cyan-100">{scenario.projectedRiskScore}/100</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500">PCS Response</span>
                  <span className="text-purple-100">{scenario.projectedParameterResponse}</span>
                </div>
              </div>
              <p className="mt-4 text-xs leading-6 text-zinc-400">
                {scenario.projectedRationale}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-bold">Your tVault</h2>'''

if "Projected Collateral Shock Scenarios" in s:
    print("PCS Stress Simulator section already exists.")
elif marker not in s:
    print("Your tVault insertion marker not found.")
else:
    s = s.replace(marker, stress_section, 1)
    path.write_text(s, encoding="utf-8")
    print("PCS Stress Simulator section added.")
