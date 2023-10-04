import { QuestionTextareaDefaultProps } from './interface'
// 画布的组件
import Component from './Component'

export * from './interface'

// 属性的组件
import PropComponent from './PropComponent'

export default {
  title: '多行输入 框',
  type: 'questionTextarea',
  Component,
  PropComponent,
  defaultProps: QuestionTextareaDefaultProps,
}
