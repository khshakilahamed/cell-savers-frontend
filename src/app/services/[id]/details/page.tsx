/* eslint-disable @next/next/no-img-element */
"use client";

import Spinner from "@/components/ui/Spinner/Spinner";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import MyButton from "@/components/ui/Button/Button";
import Link from "next/link";
import { getUserInfo } from "@/services/auth.service";
import ReviewCard from "@/components/ui/ReviewCard/ReviewCard";
import { IReview } from "@/types/global";
import { useRouter } from "next/navigation";

const ServiceDetails = ({ params }: { params: any }) => {
  const { role } = getUserInfo() as any;
  const { id } = params;
  const router = useRouter();

  const { data, isLoading } = useServiceQuery(id);

  const handleBook = (id: string) => {
    if (!role) {
      return router.push("/login");
    }
    router.push(`/${role}/selected-booking/${id}`);
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center my-20">
      <div className="px-5 xl:px-0 max-w-[1280px]">
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
                <MyButton
                  className="uppercase py-2 px-3"
                  onClick={() => handleBook(data?.id)}
                >
                  Book Now
                </MyButton>
              </p>
            </div>

            <h4 className=" mt-4">Description:</h4>
            <p className="text-lg text-justify">{data?.description}</p>
          </div>
        </div>

        <div className="mt-10">
          <h2>Review(s) [{data?.reviews.length}]</h2>
          <Divider />

          <div>
            {data?.reviews.map((review: IReview) => (
              <ReviewCard review={review} key={review?.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
