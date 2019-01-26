import React from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

export const CollectionCreateForm = Form.create()(
  class CustomizeForm extends React.PureComponent {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Input this batch of certificates information"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Institute name">
              {getFieldDecorator('instituteName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the name of the issuing institute!',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="Logo URL">
              {getFieldDecorator('logoUrl')(
                <Input addonBefore="http://" placeholder="url ..." />,
              )}
            </FormItem>
            <FormItem label="Year of Graduation">
              {getFieldDecorator('yearOfGraduation')(<Input type="number" />)}
            </FormItem>
            <FormItem label="Description">
              {getFieldDecorator('description')(<Input type="textarea" />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  },
);
