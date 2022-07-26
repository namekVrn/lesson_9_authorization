/* eslint-disable */
import { useSelector } from 'react-redux';
import '../layout/layout.css';
import { NavLink, Outlet } from 'react-router-dom';
import { Layout, Menu, Row, Col, Typography, Divider} from 'antd';
import React, { useState } from 'react';
import LogIn from 'components/LogIn/LogIn';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LineChartOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  EllipsisOutlined
} from '@ant-design/icons';
const LayoutMy = () => {
  const { Text, Link } = Typography;
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Sider, Content } = Layout;
  const selector = useSelector(store => store.auth)
 
  const {user, isLoad, token} = selector;
  console.log(isLoad);
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Text type="success" className='header__login--icon'>{isLoad ?  <LogIn user={user}/> : null}</Text>
          <Divider className='Divider'/>
          {isLoad ?  <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <LineChartOutlined />,
                label: <NavLink to="/main">HomePage</NavLink>,
              },
              {
                key: '2',
                icon: <UnorderedListOutlined />,
                label: <NavLink to="/tarifs">Тарифы</NavLink>,
              },
              
              {
                key: '4',
                icon: <EllipsisOutlined />,
                label: (
                  <NavLink className="header__navlink" to="/clientList">
                    Все клиенты
                  </NavLink>
                ),
              },
              {
                key: '5',
                icon: <UserAddOutlined />,
                label: (
                  <NavLink className="navLink__add" to="/addClients">
                    Добавить клиента
                  </NavLink>
                ),
              },

            ]}
          />: <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '3',
              icon: <UploadOutlined />,
              label: <NavLink to="/authReg">Регистрация</NavLink>,
            },
            {
              key: '6',
              icon: <UploadOutlined />,
              label: (
                <NavLink className="navLink__add" to="/authView">
                  Войти
                </NavLink>
              ),
            },
            ]}/>}
          
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default LayoutMy;
