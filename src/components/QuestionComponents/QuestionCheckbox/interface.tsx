export type OptionType = {
  value: string
  text: string
  checked?: boolean
}
export type QuestionCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  list?: Array<OptionType>

  onChange?: (props: QuestionCheckboxPropsType) => void
  disabled?: boolean
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '单选标题',
  isVertical: true,
  list: [
    { text: '选项一', value: '1', checked: false },
    { text: '选项二', value: '2', checked: false },
    { text: '选项三', value: '3', checked: false },
    { text: '选项四', value: '4', checked: false },
    { text: '选项五', value: '5', checked: false },
  ],
}
