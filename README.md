# FAITH Protocol

**Real-time collateralized credit on MegaETH.**

FAITH Protocol is a testnet DeFi lending MVP built on **MegaETH**.  
It allows users to:

- Deposit **tFAITH** as collateral
- Borrow **tfUSD**
- Track vault health in real time
- Simulate collateral price shocks through a test oracle
- Trigger liquidations when positions become unsafe
- View live on-chain protocol activity

---

## Why FAITH Protocol

Traditional lending protocols often present risk as a static number.  
FAITH Protocol demonstrates how **real-time blockchain execution** can make credit markets more responsive, transparent, and interactive.

The MVP focuses on a complete lending loop:

1. A user deposits collateral
2. The user borrows a stable asset
3. The oracle price falls
4. The vault becomes unsafe
5. Liquidation clears the debt

This creates a clear proof of concept for **real-time collateralized credit markets** on MegaETH.

---

## Why MegaETH

FAITH Protocol is designed around the strengths of MegaETH:

### Real-Time Risk
Vault health changes immediately as collateral prices move.

### Fast Liquidations
Unsafe positions can be resolved quickly, reducing stale-state exposure.

### Visible On-Chain Activity
Deposits, borrows, repayments, oracle updates, and liquidations are surfaced in a live event feed.

---

## Core Features

### Lending Engine
- Deposit `tFAITH`
- Borrow `tfUSD`
- Repay debt
- Withdraw collateral

### Risk Controls
- 60% borrow limit
- Health factor tracking
- Oracle-based collateral valuation
- Unsafe vault detection

### Liquidation System
- Liquidation becomes possible when health factor falls below the threshold
- Liquidator repays debt in `tfUSD`
- Collateral is seized from the unsafe vault

### Investor Demo Flow
The frontend includes a guided 4-step protocol demonstration:

1. Deposit `10 tFAITH`
2. Borrow `5 tfUSD`
3. Crash `tFAITH` price to `$0.40`
4. Liquidate the unsafe vault

The interface tracks this process and displays a **4/4 completed demo state** once the entire flow is executed.

---

## Current Testnet Deployment

### MegaETH Testnet Contracts

| Contract | Address |
|---|---|
| tFAITH | `0x25131C5655DBB24B768bEb8cE4A135E0ED3836FA` |
| tfUSD | `0x35Ac0De590E8C2280464027aBdab93e6b0E199a0` |
| tMockOracle | `0x7125fe3424Ba0796B2A45b450e295c93a18224c7` |
| tVaultManager | `0x76849F654906F4956fff0d3B2b10eE97ce4d0d4B` |

---

## Testnet Asset Naming

To avoid confusion before mainnet, all testnet assets use a `t` prefix:

- `tFAITH` = Test FAITH collateral token
- `tfUSD` = Test FAITH stablecoin
- `tMockOracle` = Test oracle contract
- `tVaultManager` = Test vault and lending engine

---

## Architecture Overview

```text
User Wallet
   │
   ├── Deposit tFAITH
   ▼
tVaultManager
   │
   ├── Reads collateral value from tMockOracle
   ├── Enforces borrow limit
   ├── Tracks user debt
   ├── Allows repay / withdraw
   └── Handles liquidation
   │
   ▼
tfUSD Minting / Burning