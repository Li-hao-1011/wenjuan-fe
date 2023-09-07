import { FC, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Space, Typography, Form, Input, Button, Checkbox } from 'antd'
import styles from './SignIn.module.scss'
import { REGISTER_PATHNAME } from '../router/index'

const PASS_WORD = 'password'
const USER_NAME = 'username'

const rememberUser = ({ username, password }: { username: string; password: string }) => {
  localStorage.setItem(USER_NAME, username)
  localStorage.setItem(PASS_WORD, password)
}

const deleteUserFormStorage = () => {
  localStorage.removeItem(USER_NAME)
  localStorage.removeItem(PASS_WORD)
}

const getUserFormStorage = () => {
  return {
    username: localStorage.getItem(USER_NAME) || '',
    password: localStorage.getItem(PASS_WORD) || '',
  }
}

const SignIn: FC = () => {
  useEffect(() => {
    form.setFieldsValue({ ...getUserFormStorage() })
  }, [])
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    console.log('sign-in', values)
    if (values.remember) {
      // remember
      rememberUser(values)
    } else {
      // delete
      deleteUserFormStorage()
    }
  }
  return (
    <div className={styles.container}>
      <Form
        name="signIn"
        onFinish={onFinish}
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ minWidth: 350, maxWidth: 500 }}>
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            { required: true, message: 'Please input your username!' },
            { type: 'string', min: 5, max: 15, message: '长度在 5~20 之间' },
            { pattern: /^\w+$/, message: '仅支持字符、数字、下划线' },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          initialValue={{ remember: false }}
          wrapperCol={{ offset: 6, span: 16 }}>
          <Checkbox>记住密码</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Link to={REGISTER_PATHNAME}>注册账号</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
export default SignIn
