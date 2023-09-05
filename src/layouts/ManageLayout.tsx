import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'

const ManageLayout: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <button>创建问卷</button>
        <br />
        <a href="#">我的问卷</a>
        <br />
        <a href="#">标星问卷</a>
        <br />
        <a href="#">回收站</a>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
export default ManageLayout
