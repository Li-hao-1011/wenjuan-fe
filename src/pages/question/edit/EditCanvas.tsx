import { FC, MouseEvent } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import styles from './EditCanvas.module.scss'
import { useGetComponentsInfo } from '../../../hooks'
import { getComponentConfBtType } from '../../../components/QuestionComponents/index'
import { QuestionInfoProps, changeSelectedId } from '../../../store/questionReducer/index'
import { useBindCanvasKeyPress } from '../../../hooks/index'

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
  console.log('componentList 999', selectedId, componentList)

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
  return (
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
            <div key={fe_id} onClick={(e) => handleClick(e, it.fe_id)} className={wrapperClassName}>
              <div className={styles.component}>{generateComponent(it)}</div>
            </div>
          )
        })}
    </div>
  )
}

export default EditCanvas
