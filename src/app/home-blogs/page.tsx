"use client";

import HomeBlogCard from "@/components/ui/HomeBlogCard/HomeBlogCard";
import MyButton from "@/components/ui/Button/Button";
import Spinner from "@/components/ui/Spinner/Spinner";
import { useBlogsQuery } from "@/redux/api/blogApi";
import Link from "next/link";

const HomeBlog = () => {
  const { data, isLoading } = useBlogsQuery({ page: 1, limit: 4 });

  const blogs = data?.blogs;

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="my-10 px-5 lg:px-20 xl:px-50  2xl:px-50 3xl:px-64">
      <div className="text-center my-20">
        <h2 className="text-3xl mt-2">Our Blogs</h2>
      </div>

      <div className="flex flex-wrap justify-center lg:justify-between gap-5">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          blogs?.map((blog) => <HomeBlogCard blog={blog} key={blog.id} />)
        )}
      </div>

      <div className="mt-14 text-center">
        <Link href="/blogs">
          <MyButton
            className="bg-transparent text-black hover:bg-black hover:text-white hover:transition-all"
            style={{ border: "1px solid" }}
          >
            More Blogs
          </MyButton>
        </Link>
      </div>
    </div>
  );
};

export default HomeBlog;
