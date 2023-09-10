import { FC, useEffect, useState, useRef, useMemo } from 'react'
import { useTitle } from '@reactuses/core'
import { useDebounceFn, useRequest } from 'ahooks'
import { Typography, Spin, Empty } from 'antd'
import { useSearchParams } from 'react-router-dom'
import styles from './Common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionList from '../../hooks/useLoadQuestionList'
import { getQuestionListService } from '../../services/question'
import { LIST_PAGE_SIZE, SEARCH_LIST_PARAM_KEY } from '../../constant/index'

const { Title } = Typography

const List: FC = () => {
  useTitle('小幕问卷 - 我的问卷')
  // const { loading, data = {} /* error */ } = useRequest(getQuestionListService)
  // const { data = {}, loading /* error */ } = useLoadQuestionList({})
  // const { list: questions = [], total = 0 } = data as any

  const moreLoadRef = useRef<HTMLDivElement>(null)
  const [searchParams] = useSearchParams()
  const [questions, setQuestions] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(100)
  const [started, setStart] = useState(false)
  const haveMoreData = total > List.length
  const keyword = searchParams.get(SEARCH_LIST_PARAM_KEY) || ''

  useEffect(() => {
    setStart(false)
    setQuestions([])
    setPage(1)
    setTotal(0)
  }, [keyword])

  const { run: loadData, loading } = useRequest(
    async () => {
      const res = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return res
    },
    {
      manual: true,
      onSuccess: (data) => {
        const { list = [], total = 0 } = data
        setQuestions(questions.concat(list))
        setTotal(total)
        setPage(page + 1)
      },
    },
  )

  // 触发加载
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      console.log(`tryLoadMore...`)
      const currentElement = moreLoadRef.current
      if (currentElement === null) return
      const bundingRect = currentElement.getBoundingClientRect()
      if (bundingRect === null) return
      const { bottom = 0 } = bundingRect
      if (bottom < document.body.clientHeight) {
        // 露出来了
        setStart(true)
        loadData()
      }
    },
    {
      wait: 500,
    },
  )

  // 进入页面首次加载
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  const LoadMoreElem = useMemo(() => {
    if (!started || loading) return <Spin style={{ textAlign: 'center' }} />
    if (total <= 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多数据...</span>
    return <span>上滑加载更多...</span>
  }, [started, loading, total, haveMoreData])

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
        {questions.length > 0 &&
          questions.map((it: any) => {
            return <QuestionCard key={it._id} {...it} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={moreLoadRef}>
          {/* 上滑加载更多... */}
          {LoadMoreElem}
        </div>
      </div>
    </>
  )
}
export default List
