"use client";

import { Typography, Card, Space, Button, Form, Input, Switch, Select } from "antd";
import { SaveOutlined, ReloadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function SystemSettings() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("System settings updated:", values);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Title level={1} className="text-white mb-0">System Settings</Title>
        <Space>
          <Button icon={<ReloadOutlined />}>Reset</Button>
          <Button type="primary" icon={<SaveOutlined />} className="bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        </Space>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label={<span className="text-white">Application Name</span>}
              name="appName"
              initialValue="Diamtx"
            >
              <Input className="bg-gray-700 border-gray-600 text-white" />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Version</span>}
              name="version"
              initialValue="2.0.0"
            >
              <Input className="bg-gray-700 border-gray-600 text-white" />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Maintenance Mode</span>}
              name="maintenanceMode"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Debug Mode</span>}
              name="debugMode"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Default Language</span>}
              name="language"
              initialValue="en"
            >
              <Select className="bg-gray-700">
                <Select.Option value="en">English</Select.Option>
                <Select.Option value="es">Spanish</Select.Option>
                <Select.Option value="fr">French</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Timezone</span>}
              name="timezone"
              initialValue="UTC"
            >
              <Select className="bg-gray-700">
                <Select.Option value="UTC">UTC</Select.Option>
                <Select.Option value="EST">Eastern Time</Select.Option>
                <Select.Option value="PST">Pacific Time</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            label={<span className="text-white">System Description</span>}
            name="description"
            initialValue="Diamond trading and management system"
          >
            <Input.TextArea 
              rows={4} 
              className="bg-gray-700 border-gray-600 text-white"
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
