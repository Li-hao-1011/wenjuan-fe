import { ChangeEvent, FC, useState } from 'react'
import { Button, Input, Space, Typography, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { EditOutlined, LeftOutlined } from '@ant-design/icons'
import { useKeyPress, useRequest, useDebounceEffect } from 'ahooks'
import { useDispatch } from 'react-redux'
import styles from './EditHeader.module.scss'
import EditToolbar from './EditToolbar'
import { useGetComponentsInfo, useGetPageInfo } from '../../../hooks'
import { changePageTitle } from '../../../store/pageInfoReducer'
import { updateQuestionListService } from '../../../services/question'

const { Title } = Typography

// 标题组件
const TitleElement: FC = () => {
  const { title } = useGetPageInfo()
  const [editTitle, setEditTitle] = useState(false)
  const dispatch = useDispatch()

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value.trim()
    if (!title) return
    dispatch(changePageTitle(title))
  }

  if (editTitle) {
    return (
      <Input
        value={title}
        onChange={handleChangeTitle}
        onPressEnter={() => setEditTitle(false)}
        onBlur={() => setEditTitle(false)}
      />
    )
  }
  return (
    <Space>
      <Title level={3} style={{ margin: 0, fontSize: '18px' }}>
        {title}
      </Title>
      <Button
        disabled={!title}
        type="text"
        icon={<EditOutlined />}
        onClick={() => {
          setEditTitle(true)
        }}></Button>
    </Space>
  )
}
// 保存组件
const SaveButton: FC = () => {
  // 保存 pageInfo、componentList
  const { componentList } = useGetComponentsInfo()
  const pageInfo = useGetPageInfo()
  const { id } = useParams()

  const { loading, run: save } = useRequest(
    async () => {
      if (id == undefined) {
        return
      }
      await updateQuestionListService(id, { ...pageInfo, componentList })
    },
    { manual: true },
  )

  // 绑定快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) {
      save()
    }
  })

  // 自动保存 effect 防抖
  useDebounceEffect(
    () => {
      save()
    },
    [pageInfo, componentList],
    {
      wait: 1000,
    },
  )
  return (
    <Button loading={loading} style={{ borderRadius: 0 }} onClick={() => save()}>
      保存
    </Button>
  )
}
// 发布组件
const PublishButton: FC = () => {
  const { componentList } = useGetComponentsInfo()
  const pageInfo = useGetPageInfo()
  const { id } = useParams()
  const nav = useNavigate()

  const { loading, run: publish } = useRequest(
    async () => {
      if (id == undefined) {
        return
      }
      await updateQuestionListService(id, {
        ...pageInfo,
        componentList,
        isPublished: true, // 发布问卷
      })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('发布成功')
        nav(`/question/stat/${id}`) // 跳转到统计页面
      },
    },
  )
  return (
    <Button disabled={loading} type="primary" style={{ borderRadius: 0 }} onClick={() => publish()}>
      发布
    </Button>
  )
}

const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElement />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
