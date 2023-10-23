"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import TimeSlotIDField from "@/components/Forms/TimeSlotIDForm";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import Spinner from "@/components/ui/Spinner/Spinner";
import { useAddBookingMutation } from "@/redux/api/bookingApi";
import { useAvailableTechniciansQuery } from "@/redux/api/customerAgentApi";
import { useServiceQuery, useServicesQuery } from "@/redux/api/serviceApi";
import { IService } from "@/types/global";
import { Input } from "antd";
import { Button, Upload, message } from "antd";
import { useState } from "react";

const MakeBooking = () => {
  const [timeSlotId, setTimeSlotId] = useState<string>();
  const [bookingDate, setBookingDate] = useState<string>();

  const query: Record<string, any> = {};

  if (!!timeSlotId) {
    query["timeSlot"] = timeSlotId;
  }
  if (!!bookingDate) {
    query["bookingDate"] = bookingDate;
  }

  const { data } = useServicesQuery({
    limit: 100,
    page: 1,
  });

  const services = data?.services;
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

  const [addBooking, { isLoading }] = useAddBookingMutation();

  const onSubmit = async (bookingData: any) => {
    try {
      bookingData["slotId"] = timeSlotId;
      delete bookingData["timeSlot"];

      if (!bookingData.bookingDate) {
        return message.error("Please fill the booking date");
      }
      message.loading("Creating...");

      if (
        !bookingData.booking &&
        !bookingData.slotId &&
        !bookingData.technician &&
        !bookingData.issueDescription
      ) {
        return message.error("Please fill up the booking form");
      }

      const res = await addBooking(bookingData).unwrap();

      if (res) {
        message.success("Booking created successfully");
      } else {
        message.error("Something went wrong");
      }
    } catch (error: any) {
      console.log(message);
      message.error(error.message);
    }
  };
  return (
    <div>
      <ActionBar title="Make a Booking"></ActionBar>

      <div className="max-w-[400px]">
        <Form submitHandler={onSubmit}>
          <div>
            <div style={{ margin: "10px 0px" }}>
              <FormSelectField
                options={servicesOptions as SelectOptions[]}
                name="serviceId"
                label="Service"
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <TimeSlotIDField
                name="timeSlot"
                label="Time Slot"
                onChange={(el) => setTimeSlotId(el)}
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormDatePicker
                name="bookingDate"
                label="Booking Date"
                size="large"
                onChange={(el) => setBookingDate(el?.format("YYYY-MM-DD"))}
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormSelectField
                options={techniciansOptions as SelectOptions[]}
                name="customerAgentId"
                label="Technician"
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormTextArea
                name="issueDescription"
                label="Description"
                placeholder="Write here the issues about your phone"
              />
            </div>
          </div>

          <div className="my-3">
            <Button
              type="primary"
              htmlType="submit"
              disabled={isLoading ? true : false}
            >
              Book Now
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MakeBooking;
