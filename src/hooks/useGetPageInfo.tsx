import { useSelector } from 'react-redux'
import { StoreType } from '../store/index'
import { PageInfoType } from '../store/pageInfoReducer'

export const useGetPageInfo = () => {
  const {
    title,
    desc = '',
    js = '',
    css = '',
    isPublished = false,
  } = useSelector<StoreType, PageInfoType>((state) => state.pageInfo)
  return { title, desc, js, css, isPublished }
}

export default useGetPageInfo
