import { Tabs } from 'antd'
import { FC, useEffect, useState } from 'react'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import { useGetComponentsInfo } from '../../../hooks'

enum TabsKey {
  PROPS_KEY = 'props',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: TabsKey.PROPS_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TabsKey.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          设置
        </span>
      ),
      children: <PageSetting />,
    },
  ]

  const [activeKey, setActiveKey] = useState(TabsKey.PROPS_KEY)
  const { selectedId } = useGetComponentsInfo()
  useEffect(() => {
    if (selectedId) {
      setActiveKey(TabsKey.PROPS_KEY)
    } else {
      setActiveKey(TabsKey.SETTING_KEY)
    }
  }, [selectedId])
  return <Tabs activeKey={activeKey} items={tabsItems} />
}

export default RightPanel
