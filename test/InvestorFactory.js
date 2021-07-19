const InvestorFactory = artifacts.require("./InvestorFactory.sol");

contract("InvestorFactory", () => {
  it("should set Investor verification to false", async () => {
    const InvestorFactoryInstance = await InvestorFactory.deployed();
    await InvestorFactoryInstance._createInvestor(
      "4ac6c659c88f4a97a62169e27bf155gb"
    );
    let Investor = await InvestorFactoryInstance._getInvestor(
      "4ac6c659c88f4a97a62169e27bf155gb"
    );

    assert(Investor.isVerified == false);
  });

  it("should verify the Investor", async () => {
    const InvestorFactoryInstance = await InvestorFactory.deployed();
    await InvestorFactoryInstance._verifyInvestor(
      "4ac6c659c88f4a97a62169e27bf155gb"
    );
    let Investor = await InvestorFactoryInstance._getInvestor(
      "4ac6c659c88f4a97a62169e27bf155gb"
    );

    assert(Investor.isVerified == true);
  });
});
