
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../http-common";
import Swal from 'sweetalert2'


const PassLogin = () => {
  const [ remember, setRemember ] = useState(true);
  let navigate = useNavigate();
  const onFinish = (values) => {
    const data = { password: values.password, email: values.username };
    setRemember(values.remember)
    http.post("/users/login", data)
      .then(
        (response) => {
          if (response.status === 200)
            if (response.data?.id) {
              if (remember)
                localStorage.setItem("userID", response.data.id)
                localStorage.setItem("userEmail", values.username.split("@")[0]); // Store the user's email as username

                Swal.fire(
                  'Welcome Back to CoupAinder!',
                  'It was very boring while you were gone',
                )
                navigate("/coupons")
            }
            else
              // alert("user or pass invalid")
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'CoupAinder User or Password Invalid',
              })
        }
      ).catch((error) => {
        alert("print error server")
      })
    //console.log('Received values of form: ', values);
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: 400 }}>
        <h1 style={{ textAlign: 'center' }}>Login</h1>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/Agreement">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            {" "}Or <a href="/PassRegister">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default PassLogin;