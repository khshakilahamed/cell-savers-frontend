/* eslint-disable @next/next/no-img-element */
"use client";

import { Button, Divider, Input, Tooltip, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { getUserInfo } from "@/services/auth.service";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import { useDebounced } from "@/redux/hook";
import CSModal from "@/components/ui/Modal/CSModal";
import dayjs from "dayjs";
import Spinner from "@/components/ui/Spinner/Spinner";
import {
  useDeleteFeedbackMutation,
  useFeedbacksQuery,
  useSelectFeedbackMutation,
} from "@/redux/api/feedbackApi";
import { UserOutlined, SelectOutlined, UndoOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import MyButton from "@/components/ui/Button/Button";

const ManageBlogs = () => {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [feedbackId, setFeedbackId] = useState<string>("");

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

  const { data, isLoading } = useFeedbacksQuery({ ...query });
  const [deleteFeedback, { isLoading: isDeleteLoading }] =
    useDeleteFeedbackMutation();

  const [selectFeedback] = useSelectFeedbackMutation();

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const feedbacks = data?.feedbacks;

  const deleteHandler = async (id: string) => {
    // console.log(id);
    try {
      message.loading("Deleting...");
      const res = await deleteFeedback(id).unwrap();

      setOpen(false);
      if (isDeleteLoading) {
        message.loading("Deleting...");
      }
      if (res) {
        message.success("Feedback Deleted Successfully!");
      } else {
        message.error("Something went wrong!");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleSelectFeedback = async (id: string) => {
    const res = await selectFeedback(id).unwrap();

    if (res.isSelected) {
      message.success("Successfully selected to display");
    } else if (!res.isSelected) {
      message.success("Successfully removed from display");
    } else {
      message.error("Something went wrong");
    }
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
  return (
    <div>
      <ActionBar title="Customer Feedbacks">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
      </ActionBar>

      <div className="my-12">
        {feedbacks?.map((feedback: any, i) => (
          <div key={feedback?.id} className="gap-3 block">
            <div className="flex gap-3">
              <div>
                <Link
                  href={`/${role}/manage-customer/${feedback?.customer?.id}/details`}
                  target="blank"
                >
                  {feedback?.customer?.profilePicture ? (
                    <Avatar
                      size={45}
                      src={feedback?.customer?.profilePicture}
                    />
                  ) : (
                    <Avatar size={45} icon={<UserOutlined />} />
                  )}
                </Link>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/${role}/manage-customer/${feedback?.customer?.id}/details`}
                    target="blank"
                  >
                    <h3>
                      {feedback?.customer?.firstName}{" "}
                      {feedback?.customer?.lastName}
                    </h3>
                  </Link>
                  <div className="flex gap-1">
                    <Tooltip placement="top" title="Delete Permanently">
                      <Button
                        onClick={() => {
                          setOpen(true);
                          setFeedbackId(feedback?.id);
                        }}
                        danger
                      >
                        <DeleteOutlined />
                      </Button>
                    </Tooltip>

                    {feedback?.isSelected ? (
                      <Tooltip placement="top" title="Remove from display">
                        <Button
                          onClick={() => handleSelectFeedback(feedback?.id)}
                        >
                          <UndoOutlined />
                        </Button>
                      </Tooltip>
                    ) : (
                      <Tooltip placement="top" title="Select to display">
                        <Button
                          onClick={() => handleSelectFeedback(feedback?.id)}
                        >
                          <SelectOutlined />
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                </div>
                <p className="text-gray-500">
                  <small>
                    {feedback &&
                      dayjs(feedback?.createdAt).format("MMM D, YYYY hh:mm A")}
                  </small>
                </p>
              </div>
            </div>
            <div className="mt-5">
              <p>{feedback?.comment}</p>
            </div>
            {feedbacks.length - 1 !== i && <Divider />}
          </div>
        ))}
      </div>

      <CSModal
        title="Remove Feedback"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(feedbackId)}
      >
        <p className="my-5">Do you want to remove this feedback?</p>
      </CSModal>
    </div>
  );
};

export default ManageBlogs;
