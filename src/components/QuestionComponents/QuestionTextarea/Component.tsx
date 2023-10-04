import { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionTextareaPropsType, QuestionTextareaDefaultProps } from './interface'

const { Title } = Typography
const { TextArea } = Input
const QuestionTextarea: FC<QuestionTextareaPropsType> = (props) => {
  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props }
  return (
    <div>
      <Title style={{ fontSize: '18px' }}>{title}</Title>
      <div>
        <TextArea placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionTextarea
