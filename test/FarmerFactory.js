const FarmerFactory = artifacts.require("./FarmerFactory.sol");

contract("FarmerFactory", () => {
  it("should set farmer verification to false", async () => {
    const farmerFactoryInstance = await FarmerFactory.deployed();
    await farmerFactoryInstance._createFarmer(
      "4ac6c659c88f4a97a62169e27bf155eb"
    );
    let farmer = await farmerFactoryInstance._getFarmer(
      "4ac6c659c88f4a97a62169e27bf155eb"
    );

    assert(farmer.isVerified == false);
  });

  it("should verify the farmer", async () => {
    const farmerFactoryInstance = await FarmerFactory.deployed();
    await farmerFactoryInstance._verifyFarmer(
      "4ac6c659c88f4a97a62169e27bf155eb"
    );
    let farmer = await farmerFactoryInstance._getFarmer(
      "4ac6c659c88f4a97a62169e27bf155eb"
    );

    assert(farmer.isVerified == true);
  });
});
