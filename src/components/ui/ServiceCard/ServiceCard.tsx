/* eslint-disable @next/next/no-img-element */
import { getUserInfo } from "@/services/auth.service";
import { IService } from "@/types/global";
import { UserOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import Image from "next/image";
import Link from "next/link";
import MyButton from "../Button/Button";
import BlankImage from "./../../../assets/cameraIcon.png";

const ServiceCard = ({ service }: { service: IService }) => {
  const { role } = getUserInfo() as any;

  return (
    <div className="w-[300px]">
      <div>
        <Link href={`/services/${service?.id}/details`}>
          <Image
            src={service?.image}
            width={300}
            height={200}
            alt="service-image"
          />
        </Link>
      </div>
      <div className="mt-2">
        <Link
          href={`/services/${service?.id}/details`}
          className="decoration-white text-black"
        >
          <h2>
            {service?.title.length > 20
              ? service?.title?.slice(0, 20) + "..."
              : service?.title}
          </h2>
        </Link>
        <p className="text-sm pt-2">
          <UserOutlined /> BY ADMIN
        </p>
        <div className="flex justify-between items-center pt-2">
          <p>
            {" "}
            &#2547; <span className="font-bold text-lg">{service?.price}</span>
          </p>
          <p>
            <Link href={`${role}/selected-booking/${service?.id}`}>
              <MyButton className="uppercase py-2 px-3">Book Now</MyButton>
            </Link>
          </p>
        </div>
        <Divider />

        <div>
          <p className="text-lg text-justify">
            {service?.description.length > 150
              ? service.description.slice(0, 150) + "..."
              : service?.description}
            <Link href={`/services/${service?.id}/details`}>
              <MyButton className="bg-transparent text-black rounded bg-gray-100 p-2 capitalize">
                Read More
              </MyButton>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
