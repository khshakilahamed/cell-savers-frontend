"use client";

import CSTable from "@/components/ui/Table/CSTable";
import { useDeleteCustomerMutation } from "@/redux/api/customerApi";
import { Button, Divider, Input, Spin, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import {
  LoadingOutlined,
  PrinterFilled,
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
  useUpdateTechnicianBookingMutation,
} from "@/redux/api/bookingApi";
import tickIcon from "./../../../../assets/icons/check.png";
import cancelIcon from "./../../../../assets/icons/close.png";
import Image from "next/image";
import ToolTip from "@/components/ui/ToolTip/ToolTip";
import Form from "@/components/Forms/Form";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import { issueStatusForTechnician } from "@/constants/global";
import FormTextArea from "@/components/Forms/FormTextArea";
import MyButton from "@/components/ui/Button/Button";
import Spinner from "@/components/ui/Spinner/Spinner";
import CircleSpinner from "@/components/ui/Spinner/CircleSpinner";

const ManageBookingPage = () => {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [confirmServiceOpen, setConfirmServiceOpen] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>("");
  const [customer, setCustomer] = useState<string>("");
  const [service, setService] = useState<string>("");

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

  const [updateTechnicianBooking, { isLoading: isBookingLoading }] =
    useUpdateTechnicianBookingMutation();

  const onSubmit = async (updatedData: any) => {
    try {
      updatedData["id"] = bookingId;
      message.loading("Updating...");

      const res = await updateTechnicianBooking(updatedData).unwrap();

      setConfirmServiceOpen(false);

      if (res && !isBookingLoading) {
        message.success("Updated successfully");
      } else {
        message.error("Something went  wrong");
      }
    } catch (error: any) {
      console.log(message);
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
      title: "Date & Time",
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
            {data.bookingStatus === "CONFIRM" &&
              data?.issueStatus === "ONGOING" && (
                <ToolTip text="Confirm Booking">
                  <Button
                    onClick={() => {
                      setBookingId(data?.id);
                      setConfirmServiceOpen(true);
                      setCustomer(
                        `${data?.customer?.firstName} ${data?.customer?.lastName}`
                      );
                      setService(`${data?.service?.title}`);
                    }}
                  >
                    <Image
                      src={tickIcon}
                      height={20}
                      width={20}
                      alt="tick icon"
                    />
                  </Button>
                </ToolTip>
              )}

            <Button>
              <PrinterFilled />
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
      <CSModal
        title="Confirm Service"
        isOpen={confirmServiceOpen}
        closeModal={() => setConfirmServiceOpen(false)}
        // handleOk={() => confirmServiceHandler(bookingId)}
        showCancelButton={false}
        showOkButton={false}
      >
        <>
          <div style={{ margin: "10px 0px" }}>
            <label htmlFor="">Customer name</label>
            <Input className="font-bold" value={customer} disabled />
          </div>

          <div style={{ margin: "10px 0px" }}>
            <label htmlFor="">Service</label>
            <Input className="font-bold" value={service} disabled />
          </div>
          <Form submitHandler={onSubmit}>
            <div style={{ margin: "10px 0px" }}>
              <FormSelectField
                options={issueStatusForTechnician as SelectOptions[]}
                name="issueStatus"
                label="Issue Status"
              />
            </div>

            <div style={{ margin: "10px 0px" }}>
              <FormTextArea
                name="fixDescription"
                label="Description"
                placeholder="Write here details"
              />
            </div>

            <div className="mt-3 flex gap-2 justify-end">
              <MyButton
                onClick={() => setConfirmServiceOpen(false)}
                className="py-2 px-2 rounded-md bg-transparent text-black hover:bg-slate-700 hover:text-white hover:transition-all"
                style={{ border: "1px solid black" }}
              >
                Cancel
              </MyButton>
              <MyButton
                className="py-2 px-2 rounded-md"
                disabled={isBookingLoading ? true : false}
                type="submit"
              >
                <div className="flex gap-2 items-center">
                  {isBookingLoading && <CircleSpinner />}
                  Confirm
                </div>
              </MyButton>
            </div>
          </Form>
        </>
      </CSModal>
    </div>
  );
};

export default ManageBookingPage;
