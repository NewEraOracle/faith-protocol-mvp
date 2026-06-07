import { InfoCard, PublicPage } from "../components/PublicPage";

export default function GovernancePage() {
  return (
    <PublicPage
      label="GOVERNANCE"
      title="Risk-aware governance guided by PCS and treasury discipline."
      intro="Faith Monetary Protocol governance is designed to evolve from early core-team execution into a disciplined coordination system where PCS monitors risk, treasury health protects the economy, and governance approves controlled protocol changes."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard title="PCS-Guided Governance">
          <p>
            PCS does not replace governance. PCS upgrades governance with protocol-level
            risk intelligence across collateral stress, credit utilization, liquidation pressure,
            treasury coverage, and system health.
          </p>
        </InfoCard>

        <InfoCard title="Treasury Governance">
          <p>
            Treasury governance focuses on reserve strength, capital discipline, protocol
            solvency, controlled growth, FXTC treasury alignment, and long-term economic resilience.
          </p>
        </InfoCard>

        <InfoCard title="Risk Parameters">
          <p>
            Future governance can manage borrow limits, collateral thresholds, reserve coverage,
            utilization boundaries, liquidation conditions, and protocol emergency controls.
          </p>
        </InfoCard>

        <InfoCard title="Emergency Controls">
          <p>
            In stress scenarios, PCS can help identify when the protocol should tighten risk,
            reduce credit expansion, protect treasury reserves, or recommend emergency-mode actions.
          </p>
        </InfoCard>

        <InfoCard title="Governance Direction">
          <p>
            The long-term goal is not blind voting. FAITH governance should become an informed,
            risk-aware coordination layer that supports sustainable economic growth.
          </p>
        </InfoCard>

        <InfoCard title="Public Boundary">
          <p>
            Public governance pages explain principles and direction without exposing private
            PCS formulas, treasury thresholds, risk scoring logic, or proprietary defense mechanisms.
          </p>
        </InfoCard>
      </div>
    </PublicPage>
  );
}
