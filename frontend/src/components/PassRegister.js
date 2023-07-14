//methood with ANT
import { Link } from "react-router-dom";
import React from 'react';
import http from "../http-common";
import Swal from 'sweetalert2'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
} from 'antd';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const PassRegister = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    
    const data = { password: values.password, email: values.email, fullname: values.fullname };
    http.post("/users/register", data)
      .then(
        (response) => {
          if (response.status === 200) {
            if (response.data.errorMessege) {
              //error e.g, email already exists
              Swal.fire({
                title: 'Hi :)',
                text: 'its looks like we already Met, please use this mail for Login',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
              })

              // alert(response.data.errorMessege)
              return
            } else {
              // if (values.remember)
              localStorage.setItem("userID", response.data?.id)
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Thanks for register to Coupainder',
                showConfirmButton: false,
                timer: 2000
              })
              navigate("/coupons")
            }
          }
        }
      ).catch((error) => {
        alert("print error server")
      })

  };


  return (

    
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
            <Form.Item
        name="Agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <Link to={"/Agreement"} >
          agreement
        </Link> 
        </Checkbox>
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="fullname"
        label="Full Name"
        rules={[
          {
            type: 'text',
          },
          {
            required: true,
            message: 'Please Insert Your Name',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
export default PassRegister;


