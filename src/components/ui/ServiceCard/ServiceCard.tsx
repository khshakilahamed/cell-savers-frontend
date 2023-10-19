import { getUserInfo } from "@/services/auth.service";
import { IService } from "@/types/global";
import { UserOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import Image from "next/image";
import Link from "next/link";

const ServiceCard = ({ service }: { service: IService }) => {
  const { role } = getUserInfo() as any;

  return (
    <div className="w-[300px]">
      <div>
        <Image
          src={service?.image}
          width={300}
          height={200}
          alt="service-image"
        />
      </div>
      <div className="mt-2">
        <h2>
          {service?.title.length > 20
            ? service?.title?.slice(0, 20) + "..."
            : service?.title}
        </h2>
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
              <Button type="primary" className="uppercase">
                Book Now
              </Button>
            </Link>
          </p>
        </div>
        <Divider />

        <div>
          <p className="text-lg">
            {service?.description.length > 150
              ? service.description.slice(0, 150) + "..."
              : service?.description}
          </p>
          <div className="mt-5">
            <Link href={`/services/${service?.id}/details`}>
              <Button type="primary" ghost className="uppercase">
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
