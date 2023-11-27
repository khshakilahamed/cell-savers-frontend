import styles from "./.././../styles/About.module.css";
import { PhoneOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";

const ContactUs = () => {
  return (
    <div className="w-full">
      <div
        className={`${styles.aboutBanner} h-[200px] text-white flex justify-center items-center bg-fixed`}
      >
        <h2 className="uppercase text-3xl">Contact us</h2>
      </div>
      <div className="w-full flex justify-center my-20">
        <div className="px-5 xl:px-0 max-w-[1280px]">
          <h2 className="text-2xl uppercase text-center mb-10">
            Send Us Message
          </h2>

          <div className="flex justify-center  flex-wrap  w-full gap-5 text-base sm:text-lg">
            <div className="w-[300px] bg-gray-300 flex flex-col items-center justify-center p-5 py-10">
              <IoLocationOutline className="text-5xl" />
              <h3 className="uppercase mt-5">Address</h3>
              <p>Uttara, Dhaka, Bangladesh</p>
            </div>
            <div className="w-[300px] bg-gray-300 flex flex-col items-center justify-center p-5 py-10">
              <PhoneOutlined className="text-5xl" />
              <h3 className="uppercase mt-5">Phone Number</h3>
              <a
                href="tel:+8801687732227"
                className=" text-black"
                style={{ textDecoration: "none" }}
              >
                +8801687732227
              </a>
            </div>
            <div className="w-[300px] bg-gray-300 flex flex-col items-center justify-center p-5 py-10">
              <MdOutlineMailOutline className="text-5xl" />
              <h3 className="uppercase mt-5">Email</h3>

              <a
                href="mailto:contact@cell-savers.com"
                className=" text-black"
                style={{ textDecoration: "none" }}
              >
                contact@cell-savers.com
              </a>
            </div>
            <div className="w-[300px] bg-gray-300 flex flex-col items-center justify-center p-5 py-10">
              <ClockCircleOutlined className="text-5xl" />
              <h3 className="uppercase mt-5">Opening hours</h3>
              <p>All Days: 9am to 6pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
