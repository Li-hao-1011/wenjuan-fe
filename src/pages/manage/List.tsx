import { FC, useState } from 'react'
import { useTitle } from '@reactuses/core'
import { Typography } from 'antd'
import styles from './Common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'

const { Title } = Typography
const data = [
  { _id: 'q1', title: '问卷一', isPublished: false, isStart: false, answerCount: 5, createdAt: '2023-07-09' },
  { _id: 'q2', title: '问卷二', isPublished: false, isStart: false, answerCount: 5, createdAt: '2023-07-09' },
  { _id: 'q3', title: '问卷三', isPublished: true, isStart: true, answerCount: 50, createdAt: '2023-07-09' },
  { _id: 'q4', title: '问卷四', isPublished: true, isStart: false, answerCount: 4, createdAt: '2023-07-09' },
]

const List: FC = () => {
  useTitle('小幕问卷 - 我的问卷')
  const [questions, setQuestions] = useState(data)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questions.map((it) => {
          return <QuestionCard key={it._id} {...it} />
        })}
      </div>
      <div className={styles.footer}>上滑加载更多...</div>
    </>
  )
}
export default List
