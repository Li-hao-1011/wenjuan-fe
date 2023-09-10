import { FC, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Space, message, Form, Input, Button, Checkbox } from 'antd'
import { useRequest } from 'ahooks'
import styles from './SignIn.module.scss'
import { REGISTER_PATHNAME, MANAGE_LIST_PATHNAME } from '../router/index'
import { loginService } from '../services/user'
import { setToken } from '../utils/userToken'

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
  const nav = useNavigate()
  const { run: login, loading: loginLoading } = useRequest(
    async (username: string, password: string) => {
      const res = await loginService({ username, password })
      return res
    },
    {
      manual: true,
      onSuccess: (result) => {
        const { token } = result
        setToken(token)
        message.success('登录成功')
        nav(MANAGE_LIST_PATHNAME)
      },
      onError: () => {},
    },
  )
  const onFinish = (values: any) => {
    const { username, password, remember } = values || {}
    if (remember) {
      // remember
      rememberUser(values)
    } else {
      // delete
      deleteUserFormStorage()
    }
    login(username, password)
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
            <Button type="primary" htmlType="submit" loading={loginLoading}>
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
