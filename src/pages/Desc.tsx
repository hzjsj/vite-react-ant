import React from 'react'
import { useParams, useLocation, useMatch, useNavigate } from 'react-router-dom'

export const Desc: React.FC<{}> = () => {
    // 可以使用 useParams() 来获取参数
    const { id } = useParams()

    // 获取当前的地址信息
    const location = useLocation()
    

    //用来检查当前 url 是否匹配某个路由
    //如果路径匹配，则返回一个对象，不匹配则返回 null
    const match = useMatch('/Desc/3')

    // 获取一个用于跳转页面的函数
    const nav = useNavigate()

    const clickHandler = ()=>{
       // nav('/')    // 使用 push ，会产生历史记录
        nav('/',{replace:true}) // 使用 replace 不会产生新的记录
    }
    return (
        <div>
            <h2>Desc 组件</h2>
            <p>id：{id}</p>
            <button onClick={clickHandler}>跳转一下</button>
        </div>
    )
}

