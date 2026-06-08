import { InfoCard, PublicPage } from "../components/PublicPage";

export default function EconomicsPage() {
  return (
    <PublicPage
      label="FAITH ECONOMICS"
      title="Three assets. One PCS-regulated economy."
      intro="Faith Monetary Protocol separates growth, credit, and treasury capital into a clear economic engine. FXMP drives public growth and coordination, FUSD powers internal credit activity, and FXTC strengthens long-term treasury resilience."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <InfoCard title="FXMP — Growth Token">
          <p>
            FXMP is the public growth and coordination token of Faith Monetary Protocol.
            It is designed for ecosystem exposure, governance direction, access, protocol
            participation, and long-term network expansion.
          </p>
        </InfoCard>

        <InfoCard title="FUSD — Credit Asset">
          <p>
            FUSD is the internal credit asset minted by protocol vaults. It powers borrowing,
            repayments, liquidations, liquidity movement, and productive on-chain economic activity.
          </p>
        </InfoCard>

        <InfoCard title="FXTC — Treasury Capital Token">
          <p>
            FXTC is the treasury-aligned capital layer for long-term participants. It supports
            reserve strength, treasury growth, capital discipline, and more stable exposure to
            the development of the protocol.
          </p>
        </InfoCard>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <InfoCard title="Economic Flow">
          <p>
            Productive activity creates demand for credit. Vaults mint FUSD. FUSD circulates
            through the economy. Treasury protection grows with disciplined activity. PCS monitors
            risk and helps regulate the expansion.
          </p>
        </InfoCard>

        <InfoCard title="PCS Regulation">
          <p>
            PCS monitors treasury coverage, collateral stress, liquidation pressure, credit
            utilization, and systemic risk. The goal is not uncontrolled growth, but growth
            that remains protected by treasury strength and risk control.
          </p>
        </InfoCard>

        <InfoCard title="Treasury Resilience">
          <p>
            The treasury is designed to protect the economy during stress, support long-term
            solvency, and give the protocol a stronger foundation than emission-driven systems.
          </p>
        </InfoCard>

        <InfoCard title="Economic Thesis">
          <p>
            FXMP captures growth. FUSD moves credit. FXTC strengthens treasury capital.
            PCS regulates the system. MegaETH executes the economy in real time.
          </p>
        </InfoCard>
      </div>
    </PublicPage>
  );
}



