from pathlib import Path

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

s = s.replace(
'''            <h3 className="mt-3 text-2xl font-black text-white">
              {riskStatus.label === "Liquidatable" ? "Critical" : riskStatus.label}
            </h3>''',
'''            <h3 className="mt-3 text-2xl font-black text-white">
              {pcsRisk.pcsRiskLevel}
            </h3>'''
)

s = s.replace(
'''                <span className={riskStatus.color}>{riskStatus.label}</span>''',
'''                <span className="text-cyan-100">{pcsRisk.pcsRiskLevel} · {pcsRisk.pcsRiskScore}/100</span>'''
)

s = s.replace(
'''                <span className={Number(oraclePrice) < 0.75 ? "text-orange-300" : "text-emerald-300"}>
                  {Number(oraclePrice) < 0.75 ? "Elevated" : "Low"}
                </span>''',
'''                <span className={pcsRisk.oracleRisk === "Critical" || pcsRisk.oracleRisk === "High" ? "text-red-300" : pcsRisk.oracleRisk === "Elevated" ? "text-orange-300" : "text-emerald-300"}>
                  {pcsRisk.oracleRisk}
                </span>'''
)

s = s.replace(
'''                  {riskStatus.label === "Liquidatable" ? "Liquidate" : riskStatus.label === "Warning" ? "Reduce Risk" : "Maintain LTV"}''',
'''                  {pcsRisk.suggestedParameterResponse}'''
)

path.write_text(s, encoding="utf-8")
print("Protocol Overview PCS Status synced with PCS risk engine.")
