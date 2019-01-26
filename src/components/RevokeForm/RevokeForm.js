import React from 'react';
import { Form, Icon, Input } from 'antd';

const FormItem = Form.Item;

class RevokeForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onChange(values.contractAddress, values.reason);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onChange={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('contractAddress', {
            rules: [
              { required: true, message: 'Please input contract address!' },
            ],
          })(
            <Input
              prefix={
                <Icon
                  type="home"
                  style={{
                    color: 'rgba(0,0,0,.25)',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                  }}
                />
              }
              placeholder="Contract Address value"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('reason', {
            rules: [
              { required: true, message: 'Please input reason for revoking!' },
            ],
          })(
            <Input
              prefix={
                <Icon
                  type="lock"
                  style={{
                    color: 'rgba(0,0,0,.25)',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                  }}
                />
              }
              placeholder="Reason ..."
            />,
          )}
        </FormItem>
      </Form>
    );
  }
}

const WrappedRevokeForm = Form.create()(RevokeForm);

export default WrappedRevokeForm;
