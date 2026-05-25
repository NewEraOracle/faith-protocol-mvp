export type PCSRiskLevel = "Healthy" | "Warning" | "High Risk" | "Critical";

export type PCSOracleRisk = "Low" | "Elevated" | "High" | "Critical";
export type PCSTreasuryCoverage = "No Debt" | "Strong" | "Moderate" | "Weak";
export type PCSLiquidationPressure = "Controlled" | "Rising" | "High" | "Critical";
export type PCSVaultHealthRisk = "No Debt" | "Low" | "Moderate" | "High" | "Critical";

export type PCSRiskInput = {
  oraclePrice: number;
  healthFactor: number | null;
  protocolCollateral: number;
  protocolDebtSupply: number;
  vaultActive: boolean;
};

export type PCSRiskOutput = {
  pcsRiskScore: number;
  pcsRiskLevel: PCSRiskLevel;
  oracleRisk: PCSOracleRisk;
  vaultHealthRisk: PCSVaultHealthRisk;
  treasuryCoverage: PCSTreasuryCoverage;
  liquidationPressure: PCSLiquidationPressure;
  borrowUtilization: number;
  debtCoverageRatio: number | null;
  suggestedParameterResponse: string;
  riskRationale: string;
  currentLTV: number;
  suggestedLTV: number;
  liquidationThreshold: number;
  treasuryReserveTarget: number;
  emergencyMode: boolean;
};

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function calculatePCSRisk(input: PCSRiskInput): PCSRiskOutput {
  const {
    oraclePrice,
    healthFactor,
    protocolCollateral,
    protocolDebtSupply,
    vaultActive,
  } = input;

  let score = 0;

  let oracleRisk: PCSOracleRisk = "Low";

  // Oracle Risk: max 25 points
  if (oraclePrice < 0.4) {
    score += 25;
    oracleRisk = "Critical";
  } else if (oraclePrice < 0.6) {
    score += 20;
    oracleRisk = "High";
  } else if (oraclePrice < 0.75) {
    score += 15;
    oracleRisk = "Elevated";
  } else if (oraclePrice < 1.0) {
    score += 8;
    oracleRisk = "Elevated";
  }

  // Vault Health Risk: max 25 points
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
  }

  let liquidationPressure: PCSLiquidationPressure = "Controlled";

  // Liquidation Pressure: max 20 points
  if (vaultActive && healthFactor !== null && Number.isFinite(healthFactor)) {
    if (healthFactor < 1.05) {
      score += 20;
      liquidationPressure = "Critical";
    } else if (healthFactor < 1.2) {
      score += 15;
      liquidationPressure = "High";
    } else if (healthFactor < 1.5) {
      score += 10;
      liquidationPressure = "Rising";
    } else if (healthFactor < 2.0) {
      score += 5;
      liquidationPressure = "Rising";
    }
  }

  // Borrow Utilization: max 15 points
  const borrowUtilization =
    protocolCollateral > 0 ? protocolDebtSupply / protocolCollateral : 0;

  if (borrowUtilization > 0.8) score += 15;
  else if (borrowUtilization > 0.6) score += 11;
  else if (borrowUtilization > 0.4) score += 7;
  else if (borrowUtilization > 0.2) score += 3;

  // Treasury Coverage: max 15 points
  const debtCoverageRatio =
    protocolDebtSupply > 0 ? protocolCollateral / protocolDebtSupply : null;

  let treasuryCoverage: PCSTreasuryCoverage = "No Debt";

  if (debtCoverageRatio === null) {
    treasuryCoverage = "No Debt";
  } else if (debtCoverageRatio < 1.2) {
    score += 15;
    treasuryCoverage = "Weak";
  } else if (debtCoverageRatio < 1.5) {
    score += 10;
    treasuryCoverage = "Moderate";
  } else if (debtCoverageRatio < 2.0) {
    score += 5;
    treasuryCoverage = "Moderate";
  } else {
    treasuryCoverage = "Strong";
  }

  const pcsRiskScore = clampScore(score);

  let pcsRiskLevel: PCSRiskLevel = "Healthy";

  if (pcsRiskScore >= 81) pcsRiskLevel = "Critical";
  else if (pcsRiskScore >= 61) pcsRiskLevel = "High Risk";
  else if (pcsRiskScore >= 31 || oracleRisk === "High" || oracleRisk === "Critical") pcsRiskLevel = "Warning";

  const currentLTV = 60;
  const liquidationThreshold = 110;

  let suggestedLTV = 60;
  let treasuryReserveTarget = 15;
  let emergencyMode = false;

  let suggestedParameterResponse = "Maintain LTV";

  if (pcsRiskLevel === "Critical") {
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
  }

  let riskRationale =
    "Protocol conditions are stable. PCS suggests maintaining current protocol parameters.";

  if (pcsRiskLevel === "Warning") {
    riskRationale =
      oracleRisk === "High" || oracleRisk === "Critical"
        ? "PCS detected elevated oracle risk. Even with controlled liquidation pressure, PCS suggests tighter protocol risk parameters until collateral pricing conditions stabilize."
        : "PCS detected early risk signals from oracle conditions, vault health, borrow utilization, or treasury coverage. PCS suggests closer monitoring and tighter risk parameters.";
  }

  if (pcsRiskLevel === "High Risk") {
    riskRationale =
      "PCS detected elevated protocol risk. PCS suggests reducing LTV, increasing reserve targets, and limiting additional risk exposure until conditions stabilize.";
  }

  if (pcsRiskLevel === "Critical") {
    riskRationale =
      "PCS detected critical protocol risk. The system should prioritize solvency protection, liquidation logic, and emergency risk controls.";
  }

  return {
    pcsRiskScore,
    pcsRiskLevel,
    oracleRisk,
    vaultHealthRisk,
    treasuryCoverage,
    liquidationPressure,
    borrowUtilization,
    debtCoverageRatio,
    suggestedParameterResponse,
    riskRationale,
    currentLTV,
    suggestedLTV,
    liquidationThreshold,
    treasuryReserveTarget,
    emergencyMode,
  };
}


export type PCSStressScenario = {
  dropPercent: number;
  projectedOraclePrice: number;
  projectedRiskScore: number;
  projectedRiskLevel: PCSRiskLevel;
  projectedParameterResponse: string;
  projectedRationale: string;
};

export function simulatePCSStress(
  input: PCSRiskInput,
  dropPercents: number[] = [10, 20, 30]
): PCSStressScenario[] {
  return dropPercents.map((dropPercent) => {
    const projectedOraclePrice =
      input.oraclePrice * (1 - dropPercent / 100);

    const projected = calculatePCSRisk({
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
    };
  });
}
