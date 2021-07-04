var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var FarmerFactory = artifacts.require("./FarmerFactory.sol");
var InvestorFactory = artifacts.require("./InvestorFactory.sol");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(FarmerFactory);
  deployer.deploy(InvestorFactory);
};
