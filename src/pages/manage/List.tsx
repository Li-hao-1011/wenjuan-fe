import { FC } from 'react'
import { useTitle } from '@reactuses/core'
import { Typography, Spin, Empty } from 'antd'
import styles from './Common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionList from '../../hooks/useLoadQuestionList'

const { Title } = Typography

const List: FC = () => {
  useTitle('小幕问卷 - 我的问卷')
  // const { loading, data = {} /* error */ } = useRequest(getQuestionListService)
  const { data = {}, loading /* error */ } = useLoadQuestionList({})
  const { list: questions = [], total = 0 } = data as any
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
      <div className={styles.footer}>上滑加载更多...</div>
    </>
  )
}
export default List
