"use client";

import { Button, Card, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function BlankComponent() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Title level={3} className="mb-0">38 Results</Title>
          <Button type="primary" icon={<PlusOutlined />} className="bg-blue-600">
            + Master
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">White</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Content Card */}
      <Card className="shadow-sm">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlusOutlined className="text-2xl text-gray-400" />
          </div>
          <Title level={4} className="text-gray-500 mb-2">
            Settings Page
          </Title>
          <Text className="text-gray-400">
            This is a blank component for settings. Add your content here.
          </Text>
        </div>
      </Card>
    </div>
  );
}
