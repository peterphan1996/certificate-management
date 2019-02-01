import PropTypes from 'prop-types';
import Web3 from 'web3';
import { rootAbi, rootAddressLocal } from '../constants';
export const revokeCertificate = (
  _hashedCert,
  _reasonForRevoke,
  account,
  MyContract,
  selectedAddress,
) => {
  console.log(_hashedCert, account, MyContract);
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
  web3.eth.getTransactionCount(account, (err, nonce) => {
    const getData = MyContract.methods
      .revokeCertificate(_hashedCert, _reasonForRevoke)
      .encodeABI();
    // finally paas this data parameter to send Transaction
    web3.eth.sendTransaction({
      to: selectedAddress,
      from: account,
      data: getData,
      nonce,
    });
  });
};

export const getInstituteInfo = async MyContract => {
  // console.log(props)
  const result = await MyContract.methods.getInstituteInfo().call();
  const owner = await MyContract.methods.owner().call();
  const MTRoot = await MyContract.methods.getRoot().call();

  return { ...result, 4: owner, 5: MyContract.options.address, 6: MTRoot };
};

export const getRoot = async MyContract => {
  const result = await MyContract.methods.getRoot().call();
  console.log('getRoot func: ', result);
  return result;
};

export const verifyWithRevocationList = async (_hashedCert, MyContract) => {
  const result = await MyContract.methods
    .verifyWithRevocationList(_hashedCert)
    .call();
  console.log(result);
  return result;
};

export const getAccountTransactions = async (accAddress, startBlockNumber) => {
  // You can do a NULL check for the start/end blockNumber
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
  const array = [];
  for (let i = startBlockNumber; i <= startBlockNumber + 9000; i++) {
    web3.eth.getBlock(i, true, (err, block) => {
      if (block != null) {
        block.transactions.forEach(async e => {
          console.log('not this one');
          if (accAddress === e.from) {
            const receipt = await web3.eth.getTransactionReceipt(e.hash);
            array.push(receipt.contractAddress);
            console.log(
              'created contract Address: ',
              e,
              receipt.contractAddress,
            );
          }
        });
      }
    });
  }
  return array;
};

export const setContractAddress = (contractAddress, account) => {
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
  const rootContract = new web3.eth.Contract(rootAbi, rootAddressLocal);

  rootContract.methods
    .setContractAddress(contractAddress)
    .send({ from: account })
    .then(async result => {
      console.log('set roi nha', result);
      const address = await rootContract.methods
        .getContractAddressList()
        .call();
      console.log('result of contract list here when set', address);
    });
};

export const getContractAddressList = async () => {
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
  console.log('web', web3);
  const rootContract = new web3.eth.Contract(rootAbi, rootAddressLocal);
  console.log('rootContract here', rootContract);
  const result = await rootContract.methods.getContractAddressList().call();
  console.log('result of contract list here', result);
  return result;
};
