"use client";

/* eslint-disable @next/next/no-img-element */
import Spinner from "@/components/ui/Spinner/Spinner";
import { useBlogQuery } from "@/redux/api/blogApi";
import dayjs from "dayjs";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";

const BlogDetails = ({ params }: { params: any }) => {
  const { id } = params;

  const { data, isLoading } = useBlogQuery(id);

  console.log(data);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex-col gap-3 mt-10">
      <div>
        <img
          className="w-full lg:w-[500px]"
          src={data?.image}
          alt="service-image"
        />
      </div>
      <div className="mt-4">
        <div className="flex gap-5 items-center">
          <div className="my-2 text-gray-500 flex gap-2 items-center text-sm">
            <p>
              <CalendarOutlined />
            </p>
            <p className="uppercase">
              {dayjs(data?.createdAt).format("D MMM YY")}
            </p>
          </div>
          <div className="my-2 text-gray-500 flex gap-2 items-center text-sm">
            <p>
              <UserOutlined />
            </p>
            <p className="uppercase">
              {data?.customerAgent?.firstName} {data?.customerAgent?.lastName}
            </p>
          </div>
        </div>
        <h2>{data?.title}</h2>
        <p className="text-lg mt-2 text-justify">{data?.description}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
