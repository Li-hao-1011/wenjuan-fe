import { useSelector } from 'react-redux'
import { StoreType } from '../store/index'
import { UserState } from '../store/userReducer'

export const useGetUserInfo = () => {
  const { username, nickname } = useSelector<StoreType, UserState>((state) => state.user)
  return { username, nickname }
}

export default useGetUserInfo
