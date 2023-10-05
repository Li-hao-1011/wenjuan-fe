import { FC } from 'react'
import { useGetComponentsInfo } from '../../../hooks'
import styles from './ComponentList.module.scss'
import { getComponentConfBtType } from '../../../components/QuestionComponents'
import classNames from 'classnames'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (id: string) => void
}

const ComponentList: FC<PropsType> = (props) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props

  const { componentList } = useGetComponentsInfo()
  const changeSelectedId = (id: string, type: string) => {
    setSelectedComponentId(id)
    setSelectedComponentType(type)
  }
  return (
    <div className={styles.container}>
      {componentList
        .filter((it) => !it.isHidden)
        .map((it) => {
          const { fe_id, props, type } = it

          const componentConf = getComponentConfBtType(type)
          if (componentConf === undefined) return null
          const { Component } = componentConf

          // 拼接class
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles['selected']
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: selectedComponentId === fe_id,
          })
          return (
            <div key={fe_id} className={wrapperClassName} onClick={() => changeSelectedId(fe_id, type)}>
              <div className={styles.component}>
                <Component {...props} />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ComponentList
