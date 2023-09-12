import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { LOGIN_PATHNAME } from '../router/index'
import { getUserInfoService } from '../services/user'
import { removeToken } from '../utils/userToken'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/userReducer'

const UserInfo: FC = () => {
  // TODO:登陆组建

  const nav = useNavigate()
  const dispatch = useDispatch()
  // const { data = {} } = useRequest(getUserInfoService)
  // const { username, nickname } = data

  const { username = '', nickname = '' } = useGetUserInfo()
  const logout = () => {
    message.success('退出成功')
    removeToken()
    dispatch(logoutReducer())
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>
  return <>{username ? UserInfo : Login}</>
}

export default UserInfo
