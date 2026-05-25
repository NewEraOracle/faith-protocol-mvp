from pathlib import Path

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

old = '''          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5 shadow-[0_0_45px_rgba(16,185,129,0.08)]">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-200">Treasury Health</p>
            <h3 className="mt-3 text-2xl font-black text-white">
              {Number(protocolCollateral) > 0 ? "Active" : "Standby"}
            </h3>
            <p className="mt-2 text-xs text-zinc-400">Protocol reserve and coverage monitor</p>

            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Reserve Status</span>
                <span className="text-emerald-300">{Number(protocolCollateral) > 0 ? "Active" : "Empty"}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Collateral</span>
                <span className="text-white">{Number(protocolCollateral).toLocaleString()} tFAITH</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Debt Coverage</span>
                <span className="text-cyan-100">
                  {Number(protocolDebtSupply) > 0 ? `${(Number(protocolCollateral) / Number(protocolDebtSupply)).toFixed(2)}x` : "No Debt"}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Treasury Action</span>
                <span className="text-emerald-300">
                  {Number(protocolDebtSupply) > 0 && Number(protocolCollateral) / Number(protocolDebtSupply) < 1.5 ? "Increase reserves" : "Maintain reserves"}
                </span>
              </div>
            </div>
          </div>'''

new = '''          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5 shadow-[0_0_45px_rgba(16,185,129,0.08)]">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-200">Treasury Health</p>
            <h3 className={`mt-3 text-2xl font-black ${
              pcsRisk.treasuryCoverage === "Weak"
                ? "text-red-300"
                : pcsRisk.treasuryCoverage === "Moderate"
                  ? "text-orange-300"
                  : "text-emerald-300"
            }`}>
              {pcsRisk.treasuryCoverage}
            </h3>
            <p className="mt-2 text-xs text-zinc-400">PCS reserve coverage and risk buffer monitor</p>

            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Reserve Status</span>
                <span className={Number(protocolCollateral) > 0 ? "text-emerald-300" : "text-zinc-400"}>
                  {Number(protocolCollateral) > 0 ? "Active" : "Empty"}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Collateral</span>
                <span className="text-white">{Number(protocolCollateral).toLocaleString()} tFAITH</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Debt Coverage</span>
                <span className="text-cyan-100">
                  {pcsRisk.debtCoverageRatio === null ? "No Debt" : `${pcsRisk.debtCoverageRatio.toFixed(2)}x`}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Reserve Target</span>
                <span className="text-blue-100">{pcsRisk.treasuryReserveTarget}%</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Treasury Action</span>
                <span className={pcsRisk.treasuryCoverage === "Weak" || pcsRisk.treasuryCoverage === "Moderate" ? "text-orange-300" : "text-emerald-300"}>
                  {pcsRisk.treasuryCoverage === "Weak"
                    ? "Increase reserves"
                    : pcsRisk.treasuryCoverage === "Moderate"
                      ? "Monitor reserves"
                      : "Maintain reserves"}
                </span>
              </div>
            </div>
          </div>'''

if old not in s:
    print("Treasury Health block not found.")
else:
    s = s.replace(old, new, 1)
    path.write_text(s, encoding="utf-8")
    print("Treasury Health upgraded with PCS coverage logic.")
