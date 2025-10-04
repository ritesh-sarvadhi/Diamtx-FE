"use client";

import { useState } from "react";
import { Card, Button, Input, Table, Space, Tag, Checkbox, Avatar, Typography } from "antd";
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined,
  UploadOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function MasterSection() {
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srNo",
      key: "srNo",
      sorter: (a: any, b: any) => a.srNo - b.srNo,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: () => <Avatar icon={<UploadOutlined />} />,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      sorter: (a: any, b: any) => a.code.localeCompare(b.code),
    },
    {
      title: "Sequence",
      dataIndex: "sequence",
      key: "sequence",
      sorter: (a: any, b: any) => a.sequence - b.sequence,
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      sorter: (a: any, b: any) => a.active - b.active,
      render: (active: boolean) => <Checkbox checked={active} />,
    },
    {
      title: "Display",
      dataIndex: "display",
      key: "display",
      sorter: (a: any, b: any) => a.display - b.display,
      render: (display: boolean) => <Checkbox checked={display} />,
    },
    {
      title: "Default",
      dataIndex: "default",
      key: "default",
      sorter: (a: any, b: any) => a.default - b.default,
      render: (defaultVal: boolean) => <Checkbox checked={defaultVal} />,
    },
    {
      title: "Like Keywords",
      dataIndex: "keywords",
      key: "keywords",
      sorter: (a: any, b: any) => a.keywords.localeCompare(b.keywords),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} className="text-blue-500" />
          <Button type="text" icon={<DeleteOutlined />} className="text-red-500" />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      srNo: 1,
      name: "E",
      code: "E",
      sequence: 1,
      active: true,
      display: true,
      default: false,
      keywords: "E,e",
    },
    {
      key: "2",
      srNo: 2,
      name: "F",
      code: "F",
      sequence: 2,
      active: true,
      display: true,
      default: false,
      keywords: "F",
    },
    {
      key: "3",
      srNo: 3,
      name: "G",
      code: "G",
      sequence: 3,
      active: true,
      display: true,
      default: false,
      keywords: "G",
    },
    {
      key: "4",
      srNo: 4,
      name: "H",
      code: "H",
      sequence: 4,
      active: true,
      display: true,
      default: false,
      keywords: "H,H-,WHITE (H)",
    },
    {
      key: "5",
      srNo: 5,
      name: "I",
      code: "I",
      sequence: 5,
      active: true,
      display: true,
      default: false,
      keywords: "I",
    },
    {
      key: "6",
      srNo: 6,
      name: "J",
      code: "J",
      sequence: 6,
      active: true,
      display: true,
      default: false,
      keywords: "J",
    },
    {
      key: "7",
      srNo: 7,
      name: "K",
      code: "K",
      sequence: 7,
      active: true,
      display: true,
      default: false,
      keywords: "K",
    },
    {
      key: "8",
      srNo: 8,
      name: "D",
      code: "D",
      sequence: 8,
      active: true,
      display: false,
      default: false,
      keywords: "D,D*,d",
    },
    {
      key: "9",
      srNo: 9,
      name: "L",
      code: "L",
      sequence: 9,
      active: true,
      display: true,
      default: false,
      keywords: "L",
    },
    {
      key: "10",
      srNo: 10,
      name: "M",
      code: "M",
      sequence: 10,
      active: true,
      display: true,
      default: false,
      keywords: "M",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Title level={3} className="mb-0 text-white">38 Results</Title>
          <Button type="primary" icon={<PlusOutlined />} className="bg-blue-600 hover:bg-blue-700">
            + Master
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-white">White</span>
            <Tag color="green">Active</Tag>
          </div>
          <Button type="primary" icon={<PlusOutlined />} className="bg-blue-600 hover:bg-blue-700">
            + Sub Master
          </Button>
        </div>
      </div>

      {/* Search Section */}
      <div className="flex items-center space-x-4">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-64"
        />
      </div>

      {/* Table */}
      <Card className="bg-gray-800 border-gray-700">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 50,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          className="bg-gray-800"
          rowClassName="bg-gray-800 hover:bg-gray-700"
        />
      </Card>
    </div>
  );
}
