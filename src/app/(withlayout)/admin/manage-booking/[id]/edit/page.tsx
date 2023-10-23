"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import Spinner from "@/components/ui/Spinner/Spinner";
import { bookingStatus, issueStatus } from "@/constants/global";
import {
  useBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { useAvailableTechniciansQuery } from "@/redux/api/customerAgentApi";
import { useServicesQuery } from "@/redux/api/serviceApi";
import { useTimeSlotsQuery } from "@/redux/api/timeSlotApi";
import { getUserInfo } from "@/services/auth.service";
import { IService } from "@/types/global";
import { Button, message } from "antd";
import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const EditBooking = ({ params }: { params: any }) => {
  const { role } = getUserInfo() as any;

  const { id } = params;
  const [timeSlotId, setTimeSlotId] = useState<string>();
  const [bookingDate, setBookingDate] = useState<string>();

  const query: Record<string, any> = {};

  if (!!timeSlotId) {
    query["timeSlot"] = timeSlotId;
  }
  if (!!bookingDate) {
    query["bookingDate"] = bookingDate;
  }

  const { data, isLoading } = useBookingQuery(id);

  const { data: serviceData } = useServicesQuery({
    limit: 100,
    page: 1,
  });

  const services = serviceData?.services;
  const servicesOptions = services?.map((service: IService) => {
    return {
      label: `${service?.title} - ৳ ${service?.price}`,
      value: service?.id,
    };
  });

  const { data: technicians } = useAvailableTechniciansQuery({ ...query });

  const techniciansOptions = technicians?.map((technician: any) => {
    return {
      label: `${technician?.firstName} ${technician?.lastName}`,
      value: technician?.id,
    };
  });

  const { data: timeSlotData } = useTimeSlotsQuery({
    limit: 100,
    page: 1,
  });

  const timeSlots = timeSlotData?.timeSlots;
  const timeSlotOptions = timeSlots?.map((timeSlot: any) => {
    // console.log(timeSlot?.id);
    return {
      label: timeSlot?.startTime + " - " + timeSlot?.endTime,
      value: timeSlot?.id,
    };
  });

  const [updateBooking, { isLoading: isUpdateBookingLoading }] =
    useUpdateBookingMutation();

  const onSubmit = async (updatedData: any) => {
    try {
      message.loading("Updating...");

      const res = await updateBooking({ id, updatedData }).unwrap();

      if (res && !isUpdateBookingLoading) {
        message.success("Booking updated successfully");
      } else {
        message.error("Something went  wrong");
      }
    } catch (error: any) {
      console.log(message);
      message.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner></Spinner>
      </div>
    );
  }
  const defaultValues = {
    bookingDate: data?.bookingDate || "",
    serviceId: data?.serviceId || "",
    customerAgentId: data?.customerAgentId || "",
    bookingStatus: data?.bookingStatus || "",
    slotId: data?.slotId || timeSlotId || "",
    issueStatus: data?.issueStatus || "",
    issueDescription: data?.issueDescription || "",
  };
  return (
    <div>
      <ActionBar title="Update Booking"></ActionBar>

      <div className="my-10">
        <h2>Customer Info</h2>
        <div className="flex gap-2 my-5">
          <div>
            <Image
              src={data?.customer?.profilePicture}
              width={100}
              height={100}
              alt="user image"
            />
          </div>
          <div>
            <Link
              href={`/${role}/manage-customer/${data?.customer?.id}/details`}
              target="blank"
            >
              <p className="text-xl">
                Name: {data?.customer?.firstName} {data?.customer?.lastName}
              </p>
            </Link>
            <p>Email: {data?.customer?.email}</p>
          </div>
        </div>
      </div>

      <div>
        <h3>Booking Info</h3>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            className="min-w-[350px]"
          >
            <Col
              className="gutter-row min-w-[350px]"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormSelectField
                size="large"
                name="serviceId"
                options={servicesOptions as SelectOptions[]}
                label="Service"
                placeholder="Select"
              />
            </Col>
            <Col
              className="gutter-row min-w-[350px]"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormDatePicker
                name="bookingDate"
                label="Booking Date"
                size="large"
                onChange={(el) => setBookingDate(el?.format("YYYY-MM-DD"))}
              />
            </Col>

            <Col
              className="gutter-row min-w-[350px]"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormSelectField
                size="large"
                name="slotId"
                options={timeSlotOptions as SelectOptions[]}
                handleChange={(el: string) => setTimeSlotId(el)}
                label="Time Slot"
                placeholder="Select"
              />
            </Col>
            <Col
              className="gutter-row min-w-[350px]"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormSelectField
                size="large"
                name="customerAgentId"
                options={techniciansOptions as SelectOptions[]}
                label="Technician"
                placeholder="Select"
              />
            </Col>
            <Col
              className="gutter-row min-w-[350px]"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormSelectField
                size="large"
                name="bookingStatus"
                options={bookingStatus}
                label="Booking Status"
                placeholder="Select"
              />
            </Col>
            <Col
              className="gutter-row min-w-[350px]"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormSelectField
                size="large"
                name="issueStatus"
                options={issueStatus}
                label="Issue Status"
                placeholder="Select"
              />
            </Col>
            <Col
              className="gutter-row min-w-[350px]"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormTextArea
                name="issueDescription"
                label="Description"
                placeholder="Write here the issues about your phone"
              />
            </Col>
          </Row>

          <div className="my-3">
            <Button
              type="primary"
              htmlType="submit"
              disabled={isUpdateBookingLoading ? true : false}
            >
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditBooking;
