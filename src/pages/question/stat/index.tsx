import { FC } from 'react'
import { Button, Result, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useLoadQuestionData, useGetPageInfo } from '../../../hooks'
import { MANAGE_LIST_PATHNAME } from '../../../router'
import { useTitle } from 'ahooks'

const Stat: FC = () => {
  const nav = useNavigate()

  const { loading } = useLoadQuestionData()
  const { isPublished, title } = useGetPageInfo()
  useTitle(`问卷统计 - ${title}`)
  // 加载组件信息中
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '220px' }}>
        <Spin />
        <div>加载中...</div>
      </div>
    )
  }
  console.log('信息===>', isPublished)
  // 未发布
  if (!isPublished) {
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
      <h1>Stat</h1>
    </>
  )
}
export default Stat
