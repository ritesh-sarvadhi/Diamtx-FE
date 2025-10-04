"use client";

import { Typography, Card, Space, Button, Table, Tag, Switch, Modal, Form, Input, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Text } = Typography;

export default function RolePermission() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => <span className="text-gray-300">{text}</span>,
    },
    {
      title: "Users",
      dataIndex: "userCount",
      key: "userCount",
      render: (count: number) => <Tag color="blue">{count} users</Tag>,
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
      render: (record: any) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            className="text-blue-500"
            onClick={() => handleEdit(record)}
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            className="text-red-500"
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "Super Admin",
      description: "Full system access",
      userCount: 2,
      active: true,
    },
    {
      key: "2",
      name: "Admin",
      description: "Administrative access",
      userCount: 5,
      active: true,
    },
    {
      key: "3",
      name: "Manager",
      description: "Management level access",
      userCount: 8,
      active: true,
    },
    {
      key: "4",
      name: "Sales",
      description: "Sales team access",
      userCount: 15,
      active: true,
    },
    {
      key: "5",
      name: "Viewer",
      description: "Read-only access",
      userCount: 3,
      active: false,
    },
  ];

  const handleEdit = (record: any) => {
    setEditingRole(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: any) => {
    console.log("Delete role:", record);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      console.log("Role updated:", values);
      setIsModalVisible(false);
      setEditingRole(null);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingRole(null);
    form.resetFields();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Title level={1} className="text-white mb-0">Role Permission</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsModalVisible(true)}
        >
          Add Role
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} roles`,
          }}
          className="bg-gray-800"
          rowClassName="bg-gray-800 hover:bg-gray-700"
        />
      </Card>

      <Modal
        title={editingRole ? "Edit Role" : "Add New Role"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        className="dark-modal"
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            label="Role Name"
            name="name"
            rules={[{ required: true, message: "Please input role name!" }]}
          >
            <Input className="bg-gray-700 border-gray-600 text-white" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input.TextArea 
              rows={3} 
              className="bg-gray-700 border-gray-600 text-white"
            />
          </Form.Item>

          <Form.Item
            label="Permissions"
            name="permissions"
            initialValue={[]}
          >
            <Select
              mode="multiple"
              placeholder="Select permissions"
              className="bg-gray-700"
            >
              <Select.Option value="read">Read</Select.Option>
              <Select.Option value="write">Write</Select.Option>
              <Select.Option value="delete">Delete</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="active"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch className="bg-blue-600" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
