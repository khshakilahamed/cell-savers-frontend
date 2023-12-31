"use client";

import CSTable from "@/components/ui/Table/CSTable";
import {
  useCustomersQuery,
  useDeleteCustomerMutation,
} from "@/redux/api/customerApi";
import { Button, Divider, Input, message } from "antd";
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
import CSModal from "@/components/ui/Modal/CSModal";
import dayjs from "dayjs";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

const ManageCustomerPage = () => {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [customerId, setCustomerId] = useState<string>("");

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

  const [deleteCustomer, { isLoading: isDeleteLoading }] =
    useDeleteCustomerMutation();

  const deleteHandler = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteCustomer(id).unwrap();

      if (isDeleteLoading) {
        message.loading("Deleting...");
      }
      if (res && !isDeleteLoading) {
        message.success("Customer Deleted Successfully!");
        setOpen(false);
      } else {
        message.error("Something went wrong!");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      // dataIndex: "firstName",
      render: function (data: any) {
        return (
          <div className="flex items-center gap-2">
            {data?.profilePicture ? (
              <Link href={data?.profilePicture} target="blank">
                <Avatar shape="square" size={64} src={data?.profilePicture} />
              </Link>
            ) : (
              <Avatar shape="square" size={64} icon={<UserOutlined />} />
            )}
            <p>
              {data?.firstName} {data?.lastName}
            </p>
          </div>
        );
      },
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      sorter: true,
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
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <div className="flex flex-wrap gap-1 ">
            <Link href={`/${role}/manage-customer/${data?.id}/details`}>
              <Button type="primary">
                <InfoCircleOutlined />
              </Button>
            </Link>
            <Link href={`/${role}/manage-customer/${data?.id}/edit`}>
              <Button type="primary" ghost>
                <EditOutlined />
              </Button>
            </Link>
            <Button
              type="primary"
              danger
              onClick={() => {
                setOpen(true);
                setCustomerId(data?.id);
              }}
            >
              <DeleteOutlined />
            </Button>
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
          className="w-[75%] md:w-[25%]"
        />
        <div>
          <Link href={`/${role}/manage-customer/create-customer`}>
            <Button type="primary">Create</Button>
          </Link>
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

      <CSModal
        title="Remove admin"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(customerId)}
      >
        <p className="my-5">Do you want to remove this customer?</p>
      </CSModal>
    </div>
  );
};

export default ManageCustomerPage;
