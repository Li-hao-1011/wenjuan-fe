import { Tabs } from 'antd'
import { FC } from 'react'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'

const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: 'props',
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined />
          设置
        </span>
      ),
      children: <>设置</>,
    },
  ]
  return <Tabs defaultActiveKey="componentLib" items={tabsItems} />
}

export default RightPanel
