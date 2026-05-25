from pathlib import Path

path = Path("frontend/lib/pcs.ts")
s = path.read_text(encoding="utf-8")

s = s.replace(
'''  let pcsRiskLevel: PCSRiskLevel = "Healthy";

  if (pcsRiskScore >= 81) pcsRiskLevel = "Critical";
  else if (pcsRiskScore >= 61) pcsRiskLevel = "High Risk";
  else if (pcsRiskScore >= 31) pcsRiskLevel = "Warning";''',
'''  let pcsRiskLevel: PCSRiskLevel = "Healthy";

  if (pcsRiskScore >= 81) pcsRiskLevel = "Critical";
  else if (pcsRiskScore >= 61) pcsRiskLevel = "High Risk";
  else if (pcsRiskScore >= 31 || oracleRisk === "High" || oracleRisk === "Critical") pcsRiskLevel = "Warning";'''
)

s = s.replace(
'''  if (pcsRiskLevel === "Critical") {
    suggestedParameterResponse = "Pause Borrowing / Allow Liquidation";
  } else if (pcsRiskLevel === "High Risk") {
    suggestedParameterResponse = "Reduce LTV / Increase Reserves";
  } else if (pcsRiskLevel === "Warning") {
    suggestedParameterResponse = "Tighten Risk Parameters";
  }''',
'''  if (pcsRiskLevel === "Critical") {
    suggestedParameterResponse = "Pause Borrowing / Allow Liquidation";
  } else if (pcsRiskLevel === "High Risk") {
    suggestedParameterResponse = "Reduce LTV / Increase Reserves";
  } else if (pcsRiskLevel === "Warning" || oracleRisk === "High" || oracleRisk === "Critical") {
    suggestedParameterResponse = "Tighten Risk Parameters";
  }'''
)

s = s.replace(
'''  if (pcsRiskLevel === "Warning") {
    riskRationale =
      "PCS detected early risk signals from oracle conditions, vault health, borrow utilization, or treasury coverage. PCS suggests closer monitoring and tighter risk parameters.";
  }''',
'''  if (pcsRiskLevel === "Warning") {
    riskRationale =
      oracleRisk === "High" || oracleRisk === "Critical"
        ? "PCS detected elevated oracle risk. Even with controlled liquidation pressure, PCS suggests tighter protocol risk parameters until collateral pricing conditions stabilize."
        : "PCS detected early risk signals from oracle conditions, vault health, borrow utilization, or treasury coverage. PCS suggests closer monitoring and tighter risk parameters.";
  }'''
)

path.write_text(s, encoding="utf-8")
print("PCS oracle risk floor fixed.")
