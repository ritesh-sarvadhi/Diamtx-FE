"use client";

import { Typography, Card, Space, Button, Form, Input, Switch, Select, InputNumber } from "antd";
import { SaveOutlined, ReloadOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function InventoryConfig() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Inventory configuration updated:", values);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Title level={1} className="text-white mb-0">Inventory Configuration</Title>
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
              label={<span className="text-white">Auto Stock Update</span>}
              name="autoStockUpdate"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Low Stock Alert</span>}
              name="lowStockAlert"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Low Stock Threshold</span>}
              name="lowStockThreshold"
              initialValue={10}
            >
              <InputNumber 
                min={0} 
                className="w-full bg-gray-700 border-gray-600 text-white"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Default Category</span>}
              name="defaultCategory"
              initialValue="diamonds"
            >
              <Select className="bg-gray-700">
                <Select.Option value="diamonds">Diamonds</Select.Option>
                <Select.Option value="jewelry">Jewelry</Select.Option>
                <Select.Option value="accessories">Accessories</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Barcode Prefix</span>}
              name="barcodePrefix"
              initialValue="DM"
            >
              <Input className="bg-gray-700 border-gray-600 text-white" />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Serial Number Format</span>}
              name="serialFormat"
              initialValue="YYYY-XXXX"
            >
              <Input className="bg-gray-700 border-gray-600 text-white" />
            </Form.Item>
          </div>

          <Form.Item
            label={<span className="text-white">Inventory Notes</span>}
            name="notes"
            initialValue="Configure your inventory management settings here"
          >
            <Input.TextArea 
              rows={4} 
              className="bg-gray-700 border-gray-600 text-white"
            />
          </Form.Item>
        </Form>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <Title level={4} className="text-white mb-0">Inventory Categories</Title>
          <Button type="primary" icon={<PlusOutlined />} className="bg-blue-600 hover:bg-blue-700">
            Add Category
          </Button>
        </div>
        <Text className="text-gray-300">
          Manage your inventory categories and subcategories here.
        </Text>
      </Card>
    </div>
  );
}
