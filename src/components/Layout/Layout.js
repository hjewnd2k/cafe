import {
  ReadOutlined,
  FileOutlined,
  HomeOutlined,
  DropboxOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Trang chủ", "1", <HomeOutlined />),
  getItem("Quản lý sản phẩm", "2", <ReadOutlined />),
  getItem("Quản lý loại sản phẩm", "3", <FileOutlined />),
  getItem("Quản lý đơn hàng", "4", <DropboxOutlined />),
];

const pages = {
  1: "/",
  2: "/products",
  3: "/category",
  4: "/order",
};

const breadcrumbs = {
  1: "Trang chủ",
  2: "Quản lý sản phẩm",
  3: "Quản lý loại sản phẩm",
  4: "Quản lý đơn hàng",
  5: "Chi tiết đơn hàng",
};

const LayoutComponent = (props) => {
  const { dispatch } = useContext(AppContext);
  const [collapsed, setCollapsed] = useState(false);
  const [keyMenu, setKeyMenu] = useState("1");
  const [breadcrumb, setBreadCumb] = useState("Trang chủ");
  const pathArray = window.location.pathname;

  useEffect(() => {
    switch (pathArray) {
      case "/":
        setKeyMenu("1");
        setBreadCumb(breadcrumbs[1]);
        break;
      case "/products":
        setKeyMenu("2");
        setBreadCumb(breadcrumbs[2]);
        break;
      case "/category":
        setKeyMenu("3");
        setBreadCumb(breadcrumbs[3]);
        break;
      case "/order":
        setKeyMenu("4");
        setBreadCumb(breadcrumbs[4]);
        break;
      case "/order/detail":
        setKeyMenu("4");
        setBreadCumb(breadcrumbs[5]);
        break;

      default:
        break;
    }
  }, [pathArray]);

  const navigate = useNavigate();

  const handleClick = (e) => {
    setKeyMenu(e.key);
    setBreadCumb(breadcrumbs[e.key]);
    navigate(pages[e.key]);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          zIndex: 10,
        }}
      >
        <div className="flex justify-center items-center mt-3">
          <img
            className="w-[80%] h-[70px] object-cover"
            src="http://incucre.com/wp-content/uploads/2016/06/thiet-ke-logo-dep-gia-re-1.jpg"
            alt=""
          />
        </div>
        <Menu
          theme="dark"
          selectedKeys={keyMenu}
          mode="inline"
          items={items}
          onClick={handleClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            position: "fixed",
            left: "200px",
            right: 0,
            zIndex: 10,
          }}
        >
          <div className="w-full flex justify-end text-white pr-4 text-base items-center h-full">
            <span
              className="p-1 flex justify-center items-center cursor-pointer hover:text-blue-500"
              onClick={() => {
                dispatch({
                  type: "CURRENT_USER",
                  payload: { userName: "", isLogin: false },
                });
                localStorage.removeItem("DucMinhToken");
                navigate("/auth/login");
              }}
            >
              <LoginOutlined />
            </span>
          </div>
        </Header>
        <Content
          style={{
            margin: "70px 0 0 218px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {props.children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
