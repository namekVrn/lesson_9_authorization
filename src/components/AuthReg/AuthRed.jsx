import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Form, Input,Tooltip , Col, Row} from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { registrationUser } from "redux/auth/auth-operation";

// import '../AuthReg/AuthReg.css';
const AuthReg = ()=>{
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const onFinish = (values) => {
      dispatch(registrationUser(values))
        form.resetFields();
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
    <>
        <Row justify="center" align="middle">
         <Form
      name="basic"
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 24,
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
        name="name"
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
        label="Mail"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
            type: 'email'
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
            initialValues: "passwordddd"
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Согласен на все</Checkbox>
      </Form.Item> */}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Row>
    </>
    )
}
export default AuthReg