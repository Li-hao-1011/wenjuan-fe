import { FC, useEffect } from 'react'
import { OptionType, QuestionRadioPropsType } from './interface'
import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const PropComponent: FC<QuestionRadioPropsType> = (props) => {
  const { title = '', disabled, onChange, options = [], value, isVertical } = props

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options })
  }, [title, isVertical, value, options])
  const handleFormChange = () => {
    if (!onChange) return
    const newProps = form.getFieldsValue()
    // 清楚 text 是 undefined 的选项
    if (newProps.options) {
      newProps.options = newProps.options.filter((it: OptionType) => !(it.text == undefined))
    }
    const { options = [] } = newProps as QuestionRadioPropsType
    options.forEach((it: OptionType) => {
      /*  if (!it.value) */ it.value = it.text // 补齐 opt.value
    })
    onChange(newProps)
  }

  const handleSelectedChange = (value: string) => {}

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, options, value }}
      onValuesChange={handleFormChange}
      disabled={disabled}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }, { errors }) => (
            <>
              {/* 便利所有的选项 */}
              {fields.map((it, index) => (
                <Space key={it.key} align="baseline">
                  {/* 输入框 */}
                  <Form.Item
                    name={[it.name, 'text']}
                    rules={[
                      {
                        required: true,
                        message: '请输入选项文字',
                      },
                      {
                        validator: async (_, value) => {
                          const { options = [] } = form.getFieldsValue()
                          let num = 0
                          options.forEach((opt: OptionType) => {
                            opt.text === value && num++
                          })
                          if (num === 1) return Promise.resolve()
                          return Promise.reject('选项文字不能重复')
                        },
                      },
                    ]}>
                    <Input placeholder="选项文字" />
                  </Form.Item>
                  {/* 删除按钮 */}
                  {index > 1 ? <MinusCircleOutlined onClick={() => remove(it.name)} shape="circle" /> : null}
                </Space>
              ))}
              {/* 添加选项 */}
              <Form.Item>
                <Button block onClick={() => add({ value: '', text: '' })} icon={<PlusOutlined />}>
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          onChange={handleSelectedChange}
          options={options.map((it) => ({ value: it.value, label: it.text }))}
          allowClear
        />
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
