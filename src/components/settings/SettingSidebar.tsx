"use client";

import { Menu, Button, Typography, Space, theme } from "antd";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import { getMenuItems } from "./data/settingsData";

const { Text } = Typography;

interface SettingSidebarProps {
  selectedKey: string;
  onSelect: (key: string) => void;
}

export default function SettingSidebar({ selectedKey, onSelect }: SettingSidebarProps) {
  const { token } = theme.useToken();
  const menuItems = getMenuItems().map(item => ({
    ...item,
    icon: <MoreOutlined />,
  }));

  return (
    <div style={{ 
      background: token.colorBgContainer, 
      borderRadius: token.borderRadius,
      boxShadow: token.boxShadow,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      border: `1px solid ${token.colorBorder}`
    }}>
      {/* Header */}
      <div style={{ 
        padding: "16px", 
        borderBottom: `1px solid ${token.colorBorder}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <Text strong>38 Results</Text>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          size="small"
        >
          + Master
        </Button>
      </div>

      {/* Menu */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems.map(item => ({
            ...item,
            label: (
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                width: "100%"
              }}>
                <span>{item.label}</span>
                <span style={{ color: "#bfbfbf" }}>{item.icon}</span>
              </div>
            )
          }))}
          onClick={({ key }) => onSelect(key)}
          style={{ 
            border: "none",
            background: "transparent"
          }}
        />
      </div>
    </div>
  );
}
