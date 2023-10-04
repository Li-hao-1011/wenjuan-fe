export * from './interface'

import QuestionCheckbox from './Component'
import PropComponent from './PropComponent'
import { QuestionCheckboxDefaultProps } from './interface'

export default {
  type: 'questionCheckbox',
  title: '多选',
  Component: QuestionCheckbox,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
}
