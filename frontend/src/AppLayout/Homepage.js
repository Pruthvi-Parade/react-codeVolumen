import "../App.css";
import { Layout } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import SideBar from "./SideBar";
import DisplayPage from "./DisplayPage";

export default function Homepage() {
  const [sideBarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="App">
      <Layout
        hasSider
        // style={{
        //   minHeight: "100vh",
        // }}
      >
        <SideBar
          collapsed={sideBarCollapsed}
          onCollapse={() => {
            setSidebarCollapsed(!sideBarCollapsed);
          }}
        />
        <Layout>
          <DisplayPage
          collapsed={sideBarCollapsed}
          onCollapse={() => {
            setSidebarCollapsed(!sideBarCollapsed);
          }}/>
        </Layout>
      </Layout>
    </div>
  );
}
