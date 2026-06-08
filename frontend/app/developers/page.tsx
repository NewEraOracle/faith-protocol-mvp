import { InfoCard, PublicPage } from "../components/PublicPage";

export default function DevelopersPage() {
  return (
    <PublicPage
      label="DEVELOPERS"
      title="Build with FAITH credit, treasury, and PCS infrastructure."
      intro="Faith Monetary Protocol gives developers a testnet foundation for building around vault-based credit, treasury-aware applications, PCS risk intelligence, and MegaETH-native real-time execution."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard title="Core Smart Contract Modules">
          <p>
            The current MVP includes CreditEngine, Treasury, PCS Monitor, SettlementAdapter,
            MockUSDm, FXMP testnet collateral, FUSD testnet credit, and dashboard-connected
            vault simulation flows.
          </p>
        </InfoCard>

        <InfoCard title="MegaETH-Native Execution">
          <p>
            FAITH is designed for high-speed state awareness, real-time vault health,
            fast risk monitoring, and low-latency user interactions on MegaETH testnet infrastructure.
          </p>
        </InfoCard>

        <InfoCard title="Builder Integration Paths">
          <p>
            Developers can build around dashboards, vault analytics, treasury visibility,
            risk monitoring, economic simulations, credit flows, AI agents, and future
            ecosystem applications.
          </p>
        </InfoCard>

        <InfoCard title="PCS Risk Intelligence">
          <p>
            PCS gives builders a protocol-level risk framework for collateral stress,
            treasury coverage, liquidation pressure, utilization, and emergency-mode logic.
          </p>
        </InfoCard>

        <InfoCard title="Public Documentation Boundary">
          <p>
            Public docs explain the architecture and integration direction while keeping
            proprietary PCS formulas, treasury thresholds, and private strategy logic protected.
          </p>
        </InfoCard>

        <InfoCard title="Developer Roadmap">
          <p>
            Future developer releases may include SDKs, contract references, example apps,
            indexers, analytics endpoints, builder grants, and ecosystem application templates.
          </p>
        </InfoCard>
      </div>
    </PublicPage>
  );
}



