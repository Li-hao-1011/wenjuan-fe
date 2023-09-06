import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_LIST_PATHNAME } from '../router/index'
import styles from './Home.module.scss'

const { Title, Paragraph } = Typography
const Home: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles.container}>
      <div>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到问卷 980 份</Paragraph>
      </div>
      <div className={styles.info}>
        <Button type="primary" onClick={() => nav(MANAGE_LIST_PATHNAME)}>
          开始使用
        </Button>
      </div>
    </div>
  )
}
export default Home
