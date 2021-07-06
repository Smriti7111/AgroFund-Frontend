pragma solidity ^0.5.0;

contract InvestorFactory {
    struct Investor {
        uint id;
        bool isVerified;
    }

    Investor[] public investors;
    
    mapping(address => uint) public investorIndex;

    function createInvestor(uint _id, bool _isVerified) public {
        uint index = investors.push(Investor(_id, _isVerified)) - 1;
        investorIndex[msg.sender] = index; 
    }

    function verifyInvestor(bool status,address investor) public {
        uint index = investorIndex[investor];
        investors[index].isVerified = status;
    }
}