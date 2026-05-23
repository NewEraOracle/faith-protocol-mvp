const { expect } = require("chai");
const hre = require("hardhat");

describe("FAITH Protocol Testnet v1", function () {

  let treasury;
  let mockUSDm;
  let settlementAdapter;
  let creditEngine;
  let pcsMonitor;

  before(async function () {

    const Treasury = await hre.ethers.getContractFactory("Treasury");
    treasury = await Treasury.deploy();
    await treasury.waitForDeployment();

    const MockUSDm = await hre.ethers.getContractFactory("MockUSDm");
    mockUSDm = await MockUSDm.deploy();
    await mockUSDm.waitForDeployment();

    const SettlementAdapter = await hre.ethers.getContractFactory("SettlementAdapter");
    settlementAdapter = await SettlementAdapter.deploy(
      await mockUSDm.getAddress(),
      await treasury.getAddress()
    );
    await settlementAdapter.waitForDeployment();

    const CreditEngine = await hre.ethers.getContractFactory("CreditEngine");
    creditEngine = await CreditEngine.deploy(
      await settlementAdapter.getAddress()
    );
    await creditEngine.waitForDeployment();

    const PCSMonitor = await hre.ethers.getContractFactory("PCSMonitor");
    pcsMonitor = await PCSMonitor.deploy();
    await pcsMonitor.waitForDeployment();
  });

  it("Should deploy all contracts correctly", async function () {

    expect(await treasury.getAddress()).to.not.equal(undefined);

    expect(await mockUSDm.getAddress()).to.not.equal(undefined);

    expect(await settlementAdapter.getAddress()).to.not.equal(undefined);

    expect(await creditEngine.getAddress()).to.not.equal(undefined);

    expect(await pcsMonitor.getAddress()).to.not.equal(undefined);
  });

  it("Should simulate healthy vault state", async function () {

    const collateralValue = 2000;
    const borrowedAmount = 1000;

    const healthFactor = (collateralValue / borrowedAmount) * 100;

    expect(healthFactor).to.be.greaterThan(150);
  });

  it("Should simulate warning vault state after oracle shock", async function () {

    const collateralValue = 1100;
    const borrowedAmount = 1000;

    const healthFactor = (collateralValue / borrowedAmount) * 100;

    expect(healthFactor).to.be.lessThan(120);
    expect(healthFactor).to.be.greaterThan(100);
  });

  it("Should simulate liquidation danger state", async function () {

    const collateralValue = 800;
    const borrowedAmount = 1000;

    const healthFactor = (collateralValue / borrowedAmount) * 100;

    expect(healthFactor).to.be.lessThan(100);
  });

});