import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useLoadUserData from '../hooks/userLoadUserData'
import useNavigatePage from '../hooks/useNavigatePage'

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavigatePage(waitingUserData)
  return (
    <div>
      <div>QuestionLayout</div>
      <div>
        {!waitingUserData ? (
          <Outlet />
        ) : (
          <div style={{ textAlign: 'center', marginTop: '30vh' }}>
            <Spin />
          </div>
        )}
      </div>
    </div>
  )
}
export default QuestionLayout
