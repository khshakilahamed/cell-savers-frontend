"use client";

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
import { useBlogsQuery, useDeleteBlogMutation } from "@/redux/api/blogApi";
import Spinner from "@/components/ui/Spinner/Spinner";
import { useDeleteFaqMutation, useFaqsQuery } from "@/redux/api/faqApi";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";

const ManageFaq = () => {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [faqId, setFaqId] = useState<string>("");

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

  const { data, isLoading } = useFaqsQuery({ ...query });
  const [deleteFaq, { isLoading: isDeleteLoading }] = useDeleteFaqMutation();

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const faqs = data?.faqs;

  //   const items = faqs.map((item, ))

  console.log(faqs);

  const deleteHandler = async (id: string) => {
    // console.log(id);
    try {
      message.loading("Deleting...");
      const res = await deleteFaq(id).unwrap();

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

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
  return (
    <div>
      <ActionBar title="FAQ">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          <Link href={`/${role}/faq/create-faq`}>
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
      {/* <Collapse items={items} defaultActiveKey={["1"]} />; */}

      {faqs?.map((faq: any, i) => (
        <div key={faq?.id} className=" w-full p-3">
          <div className="flex justify-between">
            <p className="text-3xl">
              Q{i + 1}. {faq?.question}
            </p>
            <div className="flex gap-2">
              <Link href={`/${role}/faq/${faq?.id}/edit`}>
                <Button>
                  <EditOutlined className="text-lg" />
                </Button>
              </Link>
              <Button
                danger
                onClick={() => {
                  setOpen(true);
                  setFaqId(faq?.id);
                }}
              >
                <DeleteOutlined className="text-lg" />
              </Button>
            </div>
          </div>
          <p className="text-lg">{faq?.answer}</p>
        </div>
      ))}
      <CSModal
        title="Remove FAQ"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(faqId)}
      >
        <p className="my-5">Do you want to remove this faq?</p>
      </CSModal>
    </div>
  );
};

export default ManageFaq;
