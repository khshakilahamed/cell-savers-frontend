"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import UploadImage from "@/components/ui/UploadImage/UploadImage";
import { genderOptions } from "@/constants/global";
import {
  useCustomerQuery,
  useUpdateCustomerMutation,
} from "@/redux/api/customerApi";
import { Button, message } from "antd";
import { Col, Row } from "antd";
import { SubmitHandler } from "react-hook-form";

const EditCustomer = ({ params }: { params: any }) => {
  const { id } = params;

  const { data } = useCustomerQuery(id);
  const [updateCustomer, { isLoading }] = useUpdateCustomerMutation();

  const onSubmit = async (updatedData: any) => {
    try {
      let file;
      if (updatedData?.file) {
        file = updatedData["file"];
        delete updatedData["file"];

        const formData = new FormData();
        formData.append("file", file);

        formData.append("upload_preset", "cell-repair");

        const fileUpload = await fetch(
          "https://api.cloudinary.com/v1_1/dkpy2zq2x/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const fileUploadResponse = await fileUpload.json();
        const profilePicture = fileUploadResponse.url;

        updatedData["profilePicture"] = profilePicture;
      }

      const res = await updateCustomer({ id, updatedData }).unwrap();

      if (isLoading) {
        message.loading("Updating...");
      }

      if (res && !isLoading) {
        message.success("Customer updated successfully");
      } else {
        message.error("Something went  wrong");
      }
    } catch (error: any) {
      console.log(message);
      message.error(error.message);
    }
  };

  const defaultValues = {
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    email: data?.email || "",
    gender: data?.gender || "",
    contactNo: data?.contactNo || "",
    emergencyContactNo: data?.emergencyContactNo || "",
    permanentAddress: data?.permanentAddress || "",
    presentAddress: data?.presentAddress || "",
    // profilePicture: data?.status || "",
  };
  return (
    <div>
      <ActionBar title="Update Customer"></ActionBar>

      <div>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="firstName"
                size="large"
                label="First Name"
                placeholder="John"
              />
            </Col>

            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="lastName"
                size="large"
                label="Last Name"
                placeholder="Doe"
              />
            </Col>
            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="email"
                name="email"
                size="large"
                label="Email"
                placeholder="johndoe@gmail.com"
              />
            </Col>
            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormSelectField
                size="large"
                name="gender"
                options={genderOptions}
                label="Gender"
                placeholder="Select"
              />
            </Col>
            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="contactNo"
                size="large"
                label="Contact No."
                placeholder="0145000000"
              />
            </Col>
            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="emergencyContactNo"
                size="large"
                label="Emergency Contact No."
                placeholder="0145000000"
              />
            </Col>
            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}
            >
              <UploadImage name="file" />
            </Col>
            <Col
              className="gutter-row"
              span={12}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormTextArea
                name="presentAddress"
                label="Present Address"
                placeholder="Write here present address"
              />
            </Col>
            <Col
              className="gutter-row"
              span={12}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormTextArea
                name="permanentAddress"
                label="Permanent Address"
                placeholder="Write here permanent address"
              />
            </Col>
          </Row>

          <div className="my-3">
            <Button
              type="primary"
              htmlType="submit"
              disabled={isLoading ? true : false}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditCustomer;
