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
} from "@ant-design/icons";
import { Avatar, Button, Drawer, Layout, theme } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const { Header } = Layout;

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
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "8px",
            padding: "24px",
            minHeight: "calc(100vh - 112px)",
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
  const {
    token: { colorPrimary },
  } = theme.useToken();

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

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined style={{ fontSize: "18px" }} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    // ref for nested routes
    {
      key: "production",
      icon: <BuildOutlined style={{ fontSize: "18px" }} />,
      label: "Production",
      children: [
        {
          key: "tracker",
          icon: <LineChartOutlined />,
          label: "Production Tracker",
          href: "/production/tracker",
        },
      ],
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
      <div
        className={`flex items-center justify-${
          collapsed && !forDrawer ? "center" : "start"
        } bg-white border-b border-gray-100 cursor-pointer`}
        style={{
          height: "80px",
          flexShrink: 0,
          padding: collapsed && !forDrawer ? "0" : "0 16px",
        }}
      >
        <Link
          href="/dashboard"
          scroll={false}
          as={"/dashboard"}
          prefetch={true}
        >
          {collapsed && !forDrawer ? (
            <div
              className="flex items-center justify-center w-12 h-12 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${appConfig.theme.primaryColor} 0%, ${appConfig.theme.primaryColor}CC 100%)`,
              }}
            >
              <span className="text-white font-bold text-xl">I</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${appConfig.theme.primaryColor} 0%, ${appConfig.theme.primaryColor}CC 100%)`,
                }}
              >
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-800 whitespace-nowrap">
                  Isha MFG
                </span>
                <span className="text-xs text-gray-500">v2.0.0</span>
              </div>
            </div>
          )}
        </Link>
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
              <div className="mb-2">
                {!(collapsed && !forDrawer) && (
                  <div className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {item.label}
                  </div>
                )}
                {item.children?.map((child) => (
                  <Link
                    key={child.key}
                    as={child.href}
                    href={child.href}
                    prefetch={true}
                    scroll={false}
                  >
                    <div
                      className={`flex items-center h-10 px-4 rounded-lg cursor-pointer transition-colors mb-1 ${
                        pathname === child.href
                          ? "bg-[var(--primary-color)] text-white"
                          : "text-gray-700 hover:bg-[var(--light-primary-color)] hover:text-[var(--primary-color)]"
                      }`}
                    >
                      <span className="mr-3">{child.icon}</span>
                      {!(collapsed && !forDrawer) && (
                        <span className="whitespace-nowrap">{child.label}</span>
                      )}
                    </div>
                  </Link>
                ))}
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
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 10,
        height: 64,
        marginLeft: isDesktop ? (collapsed ? 80 : 260) : 0,
        transition: "all 0.2s",
        boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
      }}
    >
      <div className="flex items-center">
        <Button
          type="text"
          icon={
            isMobileOrTablet ? (
              <MenuUnfoldOutlined />
            ) : collapsed ? (
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
          style={{ width: 48, height: 48 }}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded-lg">
          <Avatar
            size={32}
            icon={<UserOutlined />}
            style={{ backgroundColor: colorPrimary }}
            src={user?.avatar}
          />
          <div className="hidden sm:block">
            <div className="text-sm font-medium">{user?.name || "User"}</div>
            <div className="text-xs text-gray-500">{user?.role || "Admin"}</div>
          </div>
        </div>
      </div>
    </Header>
  );

  const renderContent = () => (
    <div
      style={{
        marginLeft: isDesktop ? (collapsed ? 80 : 260) : 0,
        padding: isMobileOrTablet ? "8px" : "16px",
        minHeight: "calc(100vh - 64px)",
        background: "#f0f2f5",
        transition: "all 0.2s",
      }}
    >
      <div
        className="bg-white rounded-lg"
        style={{
          minHeight: "calc(100vh - 112px)",
          padding: isMobileOrTablet ? "12px" : "16px",
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
