from pathlib import Path

path = Path("frontend/lib/pcs.ts")
s = path.read_text(encoding="utf-8")

s = s.replace(
'''  suggestedParameterResponse: string;
  riskRationale: string;''',
'''  suggestedParameterResponse: string;
  riskRationale: string;
  currentLTV: number;
  suggestedLTV: number;
  liquidationThreshold: number;
  treasuryReserveTarget: number;
  emergencyMode: boolean;'''
)

s = s.replace(
'''  let suggestedParameterResponse = "Maintain LTV";''',
'''  const currentLTV = 60;
  const liquidationThreshold = 110;

  let suggestedLTV = 60;
  let treasuryReserveTarget = 15;
  let emergencyMode = false;

  let suggestedParameterResponse = "Maintain LTV";'''
)

s = s.replace(
'''  if (pcsRiskLevel === "Critical") {
    suggestedParameterResponse = "Pause Borrowing / Allow Liquidation";
  } else if (pcsRiskLevel === "High Risk") {
    suggestedParameterResponse = "Reduce LTV / Increase Reserves";
  } else if (pcsRiskLevel === "Warning" || oracleRisk === "High" || oracleRisk === "Critical") {
    suggestedParameterResponse = "Tighten Risk Parameters";
  }''',
'''  if (pcsRiskLevel === "Critical") {
    suggestedParameterResponse = "Pause Borrowing / Allow Liquidation";
    suggestedLTV = 35;
    treasuryReserveTarget = 30;
    emergencyMode = true;
  } else if (pcsRiskLevel === "High Risk") {
    suggestedParameterResponse = "Reduce LTV / Increase Reserves";
    suggestedLTV = 45;
    treasuryReserveTarget = 25;
  } else if (pcsRiskLevel === "Warning" || oracleRisk === "High" || oracleRisk === "Critical") {
    suggestedParameterResponse = "Tighten Risk Parameters";
    suggestedLTV = 50;
    treasuryReserveTarget = 20;
  }'''
)

s = s.replace(
'''    suggestedParameterResponse,
    riskRationale,
  };''',
'''    suggestedParameterResponse,
    riskRationale,
    currentLTV,
    suggestedLTV,
    liquidationThreshold,
    treasuryReserveTarget,
    emergencyMode,
  };'''
)

path.write_text(s, encoding="utf-8")
print("PCS parameter outputs added.")
