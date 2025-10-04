"use client";

import { Card, Typography, theme } from "antd";

const { Title, Text } = Typography;

export default function InventoryConfigPage() {
  const { token } = theme.useToken();

  return (
    <Card 
      style={{ 
        minHeight: "calc(100vh - 120px)",
        borderRadius: token.borderRadius,
        boxShadow: token.boxShadow,
        border: `1px solid ${token.colorBorder}`
      }}
    >
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        height: "calc(100vh - 200px)",
        textAlign: "center"
      }}>
        <Title level={1} style={{ color: token.colorTextSecondary }}>
          Inventory Configuration
        </Title>
        <Text type="secondary" style={{ fontSize: "16px" }}>
          Inventory configuration settings will be available here
        </Text>
      </div>
    </Card>
  );
}
