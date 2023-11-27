"use client";

import { useServicesQuery } from "@/redux/api/serviceApi";
import ServiceCard from "../ServiceCard/ServiceCard";
import Link from "next/link";
import MyButton from "../Button/Button";
import Spinner from "../Spinner/Spinner";

const HomeServices = () => {
  const { data, isLoading } = useServicesQuery({ limit: 4, page: 1 });

  const services = data?.services;

  return (
    <div className="w-full flex justify-center">
      <div className="px-5 xl:px-0 max-w-[1280px]">
        <div className="text-center my-20">
          <h2 className="uppercase text-3xl font-bold">Our services</h2>
          <p className="text-base mt-2">Quality Service is Our Guarantee</p>
        </div>
        <div className="flex flex-wrap justify-center lg:justify-between gap-5">
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            services?.map((service) => (
              <ServiceCard service={service} key={service.id} />
            ))
          )}
        </div>

        <div className="mt-14 text-center">
          <Link href="/services">
            <MyButton
              className="bg-transparent text-black hover:bg-black hover:text-white hover:transition-all"
              style={{ border: "1px solid" }}
            >
              More Services
            </MyButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeServices;
