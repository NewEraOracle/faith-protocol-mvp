from pathlib import Path

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

needle = '<h2 className="text-2xl font-bold">Your tVault</h2>'

if "PCS Parameter Engine" in s:
    print("PCS Parameter Engine already exists. No changes made.")
elif needle not in s:
    print("Your tVault title not found. No changes made.")
else:
    h2_index = s.find(needle)
    section_start = s.rfind('      <section', 0, h2_index)

    if section_start == -1:
        print("Your tVault section start not found.")
    else:
        pcs_section = '''      <section className="mb-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.06] p-6 shadow-[0_0_60px_rgba(34,211,238,0.08)]">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">PCS Risk Module</p>
            <h2 className="mt-2 text-2xl font-bold">PCS Parameter Engine</h2>
            <p className="mt-2 max-w-4xl text-zinc-400">
              Rule-based protocol risk module for the MVP. PCS reads testnet protocol conditions and suggests
              protocol-level parameter responses. It does not provide financial advice, investment advice, or user trading recommendations.
            </p>
          </div>
          <div className={`rounded-full border px-4 py-2 text-sm font-bold ${riskStatus.bg} ${riskStatus.border} ${riskStatus.color}`}>
            System Risk: {riskStatus.label}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Oracle Risk</p>
            <h3 className={`mt-3 text-2xl font-black ${Number(oraclePrice) < 0.75 ? "text-orange-300" : "text-emerald-300"}`}>
              {Number(oraclePrice) < 0.75 ? "Elevated" : "Low"}
            </h3>
            <p className="mt-2 text-sm text-zinc-500">Oracle price shock sensitivity.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Treasury Coverage</p>
            <h3 className="mt-3 text-2xl font-black text-emerald-300">
              {Number(protocolCollateral) > 0 ? "Active" : "Standby"}
            </h3>
            <p className="mt-2 text-sm text-zinc-500">Reserve visibility for credit risk protection.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Liquidation Pressure</p>
            <h3 className={`mt-3 text-2xl font-black ${riskStatus.label === "Liquidatable" ? "text-red-300" : riskStatus.label === "Warning" ? "text-orange-300" : "text-emerald-300"}`}>
              {riskStatus.label === "Liquidatable" ? "Critical" : riskStatus.label === "Warning" ? "Rising" : "Controlled"}
            </h3>
            <p className="mt-2 text-sm text-zinc-500">Vault safety pressure from debt and collateral changes.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Suggested Parameter Response</p>
            <h3 className="mt-3 text-xl font-black text-cyan-100">
              {riskStatus.label === "Liquidatable" ? "Pause / Liquidate" : riskStatus.label === "Warning" ? "Reduce LTV" : Number(oraclePrice) < 0.75 ? "Tighten Risk" : "Maintain LTV"}
            </h3>
            <p className="mt-2 text-sm text-zinc-500">Protocol-level response for the current testnet state.</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-black/30 p-5">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Risk Rationale</p>
          <p className="mt-3 text-sm leading-7 text-zinc-300">
            {riskStatus.label === "Liquidatable"
              ? "Vault conditions are critical. PCS suggests protecting protocol solvency by allowing liquidation logic and preventing additional risk expansion."
              : riskStatus.label === "Warning"
                ? "Vault health is weakening. PCS suggests reducing protocol risk exposure, monitoring liquidation pressure, and tightening credit parameters."
                : Number(oraclePrice) < 0.75
                  ? "Oracle conditions are stressed. PCS suggests tightening protocol risk parameters until collateral conditions stabilize."
                  : "Collateral conditions are stable, oracle risk is low, treasury coverage is active, and liquidation pressure remains controlled. PCS suggests maintaining current protocol parameters."}
          </p>
        </div>
      </section>

'''

        s = s[:section_start] + pcs_section + s[section_start:]
        path.write_text(s, encoding="utf-8")
        print("PCS Parameter Engine added successfully.")
