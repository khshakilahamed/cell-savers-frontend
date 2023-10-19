"use client";

import Spinner from "@/components/ui/Spinner/Spinner";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { Button, Divider } from "antd";
import Image from "next/image";
import { UserOutlined } from "@ant-design/icons";

const ServiceDetails = ({ params }: { params: any }) => {
  const { id } = params;

  const { data, isLoading } = useServiceQuery(id);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  console.log(data);

  return (
    <div>
      <div className="flex-col gap-3 mt-10">
        <div>
          <img
            className="w-full lg:w-[500px]"
            src={data?.image}
            alt="service-image"
          />
        </div>
        <div className="mt-2">
          <h2>{data?.title}</h2>
          <p className="text-sm pt-2">
            <UserOutlined /> BY ADMIN
          </p>
          <div className="flex justify-between items-center pt-2">
            <p>
              {" "}
              &#2547; <span className="font-bold text-lg">{data?.price}</span>
            </p>
            <p>
              <Button type="primary" className="uppercase">
                Book Now
              </Button>
            </p>
          </div>

          <h4 className=" mt-4">Description:</h4>
          <p className="text-lg">{data?.description}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2>Reviews ({data?.reviews.length})</h2>
        <Divider />
      </div>
    </div>
  );
};

export default ServiceDetails;