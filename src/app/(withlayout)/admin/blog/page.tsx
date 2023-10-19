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
import cameraIcon from "./../../../../assets/cameraIcon.png";
import Image from "next/image";

const ManageBlogs = () => {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [blogId, setBlogId] = useState<string>("");

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

  const { data, isLoading } = useBlogsQuery({ ...query });
  const [deleteBlog, { isLoading: isDeleteLoading }] = useDeleteBlogMutation();

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const blogs = data?.blogs;

  const deleteHandler = async (id: string) => {
    // console.log(id);
    try {
      message.loading("Deleting...");
      const res = await deleteBlog(id).unwrap();

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
      <ActionBar title="Blogs">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          <Link href={`/${role}/blog/create-blog`}>
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

      <div className="my-12">
        {blogs?.map(({ id, image, title, description }: any) => (
          <div key={id} className="md:flex gap-3 block">
            <div className="w-[50%]">
              {image ? (
                <img className="w-full" src={image} alt="image" />
              ) : (
                <Image src={cameraIcon} width={400} alt={title} />
              )}
            </div>
            <div className="w-[50%]">
              <div className="flex gap-3">
                <Link href={`/${role}/blog/${id}/edit`}>
                  <Button>
                    <EditOutlined className="text-lg" />
                  </Button>
                </Link>
                <Button
                  danger
                  onClick={() => {
                    setOpen(true);
                    setBlogId(id);
                  }}
                >
                  <DeleteOutlined className="text-lg" />
                </Button>
              </div>
              <h2 className="text-3xl">{title}</h2>
              <p className="text-lg">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <CSModal
        title="Remove Blog"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(blogId)}
      >
        <p className="my-5">Do you want to remove this blog?</p>
      </CSModal>
    </div>
  );
};

export default ManageBlogs;
