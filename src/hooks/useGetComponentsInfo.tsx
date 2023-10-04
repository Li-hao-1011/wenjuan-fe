import { useSelector } from 'react-redux'
import { ComponentsStoreType } from '../store/questionReducer/index'
import { StoreType } from '../store'

export const useGetComponentsInfo = () => {
  const {
    componentList = [],
    selectedId = '',
    copiedComponent = null,
  } = useSelector<StoreType, ComponentsStoreType>((state) => state.components)
  const selectedComponent = componentList.find((it) => it.fe_id === selectedId)
  return { componentList, selectedId, selectedComponent, copiedComponent }
}

export default useGetComponentsInfo
