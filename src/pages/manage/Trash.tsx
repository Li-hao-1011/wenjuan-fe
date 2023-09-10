import { FC, useState } from 'react'
import { useTitle } from '@reactuses/core'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Typography, Empty, Table, Tag, Space, Button, Modal, Spin, message } from 'antd'
import { useRequest } from 'ahooks'
import styles from './Common.module.scss'
import { PropsType } from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionList from '../../hooks/useLoadQuestionList'
import ListPage from '../../components/ListPage'
import { updateQuestionListService, deleteQuestionsService } from '../../services/question'

const { Title } = Typography
const { confirm } = Modal

const tableColumns = [
  {
    title: '名称',
    dataIndex: 'title',
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) => (isPublished ? <Tag color="green">已发布</Tag> : <Tag>未发布</Tag>),
  },
  {
    title: '答卷数量',
    dataIndex: 'answerCount',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
]

const Trash: FC = () => {
  useTitle('小幕问卷 - 回收站')
  // const [data, setData] = useState(sourceData)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const { loading, data = {}, error, refresh } = useLoadQuestionList({ isDelete: true })
  const { list: questions = [], total = 0 } = data as any

  const { run: deletedIds, loading: deletedIdsLoading } = useRequest(
    async () => await deleteQuestionsService(selectedIds),
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功！')
        refresh()
        setSelectedIds([])
      },
    },
  )

  const permanentDeletion = () => {
    confirm({
      title: '永久删除所选问卷?',
      okText: '确定',
      cancelText: '再考虑一下',
      icon: <ExclamationCircleOutlined />,
      onOk: deletedIds,
      onCancel: () => {
        message.info('取消删除')
      },
    })
  }

  // 恢复
  const { loading: recoverLoading, run: recover } = useRequest(
    async () => {
      for (const id of selectedIds) {
        await updateQuestionListService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess: () => {
        message.success('恢复成功')
        refresh()
        setSelectedIds([])
      },
    },
  )

  // 表格组建
  const TableElement = (
    <>
      <Space>
        <Button type="primary" disabled={selectedIds.length === 0 || recoverLoading} onClick={recover}>
          恢复
        </Button>
        <Button onClick={() => permanentDeletion()} danger disabled={selectedIds.length === 0 || deletedIdsLoading}>
          永久删除
        </Button>
      </Space>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      )}
      {!loading &&
        (questions.length > 0 ? (
          <Table
            dataSource={questions}
            columns={tableColumns}
            rowKey="_id"
            rowSelection={{
              type: 'checkbox',
              onChange: (selectedRowKeys, selectedRows, info) => {
                setSelectedIds(selectedRowKeys as string[])
                console.log('selectedRowKeys', selectedRowKeys)
              },
            }}
            pagination={false}
            style={{ marginTop: '20px' }}
          />
        ) : (
          <Empty />
        ))}
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>{TableElement}</div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}
export default Trash
