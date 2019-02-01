export const rootAddressRinkeby = '0x9efd4724e03f003ab3cfe534499f87b8efb855e9';
export const rootAddressRopsten = '0x9ebf8424616feef1c244d68fb3028ff98333e27b';
export const rootAddressLocal = '0xe78a0f7e598cc8b0bb87894b0f60dd2a88d6a8ab';
export const abi = [
  {
    constant: false,
    inputs: [
      {
        name: '_studentID',
        type: 'string',
      },
      {
        name: '_reasonForRevoke',
        type: 'string',
      },
    ],
    name: 'revokeCertificate',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_studentID',
        type: 'string',
      },
    ],
    name: 'unRevokeCertificate',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        name: '_institute',
        type: 'string',
      },
      {
        name: '_logoURL',
        type: 'string',
      },
      {
        name: '_yearOfGraduation',
        type: 'int256',
      },
      {
        name: '_description',
        type: 'string',
      },
      {
        name: '_MTRoot',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'studentID',
        type: 'string',
      },
      {
        indexed: false,
        name: 'announcement',
        type: 'string',
      },
    ],
    name: 'revoke',
    type: 'event',
  },
  {
    constant: true,
    inputs: [],
    name: 'description',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getInstituteInfo',
    outputs: [
      {
        name: '',
        type: 'string',
      },
      {
        name: '',
        type: 'string',
      },
      {
        name: '',
        type: 'int256',
      },
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getRoot',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'institute',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'logoURL',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'MTRoot',
    outputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'proof',
        type: 'bytes32[]',
      },
      {
        name: 'root',
        type: 'bytes32',
      },
      {
        name: 'leaf',
        type: 'bytes32',
      },
    ],
    name: 'verify',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_studentID',
        type: 'string',
      },
    ],
    name: 'verifyWithRevocationList',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'yearOfGraduation',
    outputs: [
      {
        name: '',
        type: 'int256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];
export const rootAbi = [
  {
    constant: false,
    inputs: [
      {
        name: '_contractAddress',
        type: 'address',
      },
    ],
    name: 'setContractAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    name: 'contractAddress',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getContractAddressList',
    outputs: [
      {
        name: '',
        type: 'address[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

export const Mnemoic =
  'myth like bonus scare over problem client lizard pioneer submit female collect';

export const COLOR = {
  blue: '#1890ff',
  yellow: '#F4B400',
};
export const bytecode =
  '0x60806040523480156200001157600080fd5b5060405162001401380380620014018339810180604052810190808051820192919060200180518201929190602001805190602001909291908051820192919060200180519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508360029080519060200190620000b992919062000109565b50826003819055508460019080519060200190620000d992919062000109565b5080600581600019169055508160049080519060200190620000fd92919062000109565b505050505050620001b8565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200014c57805160ff19168380011785556200017d565b828001600101855582156200017d579182015b828111156200017c5782518255916020019190600101906200015f565b5b5090506200018c919062000190565b5090565b620001b591905b80821115620001b157600081600090555060010162000197565b5090565b90565b61123980620001c86000396000f3006080604052600436106100ba576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632d1956ec146100bf57806354aa3fdd146100f25780635a9a49c7146101df5780635ca1e165146102795780637284e416146102ac5780638da5cb5b1461033c5780638db50bae14610393578063aca1424514610423578063bc4f5bad1461048c578063d2ce89e5146105b4578063e2e0f86914610644578063fd89e59f1461066f575b600080fd5b3480156100cb57600080fd5b506100d46107de565b60405180826000191660001916815260200191505060405180910390f35b3480156100fe57600080fd5b50610159600480360381019080803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506107e4565b604051808315151515815260200180602001828103825283818151815260200191508051906020019080838360005b838110156101a3578082015181840152602081019050610188565b50505050905090810190601f1680156101d05780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b3480156101eb57600080fd5b5061025f60048036038101908080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509192919290803560001916906020019092919080356000191690602001909291905050506109c4565b604051808215151515815260200191505060405180910390f35b34801561028557600080fd5b5061028e610b67565b60405180826000191660001916815260200191505060405180910390f35b3480156102b857600080fd5b506102c1610b71565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156103015780820151818401526020810190506102e6565b50505050905090810190601f16801561032e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561034857600080fd5b50610351610c0f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561039f57600080fd5b506103a8610c34565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156103e85780820151818401526020810190506103cd565b50505050905090810190601f1680156104155780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561042f57600080fd5b5061048a600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610cd2565b005b34801561049857600080fd5b50610539600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610da7565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561057957808201518184015260208101905061055e565b50505050905090810190601f1680156105a65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156105c057600080fd5b506105c9610e8a565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156106095780820151818401526020810190506105ee565b50505050905090810190601f1680156106365780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561065057600080fd5b50610659610f28565b6040518082815260200191505060405180910390f35b34801561067b57600080fd5b50610684610f2e565b60405180806020018060200185815260200180602001848103845288818151815260200191508051906020019080838360005b838110156106d25780820151818401526020810190506106b7565b50505050905090810190601f1680156106ff5780820380516001836020036101000a031916815260200191505b50848103835287818151815260200191508051906020019080838360005b8381101561073857808201518184015260208101905061071d565b50505050905090810190601f1680156107655780820380516001836020036101000a031916815260200191505b50848103825285818151815260200191508051906020019080838360005b8381101561079e578082015181840152602081019050610783565b50505050905090810190601f1680156107cb5780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b60055481565b6000606060006006846040518082805190602001908083835b60208310151561082257805182526020820191506020810190506020830392506107fd565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902080546001816001161561010002031660029004905011156109825760006006846040518082805190602001908083835b6020831015156108aa5780518252602082019150602081019050602083039250610885565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020808054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109725780601f1061094757610100808354040283529160200191610972565b820191906000526020600020905b81548152906001019060200180831161095557829003601f168201915b50505050509050915091506109bf565b60016040805190810160405280600581526020017f76616c6964000000000000000000000000000000000000000000000000000000815250915091505b915091565b600080600080849250600091505b8651821015610b505786828151811015156109e957fe5b906020019060200201519050806000191683600019161015610aa65782816040516020018083600019166000191681526020018260001916600019168152602001925050506040516020818303038152906040526040518082805190602001908083835b602083101515610a725780518252602082019150602081019050602083039250610a4d565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405180910390209250610b43565b80836040516020018083600019166000191681526020018260001916600019168152602001925050506040516020818303038152906040526040518082805190602001908083835b602083101515610b135780518252602082019150602081019050602083039250610aee565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051809103902092505b81806001019250506109d2565b856000191683600019161493505050509392505050565b6000600554905090565b60048054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610c075780601f10610bdc57610100808354040283529160200191610c07565b820191906000526020600020905b815481529060010190602001808311610bea57829003601f168201915b505050505081565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610cca5780601f10610c9f57610100808354040283529160200191610cca565b820191906000526020600020905b815481529060010190602001808311610cad57829003601f168201915b505050505081565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610d2d57600080fd5b6006816040518082805190602001908083835b602083101515610d655780518252602082019150602081019050602083039250610d40565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390206000610da49190611120565b50565b60606000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610e0457600080fd5b816006846040518082805190602001908083835b602083101515610e3d5780518252602082019150602081019050602083039250610e18565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390209080519060200190610e83929190611168565b5092915050565b60028054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610f205780601f10610ef557610100808354040283529160200191610f20565b820191906000526020600020905b815481529060010190602001808311610f0357829003601f168201915b505050505081565b60035481565b60608060006060600160026003546004838054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610fd35780601f10610fa857610100808354040283529160200191610fd3565b820191906000526020600020905b815481529060010190602001808311610fb657829003601f168201915b50505050509350828054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561106f5780601f106110445761010080835404028352916020019161106f565b820191906000526020600020905b81548152906001019060200180831161105257829003601f168201915b50505050509250808054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561110b5780601f106110e05761010080835404028352916020019161110b565b820191906000526020600020905b8154815290600101906020018083116110ee57829003601f168201915b50505050509050935093509350935090919293565b50805460018160011615610100020316600290046000825580601f106111465750611165565b601f01602090049060005260206000209081019061116491906111e8565b5b50565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106111a957805160ff19168380011785556111d7565b828001600101855582156111d7579182015b828111156111d65782518255916020019190600101906111bb565b5b5090506111e491906111e8565b5090565b61120a91905b808211156112065760008160009055506001016111ee565b5090565b905600a165627a7a72305820736f7d583a429ce4a5e920b04a840fca49fbf5c5d49c4e057596c82195cd74320029';