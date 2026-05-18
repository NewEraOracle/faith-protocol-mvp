// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./FAITHToken.sol";
import "./fUSD.sol";
import "./MockOracle.sol";

contract VaultManager {
    struct Vault {
        uint256 collateralAmount;
        uint256 debtAmount;
        bool active;
    }

    mapping(address => Vault) public vaults;

    FAITHToken public faith;
    fUSD public fusd;
    MockOracle public oracle;

    uint256 public constant MAX_LTV = 60;
    uint256 public constant LIQUIDATION_THRESHOLD = 110;
    uint256 public constant LIQUIDATION_BONUS = 10;

    event CollateralDeposited(
        address indexed user,
        uint256 amount,
        uint256 newCollateralAmount
    );

    event CollateralWithdrawn(
        address indexed user,
        uint256 amount,
        uint256 remainingCollateralAmount
    );

    event TfUSDBorrowed(
        address indexed user,
        uint256 amount,
        uint256 newDebtAmount
    );

    event TfUSDRepaid(
        address indexed user,
        uint256 amount,
        uint256 remainingDebtAmount
    );

    event VaultLiquidated(
        address indexed user,
        address indexed liquidator,
        uint256 debtRepaid,
        uint256 collateralSeized
    );

    constructor(
        address _faith,
        address _fusd,
        address _oracle
    ) {
        faith = FAITHToken(_faith);
        fusd = fUSD(_fusd);
        oracle = MockOracle(_oracle);
    }

    function depositCollateral(
        uint256 amount
    ) external {
        require(
            amount > 0,
            "Invalid amount"
        );

        faith.transferFrom(
            msg.sender,
            address(this),
            amount
        );

        vaults[msg.sender]
            .collateralAmount += amount;

        vaults[msg.sender]
            .active = true;

        emit CollateralDeposited(
            msg.sender,
            amount,
            vaults[msg.sender]
                .collateralAmount
        );
    }

    function withdrawCollateral(
        uint256 amount
    ) external {
        require(
            amount > 0,
            "Invalid amount"
        );

        Vault storage vault =
            vaults[msg.sender];

        require(
            vault.collateralAmount >= amount,
            "Insufficient collateral"
        );

        vault.collateralAmount -= amount;

        require(
            _isHealthy(vault),
            "Would become unsafe"
        );

        faith.transfer(
            msg.sender,
            amount
        );

        emit CollateralWithdrawn(
            msg.sender,
            amount,
            vault.collateralAmount
        );
    }

    function borrow(
        uint256 amount
    ) external {
        require(
            amount > 0,
            "Invalid amount"
        );

        Vault storage vault =
            vaults[msg.sender];

        uint256 maxBorrow =
            getBorrowLimit(msg.sender);

        require(
            vault.debtAmount + amount
                <= maxBorrow,
            "Exceeds borrow limit"
        );

        vault.debtAmount += amount;

        fusd.mint(
            msg.sender,
            amount
        );

        emit TfUSDBorrowed(
            msg.sender,
            amount,
            vault.debtAmount
        );
    }

    function repay(
        uint256 amount
    ) external {
        require(
            amount > 0,
            "Invalid amount"
        );

        Vault storage vault =
            vaults[msg.sender];

        require(
            vault.debtAmount >= amount,
            "Too much repay"
        );

        fusd.transferFrom(
            msg.sender,
            address(this),
            amount
        );

        fusd.burn(
            address(this),
            amount
        );

        vault.debtAmount -= amount;

        emit TfUSDRepaid(
            msg.sender,
            amount,
            vault.debtAmount
        );
    }

    function liquidate(
        address user
    ) external {
        Vault storage vault =
            vaults[user];

        require(
            vault.debtAmount > 0,
            "No debt"
        );

        require(
            getHealthFactor(user)
                < LIQUIDATION_THRESHOLD,
            "Vault healthy"
        );

        uint256 debt =
            vault.debtAmount;

        fusd.transferFrom(
            msg.sender,
            address(this),
            debt
        );

        fusd.burn(
            address(this),
            debt
        );

        uint256 collateralToSeize =
            vault.collateralAmount;

        uint256 bonus =
            (
                collateralToSeize
                * LIQUIDATION_BONUS
            ) / 100;

        uint256 reward =
            collateralToSeize
            + bonus;

        uint256 availableFaith =
            faith.balanceOf(
                address(this)
            );

        if (
            reward >
            availableFaith
        ) {
            reward =
                availableFaith;
        }

        faith.transfer(
            msg.sender,
            reward
        );

        vault.collateralAmount = 0;
        vault.debtAmount = 0;
        vault.active = false;

        emit VaultLiquidated(
            user,
            msg.sender,
            debt,
            reward
        );
    }

    function getCollateralValue(
        address user
    )
        public
        view
        returns (uint256)
    {
        Vault memory vault =
            vaults[user];

        return (
            vault.collateralAmount
            * oracle.price()
        ) / 1e18;
    }

    function getBorrowLimit(
        address user
    )
        public
        view
        returns (uint256)
    {
        return (
            getCollateralValue(user)
            * MAX_LTV
        ) / 100;
    }

    function getHealthFactor(
        address user
    )
        public
        view
        returns (uint256)
    {
        Vault memory vault =
            vaults[user];

        if (
            vault.debtAmount == 0
        ) {
            return type(uint256).max;
        }

        return (
            getCollateralValue(user)
            * 100
        ) / vault.debtAmount;
    }

    function _isHealthy(
        Vault memory vault
    )
        internal
        view
        returns (bool)
    {
        if (
            vault.debtAmount == 0
        ) {
            return true;
        }

        uint256 collateralValue =
            (
                vault.collateralAmount
                * oracle.price()
            ) / 1e18;

        uint256 ratio =
            (
                collateralValue
                * 100
            ) / vault.debtAmount;

        return ratio >= 150;
    }
}