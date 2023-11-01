/* eslint-disable @next/next/no-img-element */
"use client";

import { Divider, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { getUserInfo } from "@/services/auth.service";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import { useDebounced } from "@/redux/hook";
import CSModal from "@/components/ui/Modal/CSModal";
import dayjs from "dayjs";
import { useBlogsQuery, useDeleteBlogMutation } from "@/redux/api/blogApi";
import Spinner from "@/components/ui/Spinner/Spinner";
import cameraIcon from "./../../../../assets/cameraIcon.png";
import Image from "next/image";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Button, Popover } from "antd";
import MyButton from "@/components/ui/Button/Button";
import { IBlog } from "@/types/global";

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

  console.log(data);

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

  const content = (id: string) => (
    <>
      <Link href={`/${role}/blog/${id}/edit`}>
        <p>Edit</p>
      </Link>

      <p
        onClick={() => {
          setOpen(true);
          setBlogId(id);
        }}
        className="cursor-pointer"
      >
        Delete
      </p>
    </>
  );

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
          className="w-[50%] lg:w-[20%]"
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
        {blogs?.map(
          (
            { id, image, title, description, customerAgent, createdAt }: IBlog,
            i,
            blogs
          ) => (
            <div key={id}>
              <div className="flex items-center gap-3 my-4">
                {customerAgent?.profilePicture ? (
                  <Avatar size={45} src={customerAgent?.profilePicture} />
                ) : (
                  <Avatar size={45} icon={<UserOutlined />} />
                )}
                <div className="flex items-center">
                  <div>
                    <h3>
                      {customerAgent.firstName} {customerAgent.lastName}
                    </h3>
                    <p>{dayjs(createdAt).format("MMM D, YYYY hh:mm A")}</p>
                  </div>
                  <div className="flex gap-2">
                    <Popover
                      placement="rightTop"
                      title={"Options"}
                      content={() => content(id)}
                      trigger="click"
                    >
                      <MyButton className="font-bold bg-transparent text-black text-2xl">
                        ...
                      </MyButton>
                    </Popover>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row  gap-3">
                <div className="w-[50%] md:w-[30%]">
                  {image ? (
                    <img className="w-full" src={image} alt="image" />
                  ) : (
                    <Image src={cameraIcon} width={400} alt={title} />
                  )}
                </div>
                <div className="md:w-[70%]">
                  <h2 className="text-xl">{title}</h2>
                  <p className="text-lg">{description}</p>
                </div>
              </div>
              {blogs.length - 1 !== i && <Divider />}
            </div>
          )
        )}
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
