import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useLoadUserData from '../hooks/userLoadUserData'
import useNavigatePage from '../hooks/useNavigatePage'

const QuestionLayout: FC = () => {
  // 加载用户信息
  const { waitingUserData } = useLoadUserData()
  // 判断是否登陆，否则跳转到登陆页面
  useNavigatePage(waitingUserData)
  return (
    <div style={{ height: '100%' }}>
      {!waitingUserData ? (
        <Outlet />
      ) : (
        <div style={{ textAlign: 'center', marginTop: '30vh' }}>
          <Spin />
        </div>
      )}
    </div>
  )
}
export default QuestionLayout
