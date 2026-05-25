from pathlib import Path

path = Path("frontend/lib/pcs.ts")
s = path.read_text(encoding="utf-8")

if "export function simulatePCSStress" in s:
    print("PCS Stress Simulator already exists.")
else:
    s += '''

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
'''

    path.write_text(s, encoding="utf-8")
    print("PCS Stress Simulator logic added.")
