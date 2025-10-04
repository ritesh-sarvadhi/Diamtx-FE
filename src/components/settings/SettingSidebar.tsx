"use client";

import { useEffect, useMemo } from "react";
import { Menu, Button, Typography, theme, Spin, Alert } from "antd";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchMasters,
  selectMaster,
  clearMastersError,
} from "@/store/settingsSlice";

const { Text } = Typography;

export default function SettingSidebar() {
  const { token } = theme.useToken();
  const dispatch = useAppDispatch();
  const {
    masters,
    mastersStatus,
    mastersError,
    selectedMasterId,
  } = useAppSelector((state) => state.settings);

  const isLoading = mastersStatus === "loading";

  useEffect(() => {
    if (mastersStatus === "idle") {
      dispatch(fetchMasters());
    }
  }, [dispatch, mastersStatus]);

  useEffect(() => {
    if (
      mastersStatus === "succeeded" &&
      (!selectedMasterId || !masters.some((item) => item.id === selectedMasterId)) &&
      masters.length
    ) {
      dispatch(selectMaster(masters[0].id));
    }
  }, [dispatch, mastersStatus, masters, selectedMasterId]);

  const menuItems = useMemo(() => {
    return masters.map((item) => ({
      key: item.id,
      label: item.name || item.code,
    }));
  }, [masters]);

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
        <Text strong>
          {isLoading ? "Loading..." : `${menuItems.length} Results`}
        </Text>
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
        {mastersError ? (
          <div style={{ padding: "16px" }}>
            <Alert
              type="error"
              message={mastersError}
              showIcon
              closable
              onClose={() => dispatch(clearMastersError())}
            />
          </div>
        ) : isLoading && !menuItems.length ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "24px" }}>
            <Spin />
          </div>
        ) : (
          <Menu
            mode="inline"
            selectedKeys={selectedMasterId ? [selectedMasterId] : []}
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
                  <span style={{ color: "#bfbfbf" }}>
                    <MoreOutlined />
                  </span>
                </div>
              )
            }))}
            onClick={({ key }) => {
              dispatch(selectMaster(String(key)));
            }}
            style={{ 
              border: "none",
              background: "transparent"
            }}
          />
        )}
      </div>
    </div>
  );
}
