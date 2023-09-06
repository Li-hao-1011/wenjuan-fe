import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'

const Register: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  console.log('searchParams', searchParams.get('keyword'))
  return (
    <>
      <h1>Register</h1>
      <p>{JSON.stringify(searchParams.entries())}</p>
    </>
  )
}
export default Register
