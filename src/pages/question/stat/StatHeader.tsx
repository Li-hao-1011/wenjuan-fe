import { FC, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './StatHeader.module.scss'
import { Button, Input, InputRef, Popover, Space, Tooltip, Typography, message } from 'antd'
import { CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import QRCode from 'qrcode.react'
import { useGetPageInfo } from '../../../hooks'

const { Title } = Typography

const StatHeader: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { title, isPublished } = useGetPageInfo()

  const inputElemRef = useRef<InputRef>(null)
  const copyLink = () => {
    const inputElem = inputElemRef.current
    if (inputElem == null) return
    inputElem.select()
    document.execCommand('copy')
    message.success('拷贝成功')
  }

  const genLinkAndQrcodeElem = () => {
    if (!isPublished) return null

    const link = `https://localhost:3000/question/${id}`

    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={link} size={150} />
      </div>
    )
    return (
      <Space>
        <Input ref={inputElemRef} value={link} style={{ width: '300px' }} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={() => copyLink()}></Button>
        </Tooltip>
        <Popover content={QRCodeElem} title="二维码">
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQrcodeElem()}</div>
        <div className={styles.right}>
          <Button type="primary" style={{ borderRadius: 0 }} onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
