from pathlib import Path

path = Path("frontend/lib/pcs.ts")
s = path.read_text(encoding="utf-8")

# Add type
s = s.replace(
'''export type PCSLiquidationPressure = "Controlled" | "Rising" | "High" | "Critical";''',
'''export type PCSLiquidationPressure = "Controlled" | "Rising" | "High" | "Critical";
export type PCSVaultHealthRisk = "No Debt" | "Low" | "Moderate" | "High" | "Critical";'''
)

# Add output field
s = s.replace(
'''  oracleRisk: PCSOracleRisk;
  treasuryCoverage: PCSTreasuryCoverage;''',
'''  oracleRisk: PCSOracleRisk;
  vaultHealthRisk: PCSVaultHealthRisk;
  treasuryCoverage: PCSTreasuryCoverage;'''
)

# Add vaultHealthRisk logic before Vault Health Risk scoring
s = s.replace(
'''  // Vault Health Risk: max 25 points
  if (vaultActive && healthFactor !== null && Number.isFinite(healthFactor)) {
    if (healthFactor < 1.05) score += 25;
    else if (healthFactor < 1.2) score += 20;
    else if (healthFactor < 1.5) score += 12;
    else if (healthFactor < 2.0) score += 6;
  }''',
'''  // Vault Health Risk: max 25 points
  let vaultHealthRisk: PCSVaultHealthRisk = "No Debt";

  if (vaultActive && healthFactor !== null && Number.isFinite(healthFactor)) {
    if (healthFactor < 1.05) {
      score += 25;
      vaultHealthRisk = "Critical";
    } else if (healthFactor < 1.2) {
      score += 20;
      vaultHealthRisk = "High";
    } else if (healthFactor < 1.5) {
      score += 12;
      vaultHealthRisk = "Moderate";
    } else if (healthFactor < 2.0) {
      score += 6;
      vaultHealthRisk = "Moderate";
    } else {
      vaultHealthRisk = "Low";
    }
  }'''
)

# Return vaultHealthRisk
s = s.replace(
'''    pcsRiskLevel,
    oracleRisk,''',
'''    pcsRiskLevel,
    oracleRisk,
    vaultHealthRisk,'''
)

path.write_text(s, encoding="utf-8")
print("PCS vault health risk output added.")
