"use client";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ApiService from "@/services/ApiService";

interface LoginFormData {
  name: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  statusCode: number;
  data?: {
    token?: string;
    userDetails?: {
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
    };
  };
  message?: string;
}

export default function LoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  // const handleLogin = async (values: LoginFormData) => {
  //   setLoading(true);
  //   setErrorMessage("");

  //   try {
  //     const result: LoginResponse = await ApiService.login({
  //       name: values.name,
  //       password: values.password,
  //     });

  //     console.log("Login response:", result);

  //     if (result.success && result.statusCode === 200) {
  //       // Save token and userDetails to localStorage
  //       if (result.data?.token) {
  //         localStorage.setItem("authToken", result.data.token);
  //         console.log("Token saved to localStorage");
  //       }
  //       if (result.data?.userDetails) {
  //         localStorage.setItem(
  //           "userDetails",
  //           JSON.stringify(result.data.userDetails)
  //         );
  //         console.log("UserDetails saved to localStorage");
  //       }

  //       message.success(result.message || "Login successful!");

  //       window.location.href = "/dashboard";
  //       // Use window.location.href for more reliable redirect
  //       setTimeout(() => {
  //         console.log("Redirecting to dashboard...");
  //       }, 500);
  //     } else {
  //       const errorMsg =
  //         result.message || "Login failed. Please check your credentials.";
  //       setErrorMessage(errorMsg);
  //       message.error(errorMsg);
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     const errorMsg =
  //       "Network error. Please check your connection and try again.";
  //     setErrorMessage(errorMsg);
  //     message.error(errorMsg);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleLogin = async (values: LoginFormData) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const result: LoginResponse = await ApiService.login({
        name: values.name,
        password: values.password,
      });

      console.log("Login response:", result);

      if (result.success && result.data?.token) {
        if (typeof window !== "undefined") {
          try {
            // Store both token and user details
            localStorage.setItem("authToken", result.data.token);
            localStorage.setItem(
              "userDetails",
              JSON.stringify(result.data.userDetails)
            );

            console.log("✅ Token & UserDetails saved to localStorage");
            console.log("authToken:", localStorage.getItem("authToken"));
            console.log("userDetails:", localStorage.getItem("userDetails"));
          } catch (e) {
            console.error("❌ Error saving to localStorage:", e);
          }
        }

        // message.success(result.message || "Login successful!");

        // Redirect after short delay
        setTimeout(() => {
          if (typeof window !== "undefined") {
            const token = localStorage.getItem("authToken");
            if (token) {
              router.push("/dashboard");
            } else {
              message.error("Token not found — please login again.");
            }
          }
        }, 500);
      } else {
        const errorMsg =
          result.message || "Login failed. Please check your credentials.";
        setErrorMessage(errorMsg);
        message.error(errorMsg);
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg =
        "Network error. Please check your connection and try again.";
      setErrorMessage(errorMsg);
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email and password to access the dashboard
            </p>
          </div>

          <Form
            form={form}
            onFinish={handleLogin}
            layout="vertical"
            requiredMark={false}
            className="space-y-6"
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please input your name!" },
                // { type: "email", message: "Please enter a valid email address!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter your name"
                size="large"
                autoComplete="username"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
                // { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter your password"
                size="large"
                autoComplete="current-password"
                className="rounded-lg"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            {errorMessage && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                {errorMessage}
              </div>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                block
                className="h-12 text-lg font-semibold rounded-lg"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Contact administrator
              </a>
            </p>
          </div>

          {/* Debug section - remove in production */}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Debug Info:</h3>
            <div className="text-xs space-y-1">
              <div>
                Token:{" "}
                {typeof window !== "undefined"
                  ? localStorage.getItem("authToken")
                    ? "✓"
                    : "✗"
                  : "N/A"}
              </div>
              <div>
                UserDetails:{" "}
                {typeof window !== "undefined"
                  ? localStorage.getItem("userDetails")
                    ? "✓"
                    : "✗"
                  : "N/A"}
              </div>
            </div>
            <Button
              size="small"
              onClick={() => {
                console.log("Current localStorage:", {
                  token: localStorage.getItem("authToken"),
                  userDetails: localStorage.getItem("userDetails"),
                });
                window.location.href = "/dashboard";
              }}
              className="mt-2"
            >
              Test Dashboard Redirect
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
