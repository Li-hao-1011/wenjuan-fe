import { QuestionInputDefaultProps } from './interface'
// 画布的组件
import Component from './Component'

export * from './interface'

// 属性的组件
import PropComponent from './PropComponent'
 
export default {
  title: '输入框',
  type: 'questionInput',
  Component,
  PropComponent,
  defaultProps: QuestionInputDefaultProps,
}
