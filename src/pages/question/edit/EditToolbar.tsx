import { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import { BlockOutlined, CopyOutlined, DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
} from '../../../store/questionReducer/index'
import { useGetComponentsInfo } from '../../../hooks'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentsInfo()
  const { isLocked = false } = selectedComponent || {}
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

  // TODO:上移/下移
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
    </Space>
  )
}

export default EditToolbar
