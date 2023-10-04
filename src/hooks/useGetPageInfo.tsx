import { useSelector } from 'react-redux'
import { StoreType } from '../store/index'
import { PageInfoType } from '../store/pageInfoReducer'

export const useGetPageInfo = () => {
  const { title, desc = '', js = '', css = '' } = useSelector<StoreType, PageInfoType>((state) => state.pageInfo)
  return { title, desc, js, css }
}

export default useGetPageInfo
