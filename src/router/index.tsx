import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import Register from '../pages/Register'
import ManageList from '../pages/manage/List'
import ManageStar from '../pages/manage/Star'
import ManageTrash from '../pages/manage/Trash'
// import QuestionEdit from '../pages/question/edit/index'
// import QuestionStat from '../pages/question/stat/index'
import NotFound from '../pages/NotFound'
import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import QuestionLayout from '../layouts/QuestionLayout'
import { lazy } from 'react'

// 使用路由懒加载拆分chunk
const QuestionEdit = lazy(() => import(/* chunkName: "edit" */ '../pages/question/edit/index'))
const QuestionStat = lazy(() => import(/* chunkName: "stat" */ '../pages/question/stat/index'))

const routers: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'login', element: <SignIn /> },
      { path: 'register', element: <Register /> },
      {
        path: 'manage',
        element: <ManageLayout />,

        children: [
          { path: 'list', element: <ManageList /> },
          { path: 'star', element: <ManageStar /> },
          { path: 'trash', element: <ManageTrash /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/question',
    element: <QuestionLayout />,
    children: [
      { path: 'edit/:id', element: <QuestionEdit /> },
      { path: 'stat/:id', element: <QuestionStat /> },
    ],
  },
]

export const router = createBrowserRouter(routers)

// 路由常量
export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGE_LIST_PATHNAME = '/manage/list'

export const isLoginOrRegisterPage = (pathname: string) => {
  return [LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)
}

export const isNoNeedUserInfo = (pathname: string) => {
  return [HOME_PATHNAME, REGISTER_PATHNAME, LOGIN_PATHNAME].includes(pathname)
}
