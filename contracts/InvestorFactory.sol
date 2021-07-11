pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract InvestorFactory {
    struct Investor {
        string id;
        address walletAddress;
      
        bool isVerified;
    }

    Investor[] public investors;
    
    mapping(string => uint) public investorIndex;

    function _createInvestor(string memory _id) public {
        uint index = investors.push(Investor(_id, msg.sender,false)) - 1;
        investorIndex[_id] = index; 
    }

    function _verifyInvestor(string memory _id) public {
        uint index = investorIndex[_id];
        investors[index].isVerified = true;
    }

    
    function _getInvestor(string memory _investorId) public view returns(Investor memory){
        uint index=investorIndex[_investorId];
        return investors[index];
    }
}