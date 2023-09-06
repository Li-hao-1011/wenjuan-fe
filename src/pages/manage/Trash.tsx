import { FC, useState } from 'react'
import { useTitle } from '@reactuses/core'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Typography, Empty, Table, Tag, Space, Button, Modal, message } from 'antd'
import styles from './Common.module.scss'
import { PropsType } from '../../components/QuestionCard'

const { Title } = Typography
const { confirm } = Modal

const sourceData: PropsType[] = [
  { _id: 'q1', title: '问卷一', isPublished: false, isStart: true, answerCount: 5, createdAt: '2023-07-09' },
  { _id: 'q2', title: '问卷二', isPublished: true, isStart: true, answerCount: 5, createdAt: '2023-07-09' },
  { _id: 'q3', title: '问卷三', isPublished: true, isStart: true, answerCount: 50, createdAt: '2023-07-09' },
]
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
  const [data, setData] = useState(sourceData)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const permanentDeletion = () => {
    confirm({
      title: '永久删除所选问卷?',
      okText: '确定',
      cancelText: '再考虑一下',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        message.success('删除成功！')
      },
      onCancel: () => {
        message.info('取消删除')
      },
    })
  }

  // 表格组建
  const TableElement = (
    <>
      <Space>
        <Button type="primary" disabled={selectedIds.length === 0}>
          恢复
        </Button>
        <Button onClick={() => permanentDeletion()} danger disabled={selectedIds.length === 0}>
          永久删除
        </Button>
      </Space>
      <Table
        dataSource={data}
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
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>搜索 🔍</div>
      </div>
      <div className={styles.content}>{data.length <= 0 ? <Empty /> : TableElement}</div>
    </>
  )
}
export default Trash
