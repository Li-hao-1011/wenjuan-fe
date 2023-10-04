export type QuestionTitlePropsType = {
  text?: string
  level?: Level
  isCenter?: boolean

  onChange?: (props: QuestionTitlePropsType) => void
  disabled?: boolean
}
export type Level = 1 | 2 | 3 | 4 | 5

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '一级标题',
  level: 1,
  isCenter: false,
}
