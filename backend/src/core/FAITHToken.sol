// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FAITHToken is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("Test FAITH", "tFAITH")
        Ownable(initialOwner)
    {
        _mint(initialOwner, 100_000_000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount)
        external
        onlyOwner
    {
        _mint(to, amount);
    }
}