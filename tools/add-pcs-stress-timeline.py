from pathlib import Path

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

marker = '''      </section>

      <section className="mb-8 rounded-3xl border border-purple-400/20 bg-purple-400/[0.06] p-6 shadow-[0_0_60px_rgba(168,85,247,0.08)]">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-purple-200">PCS Stress Simulator</p>'''

timeline_section = '''      </section>

      <section className="mb-8 rounded-3xl border border-fuchsia-400/20 bg-fuchsia-400/[0.06] p-6 shadow-[0_0_60px_rgba(217,70,239,0.08)]">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-fuchsia-200">PCS Stress Timeline</p>
            <h2 className="mt-2 text-2xl font-bold">Risk Progression Timeline</h2>
            <p className="mt-2 max-w-4xl text-zinc-400">
              PCS maps the current protocol state into projected collateral shock stages, showing how risk could evolve before emergency controls become necessary.
            </p>
          </div>
          <div className={`rounded-full border px-4 py-2 text-sm font-bold ${
            pcsRisk.emergencyMode
              ? "border-red-400/30 bg-red-400/10 text-red-200"
              : "border-fuchsia-300/30 bg-fuchsia-300/10 text-fuchsia-100"
          }`}>
            Emergency Trigger: {pcsRisk.emergencyMode ? "Recommended" : "Not Active"}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Current State</p>
            <h3 className={`mt-3 text-2xl font-black ${
              pcsRisk.pcsRiskLevel === "Critical" || pcsRisk.pcsRiskLevel === "High Risk"
                ? "text-red-300"
                : pcsRisk.pcsRiskLevel === "Warning"
                  ? "text-orange-300"
                  : "text-emerald-300"
            }`}>
              {pcsRisk.pcsRiskLevel}
            </h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Risk Score</span>
                <span className="text-cyan-100">{pcsRisk.pcsRiskScore}/100</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Oracle</span>
                <span className="text-white">${Number(oraclePrice).toFixed(3)}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">PCS Response</span>
                <span className="text-fuchsia-100">{pcsRisk.suggestedParameterResponse}</span>
              </div>
            </div>
          </div>

          {pcsStressScenarios.map((scenario) => (
            <div key={`timeline-${scenario.dropPercent}`} className="rounded-3xl border border-white/10 bg-black/30 p-5">
              <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">
                -{scenario.dropPercent}% Stage
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
                  <span className="text-zinc-500">Projected Score</span>
                  <span className="text-cyan-100">{scenario.projectedRiskScore}/100</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500">Projected Price</span>
                  <span className="text-white">${scenario.projectedOraclePrice.toFixed(3)}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500">PCS Response</span>
                  <span className="text-fuchsia-100">{scenario.projectedParameterResponse}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-fuchsia-300/20 bg-black/30 p-5">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-fuchsia-200">Timeline Interpretation</p>
          <p className="mt-3 text-sm leading-7 text-zinc-300">
            PCS uses the current risk score and projected shock scenarios to visualize how protocol risk could progress over time. This timeline is a testnet simulation layer for protocol monitoring and does not represent user financial advice.
          </p>
        </div>
      </section>

      <section className="mb-8 rounded-3xl border border-purple-400/20 bg-purple-400/[0.06] p-6 shadow-[0_0_60px_rgba(168,85,247,0.08)]">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-purple-200">PCS Stress Simulator</p>'''

if "Risk Progression Timeline" in s:
    print("PCS Stress Timeline already exists.")
elif marker not in s:
    print("PCS Stress Simulator insertion marker not found.")
else:
    s = s.replace(marker, timeline_section, 1)
    path.write_text(s, encoding="utf-8")
    print("PCS Stress Timeline section added.")
