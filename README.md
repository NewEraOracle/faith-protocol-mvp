# FAITH Protocol

**PCS-regulated credit and treasury infrastructure for autonomous onchain economies on MegaETH.**

FAITH Protocol is a testnet MVP exploring machine-regulated credit, treasury resilience, vault-based borrowing, oracle shock simulation, liquidation-risk visibility, and protocol-level risk intelligence through PCS, the Protocol Control System.

## Current Stage

**Testnet MVP**

FAITH does not currently manage real user capital, offer guaranteed yield, issue live treasury certificates, or provide financial advice.

## What the MVP Demonstrates

- tFAITH testnet collateral
- tfUSD testnet credit
- Vault deposit and borrow flow
- Oracle shock simulation
- Liquidation-risk visibility
- Treasury mock accounting
- PCS protocol-risk monitoring

## Core Demo Flow

Connect Wallet -> Claim tFAITH -> Deposit Collateral -> Borrow tfUSD -> Simulate Oracle Shock -> PCS detects risk -> Liquidation warning appears.

## Core Thesis

FAITH is building a capital operating system where programmable credit, treasury resilience, and PCS protocol-risk intelligence help autonomous onchain economies grow with discipline.

**Humans build. PCS regulates. Treasury protects. MegaETH executes. The economy grows.**

## Architecture

User -> VaultManager -> CreditEngine -> tfUSD/fUSD Accounting -> SettlementAdapter -> Treasury -> PCSMonitor -> LiquidationEngine

## Smart Contract Modules

- FAITHToken / tFAITH
- tfUSD / fUSD
- VaultManager
- CreditEngine
- SettlementAdapter
- Treasury
- PCSMonitor
- MockOracle
- LiquidationEngine

## Current MegaETH Testnet Deployment Registry

| Component | Address |
|---|---|
| tFAITH | 0x25131C5655DBB24B768bEb8cE4A135E0ED3836FA |
| tfUSD | 0x35Ac0De590E8C2280464027aBdab93e6b0E199a0 |
| tMockOracle | 0x7125fe3424Ba0796B2A45b450e295c93a18224c7 |
| tVaultManager | 0x76849F654906F4956Ff0d3B2b10eE97ce4d0d4B |

## Local Development

Install dependencies:

    npm install

Run the app:

    npm run dev

Run tests:

    npm run test
    npx hardhat test

## Roadmap

### Phase 1 — Testnet MVP

tFAITH collateral, tfUSD borrowing, mock treasury, oracle shock simulation, liquidation demo, and PCS monitoring dashboard.

### Phase 2 — PCS v2

Deterministic risk scoring, treasury coverage scoring, liquidation pressure scoring, borrow utilization scoring, action queue, and stress timeline.

### Phase 3 — Treasury Architecture

Treasury design, controlled capital models, quarterly review concepts, PCS treasury monitoring, and legal-safe documentation.

### Phase 4 — Ecosystem Layer

UtopiaByFaith integration, project vault concept, Build-on-FAITH framework, developer modules, and future USDm marketplace support.

### Phase 5 — Funding and Validation

Demo video, pitch deck, investor memo, MegaETH outreach, grants, strategic angels, and accelerators.

### Phase 6 — Future RWA / Productive Capital

Legal structure, compliance review, partner due diligence, audited reporting, PCS controls, and controlled capital routing.

## Safety Boundary

FAITH is currently a testnet MVP and research-stage protocol.

- Testnet only
- Not audited
- No real user capital
- No guaranteed yield
- No live treasury certificates
- No public investment product
- No financial advice
- PCS is protocol-risk monitoring, not user investment advice

Future RWA, treasury, certificate, stable settlement, or productive-capital modules require legal, regulatory, compliance, accounting, audit, and risk review before any real deployment.

