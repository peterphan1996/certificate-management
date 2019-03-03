pragma solidity ^0.4.19;
import "./Ownable.sol";

contract Cert is Ownable {
    
    string public institute;
    string public logoURL;
    string public description;
    int public yearOfGraduation;
    bytes32 public MTRoot;
    
    constructor (string _institute, string _logoURL, int _yearOfGraduation, string _description, bytes32 _MTRoot) public {
        logoURL = _logoURL;
        yearOfGraduation = _yearOfGraduation;
        institute = _institute;
        MTRoot = _MTRoot;
        description= _description;
    }
    
    // string hashedCertificate => string reasonForRevoke
    mapping (string => string) revocationList;
    
    
    function getInstituteInfo() public view returns(string, string, int, string){
        return (institute, logoURL, yearOfGraduation, description);
    }
    
    function getRoot() public view returns(bytes32) {
        return MTRoot;
    }
    
    function revokeCertificate(string _studentID, string _reasonForRevoke) public onlyOwner returns(string) {
        revocationList[_studentID] = _reasonForRevoke;
    }
    
    function unRevokeCertificate(string _studentID) public onlyOwner {
        delete revocationList[_studentID];
    }
    
    function verifyWithRevocationList(string _studentID) public view returns(bool, string) {
        if (bytes(revocationList[_studentID]).length > 0) {
            return (false, revocationList[_studentID]);
        }
        return (true, "valid");
    }
    
    function verify(bytes32[] proof, bytes32 root, bytes32 leaf) public pure returns (bool) {
        bytes32 computedHash = leaf;
    
        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];
            
            if (computedHash < proofElement) {
                computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
            } else {
                computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
            }
        }
        return computedHash == root;
    }
}