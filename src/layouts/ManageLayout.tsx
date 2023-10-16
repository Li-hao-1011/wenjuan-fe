import { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Space, Divider, message } from 'antd'
import { PlusSquareOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './ManageLayout.module.scss'
import { createQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const location = useLocation()
  const buttonText = (name: string) => {
    return location.pathname.startsWith(name) ? 'default' : 'text'
  }

  // const [loading, setLoading] = useState(false)
  // const handleCreate = async () => {
  // setLoading(true)
  // const data = await createQuestionService()
  // if (data.id) {
  //   message.success('创建成功')
  //   nav(`/question/edit/${data.id}`)
  // }
  // setLoading(false)
  // }

  const { loading, run: handleCreate } = useRequest(createQuestionService, {
    manual: true,
    onError() {},
    onSuccess: (result) => {
      if (result.id) {
        message.success('创建成功')
        nav(`/question/edit/${result.id}`)
      }
    },
  })
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Space direction="vertical" size="middle">
          <Button
            type="primary"
            size="large"
            icon={<PlusSquareOutlined />}
            loading={loading}
            onClick={() => handleCreate()}>
            创建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            type={buttonText('/manage/list')}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav('/manage/list')}>
            我的问卷
          </Button>
          <Button
            type={buttonText('/manage/star')}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav('/manage/star')}>
            标星问卷
          </Button>
          <Button
            type={buttonText('/manage/trash')}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/trash')}>
            &nbsp;回收站
          </Button>
        </Space>
        {/*     <br />
        <a href="#"></a>
        <br />
        <a href="#"></a>
        <br />
        <a href="#"></a> */}
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
export default ManageLayout
