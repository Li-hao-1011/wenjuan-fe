import { FC } from 'react'
import styles from './QuestionCard.module.scss'

type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStart: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props) => {
  const { _id, title, isPublished, answerCount, createdAt } = props
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <a href="#">{title}</a>
          </div>
          <div className={styles.right}>
            {isPublished ? (
              <span className={styles.row} style={{ color: 'green' }}>
                已发布
              </span>
            ) : (
              <span className={styles.row}>未发布</span>
            )}
            <span className={styles.row}>答卷: {answerCount}</span>
            <span className={styles.row}>{createdAt}</span>
          </div>
        </div>
        <div className={styles['button-container']}>
          <div className={styles.left}>
            <button>编辑问卷</button>
            <button>数据统计</button>
          </div>
          <div className={styles.right}>
            <button>标星</button>
            <button>复制</button>
            <button>删除</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionCard
