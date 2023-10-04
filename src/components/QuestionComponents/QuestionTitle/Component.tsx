import { FC } from 'react'
import { Typography } from 'antd'
import { QuestionTitlePropsType, QuestionTitleDefaultProps, Level } from './interface'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (props) => {
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props }

  const genFontSize = (level: Level) => {
    if (level === 1) return '24px'
    if (level === 2) return '22px'
    if (level === 3) return '20px'
    if (level === 4) return '18px'
    return '16px'
  }

  return (
    <div>
      <Title
        level={level}
        style={{
          fontSize: genFontSize(level),
          textAlign: isCenter ? 'center' : 'left',
          marginTop: '0',
          marginBottom: '0',
        }}>
        {text}
      </Title>
    </div>
  )
}

export default QuestionTitle
