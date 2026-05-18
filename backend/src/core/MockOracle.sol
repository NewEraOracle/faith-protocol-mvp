// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MockOracle {
    uint256 public price = 1e18; // 1 tFAITH = $1

    event PriceUpdated(
        uint256 previousPrice,
        uint256 newPrice
    );

    function setPrice(uint256 _price) external {
        require(
            _price > 0,
            "Invalid price"
        );

        uint256 oldPrice = price;

        price = _price;

        emit PriceUpdated(
            oldPrice,
            _price
        );
    }

    function getPrice()
        external
        view
        returns (uint256)
    {
        return price;
    }
}