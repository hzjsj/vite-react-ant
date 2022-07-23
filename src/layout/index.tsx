import { Layout, Menu } from 'antd';
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'

import RenderRoutes from '../routes'
const { Header, Content, Footer, Sider } = Layout;


const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const items = [
    { label: '主页', key: '/' }, // 菜单项务必填写 key
    { label: '列表', key: '/list' },
    { label: '图书', key: '/book' },
    {
        label: '详情',
        key: '/code',
        children: [{ label: '404', key: '/404' }, { label: 'Test', key: '/test' }],
    },
];

const MainLayout = () => {
    const year = new Date().getFullYear()

    // 获取一个用于跳转页面的函数
    const nav = useNavigate()
    return (
        <Layout>
            <Header className="header">
                <div className={styles.logo} />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
           
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >
                <Layout
                    className="site-layout-background"
                    style={{
                        margin: '16px 0',
                        padding: '24px 0',
                        background: '#fff'
                    }}
                >
                    <Sider theme="light" className="site-layout-background" width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['/']}
                            style={{
                                height: '100%',
                                background: '#fff'
                            }}
                            onClick={({ key }) => { nav(key) }}
                            items={items}
                        />
                    </Sider>
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 500,
                        }}
                    >
                        <RenderRoutes />
                        {/* <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="404" element={<NoFoundPage />} />
                            <Route path="list" element={<List />} />
                            <Route path="desc/:id" element={<Desc />} />
                        </Routes> */}
                    </Content>
                </Layout>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Copyright &copy; 计算机小站 2018 - {year}
            </Footer>
        </Layout>
    )
};

export default MainLayout;