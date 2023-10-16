import { FC, MouseEvent } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import styles from './EditCanvas.module.scss'
import { useGetComponentsInfo } from '../../../hooks'
import { getComponentConfBtType } from '../../../components/QuestionComponents/index'
import { QuestionInfoProps, changeSelectedId, moveComponent } from '../../../store/questionReducer/index'
import { useBindCanvasKeyPress } from '../../../hooks/index'
import { SortableContainer, SortableItem } from '../../../components/DragSortable/index'

type PropsType = {
  loading: boolean
}
// 生成组件
const generateComponent = (componentInfo: QuestionInfoProps) => {
  const { type, props } = componentInfo
  const componentConf = getComponentConfBtType(type)
  if (componentConf === undefined) return null
  const { Component } = componentConf
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = (props) => {
  const dispatch = useDispatch()
  const { componentList, selectedId } = useGetComponentsInfo()

  // 绑定快捷键
  useBindCanvasKeyPress()

  // 点击选中组件
  const handleClick = (e: MouseEvent, id: string) => {
    e.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  const { loading = true } = props
  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: '50%' }}>
        <Spin />
      </div>
    )

  const itemsWithId = componentList.map((it) => ({ ...it, id: it.fe_id }))
  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer items={itemsWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter((it) => !it.isHidden)
          .map((it) => {
            const { fe_id, isLocked } = it

            const wrapperDefaultClassName = styles['component-wrapper']
            const selectedClassName = styles['selected']
            const lockedClassName = styles['locked']
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [lockedClassName]: isLocked,
            })
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div onClick={(e) => handleClick(e, it.fe_id)} className={wrapperClassName}>
                  <div className={styles.component}>{generateComponent(it)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
