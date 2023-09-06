import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
const SignIn: FC = () => {
  const nav = useNavigate()
  return (
    <>
      <h1>SignIn</h1>
      <button
        onClick={() => {
          nav(-1)
        }}>
        返回
      </button>
    </>
  )
}
export default SignIn
