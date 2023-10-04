import { FC } from 'react'
import { Typography } from 'antd'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionParagraph: FC<QuestionParagraphPropsType> = (props) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }

  const textList = text.split('\n')
  /* 
        不使用 dangerouslySetInnerHTML, 不安全
        <span dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }}></span> 
    */
  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}>
      {textList.map((it, index) => {
        return (
          <span key={index}>
            {index > 0 && <br />}
            {it}
          </span>
        )
      })}
    </Paragraph>
  )
}

export default QuestionParagraph
