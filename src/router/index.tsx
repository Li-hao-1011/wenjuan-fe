import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import Register from '../pages/Register'
import ManageList from '../pages/manage/List'
import ManageStar from '../pages/manage/Star'
import ManageTrash from '../pages/manage/Trash'
import QuestionEdit from '../pages/question/edit/index'
import QuestionStat from '../pages/question/stat/index'
import NotFound from '../pages/NotFound'
import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import QuestionLayout from '../layouts/QuestionLayout'

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
