"use client";

import { useState, useEffect } from "react";
import { Layout, Row, Col, theme, Typography } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import SettingSidebar from "@/components/settings/SettingSidebar";
import SettingContent from "@/components/settings/SettingContent";
import SystemSettingsPage from "@/components/settings/SystemSettingsPage";
import InventoryConfigPage from "@/components/settings/InventoryConfigPage";
import RolePermissionPage from "@/components/settings/RolePermissionPage";
import PriceSettingsPage from "@/components/settings/PriceSettingsPage";

const { Content } = Layout;
const { Title } = Typography;

export default function SettingsPage() {
  const [selectedKey, setSelectedKey] = useState("white");
  const [activeTab, setActiveTab] = useState("master");
  const { token } = theme.useToken();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get the active tab from URL search params
  useEffect(() => {
    const tab = searchParams.get('tab') || 'master';
    setActiveTab(tab);
  }, [searchParams]);

  // If no tab is specified, redirect to master tab
  useEffect(() => {
    if (!searchParams.get('tab')) {
      router.replace('/settings?tab=master');
    }
  }, [searchParams, router]);

  const renderContent = () => {
    switch (activeTab) {
      case "master":
        return (
          <Row gutter={16} style={{ height: "calc(100vh - 120px)" }}>
            {/* Left Child Sidebar */}
            <Col span={6}>
              <SettingSidebar 
                selectedKey={selectedKey} 
                onSelect={setSelectedKey} 
              />
            </Col>
            
            {/* Right Content Panel */}
            <Col span={18}>
              <SettingContent sectionKey={selectedKey} />
            </Col>
          </Row>
        );
      case "system":
        return <SystemSettingsPage />;
      case "inventory":
        return <InventoryConfigPage />;
      case "role":
        return <RolePermissionPage />;
      case "price":
        return <PriceSettingsPage />;
      default:
        return (
          <Row gutter={16} style={{ height: "calc(100vh - 120px)" }}>
            <Col span={6}>
              <SettingSidebar 
                selectedKey={selectedKey} 
                onSelect={setSelectedKey} 
              />
            </Col>
            <Col span={18}>
              <SettingContent sectionKey={selectedKey} />
            </Col>
          </Row>
        );
    }
  };

  return (
    <ProtectedRoute>
      <Layout style={{ 
        minHeight: "100vh", 
        background: token.colorBgContainer 
      }}>
        {/* Main Content Area */}
        <Content style={{ 
          padding: "16px",
          background: token.colorBgLayout
        }}>
          {renderContent()}
        </Content>
      </Layout>
    </ProtectedRoute>
  );
}
