import { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { loading, questionData } = useLoadQuestionData()
  return (
    <>
      <h1>Stat</h1>
      {loading ? <p>loading</p> : <p>{JSON.stringify(questionData)}</p>}
    </>
  )
}
export default Stat
