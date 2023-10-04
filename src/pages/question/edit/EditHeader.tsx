import { ChangeEvent, FC, useState } from 'react'
import { Button, Input, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { EditOutlined, LeftOutlined } from '@ant-design/icons'
import styles from './EditHeader.module.scss'
import EditToolbar from './EditToolbar'
import { useGetPageInfo } from '../../../hooks'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '../../../store/pageInfoReducer'

const { Title } = Typography

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
            <Button style={{ borderRadius: 0 }}>保存</Button>
            <Button type="primary" style={{ borderRadius: 0 }}>
              发布
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
