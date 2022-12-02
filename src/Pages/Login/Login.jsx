import React from 'react';
import "./Login.scss"
import { Button, Checkbox, Form, Input } from 'antd';

const Login = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div className='Loginbody' >
            <div className="logincard">
                <div className="loginupper">
                    <h2>SmartCode</h2>
                    <div className="divider"></div>
                    <p>Keep your coding notes anywhere and easy to handel with smart code</p>
                </div>
                <div className="loginlower">
                    <h2 style={{ color : "var(--primary)" }} >Login</h2>
                    <p style={{ fontSize:'14px' }} >Enter Valid Credentials!</p>

                      {/* Form */}

                      <Form
      name="basic"
      labelCol={{
       
      }}
      wrapperCol={{
       
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          
        
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

                </div>
            </div>
        </div>
    );
}

export default Login;
