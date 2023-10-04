export * from './interface'

import QuestionRadio from './Component'
import PropComponent from './PropComponent'
import { QuestionRadioDefaultProps } from './interface'

export default {
  type: 'questionRadio',
  title: '单选',
  Component: QuestionRadio,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
}
