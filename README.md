FAITH Protocol is a testnet DeFi lending MVP built on MegaETH.

## Autonomous Credit for the Real-Time Internet

FAITH Protocol is an early MegaETH testnet MVP exploring real-time collateralized credit, oracle-based risk simulation, vault health tracking, and liquidation logic.

The current MVP demonstrates a simple credit loop:

```text
Deposit tFAITH as collateral
→ Borrow tfUSD
→ Simulate an oracle price shock
→ Trigger liquidation if the vault becomes unsafe
```

The long-term thesis is that FAITH can become MegaETH-native autonomous credit infrastructure that helps activate USDm velocity by turning settlement liquidity into structured borrow, repay, treasury, and risk-management flows.

---

## Live MVP

[https://faith-protocol-mvp.vercel.app/](https://faith-protocol-mvp.vercel.app/)

---

## Important Notice

This project is experimental software.

The current deployment is:

- testnet only
- not audited
- not intended for real financial use
- not a public mainnet launch
- not using real USDm settlement yet

`tFAITH` and `tfUSD` are testnet assets with no real monetary value.

FAITH mainnet token is not deployed.

---

## Current Status

The MVP currently focuses on:

- tFAITH collateral deposits
- tfUSD borrowing
- oracle price-shock simulation
- vault health tracking
- liquidation testing
- MegaETH testnet execution

The current version is designed to prove the first credit logic loop before expanding into deeper USDm settlement, treasury tracking, and PCS-based monetary coordination.

---

## Core Thesis

Most DeFi systems are built around speculation, emissions, or passive liquidity.

FAITH explores a different model:

```text
Collateral → Credit → Risk Monitoring → Repayment → Treasury Flow → System Stability
```

The long-term goal is to build a MegaETH-native autonomous credit economy where capital becomes productive through structured borrowing, repayment, treasury flows, and real-time risk coordination.

---

## Asset Model

The current and future FAITH architecture separates each asset role clearly:

```text
tFAITH = testnet collateral asset
tfUSD = Test fUSD stablecoin / test credit accounting token
FAITH = future mainnet collateral and access asset
fUSD = future internal credit / debt accounting layer
USDm = future settlement and liquidity asset
PCS = autonomous monetary coordination layer
```

Important clarification:

```text
tfUSD is not the final public stablecoin.
tfUSD is a testnet credit accounting token used to simulate borrowing behavior.
```

The long-term model is:

```text
fUSD tracks internal debt.
USDm settles liquidity.
```

---

## USDm Velocity Thesis

FAITH is not designed to compete with USDm.

The long-term goal is to activate USDm by creating structured credit activity around it.

Future FAITH credit flows may include:

```text
User locks FAITH
→ Protocol records internal fUSD debt
→ User receives USDm settlement liquidity
→ User repays in USDm
→ Debt is reduced or cleared
→ Treasury and PCS update system state
```

This creates the core MegaETH thesis:

```text
FAITH activates USDm through autonomous credit.
```

---

## Why MegaETH

MegaETH’s real-time execution environment is well suited for applications where financial state changes matter immediately.

FAITH is designed to make real-time blockchain infrastructure visible through:

- live vault health changes
- borrow capacity updates
- oracle price shocks
- liquidation risk
- credit state changes
- future PCS monitoring
- treasury flow visibility

The frontend should feel as fast as the chain.

---

## MVP Demo Flow

The current MVP can be tested with this simple flow:

### 1. Deposit tFAITH

Users deposit tFAITH as testnet collateral into the vault system.

### 2. Borrow tfUSD

Users borrow tfUSD against their collateral.

### 3. Simulate Price Shock

The mock oracle can simulate a tFAITH price crash.

### 4. Trigger Liquidation

If the vault becomes unsafe, liquidation logic can be tested.

---

## Current MegaETH Testnet Deployment

| Contract      | Address                                      |
| ------------- | -------------------------------------------- |
| tFAITH        | `0x25131C5655DBB24B768bEb8cE4A135E0ED3836FA` |
| tfUSD         | `0x35Ac0De590E8C2280464027aBdab93e6b0E199a0` |
| tMockOracle   | `0x7125fe3424Ba0796B2A45b450e295c93a18224c7` |
| tVaultManager | `0x76849F654906F4956fff0d3B2b10eE97ce4d0d4B` |

Network:

```text
MegaETH Testnet
Chain ID: 6343
```

---

## Testnet Asset Naming

To avoid confusing future mainnet assets with current testnet assets, the testnet contracts use a `t` prefix:

- `tFAITH` = Test FAITH collateral token
- `tfUSD` = Test fUSD stablecoin / test credit accounting token
- `tMockOracle` = Test oracle contract
- `tVaultManager` = Test vault and lending engine

---

## Architecture Overview

Current MVP architecture:

```text
User
 ↓
tFAITH Collateral
 ↓
tVaultManager
 ↓
tfUSD Borrowing
 ↓
tMockOracle Risk Simulation
 ↓
Vault Health / Liquidation Logic
```

Future architecture:

```text
FAITH / tFAITH Collateral
 ↓
fUSD Internal Debt Accounting
 ↓
USDm Settlement Liquidity
 ↓
Treasury Flows
 ↓
PCS Monetary Coordination
 ↓
Autonomous Credit Economy
```

---

## Contracts

### tFAITH

Testnet collateral token used to open vault positions.

### tfUSD

Test fUSD stablecoin / test credit accounting token used to simulate borrowing activity.

### tMockOracle

Mock oracle used to simulate collateral price changes and risk events.

### tVaultManager

Core vault contract handling collateral deposits, borrowing, health checks, and liquidation logic.

---

## Roadmap

### Phase 1 — Current MVP

Status: active on MegaETH testnet.

Current features:

- tFAITH collateral
- tfUSD borrow flow
- mock oracle price shock
- liquidation testing
- live frontend demo
- public GitHub repository

Goal:

```text
Prove the first collateralized credit logic loop on MegaETH testnet.
```

---

### Phase 2 — Testnet v1

Planned next additions:

- CreditEngine
- Treasury
- PCS monitor
- MockUSDm settlement layer
- improved vault dashboard
- real-time vault state updates
- clearer health factor display
- better demo video and documentation

Goal:

```text
Move from basic borrow/liquidation demo to a fuller autonomous credit system prototype.
```

Target future testnet loop:

```text
Deposit tFAITH
→ Create internal tfUSD / fUSD debt
→ Receive MockUSDm settlement
→ Treasury records activity
→ PCS monitors system state
→ Repay MockUSDm
→ Debt clears
```

---

### Phase 3 — Controlled Mainnet MVP

The mainnet MVP should only happen after testnet validation, security review, and ecosystem feedback.

Expected requirements:

- limited launch scope
- strict vault caps
- conservative LTV parameters
- multisig ownership
- emergency pause controls
- oracle review
- liquidation testing
- treasury protection
- audit preparation

Goal:

```text
Deploy a controlled mainnet MVP with limited risk and clear operational safeguards.
```

This should not be treated as a full public launch.

---

## Suggested Testing Checklist

When testing the MVP:

```text
1. Connect wallet
2. Confirm MegaETH testnet
3. Deposit tFAITH
4. Borrow tfUSD
5. Simulate oracle price shock
6. Check vault health
7. Trigger liquidation if unsafe
```

---

## Repository Setup

Clone the repository:

```bash
git clone https://github.com/NewEraOracle/faith-protocol-mvp.git
cd faith-protocol-mvp
```

Install dependencies:

```bash
pnpm install
```

Run locally:

```bash
pnpm dev
```

---

## Brand Positioning

FAITH is not positioned as a simple lending app.

FAITH is being built as:

```text
MegaETH-native autonomous credit infrastructure
```

Core positioning:

```text
FAITH activates USDm through autonomous credit.
```

Tagline:

```text
Autonomous Credit for the Real-Time Internet
```

---

## Links

Live MVP:

[https://faith-protocol-mvp.vercel.app/](https://faith-protocol-mvp.vercel.app/)

GitHub:

[https://github.com/NewEraOracle/faith-protocol-mvp](https://github.com/NewEraOracle/faith-protocol-mvp)

---

## License

MIT