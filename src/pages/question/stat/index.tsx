import { FC } from 'react'
import { Button, Result, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { useLoadQuestionData, useGetPageInfo } from '../../../hooks'
import { MANAGE_LIST_PATHNAME } from '../../../router'
import styles from './index.module.scss'
import StatHeader from './StatHeader'

const Stat: FC = () => {
  const nav = useNavigate()

  const { loading } = useLoadQuestionData()
  const { isPublished, title } = useGetPageInfo()
  useTitle(`问卷统计 - ${title}`)

  const LoadingElem = (
    <div style={{ textAlign: 'center', marginTop: '220px' }}>
      <Spin />
      <div>加载中...</div>
    </div>
  )

  const genContentElem = () => {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: 1 }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            subTitle="您访问的页面不存在"
            extra={
              <Button type="primary" onClick={() => nav(MANAGE_LIST_PATHNAME)}>
                返回列表
              </Button>
            }></Result>
        </div>
      )
    }

    return (
      <>
        <div className={styles.left}>left</div>
        <div className={styles.main}>main</div>
        <div className={styles.right}>right</div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles[`content-wrapper`]}>
        {loading && LoadingElem}
        {!loading && <div className={styles.content}>{genContentElem()}</div>}
      </div>
    </div>
  )
}
export default Stat
