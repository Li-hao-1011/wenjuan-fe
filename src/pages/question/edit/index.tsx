import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/questionReducer'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'
const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()
  const cancelSelected = () => {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <EditHeader />
      </header>
      <main className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={() => cancelSelected()}>
            <div className={styles['canvas-wrapper']}>
              {/* <div style={{ height: '1000px', width: '1000px' }}>画布</div> */}
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
export default Edit
