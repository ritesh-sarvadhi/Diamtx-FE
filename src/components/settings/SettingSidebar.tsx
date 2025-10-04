"use client";

import { useEffect, useMemo, useState } from "react";
import { Menu, Button, Typography, theme, Spin, Alert } from "antd";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import { apiFetchMasters, MasterRecord } from "@/services/ProjectService";

const { Text } = Typography;

interface SettingSidebarProps {
  selectedMasterId: string | null;
  onSelect: (master: MasterRecord) => void;
}

export default function SettingSidebar({
  selectedMasterId,
  onSelect,
}: SettingSidebarProps) {
  const { token } = theme.useToken();
  const [masters, setMasters] = useState<MasterRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMasters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFetchMasters();
        const list = response.data.data || [];
        setMasters(list);
      } catch (err) {
        console.error("Failed to load masters", err);
        setError("Unable to load master list");
      } finally {
        setLoading(false);
      }
    };

    fetchMasters();
  }, []);

  useEffect(() => {
    if (!masters.length) {
      return;
    }

    const currentExists = masters.some((item) => item.id === selectedMasterId);
    if (!currentExists && masters[0]) {
      onSelect(masters[0]);
    }
  }, [masters, selectedMasterId, onSelect]);

  const menuItems = useMemo(() => {
    return masters.map((item) => ({
      key: item.id,
      label: item.name || item.code,
    }));
  }, [masters]);

  return (
    <div
      style={{
        background: token.colorBgContainer,
        borderRadius: token.borderRadius,
        // boxShadow: token.boxShadow,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${token.colorBorder}`,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px",
          borderBottom: `1px solid ${token.colorBorder}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text strong>
          {loading ? "Loading..." : `${menuItems.length} Results`}
        </Text>
        <Button type="primary" icon={<PlusOutlined />} size="small">
          + Master
        </Button>
      </div>

      {/* Menu */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {error ? (
          <div style={{ padding: "16px" }}>
            <Alert type="error" message={error} showIcon />
          </div>
        ) : loading && !menuItems.length ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "24px",
            }}
          >
            <Spin />
          </div>
        ) : (
          <Menu
            mode="inline"
            selectedKeys={selectedMasterId ? [selectedMasterId] : []}
            items={menuItems.map((item) => ({
              ...item,
              label: (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <span>{item.label}</span>
                  <span style={{ color: "#bfbfbf" }}>
                    <MoreOutlined />
                  </span>
                </div>
              ),
            }))}
            onClick={({ key }) => {
              const selectedMaster = masters.find((item) => item.id === key);
              if (selectedMaster) {
                onSelect(selectedMaster);
              }
            }}
            style={{
              border: "none",
              background: "transparent",
            }}
          />
        )}
      </div>
    </div>
  );
}
