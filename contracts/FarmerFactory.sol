pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract FarmerFactory {
    struct Farmer {
        string id;
        bool hasProject;
        bool isVerified;
    }

    Farmer[] public farmers;
    
    // Maps farmer id to index
    mapping(string=> uint) public farmerIndex;

    function _createFarmer(string memory _id) public {
        uint index = farmers.push(Farmer(_id, false, false)) - 1;
        farmerIndex[_id] = index; 
    }

    function _verifyFarmer(string memory _farmerId) public {
        uint index = farmerIndex[_farmerId];
        farmers[index].isVerified = true;
    }

    function _getFarmer(string memory _farmerId) public view returns(Farmer memory){
        uint index=farmerIndex[_farmerId];
        return farmers[index];
    }
}