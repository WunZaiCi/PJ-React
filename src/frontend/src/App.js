import './App.css';
import {getAllStudents} from "./client";
import {useState, useEffect} from "react";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Breadcrumb, Empty, Layout, Menu, Spin, Table} from 'antd';

const {Header,
    Content,
    Footer,
    Sider} = Layout;
const {SubMenu} =Menu;
const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
];



function App() {

    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);

    const fetchStudents = () =>
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
                setFetching(false);
            })
    /*    依赖项数组（deps）：
            控制副作用运行的条件。
            数组为空（[]）：副作用仅在组件挂载和卸载时运行。
            数组包含依赖项（如 [value]）：当依赖项的值变化时，副作用会重新运行。
    */
    useEffect(() => {
        console.log("component is mounted");
        fetchStudents();
    }, []);

    const renderStudents = () => {
        if(fetching) {
            return <Spin />
        }
        if (students.length <= 0) {
            return <Empty/>
        }
        return <Table dataSource = {students}
                      columns = {columns}
                      bordered
                      title ={() => 'Students'}
                      pagination={{pageSize: 50}}
                      scroll={{y:240}}
        rowKey={(students) => students.id}/>
    }


    return <Layout style={{minHeight: '100vh'}}>
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo"/>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined/>}>
                Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined/>}>
                Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined/>}>
                Files
            </Menu.Item>
        </Menu>
    </Sider>
    <Layout className="site-layout">
        <Header className="site-layout-background" style={{padding: 0}}/>
        <Content style={{margin: '0 16px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
            {renderStudents()}
        </div>
        </Content>
    <Footer style={{textAlign: 'center'}}>liu weijie</Footer>
    </Layout>
</Layout>
}

export default App;
