import { InfoCard, PublicPage } from "../components/PublicPage";

export default function SimulationPage() {
  return (
    <PublicPage
      label="SIMULATION"
      title="Test the FAITH credit, treasury, and PCS risk loop."
      intro="The FAITH simulation demonstrates how vault deposits, FUSD credit creation, oracle shocks, liquidation pressure, treasury protection, and PCS risk evaluation can work together inside a testnet environment."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard title="Vault Cycle">
          <p>
            The simulation shows the basic protocol flow: collateral enters a vault,
            FUSD credit is created, vault health changes, and PCS monitors system risk.
          </p>
        </InfoCard>

        <InfoCard title="Oracle Shock">
          <p>
            The demo can model collateral stress events to show how changing market
            conditions affect borrowing capacity, liquidation pressure, and protocol safety.
          </p>
        </InfoCard>

        <InfoCard title="PCS Risk Evaluation">
          <p>
            PCS observes vault health, collateral stress, treasury coverage, credit utilization,
            and liquidation pressure to help the protocol understand when risk is increasing.
          </p>
        </InfoCard>

        <InfoCard title="Treasury Protection">
          <p>
            Treasury resilience is designed to protect the economic system during stress,
            support long-term solvency, and reduce dependence on speculative growth.
          </p>
        </InfoCard>

        <InfoCard title="MegaETH Execution">
          <p>
            MegaETH provides the real-time execution environment for fast protocol updates,
            rapid state awareness, and high-performance financial interactions.
          </p>
        </InfoCard>

        <InfoCard title="Testnet Boundary">
          <p>
            This simulation is for testnet demonstration only. It does not manage real user
            capital, execute live liquidations, provide financial advice, or represent a live investment product.
          </p>
        </InfoCard>
      </div>
    </PublicPage>
  );
}


