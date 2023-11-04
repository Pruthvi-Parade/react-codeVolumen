import {
    UnorderedListOutlined,
    FileSearchOutlined,
    SendOutlined,
    DashboardOutlined,
} from "@ant-design/icons";
import "../App.css";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Link } from "react-router-dom";
const { Sider } = Layout;

const items = [
    {
        label: (
            <Link
                style={{ color: "inherit" }}
                to={`/masters/dashboard`}
            >
                Dashboard
            </Link>
        ),
        key: "masters",
        icon: <DashboardOutlined />,
    },
    {
        label: (
            <Link
                style={{ color: "inherit" }}
                to={`/masters/books`}
            >
                Books
            </Link>
        ),
        // key: "filetable",
        key: "books",
        icon: <FileSearchOutlined />,
    },
    // {
    //     label: (
    //         <Link
    //             style={{ color: "inherit" }}
    //             to={`/masters/reports`}
    //         >
    //             View Reports
    //         </Link>
    //     ),
    //     key: "dispatch",
    //     icon: <SendOutlined />,
    // },
];

export default function SideBar({ collapsed, onCollapse }) {
    // const [collapsed, setCollapsed] = useState(false);

    return (
        // <div className="SideBar">

        <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            className="sidebar-component"
            width={"var(--sidebarOpenWidth)"}
            collapsedWidth={"var(--sidebarClosedWidth)"}
        >
            
            <img
                src="/logo.png"
                alt="logo"
                style={{width: "100%", height: "62px"}}
            />
            <Menu
                theme="dark"
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={items}
            />
        </Layout.Sider>
        // </div>
    );
}
