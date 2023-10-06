import { FC } from 'react'
import { ResponsiveContainer, PieChart, Pie, Tooltip } from 'recharts'
import { QuestionRadioStatPropsType } from './interface'

const format = (num: number, sum: number): string => {
  return ((num / sum) * 100).toFixed(2)
}

const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => {
  // 和
  const sum = stat.reduce((acc, cur) => acc + cur.count, 0)
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={stat}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
            label={(it) => `${it.name}: ${format(it.count, sum)}%`}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponent
