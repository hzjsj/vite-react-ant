# vite-react-ant

#### 介绍
学习 react.js 和 ant.design 时，写的笔记和练习代码。2022年7月21日开始创建仓库，已经学习一段时间了。

#### 软件架构
软件架构说明


#### 安装教程

1.  xxxx
2.  xxxx
3.  xxxx

#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx


## 基础知识

### 一、JSX 语法糖

babel 将 JSX 语法 翻译成 js

jsx 注意事项：

-  1.JSX 不是字符串，不要加引号

-   2.JSX 中的 html 标签应该小写开头，React 组件应该大写开头

-   3.JSX 中有且只有一个根标签

-    4.JSX 的标签必须正确结束（自结束标签页必须写，图像、表单、例子<input/>）

-    5.JSX 中可以使用 {} 嵌入表达式 （有值的表达式，函数返回值）

-    6.如果表达式时空值、布尔值、undefined 这些值不会显示，主要用来判断的

-    7.在 JSX 中，属性可以直接在标签中设置

  ​      注意 class 需要使用 className 代替

  ​      style 中必须使用对象格式，设置内联样式 

  ​      style = {{backgroundColor:"yellowgreen",border:"10px red solid",}}

### 二、声明式编程

​	声明是编程，结果导向式编程

​    在 React 中可以通过 JSX 来创建 React 元素，

​    JSX 需要翻译成 JS 代码，才能被 React 执行

​    babel 用来翻译 JSX 代码



​	JSX 就是 React.createElement() 的语法糖，JSX 在执行之前都会被 babel 转换成 JS 

例如：

```jsx
    const divs = <div className="divs" id="box"
        style={{
            backgroundColor: "yellowgreen",
            border: "10px red solid"
        }}
        onClick={
            () => { alert(123456) }
        }>
        这是一个div
    </div>
    const roots = ReactDOM.createRoot(document.getElementById('roots'))
    roots.render(divs)
```



### 三、命令式编程

创建一个 React 元素

 API

​      createElement

​      参数：

​      1.元素的名称（html 标签必须小写，大写默认为 组件 ）

​      2.标签中的属性，设置事件时（需要驼峰命名法）

​      3.元素的内容（子元素，子标签）



​      注意点：

​      React 元素最终会通过虚拟 DOM 转换成真是的 DOM 元素

​      React 元素一旦创建，就无法修改。一次性用的，DOM 的修改太复杂了。只能使用新的元素直接去替换。

```jsx
    const button = React.createElement('button', {
        id: 'btn',
        type: 'button',
        className: 'hello',
        onClick: () => { alert(123) }
    }, '点我一下')

    const div = React.createElement('div', {}, '我是div标签', button)
    
    // 获取根元素
    // 就是 React 元素要插入的位置
    const root = ReactDOM.createRoot(document.getElementById('root'))
    
    // 将元素在根元素中显示
    // 用来将 React 元素渲染到根元素
    // 根元素中所有的内容都会被删除，被 React 元素所替换
    // 当重复调用 render() 时，React 会将两次的渲染结果进行比较，他会确保只修改那些发生变化的元素
    root.render(div)

	//老版本方法
    //ReactDOM.render(div,document.getElementById('root'))
```

​    修改 React 元素后，必须重新对根元素进行渲染

​    当调用 render 渲染页面时，React 会自动比较两次渲染的元素，

​    只在真实 DOM 中更新发生变化的部分，没有发生变化的保持不变。

​    对页面进行最少的修改，以达到最好的性能。



### 四、列表渲染

{} 只能放 js 表达式，而不能放语句 （if for）

 在语句中是可以操作 JSX 

```jsx
    const arry = ['孙悟空','猪八戒','沙和尚']   
    // JSX 默认自动对数组遍历
    // 将 arr 渲染为一个列表在网页显示

    // 数组里放 JSX
    const data = []
    for(let i=0; i<arry.length ; i++){
        data.push(<li>{arry[i]}</li>)
    }

    // map 方法遍历
    //const arr = arry.map((item,index)=><li key={index}>{index}{item}</li>) 

    const div = <div>
              <ul>
                  {arry.map((item, index, arr) => <li key={index}>{index}{item}</li>)}
              </ul>
          </div>
```

​      数组元素内容，在修改 DOM 内容中，默认是按照顺序进行比较的，所以设置 key



​      在渲染列表时，通常会设置一个 key 属性

​      这个 key 在当前列表中唯一即可

​      注意：

​        1.开发中一般会采用数据的 id 作为 key

​        2.尽量不要用元素的 index 作为 key

​            索引会跟着元素顺序的改变而改变，所以使用索引做 key 跟没有 key 时一样的

​            唯一不同就是，控制台没有警告了。

​            当元素的顺序不会发生变化时，用索引做 key 也没有什么问题

### 五、子元素内和父元素的单击事件

preventDefault()

取消默认行为，例如 a 链接的跳转

stopPropagation()

取消事件冒泡行为，子元素内和父元素的单击事件。（单击事件同时触发，子元素和父元素）

例子

```js
  const butClick = (event)=>{
    console.log(event)

    event.preventDefault();//取消默认行为
    event.stopPropagation(); //取消事件冒泡行为，子元素内和父元素的单击事件
  }
```

### 六、props 简介

父组件 Index

```tsx
import React from 'react'
import Item from './Item'
export default function index() {

  const fn = () => {
    alert("调用父组件函数")
  }
  return (
    <div>
      <h2>Logs 组件</h2>

      {/* 在父组件中可以直接在子组件中设置属性 */}
      <Item date="2022年7月7日" desc="内容" fn={fn} />
    </div>
  )
}
```

子组件 Item

```tsx
import React, { useState } from 'react'

const Item = (props) => {

  /* 
    在函数组件中，属性就相当于时函数的参数，可以通过参数来访问
    可以在函数组件的形参中定义一个 props ，props 指向的是一个对象
    它包含了父组件中传递的所有参数
  */
 console.log(props)
  return (
    <div>
      <h3>Item小组件</h3>
     <p>时间：{props.date}</p>
      <p>内容：{props.desc}</p> 
      <button onClick={props.fn}>函数调用</button>
    </div>
  )
}

export default Item
```

### 七、日期获取

```
  
 props.date = new Date()
 
  获取月份（七月）

 const month = props.date.toLocaleString('zh-CH',{month:'long'})



 // 获取日期  

 const date = props.date.getDate()
```

### 八、State 状态

state 实际上就是一个被 React 管理的变量

当我们通过 setState() 修改变量的值时，会触发组件的自动重新渲染，调用 render() 刷新页面

state 值发生变化时，组件才会重新渲染

当通过 setState 去修改一个 state 时，并不修改当前的 state，它修改的是组件下一次渲染时 state 值。（抛弃旧值）

```jsx
import { useState } from 'react'
import './index.css'

const Count = () => {
    const [count, setCount] = useState(0)

    return <div className='div'>
        <h1>计数器组件</h1>
        <p>当前数字： {count}</p>
        <button onClick={() => { setCount(count+1) }}>加一</button>
        <button onClick={() => { setCount(count-1) }}>减一</button>
    </div>
}


export default Count;
```

当 state 的值是一个对象时，修改时是使用新的对象去替换已有对象。

```jsx
import { useState } from 'react'
import './index.css'

const Count = () => {
    const [count, setCount] = useState(0)
    const [user, setUser] = useState({name:'张三',age:20})

    return <div className='div'>
        <h1>计数器组件</h1>
        <p>当前数字： {count}</p>
        <button onClick={() => { setCount(count+1) }}>加一</button>
        <button onClick={() => { setCount(count-1) }}>减一</button>
        <h1>用户信息</h1>
        <p>姓名：{user.name}</p>
        <p>年龄：{user.age}</p>
        <button onClick={()=>{setUser({...user,age:22})}}>修改年龄啦</button>
    </div>
}


export default Count;
```

setState() 会触发组件的重新渲染，它是异步的。

注意：所以当调用 setState() 需要用旧 state 的值时，一定要注意，有可能出现计算错误的情况。

```jsx
// 箭头函数可以解决这个问题
const sum3 = ()=>{
    setCount(count=>count+1)
    setCount(count=>count+1)
    setCount(count=>count+1)
}
```

### 九、DOM 对象和 useRef()

1. 获取原生的 DOM 对象

可以使用传统的 document 来对 DOM 进行操作

```jsx
    const getDOM = ()=>{
        const html = document.getElementById('html')
        html.innerHTML = 'new html'
    }
```

2. 直接从 React 处获取 DOM 对象

   步骤：

   ​      (1).创建一个存储 DOM 对象的容器

   ​        使用 useRef() 钩子函数

   ​          钩子函数的注意事项：

   ​          1.React 中的钩子函数只能用于函数组件或自定义钩子

   ​          2.钩子函数只能直接在函数组件中调用

   ​      (2).将容器设置为想要获取 DOM 对象元素的 ref 属性

   ​        `<h1 ref={xxx}>……</>` 

   ​        React 会自动将当前元素的 DOM 对象，设置为容器 current 属性

       ```jsx
       const htmlRef = useRef(null) // 创建一个容器
       
       const getDOM = ()=>{
           const html = document.getElementById('html')
       
           console.log(htmlRef.current)
           console.log(html===htmlRef.current)
           htmlRef.current.innerText="new htmlRef"
       }
   
   
   ​    
   ​    return <div className='div' >
   ​        <p ref={htmlRef} id='html'>html 内容</p>
   ​        <button onClick={getDOM}>html 按钮</button>
   ​    </div>
    ```
   
    ```

​    useRef()

​      返回的就是一个普通的 JS 对象

​      {current：undefined}

​      所以我们直接创建一个 js 对象，也可以代替 useRef()

​      区别：

​        我们创建的对象，组件每次重新渲染都会创建一个新的对象

   ​        useRef() 创建的对象，可以确保每次渲染获取的都是同一个对象

```jsx
    //const htmlRef = useRef(null) // 创建一个容器
    const htmlRef ={current:null}
```

### 十、内联样式和样式表

内联样式

```jsx
import React, { useState } from 'react'

export default function Index() {
  const [redBroder, setRedBroder] = useState(false)
  const divStyle = {
    width: 300,
    height: 300,
    margin: 60,
    borderStyle: "solid",
    borderColor: redBroder ? "red" : "black"
  }
  return (
    <div style={divStyle}>
      <p>Index 组件</p>
      <button onClick={() => { setRedBroder(!redBroder) }}>红色边框</button>
    </div>
  )
}
```

样式表

```tsx
import React, { useState } from 'react'
import './index.css'  // 多个 css 文件，看优先级、引入顺序

export default function Index() {
  const [redBroder, setRedBroder] = useState(false)

  return (
    // 根据 redBroder 值，正确设置第二个 className
    <div className={`div ${redBroder ? 'redBroder' : ''}`}>
      <p>Index 组件</p>
      <button onClick={() => { setRedBroder(!redBroder) }}>红色边框</button>
    </div>
  )
}
```

index.css 文件

```css
.div{
    width: 300px;
    height: 300px;
    margin: 60px;
    padding: 10px;
    border: black solid 1px;
}

.redBroder{
    border: red solid 1px;
}
```

模块化 module.css 文件

使用步骤：

 1.创建一个 xxx.module.css 文件

 2.在组件中引入 css

  `import classes from './test.module.css'`

 3.通过 classes 来设置类

  `className = {classes.div}`

css 模块化可以动态的设置唯一的 class 值

 例如：class="_div_18fk5_1"（算法计算出来的名称），不同组件的 css 文件生成的类名不同

```tsx
import classes from './index.module.css'

export default function Index() {

  return (
    <div className={classes.div}>
      <p>Index 组件</p>
    </div>
  )
}
```

### 十一、React Fragment

React.Fragment

是一个专门用来作为父容器的组件，它只会将它里面的子元素直接返回，不会创建任何多余的元素。

语法糖，空标签 <></>，效果一样。

当我们希望有一个父容器，但同时又不希望父容器在网页中产生多余的结构时，就可以用 Fragment 或者空标签。

### 十二、删除列表元素

暂时想到这种方法（后期需要优化）

```tsx
import classes from './test.module.css'
import React, { useState } from 'react'
export default function Index() {

  const [item, setItem] = useState(["张三", "李四", "王二", "麻子"])

  const deleteItem = (index) => {
    const isDelete = confirm("确认删除吗？")
    if (isDelete) {
      setItem(preItem => {
        const newItem = [...preItem]
        newItem.splice(index, 1)
        return newItem
      })
    }
  }

  return (
    <React.Fragment>
      <div className={classes.div}>
        <p className={classes.p}>列表渲染</p>
        <ul>
          {item.map((item, index) =>
            <li
              key={index}
              onClick={() => { deleteItem(index) }}
            >{item}
            </li>
          )}
        </ul>
      </div>
    </React.Fragment>
  )
}
```

### 十三、Context

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

**创建 Context**

```tsx
import React from 'react'

/*
  Context 相当于一个公共的存储空间，
    我们可以将多个组件中都需要访问的数据统一存储到一个 Context 中，
    这样无需通过 props 逐层传递，即可使用组件访问到这些数据
    通过 React.createContext() 创建 Context
*/

const TestContext = React.createContext({
    name: '张三',
    age: 18
})

export default TestContext
```

**使用方式一**

```tsx
import React from 'react'
import TestContext from '../../store/testContext'
/*
    使用方式一：
    1.引入 context
    2.使用 Xxx.Consumer 组件来创建元素
        Consumer 的标签需要一个回调函数
        它会将 context 设置为回调函数的参数，通过参数就可以访问到 context 中的存储的数据
 */
export default function Test() {
    return (
        <div>
            <TestContext.Consumer>
                {(ctx) => {
                    return <div>{ctx.name}年龄{ctx.age}</div>
                }}
            </TestContext.Consumer>
            <p>Test</p>
        </div>
    )
}
```

**使用方式二**

函数组件才可以用 useContext，class类不可以使用。

```tsx
import React, { useContext } from 'react'
import TestContext from '../../store/testContext'
/*
    使用方式二：
    1.引入 context
    2.使用钩子函数 useContext() 获取到 context
        useContext() 需要一个 context 作为参数
        它会将 Context 中数据获取并作为返回值返回
 */

export default function Context2() {

    // 使用钩子函数获取 Context
    const ctx = useContext(TestContext)
    return (
        <div>
            <p>函数组件：Context2</p>
            <p>{ctx.name}……{ctx.age}</p>
        </div>
    )
}
```

我们一般不会直接定义数据到 store/testContext 文件里，上面只是为了练习。

**指定 Context 中的数据**

```tsx
import Test from './components/Test/Test'
import Context2 from './components/Test/Context2'
import TestContext from './store/testContext'

export default () => {

  /*
    Xxx.Provider 
        表示数据的生产者，可以使用它来指定 Context 中的数据
        通过 value 属性来指定 Context 中存储的数据
        这样一来，在该组件的所有的子组件中都可以通过 Context 来访问它所指定的数据

    当我们通过 Context 访问数据时，它会读取离它最近的 Provider 中的数据
    如果没有 Provider，则读取 Context 中默认数据。
  */
  return (
    <>
      <h1>这是 App.tsx 文件</h1>
      <TestContext.Provider value={{ name: '孙悟空', age: 22 }}>
        <Test />
        <Context2 />
      </TestContext.Provider>
    </>
  )
}
```

### 十四、useEffect

**useState 执行流程**

 当我们直接在函数体中调用 setState 时，就会触发下面错误。

 例子：setCount(999) 

 错误：Too many re-renders.



 setState()的执行流程（函数组件）

 setCount() --> dispathSetDate() --会先去判断，组件当前处于什么阶段

​      渲染阶段：不会检查 state 值是否相同，会触发组件重新渲染，陷入死循环。

​      非渲染阶段：会检查 state 的值是否相同

​            如果值不相同，则对组件重新渲染

​            如果值相同，则不对组件进行重新渲染 

​            （React 在一些情况下会继续执行当前组件的渲染，但是这个渲染不会触发其子组件的渲染，这次渲染不会产生实际的效果。这种情况通常发生在值第一次相同时）

  **使用 Effect**

 useEffect() 是一个钩子函数，需要一个函数作为参数

 这个作为参数的函数，将会在组件渲染完毕后执行，网页 DOM 结构完成后，执行。

 在开发中，可以将那些会产生副作用的代码编写到 useEffect 的回调函数中

 这样就可以避免这些代码影响到组件的渲染

```js
  useEffect(() => {
    if (count === 0) {
      setCount(100)
    }
  })
```

**页面渲染完成后调用一次 useEffect**

```tsx
import React, { useEffect, useState } from 'react'

export default function Index() {

  const [count, setCount] = useState(0)

  /*
    默认情况下 useEffect() 中的函数 effect()，会在组件渲染完成后调用。
              并且是每次渲染完成后都会调用。
    在 usrEffect() 可以传递第二个参数,
       第二个参数是一个数组，在数组中可以指出 Effect 的依赖项
       指定后，只有当依赖发生变化时， Effect 才会被触发
       通常会将 Effect 中使用的所有的局部变量都设置为依赖项
          这样一来可以确保这些值发生变化时，会触发 Effect 的执行
    像 setState() 是由钩子函数 useState() 生成的
       useState() 会确保组件的每次渲染都会获取到相同的 setState() 对象
       自定义函数会发生变化。
    如果依赖项设置了一个空数组，则意味着 Effect 只会在组件初始化时触发一次。

  */

  useEffect(() => {
    console.log("useeffect 组件渲染")
  }, [])  // 可以传一组变量，变量发生改变才会触发。
  return (
    <div style={{ padding: 20 }}>
      <hr />
      <p>UseEffect 组件</p>
      <p>count：{count}</p>
      <button onClick={() => { setCount(count + 1) }}>加一</button>
      ——
      <button onClick={() => { setCount(count - 1) }}>减一</button>
    </div>
  )
}
```

### 十五、Memo

**解决问题：**

修改父组件内容，也会触发子组件内容重新渲染

性能优化问题

**函数式组件缓存**

  React.meno() 是一个高阶组件

​     它接收另一个组件作为参数，并且返回一个包装后的新组件。

​     新组件具有缓存功能：

​       只有组件的 props 发生变化，才会触发组件的重新渲染，

​       否则总是返回缓存中的结果。

```tsx
import React from 'react'

const Index = (props) => {
  console.log("index 渲染")

  return (
    <div>
      <p>count:{props.count}</p>
    </div>
  )
}

/*
    React.meno() 是一个高阶组件
          它接收另一个组件作为参数，并且返回一个包装后的新组件。
          新组件具有缓存功能：
              只有组件的 props 发生变化，才会触发组件的重新渲染，
              否则总是返回缓存中的结果。
*/
export default React.memo(Index) 
```

### 十六、useCallback

 **useCallback**

 useCallback 是一个钩子函数，用来创建 React 中的回调函数

 useCallback 创建的回调函数不会总在组件重新渲染时重新创建

 useCallback 参数：

  1.回调函数

  2.依赖数据

   \- 当依赖数组中的变量发生变化时，回调函数才会重新渲染

   \- 如果不指定依赖数组，回调函数每次都会重新创建

   \- 回调函数用到的数据，放到依赖性里

```js
  const clickHandler = useCallback(() => {
    setCount(count + 1)
  }, [count])
```

### 十七、fetch 请求数据

[Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 提供了一个 JavaScript 接口，用于访问和操纵 HTTP 管道的一些具体部分，例如请求和响应。它还提供了一个全局 [`fetch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch) 方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。

**文档地址**

```
https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
```

**请求电影列表组件**

```tsx
import React, { useEffect, useState } from 'react'

const Index = () => {

    const url = 'https://hzpc.service.tcloudbase.com/request/v1.0/db_movie'

    /*
      组件初始化时需要像服务器发送请求来加载数据
      
    */
    const [movData, setMovData] = useState([])

    // 添加一个 state 来记录数据是否正在加载,flase表示没有加载
    const [loading, setLoading] = useState(false)

    // 创建一个 state 来记录错误信息
    const [error, setError] = useState(null)

    useEffect(() => {
        // 设置loading 为true
        setLoading(true)
        /*
          在 effect 中加载数据
          fetch() 用来向服务器发送请求加载数据，是 Ajax 的升级版
          它需要两个参数：
              1.请求地址（url）
              2.请求信息（get、post、data...） 默认get
        */
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }

                // 代码运行到这里，说明数据没有加载成功
                setLoading(false)
                // 抛出一个错我
                throw new Error('数据加载失败！')

            }).then((e) => {

                // 判断是否正常返回信息

                // 将加载的数据设置到 state 中
                setMovData(e.data)

                // 数据加载完毕，设置 loding 为false
                setLoading(false)
            })
            .catch((err) => {
                // catch 中的回调函数，用来统一处理错误信息
                // catch 一执行，说明没有成功加载到数据
                setError(err.message)
            })
    }, [])

    return (
        <div>
            <h1>电影列表</h1>
            <ul>
                {!loading && !error && movData.map((item) => <li key={item._id}>{item.score}：{item.title}  </li>)}

                {loading && <p>数据加载中……</p>}
                {/* {loading ? "数据加载中……" : ""} */}

                {error && <p>{error}</p>}
            </ul>
        </div>
    )
}

export default Index
```

**使用 await 方法**

```tsx
import React, { useEffect, useState } from 'react'

const App = () => {
  const url = 'https://hzpc.service.tcloudbase.com/request/v1.0/db_movie'

  /*
    组件初始化时需要像服务器发送请求来加载数据
    
  */
  const [movData, setMovData] = useState([])

  // 添加一个 state 来记录数据是否正在加载,flase表示没有加载
  const [loading, setLoading] = useState(false)

  // 创建一个 state 来记录错误信息
  const [error, setError] = useState(null)

  useEffect(() => {

    const fetchData = async () => {
      try {
        // 设置loading 为true
        setLoading(true)

        // 重置错误信息为 null
        setError(null)

        const res = await fetch(url)
        if (res.ok) {
          const data = await res.json()
          setMovData(data.data)

        } else {
          throw new Error('数据加载失败啦！')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }


    }

    fetchData()
  }, [])



  return (
    <div>
      <h1>APP 页面</h1>
      <ul>
        {!loading && !error && movData.map((item) => <li key={item._id}>{item.score}：{item.title}  </li>)}

        {loading && <p>数据加载中……</p>}
        {/* {loading ? "数据加载中……" : ""} */}

        {error && <p>{error}</p>}
      </ul>
      <hr />
      {/* <Movie /> */}
    </div>
  )
}

export default App
```

记录一下学习时间：2022年7月14日 0点13分

稍微改动一下

```tsx
import React, { useEffect, useState, useCallback } from 'react'

const App = () => {
  const url = 'https://hzpc.service.tcloudbase.com/request/v1.0/db_movie'

  /*
    组件初始化时需要像服务器发送请求来加载数据
  */
  const [movData, setMovData] = useState([])

  // 添加一个 state 来记录数据是否正在加载,flase表示没有加载
  const [loading, setLoading] = useState(false)

  // 创建一个 state 来记录错误信息
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      // 设置loading 为true
      setLoading(true)

      // 重置错误信息为 null
      setError(null)

      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setMovData(data.data)

      } else {
        throw new Error('数据加载失败啦！')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  },[])

  useEffect(() => {
    fetchData()
  }, [])



  return (
    <div>
      <h1>APP 页面</h1>
      <button onClick={fetchData}>加载数据</button>
      <ul>
        {!loading && !error && movData.map((item) => <li key={item._id}>{item.score}：{item.title}  </li>)}

        {loading && <p>数据加载中……</p>}
        {/* {loading ? "数据加载中……" : ""} */}

        {error && <p>{error}</p>}
      </ul>
      <hr />
    </div>
  )
}

export default App
```

去图书馆吹空调了，效率有点低啊

### 十八、使用Redux

Redux可以理解为是reducer和context的结合体，使用Redux即可管理复杂的state，又可以在不同的组件间方便的共享传递state。当然，Redux主要使用场景依然是大型应用，大型应用中状态比较复杂，如果只是使用reducer和context，开发起来并不是那么的便利，此时一个有一个功能强大的状态管理器就变得尤为的重要。

使用Redux之前,你需要先明确一点Redux是JS应用的状态容器,它并不是只能在React使

​    网页中使用 redux 的步骤

​      1.引入 redux 核心包

​      2.创建 reducer 整合函数

​      3.通过 reducer 对象创建 store

​      4.对 store 中的 state 进行订阅

​      5.通过 dispatch 派发 state 的操作指令

看代码实例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redux</title>
    <script src="https://unpkg.com/redux@4.2.0/dist/redux.js"></script>
</head>

<body>
    <button id="btn01">减少</button>
    <span id="counter">1</span>
    <button id="btn02">增加</button>
    <button id="btn">增加 n</button>
    <script>

        const btn01 = document.getElementById('btn01');
        const btn02 = document.getElementById('btn02');
        const btn = document.getElementById('btn');
        const counterSpan = document.getElementById('counter');

        let count = 1;

        btn01.addEventListener('click', () => {
            store.dispatch({ type: "SUB" })
        });

        btn02.addEventListener('click', () => {
            store.dispatch({ type: "ADD" })
        });

        btn.addEventListener('click', () => {
            store.dispatch({ type: "ADDN", n: 3 })
        });

        /*
        网页中使用 redux 的步骤
            1.引入 redux 核心包
            2.创建 reducer 整合函数
            3.通过 reducer 对象创建 store
            4.对 store 中的 state 进行订阅
            5.通过 dispatch 派发 state 的操作指令
        */

        function reducer(state, action) {
            /*
                state 表示当前 state，可以根据这个 state 生成新的 state
                action 是一个 js 对象，它里边会保存操作的信息
                    type 表示操作的类型
                    其他需要传递的参数，也可也在 action 中设置

            */
            switch (action.type) {
                case 'ADD':
                    return state + 1
                case 'SUB':
                    return state - 1
                case 'ADDN':
                    return state + action.n
                default:
                    return state
            }
        }

        // reducer 是上面创建的函数，初始值是必须传的
        const store = Redux.createStore(reducer, 1)

        store.subscribe(() => {
            // 打印 state 的值
            console.log(store.getState())
            counterSpan.innerText = store.getState()
        })

    </script>
</body>

</html>
```

当 redux 中有多个对象时

```js
        function reducers(state = { count: 1 }, action) {

            switch (action.type) {
                case 'ADD':
                    return { count: state.count + 1 }
                case 'SUB':
                    return { count: state.count - 1 }
                case 'ADDN':
                    return { count: state.count + action.n }
                default:
                    return state
            }
        }

        // reducer 是上面创建的函数，初始值是必须传的
        const store = Redux.createStore(reducers, {count:999})

        store.subscribe(() => {
            // 打印 state 的值
            console.log(store.getState().count)
            counterSpan.innerText = store.getState().count
        })
```

稍微优化以下

```js
        function reducers(state = { count: 1, name: '张三' }, action) {

            switch (action.type) {
                case 'ADD':
                    return { ...state, count: state.count + 1 }
                case 'SUB':
                    return { ...state, count: state.count - 1 }
                case 'ADDN':
                    return { count: state.count + action.n, name: '李四' }
                default:
                    return state
            }
        }

        // reducer 是上面创建的函数，初始值是必须传的
        const store = Redux.createStore(reducers)

        store.subscribe(() => {
            // 打印 state 的值
            console.log(store.getState().count)
            console.log(store.getState().name)
            counterSpan.innerText = store.getState().count
        })
```

​    **问题：**

​    1.如果 state 过于复杂，将会非常难以维护

​      \- 可以通过对 state 分组来解决这个问题，创建多个 reduce，然后将其合并为一个

​    2.state 每次操作时，都需要对其进行复制，然后在去修改

​      \- Redux Toolkit(工具包)，简化 redux 操作

​    3.case 后面的常量维护起来会比较麻烦

### 

