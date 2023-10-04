import { FC } from 'react'
import { Button, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './EditHeader.module.scss'
import { LeftOutlined } from '@ant-design/icons'
import EditToolbar from './EditToolbar'

const { Title } = Typography
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
            <Title level={3} style={{ margin: 0, fontSize: '18px' }}>
              问卷标题
            </Title>
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
