"use client";

import CSTable from "@/components/ui/Table/CSTable";
import { Button, message } from "antd";
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
import { useTechniciansQuery } from "@/redux/api/userApi";
import { useDeleteCustomerAgentMutation } from "@/redux/api/customerAgentApi";
import dayjs from "dayjs";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const ManageTechnicianPage = () => {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [technicianId, setTechnicianId] = useState<string>("");

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

  const { data, isLoading } = useTechniciansQuery();

  const [deleteCustomerAgent, { isLoading: isDeleteLoading }] =
    useDeleteCustomerAgentMutation();

  const deleteHandler = async (id: string) => {
    // console.log(id);
    try {
      message.loading("Deleting...");
      const res = await deleteCustomerAgent(id).unwrap();

      if (isDeleteLoading) {
        message.loading("Deleting...");
      }
      if (res && !isDeleteLoading) {
        message.success("Technician Deleted Successfully!");
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
          <>
            {data?.profilePicture ? (
              <Link href={data?.profilePicture} target="blank">
                <Avatar shape="square" size={64} src={data?.profilePicture} />
              </Link>
            ) : (
              <Avatar shape="square" size={64} icon={<UserOutlined />} />
            )}
            <span className="ml-5 font-bold">
              {data?.firstName} {data?.lastName}
            </span>
          </>
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
            <Link href={`/${role}/manage-technician/${data?.id}/details`}>
              <Button type="primary">
                <InfoCircleOutlined />
              </Button>
            </Link>
            <Link href={`/${role}/manage-technician/${data?.id}/edit`}>
              <Button type="primary" ghost>
                <EditOutlined />
              </Button>
            </Link>
            <Button
              type="primary"
              danger
              onClick={() => {
                setOpen(true);
                setTechnicianId(data?.id);
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
      <ActionBar title="Technicians">
        {/* <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        /> */}
        <div>
          <Link href={`/${role}/manage-technician/create-technician`}>
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
          dataSource={data}
          pageSize={size}
          // totalPages={meta?.total}
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
        handleOk={() => deleteHandler(technicianId)}
      >
        <p className="my-5">Do you want to remove this technician?</p>
      </CSModal>
    </div>
  );
};

export default ManageTechnicianPage;
