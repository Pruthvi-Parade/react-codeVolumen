import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios'

const SignupForm = ({ userType }) => {
    const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    console.log('Signup form values:', values);
    axios.post(`/${userType}/signup`, values)
          .then(response => {
            console.log(response.data);
            messageApi.open({
                type: 'success',
                content: 'Successfully Registerd',
              });
      })
      .catch(error => {
            console.log(error);
            messageApi.open({
                type: 'error',
                content: 'Something went wrong',
              });
      });
  };

  return (
    <Form onFinish={onFinish} style={{ display: "flex", flexDirection: "column", margin: 'auto', marginTop: '20px', justifyContent: "center", alignItems: "center", width: "20%"}}>
        {contextHolder}
      <Form.Item name="username" rules={[{ required: true, message: 'Please enter your username' }]}>
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item name="email" rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Invalid email format' }]}>
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
