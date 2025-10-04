"use client";

import { Typography, Card, Space, Button, Form, Input, Switch, Select, InputNumber, Table, Tag } from "antd";
import { SaveOutlined, ReloadOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Text } = Typography;

export default function PriceSettings() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Price settings updated:", values);
  };

  const priceColumns = [
    {
      title: "Price Type",
      dataIndex: "type",
      key: "type",
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: "Base Price",
      dataIndex: "basePrice",
      key: "basePrice",
      render: (price: number) => <span className="text-white">${price}</span>,
    },
    {
      title: "Markup %",
      dataIndex: "markup",
      key: "markup",
      render: (markup: number) => <Tag color="green">{markup}%</Tag>,
    },
    {
      title: "Final Price",
      dataIndex: "finalPrice",
      key: "finalPrice",
      render: (price: number) => <span className="text-white font-semibold">${price}</span>,
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (active: boolean) => (
        <Switch checked={active} className="bg-blue-600" />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} className="text-blue-500" />
          <Button type="text" icon={<DeleteOutlined />} className="text-red-500" />
        </Space>
      ),
    },
  ];

  const priceData = [
    {
      key: "1",
      type: "Retail Price",
      basePrice: 1000,
      markup: 50,
      finalPrice: 1500,
      active: true,
    },
    {
      key: "2",
      type: "Wholesale Price",
      basePrice: 1000,
      markup: 25,
      finalPrice: 1250,
      active: true,
    },
    {
      key: "3",
      type: "Bulk Price",
      basePrice: 1000,
      markup: 10,
      finalPrice: 1100,
      active: true,
    },
    {
      key: "4",
      type: "Special Price",
      basePrice: 1000,
      markup: 75,
      finalPrice: 1750,
      active: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Title level={1} className="text-white mb-0">Price Settings</Title>
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
              label={<span className="text-white">Default Currency</span>}
              name="currency"
              initialValue="USD"
            >
              <Select className="bg-gray-700">
                <Select.Option value="USD">USD ($)</Select.Option>
                <Select.Option value="EUR">EUR (€)</Select.Option>
                <Select.Option value="GBP">GBP (£)</Select.Option>
                <Select.Option value="INR">INR (₹)</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Tax Rate (%)</span>}
              name="taxRate"
              initialValue={8.5}
            >
              <InputNumber 
                min={0} 
                max={100} 
                step={0.1}
                className="w-full bg-gray-700 border-gray-600 text-white"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Auto Price Update</span>}
              name="autoPriceUpdate"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Price Rounding</span>}
              name="priceRounding"
              initialValue="nearest"
            >
              <Select className="bg-gray-700">
                <Select.Option value="nearest">Nearest Dollar</Select.Option>
                <Select.Option value="up">Round Up</Select.Option>
                <Select.Option value="down">Round Down</Select.Option>
                <Select.Option value="none">No Rounding</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Minimum Markup (%)</span>}
              name="minMarkup"
              initialValue={10}
            >
              <InputNumber 
                min={0} 
                max={100} 
                step={1}
                className="w-full bg-gray-700 border-gray-600 text-white"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Maximum Markup (%)</span>}
              name="maxMarkup"
              initialValue={100}
            >
              <InputNumber 
                min={0} 
                max={500} 
                step={1}
                className="w-full bg-gray-700 border-gray-600 text-white"
              />
            </Form.Item>
          </div>

          <Form.Item
            label={<span className="text-white">Price Notes</span>}
            name="priceNotes"
            initialValue="Configure your pricing rules and policies here"
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
          <Title level={4} className="text-white mb-0">Price Types</Title>
          <Button type="primary" icon={<PlusOutlined />} className="bg-blue-600 hover:bg-blue-700">
            Add Price Type
          </Button>
        </div>
        
        <Table
          columns={priceColumns}
          dataSource={priceData}
          pagination={false}
          className="bg-gray-800"
          rowClassName="bg-gray-800 hover:bg-gray-700"
        />
      </Card>
    </div>
  );
}
