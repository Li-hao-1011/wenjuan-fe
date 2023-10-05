import { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { message, Input, Button, Space } from 'antd'
import classNames from 'classnames'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import styles from './Layers.module.scss'
import { useGetComponentsInfo } from '../../../hooks'
import {
  changeComponentTitle,
  changeSelectedId,
  toggleComponentLocked,
  changeComponentHidden,
} from '../../../store/questionReducer'

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentsInfo()
  const dispatch = useDispatch()

  const [changingTitleId, setChangingTitleId] = useState('')

  // 点击选中组件
  const handleTitleClick = (fe_id: string) => {
    const curComp = componentList.find((it) => it.fe_id === fe_id)
    if (curComp?.isHidden) {
      message.info('该组件已隐藏')
      return
    }
    if (fe_id !== selectedId) {
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId('')
      return
    }

    // 点击修改标题
    setChangingTitleId(fe_id)
  }
  // 修改标题
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim()
    if (!newTitle || !selectedId) {
      return
    }
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }

  // 切换 显示/隐藏
  const changeHidden = (fe_id: string, isHidden: boolean) => {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }
  // 切换 锁定/解锁
  const changeLocked = (fe_id: string, isLocked: boolean) => {
    dispatch(toggleComponentLocked({ fe_id }))
  }
  return (
    <>
      {componentList.map((it) => {
        const { fe_id, title, isHidden, isLocked } = it
        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassNames = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        })

        return (
          <div key={fe_id} className={styles.wrapper}>
            <div className={titleClassNames} onClick={() => handleTitleClick(fe_id)}>
              {/*    {fe_id !== changingTitleId ? (
                title
              ) : (
              
              )} */}
              {fe_id === changingTitleId && (
                <Input
                  ref={function (inputElem) {
                    if (inputElem != null) {
                      inputElem.focus()
                    }
                  }}
                  value={title}
                  onChange={(e) => changeTitle(e)}
                  onBlur={() => setChangingTitleId('')}
                  onPressEnter={() => setChangingTitleId('')}
                />
              )}
              {fe_id !== changingTitleId && title}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                  size="small"
                  shape="circle"
                  icon={<EyeInvisibleOutlined />}
                  className={!isHidden ? styles.btn : ''}
                  type={isHidden ? 'primary' : 'text'}
                  onClick={() => changeHidden(fe_id, !isHidden)}></Button>
                <Button
                  size="small"
                  shape="circle"
                  icon={<LockOutlined />}
                  className={!isLocked ? styles.btn : ''}
                  type={isLocked ? 'primary' : 'text'}
                  onClick={() => changeLocked(fe_id, !isLocked)}></Button>
              </Space>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Layers
