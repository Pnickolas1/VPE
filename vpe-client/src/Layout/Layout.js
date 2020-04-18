import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;


class AdminLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">Home
              <Link to="/"/>
            </Menu.Item> 
          </Menu>
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            {this.props.render()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Valor Equity Partners</Footer>
      </Layout>
    )
  }
}

export default AdminLayout
