"use client";

import HomeBlogCard from "@/components/ui/HomeBlogCard/HomeBlogCard";
import MyButton from "@/components/ui/Button/Button";
import Spinner from "@/components/ui/Spinner/Spinner";
import { useBlogsQuery } from "@/redux/api/blogApi";
import { useState } from "react";
import { useDebounced } from "@/redux/hook";
import { Divider, Input } from "antd";
import BlogCard from "@/components/ui/BlogCard/page";

const Blog = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const blogs = data?.blogs;

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="flex items-center">
          <Input
            size="large"
            placeholder="Search here..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
          <MyButton className="rounded-md">Search</MyButton>
        </div>
        <Divider />

        <div className="flex flex-wrap justify-center lg:justify-between gap-5">
          {blogs?.map((blog, i, blogs) => (
            <BlogCard blog={blog} index={i} blogs={blogs} key={blog.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
