"use client";

import { appConfig } from "@/config/app.config";
import { useAuth } from "@/contexts/AuthContext";

import {
  BuildOutlined,
  DashboardOutlined,
  LineChartOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ApiOutlined,
  BarChartOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Drawer,
  Layout,
  theme,
  Dropdown,
  Typography,
} from "antd";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const { Header } = Layout;
const { Text } = Typography;

interface NavigationProps {
  children: React.ReactNode;
}

const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
    isDesktop: false,
    isTablet: false,
    isMobile: false,
    isMobileOrTablet: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenSize({
        width,
        height,
        isDesktop: width >= 1024,
        isTablet: width >= 768 && width < 1024,
        isMobile: width < 768,
        isMobileOrTablet: width < 1024,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};

const NavigationSkeleton = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <div
      style={{
        width: 260,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        background: "#ffffff",
        borderRight: "1px solid #f0f0f0",
        boxShadow: "2px 0 8px 0 rgba(0, 0, 0, 0.05)",
        display: "flex",
        flexDirection: "column",
        zIndex: 100,
      }}
    >
      <div
        style={{
          height: "80px",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "8px",
            background: "#f0f0f0",
            marginRight: "12px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div>
          <div
            style={{
              width: "120px",
              height: "20px",
              background: "#f0f0f0",
              borderRadius: "4px",
              marginBottom: "8px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
          <div
            style={{
              width: "60px",
              height: "12px",
              background: "#f0f0f0",
              borderRadius: "4px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Menu items skeleton */}
      <div style={{ padding: "16px" }}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              height: "40px",
              background: "#f0f0f0",
              borderRadius: "8px",
              marginBottom: "8px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        ))}
      </div>

      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #f0f0f0",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            height: "40px",
            background: "#f0f0f0",
            borderRadius: "8px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>
    </div>

    <Layout>
      <div
        style={{
          height: 64,
          background: "#fff",
          marginLeft: 260,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "#f0f0f0",
              borderRadius: "4px",
              marginRight: "16px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
          <div
            style={{
              width: "200px",
              height: "20px",
              background: "#f0f0f0",
              borderRadius: "4px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </div>
        <div
          style={{
            width: "100px",
            height: "32px",
            background: "#f0f0f0",
            borderRadius: "16px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>

      <div
        style={{
          marginLeft: 260,
          padding: "16px",
          background: "#f0f2f5",
          minHeight: "calc(100vh - 176px)",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "8px",
            padding: "24px",
            minHeight: "calc(100vh - 144px)",
          }}
        >
          <div
            style={{
              width: "300px",
              height: "32px",
              background: "#f0f0f0",
              borderRadius: "8px",
              marginBottom: "24px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
          <div
            style={{
              width: "100%",
              height: "200px",
              background: "#f0f0f0",
              borderRadius: "8px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </Layout>

    <style jsx>{`
      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
    `}</style>
  </Layout>
);

export function Navigation({ children }: NavigationProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { isDesktop, isMobileOrTablet } = useResponsive();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token } = theme.useToken();

  const getInitial = (value?: string | null) => {
    if (!value) return undefined;
    const trimmed = value.trim();
    return trimmed ? trimmed[0].toUpperCase() : undefined;
  };

  const userName = user?.name || user?.email || "User";
  const userEmail = user?.email;
  const userInitial = getInitial(user?.name) ?? getInitial(user?.email) ?? "U";

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Auto-collapse sidebar on tablet/mobile
  useEffect(() => {
    if (isMobileOrTablet && !collapsed) {
      setCollapsed(true);
    }
  }, [isMobileOrTablet]);

  const primaryColor = appConfig.theme.primaryColor;
  const lightPrimaryColor = `${primaryColor}1a`;

  const cssVariables = {
    "--primary-color": primaryColor,
    "--light-primary-color": lightPrimaryColor,
  } as React.CSSProperties;

  const isPublicRoute = appConfig.publicRoutes.includes(pathname);

  if (!isHydrated || (!isPublicRoute && !isAuthenticated && isHydrated)) {
    if (!isPublicRoute) {
      return <NavigationSkeleton />;
    }
  }

  if (!isAuthenticated || isPublicRoute) {
    return <>{children}</>;
  }

  // Main navigation items (Lab Grown Stone, Natural Stone)
  const mainNavItems = [
    {
      key: "lab-grown",
      label: "Lab Grown Stone",
    },
    {
      key: "natural",
      label: "Natural Stone",
    },
  ];

  // Dashboard sub-navigation items
  const dashboardSubNavItems = [
    {
      key: "dashboard",
      label: "Dashboard",
    },
    {
      key: "enquiry",
      label: "Enquiry",
    },
    {
      key: "search",
      label: "Search",
    },
  ];

  // Settings sub-navigation items
  const settingsSubNavItems = [
    {
      key: "master",
      label: "Master",
    },
    {
      key: "system",
      label: "System Settings",
    },
    {
      key: "inventory",
      label: "Inventory Configuration",
    },
    {
      key: "role",
      label: "Role Permission",
    },
    {
      key: "price",
      label: "Price Settings",
    },
  ];

  const getCurrentNavItems = () => {
    if (pathname === "/settings" || pathname === "/dashboard/settings") {
      return settingsSubNavItems;
    }
    // For dashboard and all other pages, show main navigation items
    return mainNavItems;
  };

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined style={{ fontSize: "18px" }} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      key: "inventory",
      icon: <AppstoreOutlined style={{ fontSize: "18px" }} />,
      label: "Inventory",
    },
    {
      key: "transaction",
      icon: <FileTextOutlined style={{ fontSize: "18px" }} />,
      label: "Transaction",
    },
    {
      key: "client",
      icon: <TeamOutlined style={{ fontSize: "18px" }} />,
      label: "Client",
    },
    {
      key: "business-associate",
      icon: <UsergroupAddOutlined style={{ fontSize: "18px" }} />,
      label: "Business Associate",
    },
    {
      key: "api-ftp",
      icon: <ApiOutlined style={{ fontSize: "18px" }} />,
      label: "API / FTP Clients",
    },
    {
      key: "track-reports",
      icon: <BarChartOutlined style={{ fontSize: "18px" }} />,
      label: "Track Reports",
    },
    {
      key: "guests",
      icon: <UsergroupAddOutlined style={{ fontSize: "18px" }} />,
      label: "Guests",
    },
    {
      key: "settings",
      icon: <SettingOutlined style={{ fontSize: "18px" }} />,
      label: "Settings",
      href: "/settings",
    },
  ];

  const SidebarContent = ({ forDrawer = false }: { forDrawer?: boolean }) => (
    <div
      style={{
        ...cssVariables,
        height: "100vh",
        background: "#ffffff",
        borderRight: forDrawer ? "none" : "1px solid #f0f0f0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Text strong className="text-lg text-gray-800">
            {collapsed && !forDrawer ? "Diamtx" : "Diamtx"}
          </Text>
          <Button
            type="text"
            icon={
              collapsed && !forDrawer ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )
            }
            onClick={() => {
              if (isMobileOrTablet) {
                setMobileOpen(!mobileOpen);
              } else {
                setCollapsed(!collapsed);
              }
            }}
            className="text-gray-600 hover:text-blue-600"
          />
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "16px 0",
          minHeight: 0,
        }}
        className="custom-scrollbar"
      >
        {menuItems.map((item) => (
          <div key={item.key} className="px-2 mb-1">
            {item.href ? (
              <Link
                href={item.href}
                scroll={false}
                as={item.href}
                prefetch={true}
              >
                <div
                  className={`flex items-center h-10 px-4 rounded-lg cursor-pointer transition-colors ${
                    pathname === item.href
                      ? "bg-[var(--primary-color)] text-white"
                      : "text-gray-700 hover:bg-[var(--light-primary-color)] hover:text-[var(--primary-color)]"
                  }`}
                >
                  <span
                    className={`${collapsed && !forDrawer ? "mr-0" : "mr-3"}`}
                  >
                    {item.icon}
                  </span>
                  {!(collapsed && !forDrawer) && (
                    <span className="whitespace-nowrap">{item.label}</span>
                  )}
                </div>
              </Link>
            ) : (
              <div
                className={`flex items-center h-10 px-4 rounded-lg cursor-pointer transition-colors ${"text-gray-700 hover:bg-[var(--light-primary-color)] hover:text-[var(--primary-color)]"}`}
              >
                <span
                  className={`${collapsed && !forDrawer ? "mr-0" : "mr-3"}`}
                >
                  {item.icon}
                </span>
                {!(collapsed && !forDrawer) && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Logout */}
      <div
        style={{
          flexShrink: 0,
          padding: "16px",
          borderTop: "1px solid #f0f0f0",
          background: "#ffffff",
        }}
      >
        <div
          className="flex items-center p-2 rounded-lg cursor-pointer text-gray-700 hover:bg-[var(--light-primary-color)] hover:text-[var(--primary-color)] transition-colors"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          <LogoutOutlined className="text-lg" />
          {!(collapsed && !forDrawer) && (
            <span className="ml-3 whitespace-nowrap">Logout</span>
          )}
        </div>
      </div>
    </div>
  );

  const renderHeader = () => (
    <Header
      style={{
        padding: "0 16px",
        background: token.colorBgContainer,
        borderBottom: `1px solid ${token.colorBorder}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 10,
        height: 64,
        marginLeft: isDesktop ? (collapsed ? 80 : 260) : 0,
        transition: "all 0.2s",
        boxShadow: token.boxShadow,
      }}
    >
      <div className="flex items-center space-x-6">
        {/* Sub Navigation - Dashboard, Enquiry, Search or Settings Menu */}
        <div className="flex space-x-4 ml-8">
          {getCurrentNavItems().map((item) => {
            const isActive =
              pathname === "/settings" || pathname === "/dashboard/settings"
                ? searchParams.get("tab") === item.key
                : false;

            return (
              <Button
                key={item.key}
                type={isActive ? "primary" : "text"}
                style={{
                  height: "auto",
                }}
                onClick={() => {
                  if (
                    pathname === "/settings" ||
                    pathname === "/dashboard/settings"
                  ) {
                    // For Settings page, navigate with tab parameter
                    router.push(`/settings?tab=${item.key}`);
                  } else if (pathname === "/dashboard") {
                    // For Dashboard, handle dashboard sub-navigation
                    // Add your dashboard sub-navigation logic here
                  }
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* User Profile Dropdown */}
        <Dropdown
          menu={{
            items: [
              {
                key: "profile",
                icon: <UserOutlined />,
                label: "Profile",
              },
              {
                key: "logout",
                icon: <LogoutOutlined />,
                label: "Logout",
                onClick: () => {
                  logout();
                  router.push("/login");
                },
              },
            ],
          }}
          placement="bottomRight"
          arrow
        >
          <Button
            type="text"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Avatar
              size="small"
              style={{ backgroundColor: token.colorSuccess }}
            >
              {userInitial}
            </Avatar>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: "14px",
                  lineHeight: "16px",
                  fontWeight: 500,
                  color: token.colorText,
                }}
              >
                {userName}
              </div>
              {userEmail && (
                <div
                  style={{
                    fontSize: "12px",
                    lineHeight: "16px",
                    color: token.colorTextSecondary,
                  }}
                >
                  {userEmail}
                </div>
              )}
            </div>
          </Button>
        </Dropdown>
      </div>
    </Header>
  );

  const renderContent = () => (
    <div
      style={{
        marginLeft: isDesktop ? (collapsed ? 80 : 260) : 0,
        padding: isMobileOrTablet ? "8px" : "16px",
        minHeight: "calc(100vh - 200px)",
        background: "#f0f2f5",
        transition: "all 0.2s",
      }}
    >
      <div
        className="bg-white rounded-lg shadow-sm"
        style={{
          minHeight: "calc(100vh - 130px)",
          padding: isMobileOrTablet ? "12px" : "24px",
        }}
      >
        {children}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Desktop Sidebar */}
      {isDesktop && (
        <div
          style={{
            width: collapsed ? 80 : 260,
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 100,
            transition: "width 0.2s",
          }}
        >
          <SidebarContent />
        </div>
      )}

      {/* Mobile + Tablet Drawer */}
      {isMobileOrTablet && (
        <Drawer
          placement="left"
          closable={false}
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          width={260}
          styles={{ body: { padding: 0 } }}
          zIndex={1000}
        >
          <SidebarContent forDrawer={true} />
        </Drawer>
      )}

      <div>
        {renderHeader()}
        {renderContent()}
      </div>
    </div>
  );
}
