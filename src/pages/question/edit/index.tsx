import { FC } from 'react'
import { useParams } from 'react-router-dom'

const Edit: FC = () => {
  const params = useParams()
  return (
    <>
      <h1>Edit</h1>
      <p>{JSON.stringify(params)}</p>
    </>
  )
}
export default Edit
