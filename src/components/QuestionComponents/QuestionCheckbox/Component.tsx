import { FC } from 'react'
import { Space, Checkbox, Typography } from 'antd'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface'

const { Title, Paragraph } = Typography

const QuestionRadio: FC<QuestionCheckboxPropsType> = (props) => {
  const { title = '', isVertical = false, list = [] } = { ...QuestionCheckboxDefaultProps, ...props }

  const handleChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues)
  }
  return (
    <div>
      {/* <Title style={{ fontSize: '18px', marginBottom: 0 }}>{title}</Title> */}
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {/* <Checkbox.Group options={options} defaultValue={defaultValues} onChange={handleChange} /> */}
        {list.map((it) => {
          const { value, text, checked } = it

          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}

export default QuestionRadio
