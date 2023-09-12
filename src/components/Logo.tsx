import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { HOME_PATHNAME, MANAGE_LIST_PATHNAME } from '../router/index'

const { Title } = Typography

const Logo: FC = () => {
  const { username } = useGetUserInfo()
  const [pathname, setPathname] = useState<string>(HOME_PATHNAME)

  useEffect(() => {
    if (username) {
      setPathname(MANAGE_LIST_PATHNAME)
    }
  }, [username])
  return (
    <div className={styles.logo}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>小幕问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
