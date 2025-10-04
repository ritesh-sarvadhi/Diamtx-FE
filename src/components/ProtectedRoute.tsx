"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const userDetails = localStorage.getItem("userDetails");

      console.log("ProtectedRoute - Token:", token ? "exists" : "missing");
      console.log("ProtectedRoute - UserDetails:", userDetails ? "exists" : "missing");

      if (!token || !userDetails) {
        console.log("ProtectedRoute - Missing auth data, redirecting to login");
        // Use window.location.href for more reliable redirect
        window.location.href = "/login";
        return;
      }

      console.log("ProtectedRoute - Authentication successful, rendering protected content");
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    // Add a small delay to ensure localStorage is available
    setTimeout(checkAuth, 100);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}