"use client";

import MyButton from "@/components/ui/Button/Button";
import ServiceCard from "@/components/ui/ServiceCard/ServiceCard";
import Spinner from "@/components/ui/Spinner/Spinner";
import { useServicesQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hook";
import { Divider, Input } from "antd";
import { useState } from "react";

const Services = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useServicesQuery({ ...query });
  const services = data?.services;

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="flex items-center">
          <Input
            size="large"
            placeholder="Search here..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
          <MyButton className="rounded-md">Search</MyButton>
        </div>
        <Divider />

        <div className="flex flex-wrap justify-center lg:justify-between gap-5">
          {services?.map((service) => (
            <ServiceCard service={service} key={service.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
