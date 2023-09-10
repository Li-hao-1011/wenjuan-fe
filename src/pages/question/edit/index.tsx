import { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
  const { loading, questionData } = useLoadQuestionData()

  return (
    <>
      <h1>Edit</h1>
      {loading ? <p>loading</p> : <p>{JSON.stringify(questionData)}</p>}
    </>
  )
}
export default Edit
