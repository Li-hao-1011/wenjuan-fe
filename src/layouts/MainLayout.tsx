import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import useLoadUserData from '../hooks/userLoadUserData'
import useNavigatePage from '../hooks/useNavigatePage'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavigatePage(waitingUserData)
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          {!waitingUserData ? (
            <Outlet />
          ) : (
            <div style={{ textAlign: 'center', marginTop: '30vh' }}>
              <Spin  />
            </div>
          )}
        </Content>
      </Layout>
      <Footer className={styles.footer}>小幕问卷 &copy; 2023 - present. Created by Lihao</Footer>
    </Layout>
  )
}
export default MainLayout
