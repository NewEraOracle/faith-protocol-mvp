// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PCSMonitor
 * @notice Testnet-only Protocol Coordination System monitor for FAITH Protocol Testnet v1.
 *
 * PCS = Protocol Coordination System / monetary coordination monitor.
 *
 * This contract does NOT control real monetary policy.
 * This contract does NOT distribute yield.
 * This contract does NOT represent audited financial infrastructure.
 *
 * It records testnet system metrics so the dashboard can display:
 * - collateral activity
 * - credit activity
 * - MockUSDm settlement activity
 * - treasury reserves
 * - liquidation/risk events
 * - system health status
 */
contract PCSMonitor is Ownable {
    enum SystemStatus {
        Stable,
        Watch,
        Stress,
        Critical
    }

    uint256 public totalCollateralTracked;
    uint256 public totalDebtTracked;
    uint256 public totalMockSettlementTracked;
    uint256 public totalTreasuryReservesTracked;
    uint256 public liquidationEvents;
    uint256 public unsafeVaultObservations;
    uint256 public lastUpdateTimestamp;

    SystemStatus public systemStatus;

    mapping(address => bool) public authorizedReporters;

    event ReporterUpdated(address indexed reporter, bool allowed);

    event PCSStateUpdated(
        uint256 totalCollateral,
        uint256 totalDebt,
        uint256 totalMockSettlement,
        uint256 totalTreasuryReserves,
        uint256 liquidationEvents,
        uint256 unsafeVaultObservations,
        SystemStatus systemStatus,
        uint256 timestamp
    );

    event LiquidationObserved(
        address indexed vaultOwner,
        uint256 debtAmount,
        uint256 collateralAmount,
        string reason,
        uint256 liquidationEvents
    );

    event UnsafeVaultObserved(
        address indexed vaultOwner,
        uint256 healthFactorBps,
        string reason,
        uint256 unsafeVaultObservations
    );

    event SystemStatusChanged(
        SystemStatus oldStatus,
        SystemStatus newStatus,
        string reason
    );

    constructor() Ownable(msg.sender) {
        systemStatus = SystemStatus.Stable;
        lastUpdateTimestamp = block.timestamp;
    }

    modifier onlyReporter() {
        require(
            msg.sender == owner() || authorizedReporters[msg.sender],
            "PCSMonitor: not authorized"
        );
        _;
    }

    function setReporter(address reporter, bool allowed) external onlyOwner {
        require(reporter != address(0), "PCSMonitor: zero reporter");
        authorizedReporters[reporter] = allowed;
        emit ReporterUpdated(reporter, allowed);
    }

    function updatePCSState(
        uint256 totalCollateral,
        uint256 totalDebt,
        uint256 totalMockSettlement,
        uint256 totalTreasuryReserves
    ) external onlyReporter {
        totalCollateralTracked = totalCollateral;
        totalDebtTracked = totalDebt;
        totalMockSettlementTracked = totalMockSettlement;
        totalTreasuryReservesTracked = totalTreasuryReserves;
        lastUpdateTimestamp = block.timestamp;

        emit PCSStateUpdated(
            totalCollateralTracked,
            totalDebtTracked,
            totalMockSettlementTracked,
            totalTreasuryReservesTracked,
            liquidationEvents,
            unsafeVaultObservations,
            systemStatus,
            lastUpdateTimestamp
        );
    }

    function observeLiquidation(
        address vaultOwner,
        uint256 debtAmount,
        uint256 collateralAmount,
        string calldata reason
    ) external onlyReporter {
        require(vaultOwner != address(0), "PCSMonitor: zero vault owner");

        liquidationEvents += 1;
        lastUpdateTimestamp = block.timestamp;

        emit LiquidationObserved(
            vaultOwner,
            debtAmount,
            collateralAmount,
            reason,
            liquidationEvents
        );

        emit PCSStateUpdated(
            totalCollateralTracked,
            totalDebtTracked,
            totalMockSettlementTracked,
            totalTreasuryReservesTracked,
            liquidationEvents,
            unsafeVaultObservations,
            systemStatus,
            lastUpdateTimestamp
        );
    }

    function observeUnsafeVault(
        address vaultOwner,
        uint256 healthFactorBps,
        string calldata reason
    ) external onlyReporter {
        require(vaultOwner != address(0), "PCSMonitor: zero vault owner");

        unsafeVaultObservations += 1;
        lastUpdateTimestamp = block.timestamp;

        emit UnsafeVaultObserved(
            vaultOwner,
            healthFactorBps,
            reason,
            unsafeVaultObservations
        );

        emit PCSStateUpdated(
            totalCollateralTracked,
            totalDebtTracked,
            totalMockSettlementTracked,
            totalTreasuryReservesTracked,
            liquidationEvents,
            unsafeVaultObservations,
            systemStatus,
            lastUpdateTimestamp
        );
    }

    function setSystemStatus(
        SystemStatus newStatus,
        string calldata reason
    ) external onlyReporter {
        SystemStatus oldStatus = systemStatus;
        systemStatus = newStatus;
        lastUpdateTimestamp = block.timestamp;

        emit SystemStatusChanged(oldStatus, newStatus, reason);

        emit PCSStateUpdated(
            totalCollateralTracked,
            totalDebtTracked,
            totalMockSettlementTracked,
            totalTreasuryReservesTracked,
            liquidationEvents,
            unsafeVaultObservations,
            systemStatus,
            lastUpdateTimestamp
        );
    }

    function getPCSState()
        external
        view
        returns (
            uint256 totalCollateral,
            uint256 totalDebt,
            uint256 totalMockSettlement,
            uint256 totalTreasuryReserves,
            uint256 liquidationCount,
            uint256 unsafeVaultCount,
            SystemStatus status,
            uint256 updatedAt
        )
    {
        return (
            totalCollateralTracked,
            totalDebtTracked,
            totalMockSettlementTracked,
            totalTreasuryReservesTracked,
            liquidationEvents,
            unsafeVaultObservations,
            systemStatus,
            lastUpdateTimestamp
        );
    }
}