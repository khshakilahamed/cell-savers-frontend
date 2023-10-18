"use client";

import { useCustomerQuery } from "@/redux/api/customerApi";
import React from "react";

const EditCustomer = ({ params }: { params: any }) => {
  const { id } = params;

  const { data } = useCustomerQuery(id);

  console.log(data);
  return <div></div>;
};

export default EditCustomer;
