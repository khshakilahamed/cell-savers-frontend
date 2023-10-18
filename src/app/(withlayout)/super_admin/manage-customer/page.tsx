"use client";

import CSTable from "@/components/ui/Table/CSTable";
import { useCustomersQuery } from "@/redux/api/customerApi";
import { Button, Divider, Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { getUserInfo } from "@/services/auth.service";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import { useDebounced } from "@/redux/hook";

const ManageCustomerPage = () => {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useCustomersQuery({ ...query });

  const customers = data?.customers;
  const meta = data?.meta;

  console.log(customers);

  const columns = [
    {
      title: "Name",
      // dataIndex: "firstName",
      render: function (data: any) {
        return (
          <>
            {data?.firstName} {data?.lastName}
          </>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
    },
    {
      title: "present Address",
      dataIndex: "presentAddress",
    },
    {
      title: "Permanent Address",
      dataIndex: "presentAddress",
    },

    {
      title: "Action",
      render: function (data: any) {
        return (
          <div className="flex flex-wrap gap-1 ">
            <Button type="primary" danger>
              <DeleteOutlined />
            </Button>
            <Link href={`/${role}/manage-customer/${data?.id}/edit`}>
              <Button type="primary">
                <EditOutlined />
              </Button>
            </Link>
            <Link href={`/${role}/manage-customer/${data?.id}/details`}>
              <Button type="primary">
                <InfoCircleOutlined />
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <div>
      <ActionBar title="Customers">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <div className="overflow-auto">
        <CSTable
          loading={isLoading}
          columns={columns}
          dataSource={customers}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
    </div>
  );
};

export default ManageCustomerPage;
