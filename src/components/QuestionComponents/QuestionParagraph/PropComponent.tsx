import { Checkbox, Form, Input } from 'antd'
import { FC, useEffect } from 'react'
import { QuestionParagraphPropsType } from './interface'

const PropComponent: FC<QuestionParagraphPropsType> = (props) => {
  const { text, isCenter, disabled, onChange } = { ...props }

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])

  const onFormChange = () => {
    if (onChange) onChange(form.getFieldsValue())
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ text, isCenter }}
      disabled={disabled}
      onValuesChange={onFormChange}>
      <Form.Item label="段落内容" name="text" rules={[{ required: true, message: '请输入段落内容' }]}>
        <Input.TextArea showCount autoSize={{ maxRows: 10 }} />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>是否居中</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
