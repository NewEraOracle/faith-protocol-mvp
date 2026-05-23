const hre = require("hardhat");

async function main() {
  console.log("Running FAITH Protocol Oracle Shock Demo...\n");

  const ethCollateral = 1;
  const initialEthPrice = 2000;
  const shockedEthPrice = 1100;
  const borrowedAmount = 1000;

  const initialCollateralValue = ethCollateral * initialEthPrice;
  const shockedCollateralValue = ethCollateral * shockedEthPrice;

  const initialHealthFactor = (initialCollateralValue / borrowedAmount) * 100;
  const shockedHealthFactor = (shockedCollateralValue / borrowedAmount) * 100;

  console.log("Initial vault state:");
  console.log(`Collateral: ${ethCollateral} ETH`);
  console.log(`ETH Price: $${initialEthPrice}`);
  console.log(`Collateral Value: $${initialCollateralValue}`);
  console.log(`Borrowed: ${borrowedAmount} MockUSDm`);
  console.log(`Health Factor: ${initialHealthFactor}%`);
  console.log("Status: SAFE\n");

  console.log("Oracle shock event:");
  console.log(`ETH price drops from $${initialEthPrice} to $${shockedEthPrice}`);
  console.log("Market shock: -45%\n");

  console.log("Updated vault state:");
  console.log(`Collateral Value: $${shockedCollateralValue}`);
  console.log(`Borrowed: ${borrowedAmount} MockUSDm`);
  console.log(`Health Factor: ${shockedHealthFactor}%`);

  if (shockedHealthFactor < 120 && shockedHealthFactor >= 100) {
    console.log("Status: WARNING");
    console.log("PCSMonitor flags elevated risk.");
  } else if (shockedHealthFactor < 100) {
    console.log("Status: DANGER");
    console.log("PCSMonitor flags liquidation risk.");
    console.log("SettlementAdapter prepares settlement path.");
  } else {
    console.log("Status: SAFE");
  }

  console.log("\nOracle shock demo complete.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});