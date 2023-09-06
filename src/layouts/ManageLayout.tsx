import { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Space, Divider } from 'antd'
import { PlusSquareOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './ManageLayout.module.scss'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const location = useLocation()
  console.log('location', location.pathname)
  const buttonText = (name: string) => {
    return location.pathname.startsWith(name) ? 'default' : 'text'
  }
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Space direction="vertical" size="middle">
          <Button type="primary" size="large" icon={<PlusSquareOutlined />}>
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
