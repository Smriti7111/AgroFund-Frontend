pragma solidity ^0.5.0;

contract FarmerFactory {
    struct Farmer {
        uint id;
        bool hasProject;
        bool isVerified;
    }

    Farmer[] public farmers;
    
    mapping(address => uint) public farmerIndex;

    function createFarmer(uint _id, bool _hasProject, bool _isVerified) public {
        uint index = farmers.push(Farmer(_id, _hasProject, _isVerified)) - 1;
        farmerIndex[msg.sender] = index; 
    }

    function verifyFarmer(bool status,address farmer) public {
        uint index = farmerIndex[farmer];
        farmers[index].isVerified = status;
    }
}