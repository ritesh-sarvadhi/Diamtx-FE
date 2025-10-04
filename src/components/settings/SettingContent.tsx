"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
  theme,
  Alert,
  Empty,
  Image,
  message,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  apiFetchSubMasters,
  apiUpdateMasterStatus,
  MasterRecord,
} from "@/services/ProjectService";

const { Title } = Typography;
const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
const PLACEHOLDER_IMAGE = "/ListImage_placeholder.png";

type SubMasterRow = MasterRecord & { rowNo?: number };

interface SettingContentProps {
  master: MasterRecord | null;
}

export default function SettingContent({ master }: SettingContentProps) {
  const { token } = theme.useToken();
  const [subMasters, setSubMasters] = useState<MasterRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [updatingFieldKey, setUpdatingFieldKey] = useState<string | null>(null);

  useEffect(() => {
    if (!master?.id) {
      setSubMasters([]);
      setSearchTerm("");
      setCurrentPage(1);
      return;
    }

    let ignore = false;

    const fetchSubMasters = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiFetchSubMasters(master.id);
        if (!ignore) {
          setSubMasters(response.data.data || []);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to load sub masters", err);
          setError("Unable to load sub master list");
          setSubMasters([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchSubMasters();
    setSearchTerm("");
    setCurrentPage(1);

    return () => {
      ignore = true;
    };
  }, [master?.id]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return subMasters;
    }

    const term = searchTerm.toLowerCase();
    return subMasters.filter((item) => {
      const name = item.name?.toLowerCase() || "";
      const code = item.code?.toLowerCase() || "";
      const keyword = (item.likeKeyword || "").toLowerCase();
      return (
        name.includes(term) || code.includes(term) || keyword.includes(term)
      );
    });
  }, [subMasters, searchTerm]);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredData.length / pageSize) || 1);
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [filteredData.length, pageSize, currentPage]);

  const paginatedData: SubMasterRow[] = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData
      .slice(startIndex, startIndex + pageSize)
      .map((item, index) => ({
        ...item,
        rowNo: startIndex + index + 1,
      }));
  }, [filteredData, currentPage, pageSize]);

  const handleStatusChange = useCallback(
    async (
      record: SubMasterRow,
      field: "isActive" | "isWebDisplay" | "isDefault",
      value: boolean
    ) => {
      if (!record.id) {
        return;
      }

      const updateKey = `${record.id}-${field}`;
      setUpdatingFieldKey(updateKey);

      try {
        const payload = {
          isActive: field === "isActive" ? value : Boolean(record.isActive),
          isWebDisplay:
            field === "isWebDisplay" ? value : Boolean(record.isWebDisplay),
          isDefault: field === "isDefault" ? value : Boolean(record.isDefault),
        } as const;

        const response = await apiUpdateMasterStatus(record.id, payload);
        const updated = response.data.data;

        setSubMasters((prev) =>
          prev.map((item) =>
            item.id === updated.id ? { ...item, ...updated } : item
          )
        );

        message.success("Status updated successfully");
      } catch (err) {
        console.error("Failed to update master status", err);
        message.error("Failed to update status");
      } finally {
        setUpdatingFieldKey(null);
      }
    },
    [setSubMasters, setUpdatingFieldKey]
  );

  const isUpdating = useCallback(
    (recordId: string, field: "isActive" | "isWebDisplay" | "isDefault") =>
      updatingFieldKey === `${recordId}-${field}`,
    [updatingFieldKey]
  );

  const columns: ColumnsType<SubMasterRow> = useMemo(
    () => [
      {
        title: "Sr No",
        dataIndex: "rowNo",
        key: "rowNo",
        width: 90,
        sorter: (a, b) => (a.rowNo ?? 0) - (b.rowNo ?? 0),
        render: (value: number | null) => value ?? "-",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 160,
        sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        width: 120,
        render: (_value, record) => (
          <Image
            src={record.image || PLACEHOLDER_IMAGE}
            alt={record.name || "sub master"}
            width={40}
            height={40}
            style={{
              objectFit: "cover",
              borderRadius: 8,
              backgroundColor: "#f5f5f5",
            }}
            fallback={PLACEHOLDER_IMAGE}
            preview={false}
          />
        ),
      },
      {
        title: "Code",
        dataIndex: "code",
        key: "code",
        width: 140,
        sorter: (a, b) => (a.code || "").localeCompare(b.code || ""),
      },
      {
        title: "Sequence",
        dataIndex: "sequence",
        key: "sequence",
        width: 90,
        sorter: (a, b) => (a.sequence ?? 0) - (b.sequence ?? 0),
        render: (value: number | null) => value ?? "-",
      },
      {
        title: "Active",
        dataIndex: "isActive",
        key: "isActive",
        width: 90,
        render: (_value, record) => (
          <Checkbox
            checked={record.isActive}
            disabled={loading || isUpdating(record.id, "isActive")}
            onChange={(event) =>
              handleStatusChange(record, "isActive", event.target.checked)
            }
          />
        ),
      },
      {
        title: "Display",
        dataIndex: "isWebDisplay",
        key: "isWebDisplay",
        width: 90,
        render: (_value, record) => (
          <Checkbox
            checked={record.isWebDisplay ?? false}
            disabled={loading || isUpdating(record.id, "isWebDisplay")}
            onChange={(event) =>
              handleStatusChange(record, "isWebDisplay", event.target.checked)
            }
          />
        ),
      },
      {
        title: "Default",
        dataIndex: "isDefault",
        key: "isDefault",
        width: 90,
        render: (_value, record) => (
          <Checkbox
            checked={record.isDefault}
            disabled={loading || isUpdating(record.id, "isDefault")}
            onChange={(event) =>
              handleStatusChange(record, "isDefault", event.target.checked)
            }
          />
        ),
      },
      {
        title: "Like Keyword",
        dataIndex: "likeKeyword",
        key: "likeKeyword",
        width: 200,
        render: (value: string | null) => value || "-",
      },
      {
        title: "Actions",
        key: "actions",
        width: 120,
        render: () => (
          <Space>
            <Button type="text" icon={<EditOutlined />} size="small" />
            <Button type="text" icon={<DeleteOutlined />} size="small" danger />
          </Space>
        ),
      },
    ],
    [loading, handleStatusChange, isUpdating]
  );

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size && size !== pageSize) {
      setPageSize(size);
    }
  };

  const handlePageSizeChange = (_: number, size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const totalItems = filteredData.length;
  const pageStart = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
  const pageEnd = totalItems
    ? Math.min(pageStart + pageSize - 1, totalItems)
    : 0;

  const emptyState = master ? (
    <Empty description="No sub masters found" />
  ) : (
    <Empty description="Select a master to view sub masters" />
  );

  return (
    <Card
      style={{
        height: "100%",
        borderRadius: token.borderRadius,
        // boxShadow: token.boxShadow,
        border: `1px solid ${token.colorBorder}`,
      }}
      bodyStyle={{ padding: 0, height: "100%", overflow: "hidden" }}
    >
      <div
        style={{
          padding: "16px 24px",
          borderBottom: `1px solid ${token.colorBorder}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Title level={3} style={{ margin: 0 }}>
            {master?.name || "Select a Master"}
          </Title>
          {master && (
            <Tag color={master.isActive ? "green" : "default"}>
              {master.isActive ? "Active" : "Inactive"}
            </Tag>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            disabled={!master}
            allowClear
          />
          <Button type="primary" icon={<PlusOutlined />} disabled={!master}>
            + Sub Master
          </Button>
        </div>
      </div>

      <div
        style={{ flex: 1, overflow: "auto", padding: "0 24px", height: "100%" }}
      >
        {error && (
          <div style={{ margin: "16px 0" }}>
            <Alert
              type="error"
              message={error}
              showIcon
              closable
              onClose={() => setError(null)}
            />
          </div>
        )}
        <Table
          columns={columns}
          dataSource={paginatedData}
          rowKey={(record) => record.id}
          pagination={false}
          size="small"
          loading={loading}
          locale={{ emptyText: emptyState }}
        />
      </div>

      <div
        style={{
          padding: "16px 24px",
          borderTop: `1px solid ${token.colorBorder}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Text>
          {totalItems
            ? `${pageStart}-${pageEnd} of ${totalItems} items`
            : "No items"}
        </Typography.Text>
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          showSizeChanger
          pageSizeOptions={PAGE_SIZE_OPTIONS.map(String)}
          showQuickJumper={false}
          onChange={handlePageChange}
          onShowSizeChange={handlePageSizeChange}
          disabled={!master || !totalItems}
        />
      </div>
    </Card>
  );
}
