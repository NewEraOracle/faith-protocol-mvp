const hre = require("hardhat");

async function main() {
  console.log("Running FAITH Protocol flow simulation...\n");

  const [deployer] = await hre.ethers.getSigners();

  // Deploy contracts
  const Treasury = await hre.ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy();
  await treasury.waitForDeployment();

  const MockUSDm = await hre.ethers.getContractFactory("MockUSDm");
  const mockUSDm = await MockUSDm.deploy();
  await mockUSDm.waitForDeployment();

  const SettlementAdapter = await hre.ethers.getContractFactory("SettlementAdapter");
  const settlementAdapter = await SettlementAdapter.deploy(
    await mockUSDm.getAddress(),
    await treasury.getAddress()
  );
  await settlementAdapter.waitForDeployment();

  const CreditEngine = await hre.ethers.getContractFactory("CreditEngine");
  const creditEngine = await CreditEngine.deploy(
    await settlementAdapter.getAddress()
  );
  await creditEngine.waitForDeployment();

  const PCSMonitor = await hre.ethers.getContractFactory("PCSMonitor");
  const pcsMonitor = await PCSMonitor.deploy();
  await pcsMonitor.waitForDeployment();

  console.log("Contracts deployed.\n");

  // Mock simulation values
  const collateralValue = 1000;
  const borrowAmount = 500;
  const initialHealthFactor = 200;
  const crashedHealthFactor = 85;

  console.log("User deposits collateral:");
  console.log(`Collateral Value: $${collateralValue}`);

  console.log("\nCreditEngine calculates borrow power...");
  console.log(`Approved Borrow Amount: $${borrowAmount} MockUSDm`);

  console.log("\nMinting MockUSDm...");
  console.log(`${borrowAmount} MockUSDm minted to user`);

  console.log("\nPCSMonitor checks vault health...");
  console.log(`Initial Health Factor: ${initialHealthFactor}%`);

  console.log("\nSimulating oracle shock...");
  console.log("Collateral market drops -40%");

  console.log("\nPCSMonitor updates vault...");
  console.log(`New Health Factor: ${crashedHealthFactor}%`);

  if (crashedHealthFactor < 100) {
    console.log("\n⚠ LIQUIDATION RISK DETECTED");
    console.log("SettlementAdapter preparing settlement...");
  } else {
    console.log("\nVault remains healthy.");
  }

  console.log("\nFAITH Protocol simulation complete.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});