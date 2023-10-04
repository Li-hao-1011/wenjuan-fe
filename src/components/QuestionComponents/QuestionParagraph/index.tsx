import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionParagraphDefaultProps } from './interface'
export * from './interface'

export default {
  type: 'questionParagraph',
  title: '段落',
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
}
