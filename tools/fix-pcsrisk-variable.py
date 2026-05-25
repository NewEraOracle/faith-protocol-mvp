from pathlib import Path

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

# Add import if missing
import_line = 'import { calculatePCSRisk } from "@/lib/pcs";\n'
if import_line not in s:
    s = s.replace('import { ethers } from "ethers";\n', 'import { ethers } from "ethers";\n' + import_line)

# Add pcsRisk useMemo after riskStatus useMemo
marker = '  }, [healthFactor, healthNumber]);'

pcs_block = '''
  const pcsRisk = useMemo(() => {
    return calculatePCSRisk({
      oraclePrice: Number(oraclePrice),
      healthFactor: healthFactor === "∞" ? null : Number(healthFactor),
      protocolCollateral: Number(protocolCollateral),
      protocolDebtSupply: Number(protocolDebtSupply),
      vaultActive,
    });
  }, [healthFactor, oraclePrice, protocolCollateral, protocolDebtSupply, vaultActive]);
'''

if "const pcsRisk = useMemo" in s:
    print("pcsRisk already exists.")
elif marker not in s:
    print("riskStatus marker not found.")
else:
    s = s.replace(marker, marker + pcs_block, 1)
    print("pcsRisk useMemo added.")

path.write_text(s, encoding="utf-8")
