
import { BrowserRouter } from 'react-router-dom'
import MainLayout from './layout'
import 'antd/dist/antd.css'
//import './App.less';

function App() {

  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  )
}

export default App
