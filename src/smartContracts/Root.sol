pragma solidity ^0.4.19;

contract Root {
    
    address[] public contractAddress;
    mapping (address => address[]) ownerToContractAddress;

    function setContractAddress(address _contractAddress) public {
        ownerToContractAddress[msg.sender].push(address(_contractAddress));
    }
    
    function getContractAddressList() public view returns(address[]) {
        return ownerToContractAddress[msg.sender];
    }
    
}