import { FC, useCallback } from 'react'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { ComponentConfType, componentConfGroup } from '../../../components/QuestionComponents'
import styles from './ComponentLib.module.scss'
import { addComponent } from '../../../store/questionReducer/index'
import { generateRandomStr } from '../../../utils/randomStr'
const { Title } = Typography

const generateComponent = (component: ComponentConfType) => {
  const dispatch = useDispatch()
  const { type, title, Component, defaultProps } = component

  const addComponentToCanvas = useCallback(() => {
    dispatch(
      addComponent({ fe_id: generateRandomStr(), type, title, props: defaultProps, isHidden: false, isLocked: false }),
    )
  }, [])

  return (
    <div key={type} className={styles.wrapper} onClick={() => addComponentToCanvas()}>
      <div className={styles.component}>
        <Component {...defaultProps} />
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map((it, index) => {
        const { groupId, groupName, components } = it
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            {/* 生成组件 */}
            <div>{components.map((component) => generateComponent(component))}</div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
