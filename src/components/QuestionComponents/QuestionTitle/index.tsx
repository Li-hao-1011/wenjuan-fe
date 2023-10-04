import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'
export * from './interface'

import PropComponent from './PropComponent'

export default {
  title: '标题',
  type: 'questionTitle',
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefaultProps,
}
