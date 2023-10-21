"use client";

import { useCustomerQuery } from "@/redux/api/customerApi";
import Image from "next/image";
import blankUser from "./../../../../../../assets/blankUser.png";
import { Button } from "antd";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import Spinner from "@/components/ui/Spinner/Spinner";
import Link from "next/link";
import MyButton from "@/components/ui/Button/Button";
import { getUserInfo } from "@/services/auth.service";

const EditCustomer = ({ params }: { params: any }) => {
  const { role } = getUserInfo() as any;
  const { id } = params;
  const { data, isLoading } = useCustomerQuery(id);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const {
    firstName,
    lastName,
    contactNo,
    email,
    profilePicture,
    permanentAddress,
    presentAddress,
    user,
  } = data;

  return (
    <div className="">
      <ActionBar title="Customer Profile" />

      <div className="flex justify-center items-center gap-5 h-full w-full">
        <div>
          <div>
            {profilePicture ? (
              <Link href={profilePicture} target="blank">
                <Image
                  src={profilePicture}
                  width={200}
                  height={200}
                  alt="user profile picture"
                />
              </Link>
            ) : (
              <Image src={blankUser} width={200} alt="user profile picture" />
            )}
          </div>
        </div>
        <div>
          <h3 className="uppercase text-2xl">{user?.role?.title}</h3>
          <p className="text-lg">
            Name:{" "}
            <span className="font-bold">
              {firstName} {lastName}
            </span>
          </p>
          <p className="text-lg">
            Contact Number: <a href={`tel:+${contactNo}`}>{contactNo}</a>
          </p>
          <p className="text-lg">
            Email: <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p className="text-lg">PresentAddress: {presentAddress}</p>
          <p className="text-lg">PermanentAddress: {permanentAddress}</p>

          <Link href={`/${role}/manage-customer/${id}/edit`}>
            <MyButton className="font-bold py-2 px-3">Edit</MyButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
