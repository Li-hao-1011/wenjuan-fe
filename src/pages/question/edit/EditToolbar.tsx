import { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponent,
} from '../../../store/questionReducer/index'
import { useGetComponentsInfo } from '../../../hooks'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponentsInfo()
  const { isLocked = false } = selectedComponent || {}

  // 判断上下移动按钮是否可用
  const length = componentList.length
  const selectedIndex = componentList.findIndex((it) => it.fe_id === selectedId)
  const isFirst = selectedIndex <= 0
  const isLast = selectedIndex >= length - 1

  // 删除
  const handleDelete = () => {
    dispatch(removeSelectedComponent())
  }
  // 隐藏
  const handleHidden = () => {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }
  // 锁定
  const handleLock = () => {
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }
  // 复制
  const handleCopy = () => {
    dispatch(copySelectedComponent())
  }
  // 粘贴
  const handlePaste = () => {
    dispatch(pasteCopiedComponent())
  }
  // 上移/下移
  const move = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      // 上
      !isFirst && dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
    } else {
      // 下
      !isLast && dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
    }
  }

  // 撤销
  const undo = () => {
    dispatch(UndoActionCreators.undo())
  }
  // 重做
  const redo = () => {
    dispatch(UndoActionCreators.redo())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={copiedComponent === null}></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button shape="circle" icon={<UpOutlined />} onClick={() => move('up')} disabled={isFirst}></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button shape="circle" icon={<DownOutlined />} onClick={() => move('down')} disabled={isLast}></Button>
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} onClick={() => undo()}></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button shape="circle" icon={<RedoOutlined />} onClick={() => redo()}></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
