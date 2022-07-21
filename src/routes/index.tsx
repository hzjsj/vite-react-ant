import React from 'react'
import { Link, BrowserRouter, Routes, Route, RouteProps } from 'react-router-dom'
import { Home, List, NoFoundPage, Desc,Test,Book } from '../pages'

export interface IRouteProps extends RouteProps {
    menu?: boolean
    title?: string
}

export const appRoutes: IRouteProps[] = [
    {
        title: '首页',
        path: '/',
        element: <Home />,
        menu: true
    }, {
        title: '列表',
        path: '/list',
        element: <List />,
        menu: true
    }, {
        title: '404',
        path: '/404',
        element: <NoFoundPage />,
        menu: true
    }, {
        title: 'Test',
        path: '/test',
        element: <Test />,
        menu: true
    }, {
        title: 'Book',
        path: '/book',
        element: <Book />,
        menu: true
    }]

const RenderRoutes = () => {
    return (
        <Routes>
            {appRoutes.map((item, index) => <Route key={index} path={item.path} element={item.element} />)}

            {/* <Route path="/" element={<Home />} />
            <Route path="404" element={<NoFoundPage />} />
            <Route path="list" element={<List />} />
            <Route path="desc/:id" element={<Desc />} /> */}
        </Routes>
    )
}


export default RenderRoutes