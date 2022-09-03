import React, { lazy, ReactElement, Suspense } from 'react'
import { useRoutes, RouteObject,Navigate } from 'react-router-dom'
import Layout from './layout'

const lazyLoad = (route: string) => {
  const Module = lazy(() => import(`../pages/${route}`))
  return (
    <Suspense>
      <Module />
    </Suspense>
  )
}

interface RouteProps extends RouteObject {
  meta?: {
    title?: string
    icon?: ReactElement
    noLogin?: boolean
    hidenMenu?: boolean
  }
  children?: RouteProps[]
}
export const routes: RouteProps[] = [
  {
    path: '/',
    element: <Navigate to='/home' replace={true}></Navigate>,
  },
  {
    path: '/login',
    element: lazyLoad('login'),
    meta: {
      title: '登录'
    },
  },
  {
    path: '/*',
    element: lazyLoad('error/Page404')
  },
  {
    path: '/home',
    element: lazyLoad('home'),
    children: [
      {
        path: 'detail',
        element: lazyLoad('home/detail')
      }
    ]
  },
  {
    path: '/user',
    element: lazyLoad('user')
  },
  {
    path: '/setting',
    element: lazyLoad('setting')
  },
  {
    path: '/product',
    element: lazyLoad('product')
  }
 
]
const Routes = () => useRoutes(routes)
export default Routes
