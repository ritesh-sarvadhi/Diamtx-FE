"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import BlankComponent from "@/components/BlankComponent";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <BlankComponent />
    </ProtectedRoute>
  );
}
