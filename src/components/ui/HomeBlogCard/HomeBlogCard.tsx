/* eslint-disable @next/next/no-img-element */
import { getUserInfo } from "@/services/auth.service";
import { IBlog, IService } from "@/types/global";
import { UserOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { CalendarOutlined } from "@ant-design/icons";

const HomeBlogCard = ({ blog }: { blog: IBlog }) => {
  return (
    <div className="w-[300px] shadow">
      <div>
        <Link href={`/home-blogs/${blog?.id}/details`}>
          <Image src={blog?.image} width={300} height={200} alt="blog-image" />
        </Link>
      </div>
      <div className="my-2 px-3">
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
          href={`/home-blogs/${blog?.id}/details`}
          className="decoration-white text-black hover:decoration-black"
        >
          <h2 className="text-xl capitalize ">{blog?.title}</h2>
        </Link>
      </div>
    </div>
  );
};

export default HomeBlogCard;
