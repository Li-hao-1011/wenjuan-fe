import { FC, useEffect } from 'react'
import { OptionType, QuestionCheckboxPropsType } from './interface'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const PropComponent: FC<QuestionCheckboxPropsType> = (props) => {
  const { title = '', isVertical = false, list = [], onChange, disabled = false } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list })
  }, [title, isVertical, list])

  const handleFormChange = () => {
    // onChange
    if (!onChange) {
      return
    }
    const newProps = form.getFieldsValue() as QuestionCheckboxPropsType
    if (newProps.list) {
      newProps.list = newProps.list.filter((it: OptionType) => !(it.text == undefined))
    }

    const { list = [] } = newProps
    list.forEach((it: OptionType) => {
      /*  if (!it.value) */ it.value = it.text // 补齐 opt.value
    })
    onChange(newProps)
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, list }}
      onValuesChange={handleFormChange}
      disabled={disabled}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项" name="list">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {/* 所有选项 */}
              {fields.map((it, index) => (
                <Space key={it.key} align="baseline">
                  <Form.Item name={[it.name, 'checked']} valuePropName="checked">
                    <Checkbox></Checkbox>
                  </Form.Item>
                  <Form.Item
                    name={[it.name, 'text']}
                    rules={[
                      {
                        required: true,
                        message: '请输入选项文字',
                      },
                      {
                        validator: async (_, value) => {
                          const { list = [] } = form.getFieldsValue()
                          let num = 0
                          list.forEach((opt: OptionType) => {
                            opt.text === value && num++
                          })
                          if (num === 1) return Promise.resolve()
                          return Promise.reject('选项文字不能重复')
                        },
                      },
                    ]}>
                    <Input placeholder="选项文字" />
                  </Form.Item>
                  {index > 0 ? <MinusCircleOutlined onClick={() => remove(it.name)} shape="circle" /> : null}
                </Space>
              ))}
              <Form.Item>
                <Button block onClick={() => add({ value: '', text: '', checked: false })} icon={<PlusOutlined />}>
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
