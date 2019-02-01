import { Button, Icon, List, notification, Popconfirm, Steps, Tag } from 'antd';
import sha256 from 'crypto-js/sha256';
import Lottie from 'lottie-react-web';
import React from 'react';
import { Animated } from 'react-animated-css';
import Dropzone from 'react-dropzone';
import Web3 from 'web3';

import { abi, COLOR } from '../../constants';
import {
  getInstituteInfo,
  getRoot,
  verifyWithRevocationList,
} from '../../libs/smartContractUtils';
import { verify } from '../../libs/verifymt';
import CustomDrawer from '../Drawer/Drawer';
import { firework } from './firework';
import './Verify.css';

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
    duration: type === 'success' ? 6 : 15,
  });
};

const descriptionStep = data => (
  <List
    size="small"
    dataSource={data}
    renderItem={item => <List.Item>{item}</List.Item>}
  />
);

const { Step } = Steps;

const initialState = {
  receipt: {},
  hashedCert: '',
  waitingForFileUpload: false,
  web3: new Web3(Web3.givenProvider || 'http://localhost:8545'),
  fileType: 'receipt',
  currentFileType: 'blockchain receipt',
  steps: [
    {
      message: 'Load blockchain receipt',
      status: 'process',
      description: descriptionStep([
        '1. Load the blockchain receipt',
        '2. Call the smart contract with the address attached in the receipt',
        '3. Get the information from that smart contract',
      ]),
    },
    {
      message: 'Load digital certificate',
      status: 'wait',
      description: descriptionStep([
        '1. Load the digital certificate',
        '2. Hash the content of the certififcate',
      ]),
    },
    {
      message: 'Verify with Smart Contract',
      status: 'wait',
      description: descriptionStep([
        '1. Call the smart contract with the address embedded in the receipt',
        '2. Compare the Merkle Tree Root in the smart contract with the calculated one using proof and leaf data in the receipt',
      ]),
    },
    {
      message: 'Verify with Revocation List',
      status: 'wait',
      description: descriptionStep([
        '1. Check the existence of the hashed content of the certificate in revocation list in smart contract',
      ]),
    },
    { message: 'Done', status: 'wait' },
  ],
  currentStep: 0,
  renderFireWork: false,
  instituteInfo: {},
  certFile: undefined,
};

interface IState {
  receipt: any;
  hashedCert: string;
  waitingForFileUpload: boolean;
  web3: any;
  fileType: string;
  currentFileType: string;
  steps: any;
  currentStep: number;
  renderFireWork: boolean;
  instituteInfo: object;
  certFile: any;
}

interface Props {
  MyContract: any;
}

class Verify extends React.Component<Props, IState> {
  static readUploadedFileAsText = inputFile => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result as {});
      };
      temporaryFileReader.readAsText(inputFile);
    });
  };

  private drawer: any;
  private dropzone: any;
  constructor(props) {
    super(props);
    this.drawer = React.createRef();
    this.dropzone = React.createRef();
    this.state = {
      ...initialState,
    };
  }

  onDrop = file => {
    if (this.state.fileType === 'receipt') {
      this.uploadReceipt(file);
    } else {
      this.uploadCert(file);
    }
  };

  onCancel = () => {
    // this.setState({
    //   files: [],
    // });
  };

  uploadReceipt = async files => {
    this.setState({ waitingForFileUpload: true });
    const receiptFile = files[0];
    let receiptContents;

    // Uploads will push to the file input's `.files` array. Get the last uploaded file.

    try {
      receiptContents = await Verify.readUploadedFileAsText(receiptFile);
      this.setState({
        waitingForFileUpload: false,
      });
    } catch (e) {
      console.log(e);
      this.setState({
        waitingForFileUpload: false,
      });
    }

    const receiptObject = JSON.parse(receiptContents);
    console.log(receiptObject);
    const instituteInfo = await this.getInstituteInfo(receiptObject);

    this.setState({
      receipt: receiptObject,
      fileType: 'certificate',
      currentFileType: 'digital certificate',
      currentStep: 1,
      instituteInfo,
    });
    this.state.steps[1].status = 'process';
    this.forceUpdate();
    openNotificationWithIcon(
      'info',
      'Note',
      <div>
        Please upload your certificate to begin the verifying process. You can
        either click this Button{' '}
        <Tag
          color="blue"
          onClick={e => {
            this.dropzone.current.onClick(e);
            notification.destroy();
          }}
        >
          Upload certificate
        </Tag>
        or drag your file to the dropzone
      </div>,
    );
  };

  uploadCert = async files => {
    this.setState({ waitingForFileUpload: true });
    const certFile = files[0];

    try {
      const certContents = await Verify.readUploadedFileAsText(certFile);
      console.log('cert file', certFile);
      this.setState({ certFile });
      const hashedCert = sha256(certContents).toString();
      this.setState({
        waitingForFileUpload: false,
        hashedCert,
        currentStep: 2,
      });
    } catch (e) {
      this.setState({
        waitingForFileUpload: false,
      });
    }

    this.state.steps[2].status = 'process';
    this.forceUpdate();
  };

  getInstituteInfo = async receiptObject => {
    const { web3 } = this.state;
    const MyContract = new web3.eth.Contract(
      abi,
      receiptObject.contractAddress,
    );
    const instituteInfo = await getInstituteInfo(MyContract);
    return instituteInfo;
  };

  verifyCert = async () => {
    const { receipt, hashedCert, web3 } = this.state;
    const MyContract = new web3.eth.Contract(abi, receipt.contractAddress);
    const MTRoot = await getRoot(MyContract);
    const verifyWithMT = await verify(
      MyContract,
      receipt.proof,
      MTRoot,
      hashedCert,
    );
    if (verifyWithMT) {
      this.setState({
        currentStep: 3,
      });
      this.state.steps[3].status = 'process';
      this.forceUpdate();
      const resultWithRevocation = await verifyWithRevocationList(
        hashedCert,
        MyContract,
      );
      if (resultWithRevocation[0]) {
        this.setState({
          currentStep: 4,
          renderFireWork: true,
        });
        setTimeout(() => {
          this.setState({
            renderFireWork: false,
          });
        }, 1900);
        this.state.steps[4].status = 'finish';
        this.forceUpdate();

        openNotificationWithIcon(
          'success',
          'Congratulations',
          'Your certifiticate is valid without being tampered',
        );
        openNotificationWithIcon(
          'info',
          'Note',
          <div>
            Please check the public key of the institute with qualified CA.
            Please click{' '}
            <Tag color="blue" onClick={() => this.drawer.current.showDrawer()}>
              View info
            </Tag>{' '}
            button for more information
          </div>,
        );
      } else {
        // error revoke
        this.setState({
          currentStep: 3,
        });
        this.state.steps[3].status = 'error';
        this.forceUpdate();
        openNotificationWithIcon(
          'error',
          'Revoked certificate',
          <p>
            The certificate is currently being revoked. Please contact the
            issuer for more information.{' '}
            <b>Revocation reason: {resultWithRevocation[1]}</b>
          </p>,
        );
      }
    } else {
      this.state.steps[2].status = 'error';
      this.forceUpdate();
      openNotificationWithIcon(
        'error',
        'Invalid certificate',
        'The certificate is not valid. Please check again',
      );
    }
  };

  render() {
    const {
      fileType,
      currentFileType,
      currentStep,
      steps,
      instituteInfo,
      renderFireWork,
    } = this.state;
    return (
      <div style={{ display: 'grid' }}>
        {renderFireWork && (
          <div className="fireworkContainer">
            <Lottie
              options={{
                animationData: firework,
              }}
            />
          </div>
        )}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            flexDirection: 'row',
          }}
        >
          <Popconfirm
            title="Are you sure to restart the verification process?"
            onConfirm={() => {
              this.setState({
                ...initialState,
              });
            }}
            onCancel={() => null}
            okText="Yes"
            cancelText="Cancel"
          >
            <h1>
              <a>Verifying section</a>
            </h1>
          </Popconfirm>
        </div>

        <div
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Dropzone
            ref={this.dropzone}
            onDrop={this.onDrop}
            onFileDialogCancel={this.onCancel}
            accept={
              fileType === 'receipt' ? '.json' : '.pdf,.doc,.docs,images/*'
            }
            className="dropzone"
          >
            <Animated
              animationIn="wobble"
              animationOut={'none' as any}
              isVisible
            >
              <Icon
                type="safety-certificate"
                style={{
                  fontSize: '70px',
                  color: COLOR.yellow,
                  marginBottom: '20px',
                }}
                className="App-intro"
              />
            </Animated>
            <p>
              Drop your{' '}
              <span style={{ fontWeight: 'bold', color: COLOR.blue }}>
                {currentFileType}
              </span>{' '}
              here or click to select
            </p>
          </Dropzone>
        </div>
        {currentStep === 2 && (
          <Button type="primary" onClick={this.verifyCert}>
            <Icon
              type="scan"
              style={{ display: 'inline-block', verticalAlign: 'middle' }}
            />
            Verify Certificate
          </Button>
        )}
        {currentStep >= 0 && (
          <div>
            <div style={{ textAlign: 'left', margin: '20px 0' }}>
              <Steps
                current={currentStep}
                status={steps[currentStep].status}
                progressDot
              >
                {steps.map(step => (
                  <Step
                    title={step.message}
                    key={step.message}
                    description={step.description}
                  />
                ))}
              </Steps>
            </div>

            {currentStep > 0 && (
              <CustomDrawer
                instituteInfo={instituteInfo}
                ref={this.drawer}
                file={this.state.certFile}
              />
            )}
          </div>
        )}

        {this.state.waitingForFileUpload && <span>Uploading file...</span>}
      </div>
    );
  }
}

export default Verify;
