from pathlib import Path

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

# Make Your tVault grid support 8 cards
s = s.replace(
    '<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-7">',
    '<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-8">',
    1
)

marker = '''          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-sm text-zinc-400">Health Factor</p>'''

liquidation_card = '''          <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-5 shadow-[0_0_45px_rgba(244,63,94,0.08)]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-rose-200">Liquidation Risk</p>
            <h3 className={`mt-3 text-2xl font-black ${riskStatus.label === "Liquidatable" ? "text-red-300" : riskStatus.label === "Warning" ? "text-orange-300" : "text-white"}`}>
              {riskStatus.label === "Liquidatable" ? "Critical" : riskStatus.label === "Warning" ? "Warning" : "Controlled"}
            </h3>
            <p className="mt-2 text-xs text-zinc-400">Vault safety and liquidation monitor</p>

            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Current Status</span>
                <span className={riskStatus.color}>{riskStatus.label}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Health Factor</span>
                <span className="text-white">{healthFactor}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Debt Position</span>
                <span className="text-white">{Number(debt).toLocaleString()} tfUSD</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Collateral at Risk</span>
                <span className={riskStatus.label === "Liquidatable" ? "text-red-300" : riskStatus.label === "Warning" ? "text-orange-300" : "text-emerald-300"}>
                  {riskStatus.label === "No Debt" ? "None" : `${Number(collateral).toLocaleString()} tFAITH`}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Protocol Response</span>
                <span className="text-cyan-100">
                  {riskStatus.label === "Liquidatable" ? "Allow liquidation" : riskStatus.label === "Warning" ? "Monitor vault" : "No action"}
                </span>
              </div>
            </div>
          </div>

'''

if "Liquidation Risk" in s:
    print("Liquidation Risk already exists. No changes made.")
elif marker not in s:
    print("Health Factor marker not found. No changes made.")
else:
    s = s.replace(marker, liquidation_card + marker, 1)
    path.write_text(s, encoding="utf-8")
    print("Liquidation Risk card added successfully.")
