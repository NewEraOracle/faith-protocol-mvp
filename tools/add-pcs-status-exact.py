from pathlib import Path

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

old = '''        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total tFAITH Collateral" value={Number(protocolCollateral).toLocaleString()} helper="Held inside tVaultManager" />
          <MetricCard label="Total tfUSD Debt Supply" value={Number(protocolDebtSupply).toLocaleString()} helper="Outstanding test credit" />
          <MetricCard label="tFAITH Oracle Price" value={`$${oraclePrice}`} helper="tMockOracle live value" />
          <MetricCard label="tVault Address" value={`${VAULT_MANAGER_ADDRESS.slice(0, 6)}...${VAULT_MANAGER_ADDRESS.slice(-4)}`} helper="Current test deployment" />
        </div>'''

new = '''        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5 shadow-[0_0_45px_rgba(34,211,238,0.08)]">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-200">PCS Status</p>
            <h3 className="mt-3 text-2xl font-black text-white">
              {riskStatus.label === "Liquidatable" ? "Critical" : riskStatus.label === "Warning" ? "Watch" : "Healthy"}
            </h3>
            <p className="mt-2 text-xs text-zinc-400">Parameter Control System monitor</p>

            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">System Risk</span>
                <span className={riskStatus.color}>{riskStatus.label}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Oracle Risk</span>
                <span className={Number(oraclePrice) < 0.75 ? "text-orange-300" : "text-emerald-300"}>
                  {Number(oraclePrice) < 0.75 ? "Elevated" : "Low"}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Treasury</span>
                <span className="text-emerald-300">{Number(protocolCollateral) > 0 ? "Active" : "Standby"}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">PCS Action</span>
                <span className="text-cyan-100">
                  {riskStatus.label === "Liquidatable" ? "Liquidate" : riskStatus.label === "Warning" ? "Reduce Risk" : "Maintain LTV"}
                </span>
              </div>
            </div>
          </div>

          <MetricCard label="Total tFAITH Collateral" value={Number(protocolCollateral).toLocaleString()} helper="Held inside tVaultManager" />
          <MetricCard label="Total tfUSD Debt Supply" value={Number(protocolDebtSupply).toLocaleString()} helper="Outstanding test credit" />
          <MetricCard label="tFAITH Oracle Price" value={`$${oraclePrice}`} helper="tMockOracle live value" />
          <MetricCard label="tVault Address" value={`${VAULT_MANAGER_ADDRESS.slice(0, 6)}...${VAULT_MANAGER_ADDRESS.slice(-4)}`} helper="Current test deployment" />
        </div>'''

if old not in s:
    print("Exact block not found. No changes made.")
else:
    s = s.replace(old, new, 1)
    path.write_text(s, encoding="utf-8")
    print("PCS Status card added successfully.")
