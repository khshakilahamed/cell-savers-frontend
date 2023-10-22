"use client";

import { useFeedbacksQuery } from "@/redux/api/feedbackApi";
import { IFeedback } from "@/types/global";
import { Avatar } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Spinner from "../Spinner/Spinner";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 2000 },
    items: 4,
    partialVisibilityGutter: 30,
  },
  largeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 2000, min: 1500 },
    items: 3,
    partialVisibilityGutter: 30,
  },
  desktop: {
    breakpoint: { max: 1500, min: 1024 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 700 },
    items: 1,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 700, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

const CustomerFeedback = () => {
  const query: Record<string, any> = {};
  query["limit"] = 5;
  query["page"] = 1;
  query["sortBy"] = "createdAt";
  query["sortOrder"] = "desc";
  query["isSelected"] = true;

  const { data, isLoading } = useFeedbacksQuery({ ...query });

  if (isLoading) {
    <div className="flex items-center justify-center w-ful h-full">
      <Spinner />
    </div>;
  }

  const feedbacks = data?.feedbacks;

  return (
    <div className="py-20 my-20" style={{ backgroundColor: "#F2F2F2" }}>
      <div className="px-5 lg:px-20 xl:px-50  2xl:px-50 3xl:px-64 text-center mb-20">
        <h2 className="text-3xl">WHAT OUR CUSTOMERS SAID</h2>
        <div className="">
          <p className="uppercase text-center text-sm px-5 lg:px-20 xl:px-50  2xl:px-50 3xl:px-64">
            Overcome faithful endless salvation enlightenment salvation overcome
            pious merciful ascetic madness holiest joy passion zarathustra
            suicide overcome snare.
          </p>
        </div>
      </div>
      {feedbacks && feedbacks.length > 0 ? (
        <Carousel
          partialVisible
          autoPlaySpeed={4000}
          autoPlay
          infinite
          showDots={false}
          arrows={false}
          responsive={responsive}
        >
          {feedbacks?.map((feedback: any) => (
            <div
              key={feedback.id}
              className=" p-5 mx-5 bg-white min-h-[250px] 2xl:min-h-[200px] flex items-center"
            >
              <div>
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2">
                  <div>
                    <Avatar
                      size={80}
                      src={feedback?.customer?.profilePicture}
                    />
                  </div>
                  <div>
                    <p className="text-gray-500 italic text-justify">
                      {feedback?.comment}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-center mt-5 italic">
                    @{feedback?.customer?.firstName}{" "}
                    {feedback?.customer?.lastName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <p>No feedbacks available</p>
      )}
    </div>
  );
};

export default CustomerFeedback;
