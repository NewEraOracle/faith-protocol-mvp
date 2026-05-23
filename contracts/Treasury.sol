// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Treasury
 * @notice Testnet-only treasury accounting module for FAITH Protocol Testnet v1.
 *
 * This contract does NOT manage real yield.
 * This contract does NOT represent real reserves.
 * It only records mock protocol flows for testing dashboard, PCS, and settlement logic.
 */
contract Treasury is Ownable {
    uint256 public totalMockInflows;
    uint256 public totalMockOutflows;
    uint256 public mockReserves;
    uint256 public mockProtocolMargin;

    mapping(address => bool) public authorizedRecorders;

    event RecorderUpdated(address indexed recorder, bool allowed);

    event TreasuryInflowRecorded(
        address indexed source,
        uint256 amount,
        string reason,
        uint256 newTotalInflows,
        uint256 newMockReserves
    );

    event TreasuryOutflowRecorded(
        address indexed destination,
        uint256 amount,
        string reason,
        uint256 newTotalOutflows,
        uint256 newMockReserves
    );

    event ProtocolMarginRecorded(
        uint256 amount,
        string reason,
        uint256 newMockProtocolMargin
    );

    constructor() Ownable(msg.sender) {}

    modifier onlyRecorder() {
        require(
            msg.sender == owner() || authorizedRecorders[msg.sender],
            "Treasury: not authorized"
        );
        _;
    }

    function setRecorder(address recorder, bool allowed) external onlyOwner {
        require(recorder != address(0), "Treasury: zero recorder");
        authorizedRecorders[recorder] = allowed;
        emit RecorderUpdated(recorder, allowed);
    }

    function recordInflow(
        address source,
        uint256 amount,
        string calldata reason
    ) external onlyRecorder {
        require(amount > 0, "Treasury: amount is zero");

        totalMockInflows += amount;
        mockReserves += amount;

        emit TreasuryInflowRecorded(
            source,
            amount,
            reason,
            totalMockInflows,
            mockReserves
        );
    }

    function recordOutflow(
        address destination,
        uint256 amount,
        string calldata reason
    ) external onlyRecorder {
        require(amount > 0, "Treasury: amount is zero");
        require(mockReserves >= amount, "Treasury: insufficient mock reserves");

        totalMockOutflows += amount;
        mockReserves -= amount;

        emit TreasuryOutflowRecorded(
            destination,
            amount,
            reason,
            totalMockOutflows,
            mockReserves
        );
    }

    function recordProtocolMargin(
        uint256 amount,
        string calldata reason
    ) external onlyRecorder {
        require(amount > 0, "Treasury: amount is zero");

        mockProtocolMargin += amount;
        mockReserves += amount;
        totalMockInflows += amount;

        emit ProtocolMarginRecorded(amount, reason, mockProtocolMargin);
        emit TreasuryInflowRecorded(
            msg.sender,
            amount,
            reason,
            totalMockInflows,
            mockReserves
        );
    }

    function getTreasuryState()
        external
        view
        returns (
            uint256 inflows,
            uint256 outflows,
            uint256 reserves,
            uint256 protocolMargin
        )
    {
        return (
            totalMockInflows,
            totalMockOutflows,
            mockReserves,
            mockProtocolMargin
        );
    }
}