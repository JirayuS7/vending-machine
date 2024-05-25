import { ReactNode } from "react";
import { Layout, theme } from "antd";

import "bootstrap/dist/css/bootstrap.min.css";
import SibarCart from "./sibar";

const { Header, Sider, Content } = Layout;

export default function LayoutShop({ children }: { children: ReactNode }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      {" "}
      <Layout hasSider>
        {" "}
        <Sider
          width={250}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            right: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <SibarCart/>
        </Sider>
        <Layout style={{ marginRight: 250 }}>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div className="p-3">
              <h1 className="fs-5 fw-bolder">
                <i className="bi bi-cup-straw"></i> Take Some{" "}
                <span className="text-warning"> Beer to Home.</span>
              </h1>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div>{children}</div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
