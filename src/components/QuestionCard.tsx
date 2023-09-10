import { FC } from 'react'
import { Space, Button, Divider, Tag, Popconfirm, message, Modal } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import styles from './QuestionCard.module.scss'

export type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props) => {
  const { _id, title, isPublished, answerCount, createdAt, isStar } = props
  const nav = useNavigate()
  const { confirm } = Modal

  const deleteCard = () => {
    confirm({
      title: '确定删除该问卷?',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        message.success('删除成功!')
      },
      onCancel: () => {
        message.info('取消删除')
      },
    })
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
              <Space>
                {isStar && <StarOutlined style={{ color: 'red' }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? <Tag color="green">已发布</Tag> : <Tag>未发布</Tag>}
              <span>答卷: {answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: '8px 0' }} />
        <div className={styles['button-container']}>
          <div className={styles.left}>
            <Space>
              <Button type="text" icon={<EditOutlined />} size="small" onClick={() => nav(`/question/edit/${_id}`)}>
                编辑问卷
              </Button>
              <Button
                type="text"
                icon={<LineChartOutlined />}
                size="small"
                onClick={() => nav(`/question/stat/${_id}`)}
                disabled={!isPublished}>
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button icon={<StarOutlined />} size="small">
                {!isStar ? '标星' : '取消标星'}
              </Button>
              <Popconfirm
                title="Copy that link?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  message.success('复制成功!')
                }}
                onCancel={() => {
                  message.success('取消复制')
                }}>
                <Button icon={<CopyOutlined />} size="small">
                  复制
                </Button>
              </Popconfirm>
              <Button icon={<DeleteFilled />} size="small" danger onClick={() => deleteCard()}>
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionCard
