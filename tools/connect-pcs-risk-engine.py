from pathlib import Path
import re

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

# 1. Add import
import_line = 'import { calculatePCSRisk } from "@/lib/pcs";\n'
if import_line not in s:
    s = s.replace('import { ethers } from "ethers";\n', 'import { ethers } from "ethers";\n' + import_line)

# 2. Add pcsRisk useMemo after riskStatus useMemo
anchor = '''  const riskStatus = useMemo(() => {
    if (healthFactor === "∞") {
      return { label: "No Debt", color: "text-green-300", bg: "bg-green-500/10", border: "border-green-500/30" };
    }
    if (healthNumber < 1.1) {
      return { label: "Liquidatable", color: "text-red-300", bg: "bg-red-500/10", border: "border-red-500/30" };
    }
    if (healthNumber < 1.5) {
      return { label: "Warning", color: "text-orange-300", bg: "bg-orange-500/10", border: "border-orange-500/30" };
    }
    return { label: "Healthy", color: "text-green-300", bg: "bg-green-500/10", border: "border-green-500/30" };
  }, [healthFactor, healthNumber]);'''

pcs_block = '''  const riskStatus = useMemo(() => {
    if (healthFactor === "∞") {
      return { label: "No Debt", color: "text-green-300", bg: "bg-green-500/10", border: "border-green-500/30" };
    }
    if (healthNumber < 1.1) {
      return { label: "Liquidatable", color: "text-red-300", bg: "bg-red-500/10", border: "border-red-500/30" };
    }
    if (healthNumber < 1.5) {
      return { label: "Warning", color: "text-orange-300", bg: "bg-orange-500/10", border: "border-orange-500/30" };
    }
    return { label: "Healthy", color: "text-green-300", bg: "bg-green-500/10", border: "border-green-500/30" };
  }, [healthFactor, healthNumber]);

  const pcsRisk = useMemo(() => {
    return calculatePCSRisk({
      oraclePrice: Number(oraclePrice),
      healthFactor: healthFactor === "∞" ? null : Number(healthFactor),
      protocolCollateral: Number(protocolCollateral),
      protocolDebtSupply: Number(protocolDebtSupply),
      vaultActive,
    });
  }, [healthFactor, oraclePrice, protocolCollateral, protocolDebtSupply, vaultActive]);'''

if "const pcsRisk = useMemo" not in s:
    if anchor not in s:
        print("riskStatus anchor not found.")
    else:
        s = s.replace(anchor, pcs_block, 1)

# 3. Replace System Risk badge value inside PCS section
s = s.replace("System Risk: {riskStatus.label}", "System Risk: {pcsRisk.pcsRiskLevel} · {pcsRisk.pcsRiskScore}/100")

# 4. Replace PCS section metrics with pcsRisk values
s = re.sub(
    r'''<p className="text-xs font-black uppercase tracking-\[0\.20em\] text-zinc-400">Oracle Risk</p>\s*
            <h3 className=\{`mt-3 text-2xl font-black \$\{Number\(oraclePrice\) < 0\.75 \? "text-orange-300" : "text-emerald-300"\}`\}>\s*
              \{Number\(oraclePrice\) < 0\.75 \? "Elevated" : "Low"\}\s*
            </h3>''',
    '''<p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Oracle Risk</p>
            <h3 className={`mt-3 text-2xl font-black ${pcsRisk.oracleRisk === "Critical" || pcsRisk.oracleRisk === "High" ? "text-red-300" : pcsRisk.oracleRisk === "Elevated" ? "text-orange-300" : "text-emerald-300"}`}>
              {pcsRisk.oracleRisk}
            </h3>''',
    s,
    count=1,
    flags=re.S,
)

s = re.sub(
    r'''<p className="text-xs font-black uppercase tracking-\[0\.20em\] text-zinc-400">Treasury Coverage</p>\s*
            <h3 className="mt-3 text-2xl font-black text-emerald-300">\s*
              \{Number\(protocolCollateral\) > 0 \? "Active" : "Standby"\}\s*
            </h3>''',
    '''<p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Treasury Coverage</p>
            <h3 className={`mt-3 text-2xl font-black ${pcsRisk.treasuryCoverage === "Weak" ? "text-red-300" : pcsRisk.treasuryCoverage === "Moderate" ? "text-orange-300" : "text-emerald-300"}`}>
              {pcsRisk.treasuryCoverage}
            </h3>''',
    s,
    count=1,
    flags=re.S,
)

s = re.sub(
    r'''<p className="text-xs font-black uppercase tracking-\[0\.20em\] text-zinc-400">Liquidation Pressure</p>\s*
            <h3 className=\{`mt-3 text-2xl font-black \$\{riskStatus\.label === "Liquidatable" \? "text-red-300" : riskStatus\.label === "Warning" \? "text-orange-300" : "text-emerald-300"\}`\}>\s*
              \{riskStatus\.label === "Liquidatable" \? "Critical" : riskStatus\.label === "Warning" \? "Rising" : "Controlled"\}\s*
            </h3>''',
    '''<p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Liquidation Pressure</p>
            <h3 className={`mt-3 text-2xl font-black ${pcsRisk.liquidationPressure === "Critical" || pcsRisk.liquidationPressure === "High" ? "text-red-300" : pcsRisk.liquidationPressure === "Rising" ? "text-orange-300" : "text-emerald-300"}`}>
              {pcsRisk.liquidationPressure}
            </h3>''',
    s,
    count=1,
    flags=re.S,
)

s = re.sub(
    r'''<p className="text-xs font-black uppercase tracking-\[0\.20em\] text-zinc-400">Suggested Parameter Response</p>\s*
            <h3 className="mt-3 text-xl font-black text-cyan-100">\s*
              \{riskStatus\.label === "Liquidatable" \? "Pause / Liquidate" : riskStatus\.label === "Warning" \? "Reduce LTV" : Number\(oraclePrice\) < 0\.75 \? "Tighten Risk" : "Maintain LTV"\}\s*
            </h3>''',
    '''<p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Suggested Parameter Response</p>
            <h3 className="mt-3 text-xl font-black text-cyan-100">
              {pcsRisk.suggestedParameterResponse}
            </h3>''',
    s,
    count=1,
    flags=re.S,
)

s = re.sub(
    r'''<p className="mt-3 text-sm leading-7 text-zinc-300">\s*
            \{riskStatus\.label === "Liquidatable".*?\}\s*
          </p>''',
    '''<p className="mt-3 text-sm leading-7 text-zinc-300">
            {pcsRisk.riskRationale}
          </p>''',
    s,
    count=1,
    flags=re.S,
)

path.write_text(s, encoding="utf-8")
print("PCS risk engine connected to dashboard.")
