import { Button, Icon, List, message, Tabs, Tag, Upload } from 'antd';
import sha256 from 'crypto-js/sha256';
import JSZip from 'jszip';
import React from 'react';
import Dropzone from 'react-dropzone';
import Web3 from 'web3';

import { abi, COLOR } from '../../constants';
import { downloadFile } from '../../libs/download';
import {
  getContractAddressList,
  revokeCertificate,
} from '../../libs/smartContractUtils';
import { createMT } from '../../libs/verifymt';
import ModalForm from '../ModalForm/ModalForm';
import RevokeForm from '../RevokeForm/RevokeForm';
import './Issue.css';

const { TabPane } = Tabs;
const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess('ok');
    console.log(file);
  }, 0);
};

const uploadProps = {
  name: 'file',
  customRequest: dummyRequest,
};

interface Props {
  MyContract: any;
  contractAddress: string;
  account: string;
  getContractAddressList: string[];
  createContract: (
    MTRoot,
    instituteName,
    logoUrl,
    yearOfGraduation,
    description,
  ) => void;
}

interface IState {
  hashedCertArray: string[];
  waitingForFileUpload: boolean;
  fileNames: string[];
  fileList: any;
  proofs: any;
  disableButton: boolean;
  MTRoot: string;
  selectedAddress: string;
  reason: string;
  createdContractAddress: string;
}

class Issue extends React.Component<Props, IState> {
  static readUploadedFileAsText = (inputFile: any) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result as any);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  };
  private modal: any;

  constructor(props) {
    super(props);
    this.state = {
      hashedCertArray: [],
      waitingForFileUpload: false,
      fileNames: [],
      fileList: [],
      proofs: [],
      disableButton: true,
      MTRoot: '',
      selectedAddress: '',
      reason: '',
      createdContractAddress: '',
    };
    this.modal = React.createRef();
  }

  async componentWillMount() {
    const createdContractAddress = await getContractAddressList();
    this.setState({
      createdContractAddress,
    });
  }

  uploadFile = async (files: any) => {
    this.modal.current.showModal();
    const fileList = files;

    const fileNamesArray: string[] = [];
    this.setState({ waitingForFileUpload: true, fileList });
    for (let i = 0; i < fileList.length; i++) {
      // take file name for student ID. Ex: ITITIU14076
      fileNamesArray.push(fileList[i].name);
    }

    this.setState({
      fileNames: fileNamesArray,
    });

    // Uploads will push to the file input's `.files` array. Get the last uploaded file.
    for (let i = 0; i < fileList.length; i++) {
      try {
        let fileContents = await Issue.readUploadedFileAsText(fileList[i]);
        fileContents = sha256(fileContents).toString();

        const modifiedhashedCertArray = this.state.hashedCertArray;
        modifiedhashedCertArray.push(fileContents as string);

        this.setState({
          hashedCertArray: modifiedhashedCertArray,
        });
      } catch (e) {
        console.log(e);
        this.setState({
          waitingForFileUpload: false,
        });
      }
    }
    this.setState({
      waitingForFileUpload: false,
    });

    const data = createMT(this.state.hashedCertArray);
    const { MTRoot, proofs } = data;
    this.setState({
      proofs,
      disableButton: false,
      MTRoot,
    });
  };

  createContractTrigger = async (values: any) => {
    const { MTRoot } = this.state;
    const { instituteName, logoUrl, yearOfGraduation, description } = values;
    await this.props.createContract(
      MTRoot,
      instituteName,
      logoUrl,
      yearOfGraduation,
      description,
    );
    const createdContractAddress = await getContractAddressList();
    this.setState({
      createdContractAddress,
    });
  };

  generateReceipt = () => {
    const { contractAddress } = this.props;
    const { fileList, proofs, fileNames } = this.state;
    const zip = new JSZip();
    const blockchainReceipt = {
      contractAddress,
      proof: null,
    };
    for (let i = 0; i < fileNames.length; i++) {
      blockchainReceipt.proof = proofs[i];
      const receipt = new Blob([JSON.stringify(blockchainReceipt)], {
        type: 'json',
      });
      const folder = zip.folder(fileNames[i].split('.')[0]);
      folder.file(
        `${fileNames[i].split('.')[0]}_blockchainReceipt.json`,
        receipt,
      );
      folder.file(fileNames[i], fileList[i]);
    }

    zip.generateAsync({ type: 'blob' }).then((content: any) => {
      downloadFile(content, 'certBatch.zip', 'zip');
    });
  };

  uploadForRevoking = async (info: any) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      const { account } = this.props;
      const { selectedAddress, reason } = this.state;
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
      const MyContract = new web3.eth.Contract(abi, selectedAddress);
      message.success(`${info.file.name} file uploaded successfully`);
      const fileContents = await Issue.readUploadedFileAsText(
        info.file.originFileObj,
      );
      const hashedCert = sha256(fileContents).toString();

      revokeCertificate(
        hashedCert,
        reason,
        account,
        MyContract,
        selectedAddress,
      );
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const { disableButton, createdContractAddress } = this.state;
    const { contractAddress } = this.props;

    return (
      <div style={{ display: 'grid' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#1890ff' }}>Issuing section</h1>
        </div>

        <Tabs
          defaultActiveKey="1"
          tabBarStyle={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          <TabPane
            tab={
              <span>
                <Icon
                  type="cloud-upload"
                  style={{ display: 'inline-block', verticalAlign: 'middle' }}
                />
                Issue certificates
              </span>
            }
            key="1"
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <Dropzone
                onDrop={this.uploadFile}
                accept=".pdf,.doc,.docs,images/*"
                multiple
                className="dropzone"
              >
                <Icon
                  type="cloud-upload"
                  style={{
                    fontSize: '70px',
                    color: COLOR.yellow,
                    cursor: 'pointer',
                    marginBottom: '20px',
                  }}
                  className="App-intro"
                />
                <p>
                  Drop your{' '}
                  <span style={{ fontWeight: 'bold', color: COLOR.blue }}>
                    certificates
                  </span>{' '}
                  here or click to select
                </p>
              </Dropzone>
              <Tag color="blue" style={{ marginBottom: '50px' }}>
                {this.state.fileNames.length} file(s) selected
              </Tag>
              <div
                style={{
                  width: 300,
                  display: 'inline-block',
                }}
                className="App"
              >
                <Button
                  size="large"
                  type="primary"
                  disabled={contractAddress ? false : disableButton}
                  block
                  onClick={() => {
                    this.generateReceipt();
                  }}
                >
                  <Icon
                    type="download"
                    style={{ display: 'inline-block', verticalAlign: 'middle' }}
                  />
                  Download blockchain receipt
                </Button>

                <ModalForm
                  ref={this.modal}
                  createContractTrigger={this.createContractTrigger}
                />
              </div>
            </div>

            {this.state.waitingForFileUpload && <span>Uploading file...</span>}
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon
                  type="delete"
                  style={{ display: 'inline-block', verticalAlign: 'middle' }}
                />
                Revoke
              </span>
            }
            key="2"
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                // padding: '0 300px',
              }}
            >
              <div style={{ marginTop: '10px' }}>
                <h3 style={{ marginBottom: '30px' }}>Revoke form</h3>
                <RevokeForm
                  onChange={(selectedAddress, reason) => {
                    this.setState({
                      selectedAddress,
                      reason,
                    });
                  }}
                />
                <Upload {...uploadProps} onChange={this.uploadForRevoking}>
                  <Button disabled={!this.state.selectedAddress}>
                    <Icon
                      type="upload"
                      style={{
                        display: 'inline-block',
                        verticalAlign: 'middle',
                      }}
                    />{' '}
                    Select certificate to revoke
                  </Button>
                </Upload>
              </div>
              <div>
                <List
                  header={<h3>Created contract address list</h3>}
                  // border="true"
                  split
                  dataSource={createdContractAddress}
                  renderItem={item => (
                    <List.Item style={{ color: '#1890ff' }}>{item}</List.Item>
                  )}
                  pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 5,
                  }}
                />
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Issue;
