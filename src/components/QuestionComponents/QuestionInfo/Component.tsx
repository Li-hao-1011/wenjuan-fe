import { FC } from 'react'
import { Typography } from 'antd'
import { QuestionInfoDefaultProps, QuestionInfoPropsType } from './interface'

const { Paragraph, Title } = Typography
const QuestionInfo: FC<QuestionInfoPropsType> = (props) => {
  const { title = '', desc = '' } = { ...QuestionInfoDefaultProps, ...props }
  const styles = (x = { marginBottom: '10px' }): { textAlign: 'center'; marginBottom: any } => ({
    marginBottom: x.marginBottom,
    textAlign: 'center',
  })
  const descTextList = desc.split('\n')
  return (
    <div>
      <Title style={{ ...styles(), fontSize: '18px' }}>{title}</Title>
      <Paragraph style={styles({ marginBottom: '8px' })}>
        {descTextList.map((it, index) => {
          return (
            <span key={index}>
              {index > 0 && <br />}
              {it}
            </span>
          )
        })}
      </Paragraph>
    </div>
  )
}

export default QuestionInfo
