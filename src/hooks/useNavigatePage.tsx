import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { isLoginOrRegisterPage, isNoNeedUserInfo, LOGIN_PATHNAME, MANAGE_LIST_PATHNAME } from '../router/index'
import useGetUserInfo from './useGetUserInfo'

const useNavigatePage = (waitingUserData: boolean) => {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    if (waitingUserData) {
      return
    }
    // 登录了
    if (username) {
      if (isLoginOrRegisterPage(pathname)) {
        nav(MANAGE_LIST_PATHNAME)
      } else {
        return
      }
    } else {
      // 未登录
      if (isNoNeedUserInfo(pathname)) {
        return
      } else {
        // 需要用户信息
        nav(LOGIN_PATHNAME)
      }
    }
  }, [username, pathname, waitingUserData])
}

export default useNavigatePage
