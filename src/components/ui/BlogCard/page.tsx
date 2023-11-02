/* eslint-disable @next/next/no-img-element */
import { IBlog } from "@/types/global";
import MyButton from "../Button/Button";
import { Divider } from "antd";
import Link from "next/link";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const BlogCard = ({
  blog,
  index,
  blogs,
}: {
  blog: IBlog;
  index: number;
  blogs: IBlog[];
}) => {
  return (
    <div>
      <div
        className={`flex gap-4 flex-col ${
          index % 2 === 0
            ? "md:flex-row justify-between"
            : "flex-row md:flex-row-reverse items-between"
        }  `}
      >
        <div className="md:w-[50%]">
          <Link href={`/blogs/${blog?.id}/details`}>
            <img className="w-full" src={blog?.image} alt="service-image" />
          </Link>
        </div>
        <div className="md:w-[50%]">
          <div className="flex gap-5 items-center">
            <div className="my-2 text-gray-500 flex gap-2 items-center text-sm">
              <p>
                <CalendarOutlined />
              </p>
              <p className="uppercase">
                {dayjs(blog?.createdAt).format("D MMM YY")}
              </p>
            </div>
            <div className="my-2 text-gray-500 flex gap-2 items-center text-sm">
              <p>
                <UserOutlined />
              </p>
              <p className="uppercase">
                {blog?.customerAgent?.firstName} {blog?.customerAgent?.lastName}
              </p>
            </div>
          </div>

          <Link
            className="text-black decoration-white"
            href={`/blogs/${blog?.id}/details`}
          >
            <h2>{blog?.title}</h2>
          </Link>
          <p className="text-lg text-justify">
            {blog?.description.length > 0
              ? `${blog?.description.slice(0, 500)}...`
              : blog?.description}
            <Link href={`/blogs/${blog?.id}/details`}>
              <MyButton className="bg-transparent text-black rounded bg-gray-100 p-2 capitalize hover:text-white">
                Read More
              </MyButton>
            </Link>
          </p>
        </div>
      </div>
      {blogs.length - 1 !== index && <Divider />}
    </div>
  );
};

export default BlogCard;
