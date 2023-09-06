import { FC } from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFound: FC = () => {
  const nav = useNavigate()
  return (
    <>
      <Result
        status="404"
        title="您访问的页面不存在"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => nav(-1)}>
            Back
          </Button>
        }
      />
    </>
  )
}
export default NotFound
