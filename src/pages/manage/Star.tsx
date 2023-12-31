import { FC } from 'react'
import { useTitle } from '@reactuses/core'
import { Typography, Empty, Spin } from 'antd'
import styles from './Common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionList from '../../hooks/useLoadQuestionList'
import ListPage from '../../components/ListPage'

const { Title } = Typography

const Star: FC = () => {
  useTitle('小幕问卷 - 星标问卷')
  const { loading, data = {} } = useLoadQuestionList({ isStar: true })
  const { list: questions = [], total = 0 } = data as any

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
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin size="large" />
          </div>
        )}
        {!loading &&
          (questions.length > 0 ? (
            <>
              {questions.map((it: any) => {
                return <QuestionCard key={it._id} {...it} />
              })}
            </>
          ) : (
            <Empty />
          ))}
      </div>
      <div className={styles.footer}>
        {/* <Pagination defaultCurrent={1} total={total} /> */}

        <ListPage total={total} />
      </div>
    </>
  )
}
export default Star
