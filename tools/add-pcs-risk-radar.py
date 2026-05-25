from pathlib import Path

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

marker = '''      </section>

      <section className="mb-8 rounded-3xl border border-blue-400/20 bg-blue-400/[0.06] p-6 shadow-[0_0_60px_rgba(59,130,246,0.08)]">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-200">PCS Control Layer</p>'''

radar_section = '''      </section>

      <section className="mb-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.05] p-6 shadow-[0_0_60px_rgba(34,211,238,0.08)]">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">PCS Risk Radar</p>
            <h2 className="mt-2 text-2xl font-bold">Protocol Risk Breakdown</h2>
            <p className="mt-2 max-w-4xl text-zinc-400">
              PCS decomposes system risk into oracle, vault, liquidation, utilization, treasury, and system-level conditions.
            </p>
          </div>
          <div className={`rounded-full border px-4 py-2 text-sm font-bold ${
            pcsRisk.pcsRiskLevel === "Critical" || pcsRisk.pcsRiskLevel === "High Risk"
              ? "border-red-400/30 bg-red-400/10 text-red-200"
              : pcsRisk.pcsRiskLevel === "Warning"
                ? "border-orange-400/30 bg-orange-400/10 text-orange-200"
                : "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
          }`}>
            System Risk: {pcsRisk.pcsRiskLevel} · {pcsRisk.pcsRiskScore}/100
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Oracle Risk</p>
            <h3 className={`mt-3 text-2xl font-black ${pcsRisk.oracleRisk === "Critical" || pcsRisk.oracleRisk === "High" ? "text-red-300" : pcsRisk.oracleRisk === "Elevated" ? "text-orange-300" : "text-emerald-300"}`}>
              {pcsRisk.oracleRisk}
            </h3>
            <p className="mt-2 text-sm text-zinc-500">Collateral price signal from tMockOracle.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Vault Health Risk</p>
            <h3 className={`mt-3 text-2xl font-black ${pcsRisk.vaultHealthRisk === "Critical" || pcsRisk.vaultHealthRisk === "High" ? "text-red-300" : pcsRisk.vaultHealthRisk === "Moderate" ? "text-orange-300" : "text-emerald-300"}`}>
              {pcsRisk.vaultHealthRisk}
            </h3>
            <p className="mt-2 text-sm text-zinc-500">Risk level from current vault health factor.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Liquidation Pressure</p>
            <h3 className={`mt-3 text-2xl font-black ${pcsRisk.liquidationPressure === "Critical" || pcsRisk.liquidationPressure === "High" ? "text-red-300" : pcsRisk.liquidationPressure === "Rising" ? "text-orange-300" : "text-emerald-300"}`}>
              {pcsRisk.liquidationPressure}
            </h3>
            <p className="mt-2 text-sm text-zinc-500">Pressure created by collateral and debt conditions.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Borrow Utilization</p>
            <h3 className="mt-3 text-2xl font-black text-white">
              {(pcsRisk.borrowUtilization * 100).toFixed(2)}%
            </h3>
            <p className="mt-2 text-sm text-zinc-500">Debt supply relative to protocol collateral.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Treasury Coverage</p>
            <h3 className={`mt-3 text-2xl font-black ${pcsRisk.treasuryCoverage === "Weak" ? "text-red-300" : pcsRisk.treasuryCoverage === "Moderate" ? "text-orange-300" : "text-emerald-300"}`}>
              {pcsRisk.treasuryCoverage}
            </h3>
            <p className="mt-2 text-sm text-zinc-500">Collateral coverage against outstanding test credit.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">System Risk</p>
            <h3 className={`mt-3 text-2xl font-black ${pcsRisk.pcsRiskLevel === "Critical" || pcsRisk.pcsRiskLevel === "High Risk" ? "text-red-300" : pcsRisk.pcsRiskLevel === "Warning" ? "text-orange-300" : "text-emerald-300"}`}>
              {pcsRisk.pcsRiskScore}/100
            </h3>
            <p className="mt-2 text-sm text-zinc-500">{pcsRisk.pcsRiskLevel} protocol risk state.</p>
          </div>
        </div>
      </section>

      <section className="mb-8 rounded-3xl border border-blue-400/20 bg-blue-400/[0.06] p-6 shadow-[0_0_60px_rgba(59,130,246,0.08)]">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-200">PCS Control Layer</p>'''

if "Protocol Risk Breakdown" in s:
    print("PCS Risk Radar already exists.")
elif marker not in s:
    print("PCS Risk Parameter Panel insertion marker not found.")
else:
    s = s.replace(marker, radar_section, 1)
    path.write_text(s, encoding="utf-8")
    print("PCS Risk Radar section added.")
