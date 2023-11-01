"use client";

import { useServicesQuery } from "@/redux/api/serviceApi";
import ServiceCard from "../ServiceCard/ServiceCard";
import Link from "next/link";
import MyButton from "../Button/Button";
import Spinner from "../Spinner/Spinner";

const HomeServices = () => {
  const { data, isLoading } = useServicesQuery({ limit: 4, page: 1 });

  //   if (isLoading) {
  //     return (

  //     );
  //   }
  const services = data?.services;
  return (
    <div className="my-10 px-5 lg:px-20 xl:px-50  2xl:px-50 3xl:px-64">
      <div className="text-center my-20">
        <p className="uppercase text-sm">Our services</p>
        <h2 className="text-3xl mt-2">Quality Service is Our Guarantee</h2>
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
  );
};

export default HomeServices;
