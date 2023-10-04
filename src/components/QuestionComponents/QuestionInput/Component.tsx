import { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionInputDefaultProps, QuestionInputPropsType } from './interface'

const { Title } = Typography
const QuestionInput: FC<QuestionInputPropsType> = (props) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }
  return (
    <div>
      <Title style={{ fontSize: '18px' }}>{title}</Title>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionInput
