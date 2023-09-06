import { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Home: FC = () => {
  const nav = useNavigate()
  return (
    <>
      <h1>Home</h1>
      <button
        onClick={() => {
          nav('/login')
        }}>
        登陆
      </button>
      <Link to={'/login'}>登陆</Link>
      <button
        onClick={() => {
          nav({ pathname: '/register', search: 'd=3' })
        }}>
        注册
      </button>
    </>
  )
}
export default Home
