const hre = require("hardhat");

async function main() {
  console.log("Deploying FAITH Protocol Testnet v1...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const Treasury = await hre.ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy();
  await treasury.waitForDeployment();
  const treasuryAddress = await treasury.getAddress();
  console.log("Treasury deployed:", treasuryAddress);

  const MockUSDm = await hre.ethers.getContractFactory("MockUSDm");
  const mockUSDm = await MockUSDm.deploy();
  await mockUSDm.waitForDeployment();
  const mockUSDmAddress = await mockUSDm.getAddress();
  console.log("MockUSDm deployed:", mockUSDmAddress);

  const SettlementAdapter = await hre.ethers.getContractFactory("SettlementAdapter");
  const settlementAdapter = await SettlementAdapter.deploy(
    mockUSDmAddress,
    treasuryAddress
  );
  await settlementAdapter.waitForDeployment();
  const settlementAdapterAddress = await settlementAdapter.getAddress();
  console.log("SettlementAdapter deployed:", settlementAdapterAddress);

  const CreditEngine = await hre.ethers.getContractFactory("CreditEngine");
  const creditEngine = await CreditEngine.deploy(settlementAdapterAddress);
  await creditEngine.waitForDeployment();
  const creditEngineAddress = await creditEngine.getAddress();
  console.log("CreditEngine deployed:", creditEngineAddress);

  const PCSMonitor = await hre.ethers.getContractFactory("PCSMonitor");
  const pcsMonitor = await PCSMonitor.deploy();
  await pcsMonitor.waitForDeployment();
  const pcsMonitorAddress = await pcsMonitor.getAddress();
  console.log("PCSMonitor deployed:", pcsMonitorAddress);

  const FAITHToken = await hre.ethers.getContractFactory("FAITHToken");
  const faithToken = await FAITHToken.deploy();
  await faithToken.waitForDeployment();
  const faithTokenAddress = await faithToken.getAddress();
  console.log("FAITHToken deployed:", faithTokenAddress);

  console.log("\nFAITH Protocol Testnet v1 deployed successfully:");
  console.log({
    treasury: treasuryAddress,
    mockUSDm: mockUSDmAddress,
    settlementAdapter: settlementAdapterAddress,
    creditEngine: creditEngineAddress,
    pcsMonitor: pcsMonitorAddress,
    faithToken: faithTokenAddress,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});