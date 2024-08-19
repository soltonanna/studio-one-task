import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { loginSuccess, loginFailure } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';

const { Title } = Typography;

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state: RootState) => state.auth.error);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onFinish = (values: { username: string; password: string }) => {
    const { username, password } = values;
    if (username === 'admin' && password === '12345') {
      const token = 'fake-token';
      dispatch(loginSuccess(token));
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/profile', { replace: true });
    } else {
      dispatch(loginFailure('The username or password you entered is incorrect'));
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto' }}>
      <Title level={2}>Login</Title>
      <Form
        name="login"
        onFinish={onFinish}
        initialValues={{ username: 'admin', password: '12345' }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        {error && <Typography.Text type="danger">{error}</Typography.Text>}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;