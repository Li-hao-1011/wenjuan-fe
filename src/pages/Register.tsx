import { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Space, Typography, Form, Input, Button, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import styles from './Register.module.scss'
import { LOGIN_PATHNAME } from '../router/index'
import { registerService } from '../services/user'

const { Title } = Typography

const Register: FC = () => {
  const nav = useNavigate()
  const { run: register, loading: registerLoading } = useRequest(
    async (values) => {
      const { username, password, nickname } = values
      await registerService({ username, password, nickname })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('注册成功!')
        nav(LOGIN_PATHNAME)
      },
    },
  )
  const onFinish = (values: any) => {
    console.log('onFinish', values)
    register(values)
  }
  return (
    <div className={styles.container}>
      <Space>
        <Title level={2}>
          <UserAddOutlined />
        </Title>
        <Title level={2}>注册新用户</Title>
      </Space>
      <div>
        <Form
          name="register"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ minWidth: 350, maxWidth: 500 }}
          onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
              { type: 'string', min: 5, max: 15, message: '长度在 5~20 之间' },
              { pattern: /^\w+$/, message: '仅支持字符、数字、下划线' },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { type: 'string', min: 15, max: 24, message: '长度在 15~24 之间' },
            ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(new Error('Please confirm your password!'))
                  } else if (value && value === getFieldValue('password')) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('两次密码输入不一致!'))
                  }
                },
              }),
            ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="昵称" name="nickname" rules={[{ required: false }]}>
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={registerLoading}>
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账号，前去登陆</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Register
