import { FC } from 'react'
import { Space, Radio, Typography } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from './interface'

const { Title, Paragraph } = Typography

const QuestionRadio: FC<QuestionRadioPropsType> = (props) => {
  const { title = '', isVertical = false, options = [], value = '' } = { ...QuestionRadioDefaultProps, ...props }

  const handleChange = (event: RadioChangeEvent) => {}

  return (
    <div>  
      {/* <Title style={{ fontSize: '18px', marginBottom: 0 }}>{title}</Title> */}
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value} onChange={handleChange}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map((it) => {
            return (
              <Radio key={it.value} value={it.value}>
                {it.text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default QuestionRadio
