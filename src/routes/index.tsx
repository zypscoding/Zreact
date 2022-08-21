import React, { lazy, ReactElement, Suspense } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';

const lazyLoad = (route: string) => {
  const Module = lazy(() => import(`../pages/${route}`))
  return <Suspense>
    <Module />
  </Suspense>
}

interface RouteProps extends RouteObject {
  meta?: {
    title?: string,
    icon?: ReactElement,
    noLogin?: boolean,
    hidenMenu?: boolean,
  },
  children?: RouteProps[]
}
export const routes: RouteProps[] = [
  {
    path: '/',
    element: lazyLoad('login'),
    children: [
      {
        path: '/login',
        element: lazyLoad('login'),
        meta: {
          title: '登录'
        }
      },
    ]
  },
  {
    path: 'home',
    element: lazyLoad('home'),
    children: [
      {
        path: 'detail',
        element: lazyLoad('home/detail'),
      }
    ]
  },
  {
    path: '*',
    element: lazyLoad('error/Page404'),
  },
  {
    path: 'user',
    element: lazyLoad('user'),
  },
  {
    path: 'setting',
    element: lazyLoad('setting'),
  },
];
const Routes = () => (
  useRoutes(routes)
)
export default Routes;
