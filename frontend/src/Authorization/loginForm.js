import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';

const LoginForm = ({ userType }) => {

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = (values) => {
    console.log('Login form values:', {
        email: values.email,
        password: values.password
    });
    axios.post(`/${userType}/login`, values)
          .then(response => {
                console.log(response.data);
                messageApi.open({
                    type: 'success',
                    content: 'Login Successfull',
                  });
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userType", `${userType}`);
                localStorage.setItem("username", `${response.data.username}`);
                window.location.href = location?.state?.from || "/";
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
      <Form.Item name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
        <Input placeholder="email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
