export * from './interface'

import QuestionRadio from './Component'
import PropComponent from './PropComponent'
import StatComponent from './StatComponent'
import { QuestionRadioDefaultProps } from './interface'

export default {
  type: 'questionRadio',
  title: '单选',
  Component: QuestionRadio,
  PropComponent,
  StatComponent,
  defaultProps: QuestionRadioDefaultProps,
}
