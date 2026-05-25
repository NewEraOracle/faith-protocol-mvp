from pathlib import Path
import re

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

# Rename the oracle control panel title
s = s.replace(
    '<h3 className="text-2xl font-bold">tMockOracle Controls</h3>',
    '<h3 className="text-2xl font-bold">Oracle Shock Simulator</h3>'
)

# Replace the simple description with an institutional shock/risk panel
old_desc = '''            <p className="mt-2 min-h-[48px] text-sm text-zinc-400">Simulate tFAITH price movement and test liquidation behavior.</p>'''

new_desc = '''            <p className="mt-2 min-h-[48px] text-sm text-zinc-400">
              Simulate collateral price shocks and observe how vault health, liquidation risk, and PCS monitoring respond.
            </p>

            <div className="mt-5 rounded-2xl border border-purple-400/20 bg-purple-400/10 p-4">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-purple-200">Risk Control Panel</p>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500">Current Oracle Price</span>
                  <span className="text-white">${oraclePrice}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500">Shock Scenario</span>
                  <span className={Number(oraclePrice) < 0.75 ? "text-orange-300" : "text-emerald-300"}>
                    {Number(oraclePrice) < 0.75 ? "tFAITH crash active" : "Stable baseline"}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500">Risk Effect</span>
                  <span className={Number(oraclePrice) < 0.75 ? "text-orange-300" : "text-emerald-300"}>
                    {Number(oraclePrice) < 0.75 ? "Liquidation pressure elevated" : "Normal collateral conditions"}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500">PCS Response</span>
                  <span className="text-cyan-100">
                    {Number(oraclePrice) < 0.75 ? "Monitor unsafe vaults" : "Maintain parameters"}
                  </span>
                </div>
              </div>
            </div>'''

if old_desc not in s:
    print("Oracle description marker not found. No changes made.")
else:
    s = s.replace(old_desc, new_desc, 1)
    path.write_text(s, encoding="utf-8")
    print("Oracle Shock Simulator panel updated successfully.")
