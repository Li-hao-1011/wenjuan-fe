import { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInfoPropsType } from './interface'

const PropComponent: FC = (props: QuestionInfoPropsType) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])

  const onFormChange = () => {
    if (onChange) onChange(form.getFieldsValue())
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, desc }}
      onValuesChange={onFormChange}
      disabled={disabled}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <Input.TextArea showCount autoSize={{ maxRows: 10 }} />
      </Form.Item>
    </Form>
  )
}
export default PropComponent
