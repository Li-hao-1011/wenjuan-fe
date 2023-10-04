import { FC, useEffect } from 'react'
import { Checkbox, Form, Input, Select } from 'antd'
import { QuestionTitlePropsType } from './interface'

const PropComponent: FC = (props: QuestionTitlePropsType) => {
  const { text, level, isCenter, onChange, disabled } = props

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      text,
      level,
      isCenter,
    })
  }, [text, level, isCenter])

  //  监听Form组件变化
  const onFormChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ text, level, isCenter }}
      onValuesChange={onFormChange}
      disabled={disabled}>
      <Form.Item label="标题内容" name="text" rules={[{ required: true, message: '请输入标题内容' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' },
          ]}
          placeholder="请选择标题层级"></Select>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>是否居中</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
