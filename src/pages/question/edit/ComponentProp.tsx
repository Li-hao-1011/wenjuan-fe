import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useGetComponentsInfo } from '../../../hooks/index'
import { ComponentPropsType, getComponentConfBtType } from '../../../components/QuestionComponents/index'
import { updateComponentProps } from '../../../store/questionReducer/index'

const NoProp: FC<{ text: string }> = (props) => {
  return <div style={{ textAlign: 'center' }}>{props.text}</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()
  const { selectedComponent } = useGetComponentsInfo()
  if (!selectedComponent) {
    return <NoProp text="未选中组件" />
  }

  const { type, props, isLocked, isHidden } = selectedComponent
  const componentConf = getComponentConfBtType(type)

  const onChangeProps = (newProps: ComponentPropsType) => {
    if (!selectedComponent) return
    const { fe_id } = selectedComponent
    dispatch(updateComponentProps({ fe_id, newProps: { ...newProps } }))
  }
  if (!componentConf) {
    return <NoProp text="未识别组件" />
  }
  const { PropComponent } = componentConf
  return <PropComponent {...props} onChange={onChangeProps} disabled={isLocked || isHidden} />
}

export default ComponentProp
