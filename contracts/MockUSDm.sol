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
    constructor() ERC20("Mock USDm", "MockUSDm") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}