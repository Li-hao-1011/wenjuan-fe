import QuestionInput from './QuestionInput/Component'
import QuestionTitle from './QuestionTitle/Component'
import QuestionInputConfType, { QuestionInputPropsType } from './QuestionInput/index'
import QuestionTitleConfType, { QuestionTitlePropsType } from './QuestionTitle/index'
import QuestionParagraphConfType, { QuestionParagraphPropsType } from './QuestionParagraph/index'
import QuestionInfoConfType, { QuestionInfoPropsType } from './QuestionInfo/index'
import QuestionTextarea, { QuestionTextareaPropsType } from './QuestionTextarea/index'
import QuestionRadio, { QuestionRadioPropsType, QuestionRadioStatPropsType } from './QuestionRadio/index'
import QuestionCheckbox, { QuestionCheckboxPropsType, QuestionCheckboxStatPropsType } from './QuestionCheckbox/index'
import { FC } from 'react'

export { QuestionTitle, QuestionInput }

// 所有组件的 prop type
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType

// 所有组件的统计属性类型
export type ComponentStatPropsType = QuestionRadioStatPropsType & QuestionCheckboxStatPropsType

// 组件的配置
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
  StatComponent?: FC<ComponentStatPropsType>
}

// 组件配置列表
const ComponentConfListType: ComponentConfType[] = [
  QuestionInfoConfType,
  QuestionInputConfType,
  QuestionTitleConfType,
  QuestionParagraphConfType,
  QuestionTextarea,
  QuestionRadio,
  QuestionCheckbox,
]

type ComponentConfGroupType = {
  groupId: string
  groupName: string
  components: ComponentConfType[]
}
// 组件分组
export const componentConfGroup: ComponentConfGroupType[] = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionInfoConfType, QuestionTitleConfType, QuestionParagraphConfType],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConfType, QuestionTextarea],
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadio, QuestionCheckbox],
  },
]

// 根据 类型获取 配置
export const getComponentConfBtType = (type: string) => {
  return ComponentConfListType.find((it) => it.type === type)
}
