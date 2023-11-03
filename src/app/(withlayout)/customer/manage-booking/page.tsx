"use client";

import CSTable from "@/components/ui/Table/CSTable";
import { Button, Input, Rate, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { DeleteOutlined, MessageOutlined } from "@ant-design/icons";
import { getUserInfo } from "@/services/auth.service";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import { useDebounced } from "@/redux/hook";
import CSModal from "@/components/ui/Modal/CSModal";
import dayjs from "dayjs";
import CircleSpinner from "@/components/ui/Spinner/CircleSpinner";

import {
  useCustomerMyBookingQuery,
  useDeleteBookingMutation,
} from "@/redux/api/bookingApi";
import ToolTip from "@/components/ui/ToolTip/ToolTip";
import MyButton from "@/components/ui/Button/Button";
import { useAddReviewMutation } from "@/redux/api/reviewApi";

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
  const [reviewOpen, setReviewOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  const desc = ["very bad", "bad", "average", "good", "excellent"];

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

  const [addReview, { isLoading: isReviewLoading }] = useAddReviewMutation();

  const reviewHandler = async () => {
    const reviewData = { bookingId, rating, comment };
    try {
      message.loading("Submitting...");
      const res = await addReview(reviewData).unwrap();

      if (res) {
        setReviewOpen(false);
        message.success("Review submitted Successfully!");
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
        return <div className="capitalize">{data?.title}</div>;
      },
    },
    {
      title: "Price",
      dataIndex: "service",
      render: function (data: any) {
        return <>{data?.price}</>;
      },
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
            {data?.readyToReview && !data?.isReviewDone && (
              <ToolTip text="Review">
                <Button
                  onClick={() => {
                    setReviewOpen(true);
                    setBookingId(data?.id);
                  }}
                >
                  <MessageOutlined className="font-xl" />
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
      <ActionBar title="My Bookings">
        <div>
          <Link href={`/${role}/make-booking/`}>
            <MyButton className="py-2 px-3">Make a Book</MyButton>
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

      {/* remove booking modal */}
      <CSModal
        title="Remove Booking"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(bookingId)}
      >
        <p className="my-5">Do you want to remove this booking?</p>
      </CSModal>

      {/* add review modal */}
      <CSModal
        title="Review & Rating"
        isOpen={reviewOpen}
        closeModal={() => setReviewOpen(false)}
        // handleOk={() => confirmServiceHandler(bookingId)}
        showCancelButton={false}
        showOkButton={false}
      >
        <>
          <div style={{ margin: "10px 0px" }}>
            {/* <label htmlFor="">Rating</label> */}
            <p>
              <Rate
                allowHalf
                tooltips={desc}
                onChange={setRating}
                value={rating}
              />
              {rating ? (
                <span className="ant-rate-text">{desc[rating - 1]}</span>
              ) : (
                ""
              )}
            </p>
          </div>

          <div style={{ margin: "10px 0px" }}>
            <label htmlFor="">Comment</label>
            <Input.TextArea
              rows={5}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="mt-3 flex gap-2 justify-end">
            <MyButton
              onClick={() => setReviewOpen(false)}
              className="py-2 px-2 rounded-md bg-transparent text-black hover:bg-slate-700 hover:text-white hover:transition-all"
              style={{ border: "1px solid black" }}
            >
              Cancel
            </MyButton>
            <MyButton
              className="py-2 px-2 rounded-md"
              disabled={isReviewLoading ? true : false}
              onClick={reviewHandler}
            >
              <div className="flex gap-2 items-center">
                {isReviewLoading && <CircleSpinner />}
                Submit
              </div>
            </MyButton>
          </div>
        </>
      </CSModal>
    </div>
  );
};

export default ManageBooking;
