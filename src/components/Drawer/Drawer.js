import React from 'react';
import { Drawer, List, Avatar, Divider, Col, Row, Button } from 'antd';
import PropTypes from 'prop-types';
import Pdf from '../Pdf/Pdf';

const pStyle = {
  fontSize: 16,
  color: '#1890ff',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
  fontWeight: 'bold',
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

DescriptionItem.propTypes = {
  title: PropTypes.string,
  content: PropTypes.any,
};

class CustomDrawer extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { instituteInfo, file } = this.props;
    const instituteName = instituteInfo[0];
    const logoUrl = instituteInfo[1];
    const yearOfGraduation = instituteInfo[2];
    const description = instituteInfo[3];
    const owner = instituteInfo[4];
    const address = instituteInfo[5];
    const MTRoot = instituteInfo[6];
    return (
      <div>
        <List
          dataSource={[
            {
              name: { instituteName },
            },
          ]}
          bordered
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <Button type="dashed" onClick={this.showDrawer}>
                  View Info
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={logoUrl} />}
                title={<a href="google.com">{instituteName}</a>}
                description={`Year of Graduation: ${yearOfGraduation}`}
              />
            </List.Item>
          )}
        />
        <Drawer
          width={900}
          placement="left"
          closable
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p style={pStyle}>Instritute Info</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Institute Name" content={instituteName} />{' '}
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Institute Logo"
                content={<Avatar src={logoUrl} />}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Institute blockchain address"
                content={owner}
              />
            </Col>
          </Row>
          <Divider />
          <p style={pStyle}>Batch of Certificates Info</p>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Year of Graduation"
                content={yearOfGraduation}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem title="Description" content={description} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Smart contract address"
                content={address}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem title="Merkle Tree Root" content={MTRoot} />
            </Col>
          </Row>
          <Divider />
          {file && (
            <div>
              <p style={pStyle}>Digital Certificate</p>
              <Row>
                <Col span={12}>
                  <Pdf file={file} />
                </Col>
              </Row>
            </div>
          )}
        </Drawer>
      </div>
    );
  }
}

CustomDrawer.propTypes = {
  instituteInfo: PropTypes.object,
};

export default CustomDrawer;
