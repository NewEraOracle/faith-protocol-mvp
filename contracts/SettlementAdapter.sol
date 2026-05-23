// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IMockUSDm {
    function mint(address to, uint256 amount) external;
    function burn(address from, uint256 amount) external;
}

interface ITreasury {
    function recordInflow(address source, uint256 amount, string calldata reason) external;
    function recordOutflow(address destination, uint256 amount, string calldata reason) external;
}

/**
 * @title SettlementAdapter
 * @notice Testnet-only settlement simulation adapter for FAITH Protocol Testnet v1.
 *
 * This contract does NOT settle real USDm.
 * It only simulates future USDm settlement flows using MockUSDm.
 */
contract SettlementAdapter is Ownable {
    IMockUSDm public immutable mockUSDm;
    ITreasury public treasury;

    mapping(address => bool) public authorizedCreditEngines;

    uint256 public totalMockSettlementIssued;
    uint256 public totalMockSettlementRepaid;

    event CreditEngineUpdated(address indexed engine, bool allowed);
    event TreasuryUpdated(address indexed treasury);

    event MockSettlementIssued(
        address indexed borrower,
        uint256 amount,
        address indexed engine,
        uint256 totalIssued
    );

    event MockSettlementRepaid(
        address indexed borrower,
        uint256 amount,
        address indexed engine,
        uint256 totalRepaid
    );

    constructor(address mockUSDmAddress, address treasuryAddress) Ownable(msg.sender) {
        require(mockUSDmAddress != address(0), "SettlementAdapter: zero MockUSDm");
        mockUSDm = IMockUSDm(mockUSDmAddress);

        if (treasuryAddress != address(0)) {
            treasury = ITreasury(treasuryAddress);
            emit TreasuryUpdated(treasuryAddress);
        }
    }

    modifier onlyCreditEngine() {
        require(
            authorizedCreditEngines[msg.sender],
            "SettlementAdapter: not credit engine"
        );
        _;
    }

    function setCreditEngine(address engine, bool allowed) external onlyOwner {
        require(engine != address(0), "SettlementAdapter: zero engine");
        authorizedCreditEngines[engine] = allowed;
        emit CreditEngineUpdated(engine, allowed);
    }

    function setTreasury(address treasuryAddress) external onlyOwner {
        require(treasuryAddress != address(0), "SettlementAdapter: zero treasury");
        treasury = ITreasury(treasuryAddress);
        emit TreasuryUpdated(treasuryAddress);
    }

    function issueMockSettlement(address borrower, uint256 amount) external onlyCreditEngine {
        require(borrower != address(0), "SettlementAdapter: zero borrower");
        require(amount > 0, "SettlementAdapter: amount is zero");

        totalMockSettlementIssued += amount;

        mockUSDm.mint(borrower, amount);

        if (address(treasury) != address(0)) {
            treasury.recordOutflow(borrower, amount, "MockUSDm settlement issued");
        }

        emit MockSettlementIssued(
            borrower,
            amount,
            msg.sender,
            totalMockSettlementIssued
        );
    }

    function repayMockSettlement(address borrower, uint256 amount) external onlyCreditEngine {
        require(borrower != address(0), "SettlementAdapter: zero borrower");
        require(amount > 0, "SettlementAdapter: amount is zero");

        totalMockSettlementRepaid += amount;

        mockUSDm.burn(borrower, amount);

        if (address(treasury) != address(0)) {
            treasury.recordInflow(borrower, amount, "MockUSDm settlement repaid");
        }

        emit MockSettlementRepaid(
            borrower,
            amount,
            msg.sender,
            totalMockSettlementRepaid
        );
    }

    function getSettlementState()
        external
        view
        returns (uint256 issued, uint256 repaid)
    {
        return (totalMockSettlementIssued, totalMockSettlementRepaid);
    }
}