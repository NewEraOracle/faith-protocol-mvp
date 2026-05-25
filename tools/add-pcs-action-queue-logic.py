from pathlib import Path

path = Path("frontend/lib/pcs.ts")
s = path.read_text(encoding="utf-8")

if "export type PCSActionQueueItem" not in s:
    s = s.replace(
'''export type PCSVaultHealthRisk = "No Debt" | "Low" | "Moderate" | "High" | "Critical";''',
'''export type PCSVaultHealthRisk = "No Debt" | "Low" | "Moderate" | "High" | "Critical";

export type PCSActionPriority = "Low" | "Medium" | "High" | "Critical";

export type PCSActionQueueItem = {
  id: string;
  title: string;
  priority: PCSActionPriority;
  reason: string;
};'''
)

if "actionQueue: PCSActionQueueItem[]" not in s:
    s = s.replace(
'''  emergencyMode: boolean;''',
'''  emergencyMode: boolean;
  actionQueue: PCSActionQueueItem[];'''
)

if "const actionQueue: PCSActionQueueItem[]" not in s:
    s = s.replace(
'''  let riskRationale =
    "Protocol conditions are stable. PCS suggests maintaining current protocol parameters.";''',
'''  const actionQueue: PCSActionQueueItem[] = [];

  if (oracleRisk === "High" || oracleRisk === "Critical") {
    actionQueue.push({
      id: "oracle-risk",
      title: "Tighten Risk Parameters",
      priority: oracleRisk === "Critical" ? "High" : "Medium",
      reason: "Oracle risk is elevated and collateral pricing conditions require tighter protocol monitoring.",
    });
  }

  if (liquidationPressure === "Critical" || liquidationPressure === "High") {
    actionQueue.push({
      id: "liquidation-pressure",
      title: "Prepare Liquidation Controls",
      priority: liquidationPressure === "Critical" ? "Critical" : "High",
      reason: "Liquidation pressure is rising and unsafe vault protection may be required.",
    });
  } else {
    actionQueue.push({
      id: "liquidation-monitor",
      title: "Monitor Liquidation Pressure",
      priority: "Low",
      reason: "Liquidation pressure remains controlled under the current testnet state.",
    });
  }

  if (treasuryCoverage === "Weak" || treasuryCoverage === "Moderate") {
    actionQueue.push({
      id: "treasury-reserves",
      title: "Increase Reserve Target",
      priority: treasuryCoverage === "Weak" ? "High" : "Medium",
      reason: "Treasury coverage requires stronger reserve protection against outstanding test credit.",
    });
  } else {
    actionQueue.push({
      id: "treasury-maintain",
      title: "Maintain Treasury Reserves",
      priority: "Low",
      reason: "Treasury coverage remains strong relative to outstanding test credit.",
    });
  }

  if (pcsRiskLevel === "Critical") {
    actionQueue.unshift({
      id: "emergency-mode",
      title: "Recommend Emergency Mode",
      priority: "Critical",
      reason: "System risk is critical and protocol solvency protection should be prioritized.",
    });
  }

  let riskRationale =
    "Protocol conditions are stable. PCS suggests maintaining current protocol parameters.";'''
)

if "actionQueue," not in s:
    s = s.replace(
'''    emergencyMode,
  };''',
'''    emergencyMode,
    actionQueue,
  };'''
)

path.write_text(s, encoding="utf-8")
print("PCS Action Queue logic added.")
