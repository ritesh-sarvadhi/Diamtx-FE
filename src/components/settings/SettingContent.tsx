"use client";

import { 
  Card, 
  Typography, 
  Tag, 
  Input, 
  Button, 
  Table, 
  Checkbox, 
  Space,
  Pagination,
  Image,
  theme
} from "antd";
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  HolderOutlined
} from "@ant-design/icons";
import { getSettingsData, getSectionTitle, SettingItem } from "./data/settingsData";

const { Title, Text } = Typography;

interface SettingContentProps {
  sectionKey: string;
}

export default function SettingContent({ sectionKey }: SettingContentProps) {
  const { token } = theme.useToken();
  const data = getSettingsData(sectionKey);
  const sectionTitle = getSectionTitle(sectionKey);

  const columns = [
    {
      title: "",
      dataIndex: "drag",
      key: "drag",
      width: 40,
      render: () => <HolderOutlined style={{ color: "#bfbfbf" }} />,
    },
    {
      title: "Sr No",
      dataIndex: "sequence",
      key: "sequence",
      width: 80,
      sorter: (a: SettingItem, b: SettingItem) => a.sequence - b.sequence,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
      sorter: (a: SettingItem, b: SettingItem) => a.name.localeCompare(b.name),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 80,
      render: () => (
        <Image 
          src="/ListImage_placeholder.png" 
          alt="item image"
          width={32}
          height={32}
          style={{ 
            objectFit: "cover", 
            borderRadius: 4,
            background: "#f0f0f0"
          }}
          fallback="/ListImage_placeholder.png"
        />
      ),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: 100,
      sorter: (a: SettingItem, b: SettingItem) => a.code.localeCompare(b.code),
    },
    {
      title: "Sequence",
      dataIndex: "sequence",
      key: "sequence",
      width: 100,
      sorter: (a: SettingItem, b: SettingItem) => a.sequence - b.sequence,
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      width: 80,
      render: (checked: boolean) => <Checkbox checked={checked} />,
    },
    {
      title: "Display",
      dataIndex: "display",
      key: "display",
      width: 80,
      render: (checked: boolean) => <Checkbox checked={checked} />,
    },
    {
      title: "Default",
      dataIndex: "default",
      key: "default",
      width: 80,
      render: (checked: boolean) => <Checkbox checked={checked} />,
    },
    {
      title: "Like Keywords",
      dataIndex: "likeKeywords",
      key: "likeKeywords",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: () => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            size="small"
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            size="small"
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <Card 
      style={{ 
        height: "100%", 
        borderRadius: token.borderRadius,
        boxShadow: token.boxShadow,
        border: `1px solid ${token.colorBorder}`
      }}
      bodyStyle={{ padding: 0, height: "100%" }}
    >
      {/* Header */}
      <div style={{ 
        padding: "16px 24px", 
        borderBottom: `1px solid ${token.colorBorder}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Title level={3} style={{ margin: 0 }}>
            {sectionTitle}
          </Title>
          <Tag color="green">Active</Tag>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Button type="primary" icon={<PlusOutlined />}>
            + Sub Master
          </Button>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: 1000 }}
          size="small"
        />
      </div>

      {/* Pagination */}
      <div style={{ 
        padding: "16px 24px", 
        borderTop: `1px solid ${token.colorBorder}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <Pagination
          current={1}
          total={14}
          pageSize={50}
          showSizeChanger
          showQuickJumper={false}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        />
      </div>
    </Card>
  );
}
