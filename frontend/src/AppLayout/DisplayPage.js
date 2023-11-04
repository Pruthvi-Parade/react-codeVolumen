import "../App.css";
import { Layout, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import React from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { useNavigate, Outlet } from "react-router-dom";
import { Footer } from "antd/lib/layout/layout";
const { Header, Content } = Layout;

export default function DisplayPage() {
    const navigate = useNavigate();

    return (
        <Layout className="site-layout">
            <Layout.Header
                className="site-layout-background"
                style={{
                    padding: 0,
                    backgroundColor: "#002140",
                }}
            >
                <h1 style={{ margin: "1%", float: "left", color: "white" }}>
                    Version:{process.env.REACT_APP_VERSION}
                </h1>
                <Button
                    type="primary"
                    style={{ margin: "1%", float: "right" }}
                    icon={<LogoutOutlined />}
                    onClick={() => {
                        localStorage.setItem("isLoggedIn", "false");
                        navigate("/login");
                    }}
                >
                    Logout
                </Button>
            </Layout.Header>
            <Layout.Content className="main-content-div">

                <div
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        minHeight: "100%",
                    }}
                >
                    <Outlet />
                </div>
                <Footer
                    style={{
                        textAlign: "center",
                    }}
                >
                    Powered by Integrated Active Monitoring
                </Footer>
            </Layout.Content>
        </Layout>
    );
}
