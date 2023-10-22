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
import { useAdminsQuery, useTechniciansQuery } from "@/redux/api/userApi";
import { useDeleteCustomerAgentMutation } from "@/redux/api/customerAgentApi";
import dayjs from "dayjs";

import {
  useCustomerMyBookingQuery,
  useDeleteBookingMutation,
} from "@/redux/api/bookingApi";

const ManageBooking = () => {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>("");

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

  const { data, isLoading } = useCustomerMyBookingQuery();
  const [deleteBooking, { isLoading: isDeleteLoading }] =
    useDeleteBookingMutation();

  const deleteHandler = async (id: string) => {
    // console.log(id);
    try {
      message.loading("Deleting...");
      const res = await deleteBooking(id).unwrap();

      if (isDeleteLoading) {
        message.loading("Deleting...");
      }
      if (res) {
        setOpen(false);
        message.success("Booking Deleted Successfully!");
      } else {
        message.error("Something went wrong!");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Service",
      dataIndex: "service",
      render: function (data: any) {
        return <>{data?.title}</>;
      },
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "service",
      render: function (data: any) {
        return <>{data?.price}</>;
      },
      sorter: true,
    },
    {
      title: "Service Date",
      dataIndex: "bookingDate",
      sorter: true,
    },
    {
      title: "Time",
      dataIndex: "slot",
      render: function (data: any) {
        return (
          <>
            {data?.startTime} - {data?.endTime}
          </>
        );
      },
      sorter: true,
    },

    {
      title: "Technician Name",
      dataIndex: "customerAgent",
      render: function (data: any) {
        return (
          <>
            {data?.firstName} {data?.lastName}
          </>
        );
      },
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
      title: "Status",
      dataIndex: "bookingStatus",
    },
    {
      title: "Issue Status",
      dataIndex: "issueStatus",
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <div className="flex flex-wrap gap-1 ">
            {data?.bookingStatus !== "CONFIRM" && (
              <Button
                type="primary"
                danger
                onClick={() => {
                  setOpen(true);
                  setBookingId(data?.id);
                }}
              >
                <DeleteOutlined />
              </Button>
            )}
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
      <ActionBar title="My Bookings">
        <div>
          <Link href={`/${role}/make-booking/`}>
            <Button type="primary">Make a Book</Button>
          </Link>
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
        title="Remove Booking"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(bookingId)}
      >
        <p className="my-5">Do you want to remove this booking?</p>
      </CSModal>
    </div>
  );
};

export default ManageBooking;
