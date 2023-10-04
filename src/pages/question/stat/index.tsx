import { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { loading } = useLoadQuestionData()
  return (
    <>
      <h1>Stat</h1>
      {loading ? <p>loading</p> : <p></p>}
    </>
  )
}
export default Stat
