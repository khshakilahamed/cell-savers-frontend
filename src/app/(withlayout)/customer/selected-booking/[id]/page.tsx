"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import TimeSlotIDField from "@/components/Forms/TimeSlotIDForm";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import Spinner from "@/components/ui/Spinner/Spinner";
import { useAddBookingMutation } from "@/redux/api/bookingApi";
import { useAvailableTechniciansQuery } from "@/redux/api/customerAgentApi";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { Input } from "antd";
import { Button, message } from "antd";
import { useState } from "react";

const SelectedBooking = ({ params }: { params: any }) => {
  const { id } = params;
  const [timeSlotId, setTimeSlotId] = useState<string>();
  const [bookingDate, setBookingDate] = useState<string>();

  const query: Record<string, any> = {};

  if (!!timeSlotId) {
    query["timeSlot"] = timeSlotId;
  }
  if (!!timeSlotId) {
    query["bookingDate"] = bookingDate;
  }

  const { data, isLoading } = useServiceQuery(id);

  const { data: technicians } = useAvailableTechniciansQuery({ ...query });

  //   console.log(data);
  //   console.log(technicians);

  const offeredCoursesOptions = technicians?.map((technician: any) => {
    return {
      label: `${technician?.firstName} ${technician?.lastName}`,
      value: technician?.id,
    };
  });

  const [addBooking, { isLoading: isBookingLoading }] = useAddBookingMutation();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating...");

      data["slotId"] = timeSlotId;
      delete data["timeSlot"];
      data["serviceId"] = id;

      if (!data.bookingDate) {
        return message.error("Please fill the booking date");
      }

      if (
        !data.booking &&
        !data.slotId &&
        !data.technician &&
        !data.issueDescription
      ) {
        return message.error("Please fill up the booking form");
      }
      console.log(data);

      const res = await addBooking(data).unwrap();

      console.log(res);

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
      <ActionBar title="Booking"></ActionBar>
      <div className="max-w-[400px]">
        <span>Selected Service</span>
        <Input value={data?.title} className="font-bold text-lg" disabled />
      </div>
      <div className="max-w-[400px]">
        <Form submitHandler={onSubmit}>
          <div>
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
                options={offeredCoursesOptions as SelectOptions[]}
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
              disabled={isBookingLoading ? true : false}
            >
              Book Now
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SelectedBooking;
