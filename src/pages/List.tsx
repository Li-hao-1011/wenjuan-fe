import { FC, useState } from 'react'
import styles from './List.module.scss'
import QuestionCard from '../components/QuestionCard'

const data = [
  { _id: 'q1', title: '问卷一', isPublished: false, isStart: false, answerCount: 5, createdAt: '2023-07-09' },
  { _id: 'q2', title: '问卷二', isPublished: false, isStart: false, answerCount: 5, createdAt: '2023-07-09' },
  { _id: 'q3', title: '问卷三', isPublished: true, isStart: true, answerCount: 50, createdAt: '2023-07-09' },
  { _id: 'q4', title: '问卷四', isPublished: true, isStart: false, answerCount: 4, createdAt: '2023-07-09' },
]

const List: FC = () => {
  const [questions, setQuestions] = useState(data)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索 🔍</div>
      </div>
      <div className={styles.content}>
        {questions.map((it) => {
          return <QuestionCard key={it._id} {...it} />
        })}
      </div>
      <div className={styles.footer}>Footer</div>
    </>
  )
}
export default List
