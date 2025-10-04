"use client";

import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Typography } from "antd";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface UserDetails {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  roleId: string;
  status: boolean;
  loginType: string;
  isEmployee: boolean;
  location: string[];
  canPriceUpdate: boolean;
  isSales: boolean;
  refId: string;
  isSuperAdminRS: boolean;
  Role: {
    id: string;
    name: string;
  };
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userData = localStorage.getItem("userDetails");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
    router.push("/login");
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const sidebarMenuItems = [
    {
      key: "/dashboard",
      icon: <UserOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: "/dashboard/settings",
      icon: <UserOutlined />,
      label: <Link href="/dashboard/settings">Settings</Link>,
    },
  ];

  const topNavItems = [
    {
      key: "lab-grown",
      label: "Lab Grown Stone",
    },
    {
      key: "natural",
      label: "Natural Stone",
    },
  ];

  const settingsNavItems = [
    {
      key: "masters",
      label: "Masters",
    },
  ];

  const getCurrentNavItems = () => {
    if (pathname === "/dashboard/settings") {
      return settingsNavItems;
    }
    return topNavItems;
  };

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed} className="bg-white shadow-lg">
        <div className="p-4 border-b">
          <Text strong className="text-lg">
            {collapsed ? "DG" : "Diamtx"}
          </Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={sidebarMenuItems}
          className="border-0"
        />
      </Sider>
      
      <Layout>
        <Header className="bg-white shadow-sm px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-lg"
            />
            
            <div className="flex space-x-6">
              {getCurrentNavItems().map((item) => (
                <Button key={item.key} type="text" className="text-gray-700 hover:text-blue-600">
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <Button type="text" className="flex items-center space-x-2">
                <UserOutlined />
                <div className="text-left">
                  <div className="text-sm font-medium">{userDetails?.name}</div>
                  <div className="text-xs text-gray-500">{userDetails?.Role?.name}</div>
                </div>
              </Button>
            </Dropdown>
          </div>
        </Header>
        
        <Content className="p-6 bg-gray-50">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
