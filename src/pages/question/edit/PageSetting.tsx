import { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { useGetPageInfo } from '../../../hooks'
import { resetPageInfo } from '../../../store/pageInfoReducer'

const { TextArea } = Input

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo()
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  const handleValuesChange = () => {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }
  return (
    <>
      <Form form={form} layout="vertical" initialValues={pageInfo} onValuesChange={handleValuesChange}>
        <Form.Item label="问卷标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="问卷描述" name="desc" rules={[{ required: false }]}>
          <TextArea />
        </Form.Item>
        <Form.Item label="js代码" name="js" rules={[{ required: false }]}>
          <TextArea />
        </Form.Item>
        <Form.Item label="css代码" name="css" rules={[{ required: false }]}>
          <TextArea />
        </Form.Item>
      </Form>
    </>
  )
}

export default PageSetting
