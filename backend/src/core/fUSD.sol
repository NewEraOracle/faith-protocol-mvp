// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract fUSD is ERC20, Ownable {
    address public minter;

    constructor()
        ERC20("Test FAITH USD", "tfUSD")
        Ownable(msg.sender)
    {}

    function setMinter(address _minter)
        external
        onlyOwner
    {
        minter = _minter;
    }

    function mint(address to, uint256 amount)
        external
    {
        require(
            msg.sender == owner() || msg.sender == minter,
            "Not authorized to mint"
        );

        _mint(to, amount);
    }

    function burn(address from, uint256 amount)
        external
    {
        require(
            msg.sender == owner() || msg.sender == minter,
            "Not authorized to burn"
        );

        _burn(from, amount);
    }
}