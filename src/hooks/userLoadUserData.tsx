import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/userReducer'
import { getUserInfoService } from '../services/user'
import useGetUserInfo from './useGetUserInfo'

const useLoadUserData = () => {
  const [waitingUserData, setWaitingUserData] = useState(true)
  const { username } = useGetUserInfo()
  const dispatch = useDispatch()

  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
      return
    }
    run()
  }, [username])

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess: (result) => {
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally: () => {
      setWaitingUserData(false)
    },
  })

  return { waitingUserData }
}
export default useLoadUserData
