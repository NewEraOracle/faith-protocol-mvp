# PCS Technical Roadmap

## Purpose

PCS is the Parameter Control System of FAITH Protocol.

Its role is not to provide financial advice, investment advice, or user trading recommendations.

PCS is a protocol risk and parameter engine.

It observes protocol conditions, calculates system risk, suggests protocol-level parameter responses, explains the rationale, and later can evolve into smart contract, backend, indexer, or AI-assisted infrastructure.

---

## Current PCS v1 Status

PCS v1 is now functional in the frontend.

Current completed modules:

- PCS Risk Score 0-100
- PCS Risk Level
- Oracle Risk
- Treasury Coverage
- Liquidation Pressure
- Borrow Utilization
- Debt Coverage Ratio
- Suggested Protocol Parameter Response
- Risk Rationale
- PCS Stress Simulator
- PCS Risk Parameter Panel
- Treasury Health connected to PCS
- Protocol Overview synced with PCS
- Activity Feed wording upgraded

---

## PCS Core Loop

Observe -> Score -> Classify -> Recommend -> Explain -> Simulate

### 1. Observe

PCS reads:

- Oracle price
- Vault health factor
- Protocol collateral
- Protocol debt supply
- Vault active state
- Treasury coverage
- Borrow utilization
- Liquidation pressure

### 2. Score

PCS calculates a System Risk Score from 0 to 100.

Risk levels:

- 0-30: Healthy
- 31-60: Warning
- 61-80: High Risk
- 81-100: Critical

### 3. Classify

PCS classifies the protocol state using:

- Oracle Risk
- Treasury Coverage
- Liquidation Pressure
- Borrow Utilization
- Debt Coverage Ratio

### 4. Recommend

PCS suggests protocol-level parameter responses such as:

- Maintain LTV
- Tighten Risk Parameters
- Reduce LTV / Increase Reserves
- Pause Borrowing / Allow Liquidation

### 5. Explain

PCS generates a Risk Rationale explaining why a response is suggested.

### 6. Simulate

PCS Stress Simulator projects additional collateral shock scenarios:

- -10% shock
- -20% shock
- -30% shock

Each scenario estimates:

- Projected oracle price
- Projected risk score
- Projected risk level
- Projected protocol response
- Projected rationale

---

## Current Implementation

Current PCS logic lives in:

frontend/lib/pcs.ts

The dashboard integration lives in:

frontend/app/dashboard/page.tsx

Current PCS architecture:

Protocol Data -> frontend/lib/pcs.ts -> PCS outputs -> Dashboard display

---

## Next Technical Milestones

### Phase 1 — Frontend PCS Completion

- Refine risk scoring weights
- Improve stress simulator progression
- Add more detailed oracle shock scenarios
- Add utilization thresholds
- Add treasury reserve scoring improvements
- Add PCS event log entries
- Improve dashboard mobile layout

### Phase 2 — PCSMonitor.sol

Move core monitoring into smart contract logic where appropriate.

Possible contract outputs:

- getSystemRiskScore()
- getOracleRisk()
- getTreasuryCoverage()
- getLiquidationPressure()
- getSuggestedParameterResponse()
- getEmergencyMode()

### Phase 3 — Backend / Indexer PCS

Create a backend or indexer that can monitor multiple vaults.

This would allow:

- Multi-vault risk aggregation
- Unsafe vault counting
- Liquidation queue monitoring
- Treasury history
- Oracle shock history
- Risk score history
- PCS alerts

### Phase 4 — PCS Stress Simulator v2

Add deeper stress testing:

- 10%, 20%, 30%, 40%, 50% collateral shocks
- Borrow utilization shocks
- Treasury coverage degradation
- Multi-vault unsafe position projection
- Emergency mode trigger logic
- Parameter impact comparison

### Phase 5 — AI-Assisted PCS

Only after deterministic PCS is stable.

AI should not directly control funds.

AI-assisted PCS may:

- Summarize risk conditions
- Explain parameter changes
- Compare stress scenarios
- Draft governance proposals
- Support human or governance review

Execution should remain permissioned, governed, or admin-approved during early stages.

---

## Strategic Importance

PCS is the core feature that can make FAITH unique.

A normal lending protocol shows health factor.

FAITH should diagnose system risk and suggest protocol-level parameter responses.

This moves FAITH from:

Vault / borrow dashboard

to:

Machine-regulated credit infrastructure on MegaETH.

---

## North Star

PCS is the protocol risk brain of FAITH.

FAITH Protocol controls credit and risk.

PCS regulates the machine layer.

Treasury protects the system.

MegaETH provides real-time execution.

Future capital routing can be monitored through compliant risk infrastructure.
