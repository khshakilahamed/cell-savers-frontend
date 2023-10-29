"use client";

import CSTable from "@/components/ui/Table/CSTable";
import { useDeleteCustomerMutation } from "@/redux/api/customerApi";
import { Button, Divider, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  ReloadOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { getUserInfo } from "@/services/auth.service";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import { useDebounced } from "@/redux/hook";
import CSModal from "@/components/ui/Modal/CSModal";
import dayjs from "dayjs";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import {
  useBookingsQuery,
  useCancelBookingMutation,
  useConfirmBookingMutation,
  useDeleteBookingMutation,
  useTechnicianBookingQuery,
} from "@/redux/api/bookingApi";
import tickIcon from "./../../../../assets/icons/check.png";
import cancelIcon from "./../../../../assets/icons/close.png";
import Image from "next/image";
import ToolTip from "@/components/ui/ToolTip/ToolTip";

const ManageBookingPage = () => {
  const { role, userId } = getUserInfo() as any;
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [cancelOpen, setCancelOpen] = useState<boolean>(false);
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

  const { data, isLoading } = useTechnicianBookingQuery({ ...query });

  const bookings = data?.bookings;
  const meta = data?.meta;

  console.log(bookings);

  const [deleteCustomer, { isLoading: isDeleteLoading }] =
    useDeleteBookingMutation();

  const confirmHandler = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteCustomer(id).unwrap();

      if (isDeleteLoading) {
        message.loading("Deleting...");
      }
      if (res && !isDeleteLoading) {
        message.success("Customer Deleted Successfully!");
        setDeleteOpen(false);
      } else {
        message.error("Something went wrong!");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customer",
      render: function (data: any) {
        return (
          <div className="flex items-center gap-2">
            {data?.profilePicture ? (
              <Link
                href={`/${role}/manage-customer/${data?.id}/details`}
                target="blank"
              >
                <Avatar shape="square" size={64} src={data?.profilePicture} />
              </Link>
            ) : (
              <Avatar shape="square" size={64} icon={<UserOutlined />} />
            )}
            <div>
              <Link
                href={`/${role}/manage-customer/${data?.id}/details`}
                target="blank"
                className="text-black font-bold"
              >
                <p>
                  {data?.firstName} {data?.lastName}
                </p>
              </Link>
              <p className="flex gap-2">
                <MailOutlined className="text-lg" />
                <a href={`mailto:${data?.email}`}>{data?.email}</a>
              </p>
              <p className="flex gap-2">
                <PhoneOutlined className="text-lg" />
                <a className="text-black" href={`tel:+${data?.contactNo}`}>
                  {data?.contactNo}
                </a>
              </p>
            </div>
          </div>
        );
      },
      sorter: true,
    },
    {
      title: "Booking Date & Time",
      //   dataIndex: "email",
      render: function (data: any) {
        return (
          <div className="flex flex-col gap-2 font-bold">
            <p>{dayjs(data?.bookingDate).format("MMM D, YYYY")}</p>
            <p>
              {data?.slot?.startTime} - {data?.slot?.endTime}
            </p>
          </div>
        );
      },
      sorter: true,
    },
    {
      title: "Taken Service",
      dataIndex: "service",
      render: function (data: any) {
        return (
          <Link
            href={`/${role}/service/${data?.id}/details`}
            className="text-black"
          >
            <p>
              &#2547; <span className="font-bold text-xl">{data?.price}</span>
            </p>
            <p>{data?.title}</p>
          </Link>
        );
      },
      sorter: true,
    },
    {
      title: "Booking Status",
      dataIndex: "bookingStatus",
      sorter: true,
    },
    {
      title: "Issue Status",
      dataIndex: "issueStatus",
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
            {data.bookingStatus === "PENDING" && (
              <ToolTip text="Confirm Booking">
                <Button onClick={() => confirmHandler(data?.id)}>
                  <Image
                    src={tickIcon}
                    height={20}
                    width={20}
                    alt="tick icon"
                  />
                </Button>
              </ToolTip>
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
      <ActionBar title="Bookings">
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
          dataSource={bookings}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>

      {/* model for cancel booking */}
      {/* <CSModal
        title="Cancel Booking"
        isOpen={cancelOpen}
        closeModal={() => setCancelOpen(false)}
        handleOk={() => cancelHandler(bookingId)}
      >
        <p className="my-5">Do you want to cancel this booking?</p>
      </CSModal> */}
    </div>
  );
};

export default ManageBookingPage;
