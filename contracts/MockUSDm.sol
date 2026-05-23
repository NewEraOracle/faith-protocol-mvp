// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MockUSDm
 * @notice Testnet-only mock settlement token for FAITH Protocol Testnet v1.
 *
 * MockUSDm is NOT real USDm.
 * MockUSDm has no monetary value.
 * It is only used to simulate future USDm settlement flows on testnet.
 */
contract MockUSDm is ERC20, Ownable {
    mapping(address => bool) public authorizedOperators;

    event OperatorUpdated(address indexed operator, bool allowed);

    constructor() ERC20("Mock USDm", "MockUSDm") Ownable(msg.sender) {}

    modifier onlyOwnerOrOperator() {
        require(
            msg.sender == owner() || authorizedOperators[msg.sender],
            "MockUSDm: not authorized"
        );
        _;
    }

    function setOperator(address operator, bool allowed) external onlyOwner {
        require(operator != address(0), "MockUSDm: zero operator");
        authorizedOperators[operator] = allowed;
        emit OperatorUpdated(operator, allowed);
    }

    function mint(address to, uint256 amount) external onlyOwnerOrOperator {
        require(to != address(0), "MockUSDm: zero recipient");
        require(amount > 0, "MockUSDm: amount is zero");
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwnerOrOperator {
        require(from != address(0), "MockUSDm: zero account");
        require(amount > 0, "MockUSDm: amount is zero");
        _burn(from, amount);
    }
}