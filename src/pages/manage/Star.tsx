import { FC, useState } from 'react'
import { useTitle } from '@reactuses/core'
import { Typography, Empty } from 'antd'
import styles from './Common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { PropsType } from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'

const { Title } = Typography

const sourceData: PropsType[] = [
  { _id: 'q1', title: '问卷一', isPublished: true, isStart: true, answerCount: 5, createdAt: '2023-07-09' },
  { _id: 'q2', title: '问卷二', isPublished: true, isStart: true, answerCount: 5, createdAt: '2023-07-09' },
  { _id: 'q3', title: '问卷三', isPublished: true, isStart: true, answerCount: 50, createdAt: '2023-07-09' },
]

const Star: FC = () => {
  useTitle('小幕问卷 - 星标问卷')

  const [data, setData] = useState(sourceData)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {data.length <= 0 ? (
          <Empty />
        ) : (
          data.map((it) => {
            return <QuestionCard key={it._id} {...it} />
          })
        )}
      </div>
      <div className={styles.footer}>分页加载...</div>
    </>
  )
}
export default Star
