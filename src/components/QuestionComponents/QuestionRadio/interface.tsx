export type OptionType = {
  value: string
  text: string
}
export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: Array<OptionType>
  value?: string // 默认选中的 value 选项

  onChange?: (props: QuestionRadioPropsType) => void
  disabled?: boolean
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  isVertical: false,
  options: [
    { text: '选项一', value: '1' },
    { text: '选项二', value: '2' },
  ],
  value: '1',
}
