import React from 'react';
import "./Login.scss"
import { Button, Checkbox, Form, Input } from 'antd';
import { getAuth,setPersistence,browserSessionPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();
    const auth = getAuth();
    const onFinish = (values) => {
      // Sigining
      signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Setting presisteance so it will expire if browser Close
        const user = userCredential.user;
        setPersistence(auth, browserSessionPersistence)
        .then(() => {
          alert("Logged In!")
          console.log("Logged In and:",user)
          navigate("/"); 
         })
        .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
        });
      })
      .catch((error) => {
        alert("Invalid Data!")
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error",errorCode,errorMessage)
      });

      
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
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
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
