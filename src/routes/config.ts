//import { RouteProps } from 'react-router'
import { Home, List, NoFoundPage, Desc } from '../pages'

export interface RouteProps {
    caseSensitive?: boolean;
    children?: React.ReactNode;
    element?: React.ReactNode | null;
    index?: boolean;
    path?: string;
}

export interface IRouteProps extends RouteProps {
  menu?: boolean
  title?: string
}


export const appRoutes: IRouteProps[] = [
  {
    title: '首页',
    path: '/',
    element: null,
    menu: true
  },
//   {
//     title: '云函数',
//     path: '/function',
//     component: FunctionDemo,
//     menu: true
//   },
//   {
//     title: '数据库',
//     path: '/db',
//     component: DatabaseDemo,
//     menu: true
//   },
//   {
//     path: '**',
//     component: NoFoundPage
//   }
]
