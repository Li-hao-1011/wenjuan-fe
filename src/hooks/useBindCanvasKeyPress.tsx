import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '../store/questionReducer/index'

// 判断光标是否在输入框内
const isActiveElementValid = () => {
  const activeElement = document.activeElement
  if (activeElement === document.body) return true // 光标没有在 input 上
  return false
}

export const useBindCanvasKeyPress = () => {
  const dispatch = useDispatch()
  // 删除组件
  useKeyPress(['backspace', 'delete'], () => {
    /* delete: 46, backspace: 8, */
    if (isActiveElementValid()) {
      dispatch(removeSelectedComponent())
    }
  })
  // 复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (isActiveElementValid()) {
      dispatch(copySelectedComponent())
    }
  })
  // 粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (isActiveElementValid()) {
      dispatch(pasteCopiedComponent())
    }
  })
  // 选中上一个
  useKeyPress(['uparrow'], () => {
    // uparrow: 38
    if (isActiveElementValid()) {
      dispatch(selectPrevComponent())
    }
  })

  // 选中下一个
  useKeyPress(['downarrow', 'meta.v'], () => {
    // downarrow: 40
    if (isActiveElementValid()) {
      dispatch(selectNextComponent())
    }
  })

  // TODO:撤销 重做
}

export default useBindCanvasKeyPress
