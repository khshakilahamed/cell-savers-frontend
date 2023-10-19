"use client";

import CSTable from "@/components/ui/Table/CSTable";
import { Button, Input, message } from "antd";
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
import {
  useDeleteServiceMutation,
  useServicesQuery,
} from "@/redux/api/serviceApi";
import {
  useDeleteTimeSlotMutation,
  useTimeSlotsQuery,
} from "@/redux/api/timeSlotApi";

const ManageTimeSlotPage = () => {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>("");

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

  const { data, isLoading } = useTimeSlotsQuery({ ...query });

  const timeSlots = data?.timeSlots;
  const meta = data?.meta;

  const [deleteTimeSlot, { isLoading: isDeleteLoading }] =
    useDeleteTimeSlotMutation();

  const deleteHandler = async (id: string) => {
    // console.log(id);
    try {
      message.loading("Deleting...");
      const res = await deleteTimeSlot(id).unwrap();

      setOpen(false);
      if (isDeleteLoading) {
        message.loading("Deleting...");
      }
      if (res) {
        message.success("Time Slot Deleted Successfully!");
      } else {
        message.error("Something went wrong!");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Start Time",
      dataIndex: "startTime",
      sorter: true,
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      sorter: true,
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
            <Button
              type="primary"
              danger
              onClick={() => {
                setOpen(true);
                setAdminId(data?.id);
              }}
            >
              <DeleteOutlined />
            </Button>
            <Link href={`/${role}/time-slot/${data?.id}/edit`}>
              <Button type="primary">
                <EditOutlined />
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
      <ActionBar title="Time Slot">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          <Link href={`/${role}/time-slot/create-time-slot`}>
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
          dataSource={timeSlots}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>

      <CSModal
        title="Remove Time Slot"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(adminId)}
      >
        <p className="my-5">Do you want to remove this time slot?</p>
      </CSModal>
    </div>
  );
};

export default ManageTimeSlotPage;
