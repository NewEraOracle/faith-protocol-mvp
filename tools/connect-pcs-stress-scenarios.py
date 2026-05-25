from pathlib import Path

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

# Update import
s = s.replace(
    'import { calculatePCSRisk } from "@/lib/pcs";',
    'import { calculatePCSRisk, simulatePCSStress } from "@/lib/pcs";'
)

# Add stress scenarios after pcsRisk useMemo
marker = '''  const pcsRisk = useMemo(() => {
    return calculatePCSRisk({
      oraclePrice: Number(oraclePrice),
      healthFactor: healthFactor === "∞" ? null : Number(healthFactor),
      protocolCollateral: Number(protocolCollateral),
      protocolDebtSupply: Number(protocolDebtSupply),
      vaultActive,
    });
  }, [healthFactor, oraclePrice, protocolCollateral, protocolDebtSupply, vaultActive]);'''

insert = '''  const pcsRisk = useMemo(() => {
    return calculatePCSRisk({
      oraclePrice: Number(oraclePrice),
      healthFactor: healthFactor === "∞" ? null : Number(healthFactor),
      protocolCollateral: Number(protocolCollateral),
      protocolDebtSupply: Number(protocolDebtSupply),
      vaultActive,
    });
  }, [healthFactor, oraclePrice, protocolCollateral, protocolDebtSupply, vaultActive]);

  const pcsStressScenarios = useMemo(() => {
    return simulatePCSStress({
      oraclePrice: Number(oraclePrice),
      healthFactor: healthFactor === "∞" ? null : Number(healthFactor),
      protocolCollateral: Number(protocolCollateral),
      protocolDebtSupply: Number(protocolDebtSupply),
      vaultActive,
    });
  }, [healthFactor, oraclePrice, protocolCollateral, protocolDebtSupply, vaultActive]);'''

if "const pcsStressScenarios = useMemo" in s:
    print("PCS stress scenarios already connected.")
elif marker not in s:
    print("PCS risk useMemo marker not found.")
else:
    s = s.replace(marker, insert, 1)
    print("PCS stress scenarios connected.")

path.write_text(s, encoding="utf-8")
