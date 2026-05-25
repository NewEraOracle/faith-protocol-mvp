from pathlib import Path

path = Path("frontend/lib/pcs.ts")
s = path.read_text(encoding="utf-8")

old = '''    const projected = calculatePCSRisk({
      ...input,
      oraclePrice: projectedOraclePrice,
    });

    let projectedRationale = "";

    if (projected.pcsRiskLevel === "Critical") {
      projectedRationale =
        `If collateral drops another ${dropPercent}%, PCS projects critical protocol risk and suggests emergency risk controls.`;
    } else if (projected.pcsRiskLevel === "High Risk") {
      projectedRationale =
        `If collateral drops another ${dropPercent}%, PCS projects high protocol risk and suggests reducing LTV or increasing reserves.`;
    } else if (projected.pcsRiskLevel === "Warning") {
      projectedRationale =
        `If collateral drops another ${dropPercent}%, PCS projects elevated risk and suggests tightening protocol parameters.`;
    } else {
      projectedRationale =
        `If collateral drops another ${dropPercent}%, PCS still projects controlled conditions under current testnet state.`;
    }

    return {
      dropPercent,
      projectedOraclePrice,
      projectedRiskScore: projected.pcsRiskScore,
      projectedRiskLevel: projected.pcsRiskLevel,
      projectedParameterResponse: projected.suggestedParameterResponse,
      projectedRationale,
    };'''

new = '''    const projected = calculatePCSRisk({
      ...input,
      oraclePrice: projectedOraclePrice,
    });

    // Stress projection overlay:
    // The simulator adds an explicit shock penalty so the timeline shows
    // how risk escalates as collateral deterioration continues.
    const shockPenalty =
      dropPercent >= 30 ? 60 :
      dropPercent >= 20 ? 40 :
      dropPercent >= 10 ? 20 :
      0;

    const projectedRiskScore = clampScore(projected.pcsRiskScore + shockPenalty);

    let projectedRiskLevel: PCSRiskLevel = "Healthy";
    if (projectedRiskScore >= 81) projectedRiskLevel = "Critical";
    else if (projectedRiskScore >= 61) projectedRiskLevel = "High Risk";
    else if (projectedRiskScore >= 31) projectedRiskLevel = "Warning";

    let projectedParameterResponse = "Maintain LTV";
    if (projectedRiskLevel === "Critical") {
      projectedParameterResponse = "Emergency Mode / Pause Borrowing";
    } else if (projectedRiskLevel === "High Risk") {
      projectedParameterResponse = "Reduce LTV / Increase Reserves";
    } else if (projectedRiskLevel === "Warning") {
      projectedParameterResponse = "Tighten Risk Parameters";
    }

    let projectedRationale = "";

    if (projectedRiskLevel === "Critical") {
      projectedRationale =
        `If collateral drops another ${dropPercent}%, PCS projects critical protocol risk and suggests emergency controls, borrowing restrictions, and solvency protection.`;
    } else if (projectedRiskLevel === "High Risk") {
      projectedRationale =
        `If collateral drops another ${dropPercent}%, PCS projects high protocol risk and suggests reducing LTV, increasing reserve targets, and limiting new risk expansion.`;
    } else if (projectedRiskLevel === "Warning") {
      projectedRationale =
        `If collateral drops another ${dropPercent}%, PCS projects elevated risk and suggests tightening protocol parameters.`;
    } else {
      projectedRationale =
        `If collateral drops another ${dropPercent}%, PCS still projects controlled conditions under current testnet state.`;
    }

    return {
      dropPercent,
      projectedOraclePrice,
      projectedRiskScore,
      projectedRiskLevel,
      projectedParameterResponse,
      projectedRationale,
    };'''

if old not in s:
    print("Stress simulator block not found.")
else:
    s = s.replace(old, new, 1)
    path.write_text(s, encoding="utf-8")
    print("PCS stress projection escalation upgraded.")
