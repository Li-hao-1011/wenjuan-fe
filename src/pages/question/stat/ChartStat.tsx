import { FC, useEffect, useState } from 'react'
import { Spin, Typography } from 'antd'
import { getComponentStatDataService } from '../../../services/stat'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getComponentConfBtType } from '../../../components/QuestionComponents'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}
const ChartStat: FC<PropsType> = (props) => {
  const { selectedComponentId, selectedComponentType } = props
  const { id = '' } = useParams()

  const [stat, setStat] = useState([])

  const { run, loading } = useRequest(
    async (questionId: string, componentId: string) => {
      const res = await getComponentStatDataService(questionId, componentId)
      return res
    },
    {
      manual: true,
      onSuccess(data) {
        setStat(data.stat)
      },
    },
  )

  useEffect(() => {
    if (selectedComponentId) {
      run(id, selectedComponentId)
    }
  }, [selectedComponentId, id])

  // 生成统计元素
  const genStatElem = () => {
    if (!selectedComponentId) return <p>未选中组件</p>

    const { StatComponent } = getComponentConfBtType(selectedComponentType) || {}
    if (StatComponent == undefined) return <p>该组件无统计图表</p>

    if (loading)
      return (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Spin />
        </div>
      )
    return <StatComponent stat={stat} />
  }
  return (
    <div>
      <Title level={3}>图表统计</Title>
      <div>{genStatElem()}</div>
    </div>
  )
}

export default ChartStat
