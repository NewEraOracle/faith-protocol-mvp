// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

interface ISettlementAdapter {
    function issueMockSettlement(address borrower, uint256 amount) external;
    function repayMockSettlement(address borrower, uint256 amount) external;
}

/**
 * @title CreditEngine
 * @notice Testnet-only autonomous credit coordination module for FAITH Protocol Testnet v1.
 *
 * This contract does NOT issue real credit.
 * This contract does NOT settle real USDm.
 * It simulates the future FAITH credit loop:
 *
 * internal fUSD / tfUSD debt accounting
 * -> MockUSDm settlement simulation
 * -> repayment
 * -> debt reduction
 */
contract CreditEngine is Ownable {
    ISettlementAdapter public settlementAdapter;

    uint256 public totalCreditCreated;
    uint256 public totalCreditRepaid;
    uint256 public totalOutstandingDebt;

    uint256 public minCreditAmount;
    uint256 public maxCreditAmount;

    mapping(address => uint256) public debtOf;
    mapping(address => uint256) public creditCreatedBy;
    mapping(address => uint256) public creditRepaidBy;

    event SettlementAdapterUpdated(address indexed settlementAdapter);

    event CreditCreated(
        address indexed borrower,
        uint256 amount,
        uint256 borrowerDebt,
        uint256 totalOutstandingDebt
    );

    event CreditRepaid(
        address indexed borrower,
        uint256 amount,
        uint256 borrowerDebt,
        uint256 totalOutstandingDebt
    );

    event CreditLimitsUpdated(uint256 minCreditAmount, uint256 maxCreditAmount);

    constructor(address settlementAdapterAddress) Ownable(msg.sender) {
        require(
            settlementAdapterAddress != address(0),
            "CreditEngine: zero settlement adapter"
        );

        settlementAdapter = ISettlementAdapter(settlementAdapterAddress);

        minCreditAmount = 1 ether;
        maxCreditAmount = 10_000 ether;
    }

    function setSettlementAdapter(address settlementAdapterAddress) external onlyOwner {
        require(
            settlementAdapterAddress != address(0),
            "CreditEngine: zero settlement adapter"
        );

        settlementAdapter = ISettlementAdapter(settlementAdapterAddress);

        emit SettlementAdapterUpdated(settlementAdapterAddress);
    }

    function setCreditLimits(
        uint256 newMinCreditAmount,
        uint256 newMaxCreditAmount
    ) external onlyOwner {
        require(newMinCreditAmount > 0, "CreditEngine: min is zero");
        require(
            newMaxCreditAmount >= newMinCreditAmount,
            "CreditEngine: max below min"
        );

        minCreditAmount = newMinCreditAmount;
        maxCreditAmount = newMaxCreditAmount;

        emit CreditLimitsUpdated(newMinCreditAmount, newMaxCreditAmount);
    }

    function createCredit(uint256 amount) external {
        require(amount >= minCreditAmount, "CreditEngine: amount below min");
        require(amount <= maxCreditAmount, "CreditEngine: amount above max");

        debtOf[msg.sender] += amount;
        creditCreatedBy[msg.sender] += amount;

        totalCreditCreated += amount;
        totalOutstandingDebt += amount;

        settlementAdapter.issueMockSettlement(msg.sender, amount);

        emit CreditCreated(
            msg.sender,
            amount,
            debtOf[msg.sender],
            totalOutstandingDebt
        );
    }

    function repayCredit(uint256 amount) external {
        require(amount > 0, "CreditEngine: amount is zero");
        require(debtOf[msg.sender] >= amount, "CreditEngine: repay exceeds debt");

        debtOf[msg.sender] -= amount;
        creditRepaidBy[msg.sender] += amount;

        totalCreditRepaid += amount;
        totalOutstandingDebt -= amount;

        settlementAdapter.repayMockSettlement(msg.sender, amount);

        emit CreditRepaid(
            msg.sender,
            amount,
            debtOf[msg.sender],
            totalOutstandingDebt
        );
    }

    function getBorrowerState(address borrower)
        external
        view
        returns (
            uint256 debt,
            uint256 created,
            uint256 repaid
        )
    {
        return (
            debtOf[borrower],
            creditCreatedBy[borrower],
            creditRepaidBy[borrower]
        );
    }

    function getCreditEngineState()
        external
        view
        returns (
            uint256 created,
            uint256 repaid,
            uint256 outstandingDebt,
            uint256 minAmount,
            uint256 maxAmount
        )
    {
        return (
            totalCreditCreated,
            totalCreditRepaid,
            totalOutstandingDebt,
            minCreditAmount,
            maxCreditAmount
        );
    }
}