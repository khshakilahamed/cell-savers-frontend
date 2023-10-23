/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import blankUser from "./../../../../../../assets/blankUser.png";
import { Button, Divider } from "antd";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import Spinner from "@/components/ui/Spinner/Spinner";
import Link from "next/link";
import MyButton from "@/components/ui/Button/Button";
import { getUserInfo } from "@/services/auth.service";
import { useBookingQuery } from "@/redux/api/bookingApi";
import dayjs from "dayjs";

const BookingDetails = ({ params }: { params: any }) => {
  const { role } = getUserInfo() as any;
  const { id } = params;
  const { data, isLoading } = useBookingQuery(id);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const customer = data?.customer;
  const customerAgent = data?.customerAgent;

  return (
    <div className="">
      <ActionBar title="Booking Details" />

      <div className=" md:max-w-[45%]">
        <Divider orientation="left">
          <h2 className="my-2 text-2xl font-thin">Service Info</h2>
        </Divider>
        <div className="md:ml-10">
          <p className="text-lg">Service: {data?.service?.title}</p>
          <p className="text-lg">
            Time: {data?.slot?.startTime} - {data?.slot?.endTime}
          </p>
          <p className="text-lg">
            Date: {dayjs(data?.bookingDate).format("MMM D, YYYY")}
          </p>
          <Link href={`/${role}/manage-booking/${id}/edit`}>
            <MyButton className="font-bold py-2 px-3">Edit</MyButton>
          </Link>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-between gap-10">
        <div className=" xl:w-[50%]">
          <Divider orientation="left">
            <h2 className="my-5 text-2xl font-thin">Customer Info</h2>
          </Divider>
          <div className="flex flex-col sm:flex-row lg:items-center gap-5">
            <div>
              {customer?.profilePicture ? (
                <Link href={customer?.profilePicture} target="blank">
                  <img
                    className="w-[150px] md:max-w-[200px]"
                    src={customer?.profilePicture}
                    alt="user profile picture"
                  />
                </Link>
              ) : (
                <Image src={blankUser} width={200} alt="user profile picture" />
              )}
            </div>
            <div>
              <h3 className="uppercase text-2xl">
                {customer?.user?.role?.title}
              </h3>
              <p className="text-lg">
                Name:{" "}
                <span className="font-bold">
                  {customer?.firstName} {customer?.lastName}
                </span>
              </p>
              <p className="text-lg">
                Contact Number:{" "}
                <a href={`tel:+${customer?.contactNo}`}>
                  {customer?.contactNo}
                </a>
              </p>
              <p className="text-lg">
                Email:{" "}
                <a href={`mailto:${customer?.email}`}>{customer?.email}</a>
              </p>
              <p className="text-lg">
                PresentAddress: {customer?.presentAddress}
              </p>
              <p className="text-lg">
                PermanentAddress: {customer?.permanentAddress}
              </p>
            </div>
          </div>
        </div>
        <Divider type="vertical"></Divider>
        <div className="xl:w-[50%]">
          <Divider orientation="left">
            <h2 className="my-5 text-2xl font-thin">Technician Info</h2>
          </Divider>

          <div className="flex flex-col sm:flex-row lg:items-center gap-5">
            <div>
              <div>
                {customerAgent?.profilePicture ? (
                  <Link href={customerAgent?.profilePicture} target="blank">
                    <img
                      className="w-[150px] md:max-w-[200px]"
                      src={customerAgent?.profilePicture}
                      alt="user profile picture"
                    />
                  </Link>
                ) : (
                  <Image
                    src={blankUser}
                    width={200}
                    alt="user profile picture"
                  />
                )}
              </div>
            </div>
            <div>
              <h3 className="uppercase text-2xl">
                {customerAgent?.user?.role?.title}
              </h3>
              <p className="text-lg">
                Name:{" "}
                <span className="font-bold">
                  {customerAgent?.firstName} {customerAgent?.lastName}
                </span>
              </p>
              <p className="text-lg">
                Contact Number:{" "}
                <a href={`tel:+${customerAgent?.contactNo}`}>
                  {customerAgent?.contactNo}
                </a>
              </p>
              <p className="text-lg">
                Email:{" "}
                <a href={`mailto:${customerAgent?.email}`}>
                  {customerAgent?.email}
                </a>
              </p>
              <p className="text-lg">
                PresentAddress: {customerAgent?.presentAddress}
              </p>
              <p className="text-lg">
                PermanentAddress: {customerAgent?.permanentAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
