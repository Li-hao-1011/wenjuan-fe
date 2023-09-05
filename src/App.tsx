import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router as routerConfig } from './router/index'

const App: FC = () => {
  return <RouterProvider router={routerConfig}></RouterProvider>
}

export default App
