"use client";

import { useState, useEffect } from "react";
import { Layout, Row, Col, theme } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import SettingSidebar from "@/components/settings/SettingSidebar";
import SettingContent from "@/components/settings/SettingContent";
import SystemSettingsPage from "@/components/settings/SystemSettingsPage";
import InventoryConfigPage from "@/components/settings/InventoryConfigPage";
import RolePermissionPage from "@/components/settings/RolePermissionPage";
import PriceSettingsPage from "@/components/settings/PriceSettingsPage";
import { MasterRecord } from "@/services/ProjectService";

const { Content } = Layout;

export default function SettingsPage() {
  const [selectedMaster, setSelectedMaster] = useState<MasterRecord | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("master");
  const { token } = theme.useToken();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get the active tab from URL search params
  useEffect(() => {
    const tab = searchParams.get("tab") || "master";
    setActiveTab(tab);
  }, [searchParams]);

  // If no tab is specified, redirect to master tab
  useEffect(() => {
    if (!searchParams.get("tab")) {
      router.replace("/settings?tab=master");
    }
  }, [searchParams, router]);

  const renderContent = () => {
    switch (activeTab) {
      case "master":
        return (
          <Row gutter={16} style={{ height: "calc(100vh - 176px)" }}>
            {/* Left Child Sidebar */}
            <Col span={6} className="h-full overflow-auto">
              <SettingSidebar
                selectedMasterId={selectedMaster?.id ?? null}
                onSelect={setSelectedMaster}
              />
            </Col>

            {/* Right Content Panel */}
            <Col span={18} className="h-full overflow-auto">
              <SettingContent master={selectedMaster} />
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
          <Row gutter={16} style={{ height: "calc(100vh - 176px)" }}>
            <Col span={6} className="h-full overflow-auto">
              <SettingSidebar
                selectedMasterId={selectedMaster?.id ?? null}
                onSelect={setSelectedMaster}
              />
            </Col>
            <Col span={18} className="h-full overflow-auto">
              <SettingContent master={selectedMaster} />
            </Col>
          </Row>
        );
    }
  };

  return (
    <ProtectedRoute>
      <Layout
        style={{
          background: token.colorBgContainer,
        }}
      >
        {/* Main Content Area */}
        <Content
          style={{
            padding: "16px",
            background: token.colorBgLayout,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </ProtectedRoute>
  );
}
