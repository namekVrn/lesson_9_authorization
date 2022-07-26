import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {
    logIn,
} from '../../redux/auth/auth-operation';
import {antIcon} from '../utils/iconSpin';
const AuthLogIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  const onFinish = values => {
    dispatch(logIn(values))
    console.log('Received values of form: ', values);
  };
 
  return (
    <>
      <Row justify="center" align="middle">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
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
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item> */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={()=>{setTimeout(()=>{
                <Spin indicator={antIcon} />
                navigate("/main")
              }, 1000)}}
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
};

export default AuthLogIn;
