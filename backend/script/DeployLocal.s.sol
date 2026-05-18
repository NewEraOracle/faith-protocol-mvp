// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";

import "../src/core/FAITHToken.sol";
import "../src/core/fUSD.sol";
import "../src/core/VaultManager.sol";
import "../src/core/MockOracle.sol";

contract DeployLocal is Script {
    function run() external {
        vm.startBroadcast();

        FAITHToken tfaith = new FAITHToken(msg.sender);

        fUSD tfusd = new fUSD();

        MockOracle toracle = new MockOracle();

        VaultManager tvault = new VaultManager(
            address(tfaith),
            address(tfusd),
            address(toracle)
        );

        tfusd.setMinter(address(tvault));

        console.log("tFAITH deployed at:");
        console.log(address(tfaith));

        console.log("tfUSD deployed at:");
        console.log(address(tfusd));

        console.log("tMockOracle deployed at:");
        console.log(address(toracle));

        console.log("tVaultManager deployed at:");
        console.log(address(tvault));

        vm.stopBroadcast();
    }
}