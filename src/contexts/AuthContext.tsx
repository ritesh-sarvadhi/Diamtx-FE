// "use client";

// import { appConfig } from "@/config/app.config";
// import { apiAdminLogin } from "@/services/ProjectService";
// import { useAppSelector } from "@/store/hooks";
// import { useAppDispatch } from "@/store/store";

// import {
//   initializeAuth,
//   login as loginAction,
//   logout as logoutAction,
//   MasterData,
// } from "@/store/userSlice";
// import { redirect, usePathname } from "next/navigation";
// import React, { createContext, useContext, useEffect, useState } from "react";

// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   role: string;
//   avatar?: string;
//   token?: string;
//   key?: string;
//   is_subscribed?: boolean;
//   masters?: MasterData[];
// }

// export interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   updateUser: (userData: Partial<User>) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const dispatch = useAppDispatch();
//   const user = useAppSelector((state) => state.user.userInfo);
//   const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
//   const [isLoading, setIsLoading] = useState(true);
//   const pathname = usePathname();

//   // Initialize auth state from Redux
//   useEffect(() => {
//     dispatch(initializeAuth());
//     setIsLoading(false);
//   }, [dispatch]);

//   // Handle route protection and redirects
//   useEffect(() => {
//     if (isLoading) return;

//     const isPublicRoute = appConfig.publicRoutes.includes(pathname);
//     const isPrivateRoute = appConfig.privateRoutes.includes(pathname);

//     // Save current location for redirect after login
//     if (appConfig.location.enableLocationTracking && !isPublicRoute) {
//       localStorage.setItem(appConfig.location.locationStorageKey, pathname);
//     }

//     // Root path "/" logic
//     if (pathname === "/") {
//       if (isAuthenticated) {
//         console.log("Authenticated, redirecting to dashboard");

//         redirect(appConfig.routes.authenticatedEntryPath);
//       } else {
//         console.log("Authenticated, redirecting to login");
//         redirect(appConfig.routes.unauthenticatedEntryPath);
//       }
//     }

//     // Private route logic
//     if (!isAuthenticated && isPrivateRoute) {
//       console.log("Authenticated, redirecting to login");
//       redirect(appConfig.routes.unauthenticatedEntryPath);
//     } else if (
//       isAuthenticated &&
//       pathname === appConfig.routes.unauthenticatedEntryPath
//     ) {
//       console.log("Authenticated, redirecting to dashboard");
//       const savedRoute = localStorage.getItem(
//         appConfig.location.locationStorageKey
//       );
//       const redirectTo =
//         savedRoute && appConfig.privateRoutes.includes(savedRoute)
//           ? savedRoute
//           : appConfig.routes.authenticatedEntryPath;
//       redirect(redirectTo);
//     }
//   }, [isAuthenticated, pathname, isLoading]);

//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       const response = await apiAdminLogin<
//         any,
//         { email: string; password: string }
//       >({
//         email,
//         password,
//       });

//       if (response.data.status === 200) {
//         const userData = response.data.data;

//         const user: User = {
//           id: userData.id,
//           email: userData.email,
//           name: userData.name,
//           role: userData.roleData.code,
//           token: userData.token,
//           key: userData.key,
//           masters: userData.master,
//         };

//         // Dispatch the login action with the user data
//         dispatch(loginAction(userData));

//         // Store additional data in localStorage if needed by other parts of the app
//         localStorage.setItem(appConfig.auth.tokenKey, userData.token);
//         localStorage.setItem(appConfig.auth.userKey, JSON.stringify(user));

//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error("Login error:", error);
//       return false;
//     }
//   };

//   const logout = () => {
//     // Dispatch the logout action
//     dispatch(logoutAction());

//     // Clear any app-specific localStorage items
//     localStorage.removeItem(appConfig.auth.tokenKey);
//     localStorage.removeItem(appConfig.auth.userKey);

//     // Redirect to login page
//     redirect(appConfig.routes.unauthenticatedEntryPath);
//   };

//   const updateUser = (userData: Partial<User>) => {
//     if (!user) return;

//     // For this simple implementation, we'll just update the local state
//     // In a real app, you might want to update the Redux store as well
//     const updatedUser = { ...user, ...userData };
//     localStorage.setItem(appConfig.auth.userKey, JSON.stringify(updatedUser));
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         isLoading,
//         login,
//         logout,
//         updateUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }

"use client";

import { appConfig } from "@/config/app.config";
import { apiAdminLogin } from "@/services/ProjectService";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  initializeAuth,
  login as loginAction,
  logout as logoutAction,
  MasterData,
} from "@/store/userSlice";
import { redirect, usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  token?: string;
  key?: string;
  is_subscribed?: boolean;
  masters?: MasterData[];
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userInfo);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const [isLoading, setIsLoading] = useState(true); // True until auth is initialized
  const pathname = usePathname();

  // Initialize auth state from Redux
  useEffect(() => {
    dispatch(initializeAuth());
    setIsLoading(false); // Auth state is initialized
  }, [dispatch]);

  // Handle route protection and redirects
  useEffect(() => {
    if (isLoading) return; // 🔹 Wait until auth state is loaded

    const isPublicRoute = appConfig.publicRoutes.includes(pathname);
    const isPrivateRoute = appConfig.privateRoutes.includes(pathname);

    // Save current location for redirect after login
    if (appConfig.location.enableLocationTracking && !isPublicRoute) {
      localStorage.setItem(appConfig.location.locationStorageKey, pathname);
    }

    // Root path "/" logic
    if (pathname === "/") {
      if (isAuthenticated) {
        redirect(appConfig.routes.authenticatedEntryPath);
      } else {
        redirect(appConfig.routes.unauthenticatedEntryPath);
      }
      return; // Stop further redirects
    }

    // Private route protection
    if (!isAuthenticated && isPrivateRoute) {
      redirect(appConfig.routes.unauthenticatedEntryPath);
      return;
    }

    // Redirect logged-in user away from login/register pages
    if (isAuthenticated && appConfig.publicRoutes.includes(pathname)) {
      const savedRoute = localStorage.getItem(
        appConfig.location.locationStorageKey
      );
      const redirectTo =
        savedRoute && appConfig.privateRoutes.includes(savedRoute)
          ? savedRoute
          : appConfig.routes.authenticatedEntryPath;
      redirect(redirectTo);
      return;
    }
  }, [isAuthenticated, pathname, isLoading]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiAdminLogin<
        any,
        { email: string; password: string }
      >({
        email,
        password,
      });

      if (response.data.status === 200) {
        const userData = response.data.data;

        const user: User = {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          role: userData.roleData.code,
          token: userData.token,
          key: userData.key,
          masters: userData.master,
        };

        // Update Redux state
        dispatch(loginAction(userData));

        // Save to localStorage for persistence
        localStorage.setItem(appConfig.auth.tokenKey, userData.token);
        localStorage.setItem(appConfig.auth.userKey, JSON.stringify(user));

        // ✅ DO NOT manually redirect here; AuthProvider effect will handle it
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem(appConfig.auth.tokenKey);
    localStorage.removeItem(appConfig.auth.userKey);

    redirect(appConfig.routes.unauthenticatedEntryPath);
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...userData };
    localStorage.setItem(appConfig.auth.userKey, JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
