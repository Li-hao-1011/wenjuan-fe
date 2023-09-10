import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_LIST_PATHNAME } from '../router/index'
import axios from 'axios'
import styles from './Home.module.scss'

const { Title, Paragraph } = Typography
const Home: FC = () => {
  const nav = useNavigate()
  useEffect(() => {
    axios.get('/api/test').then((res) => {
      console.log('axios', res)
    })
    fetch('/api/test')
      .then((res) => res.json())
      .then((data) => {
        console.log('fetch', data)
      })
  }, [])
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
