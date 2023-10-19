"use client";

import Image from "next/image";
import mobileServicing from "./../../../../../../assets/mobileServicing.jpg";
import { Button } from "antd";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import Spinner from "@/components/ui/Spinner/Spinner";
import Link from "next/link";
import { getUserInfo } from "@/services/auth.service";
import { useServiceQuery } from "@/redux/api/serviceApi";

const TechnicianDetails = ({ params }: { params: any }) => {
  const user = getUserInfo() as any;
  const { id } = params;
  const { data, isLoading } = useServiceQuery(id);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const { title, price, image, description } = data;

  console.log(data);

  return (
    <div className="">
      <ActionBar title="Technician Profile" />

      <div className="flex justify-center items-center gap-5 h-full w-full">
        <div>
          <div>
            {image !== "null" ? (
              <Image
                src={`${image}`}
                width={200}
                height={300}
                alt="service image"
              />
            ) : (
              <Image src={mobileServicing} width={300} alt="service image" />
            )}
          </div>
        </div>
        <div>
          <h3 className="uppercase text-2xl">{title}</h3>
          <p className="text-lg">{price}</p>
          <p className="text-lg">{description}</p>

          <Link href={`/${user?.role}/service/${id}/edit`}>
            <Button type="primary">Edit</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDetails;
