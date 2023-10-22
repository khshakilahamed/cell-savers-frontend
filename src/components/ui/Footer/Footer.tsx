import { Button, Divider } from "antd";
import React from "react";
import MyButton from "../Button/Button";

const Footer = () => {
  return (
    <div
      className="py-10"
      style={{ backgroundColor: "#001529", color: "white" }}
    >
      <div className="px-5 lg:px-20 xl:px-50  2xl:px-50 3xl:px-64  ">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-16 py-5">
          <h2 className="text-4xl">CellSavers</h2>
          <p className="text-lg lg:text-xl text-center">
            BEST TECHNOLOGY REPAIR CENTER IN THE WHOLE WORLD. OUR REPAIRING
            MEANS NO TROUBLE FOR YOU
          </p>
          <div>
            {/* <Button type="primary" className="uppercase">
              Get Started
            </Button> */}
            <MyButton className=" bg-slate-300 text-black block w-[150px] hover:bg-slate-600 hover:text-white font-bold">
              Get Started
            </MyButton>
          </div>
        </div>
        {/* border  */}
        <div className="py-5">
          <p style={{ borderBottom: "1px solid white" }}></p>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start flex-between w-full gap-10">
          <div className="flex flex-col gap-3 md:w-[33%]">
            <h2 className="uppercase text-center md:text-start">About us</h2>
            <p className="text-base sm:text-lg text-center md:text-justify">
              We strive to help people by providing extraordinary service and
              expert repairs using only the highest quality parts available. We
              service all the newest and popular mobile phones and tablets.
            </p>
          </div>
          <div className=" flex flex-col text-center md:text-start gap-3 md:w-[33%] text-white">
            <h2 className="uppercase">services</h2>
            <div className="flex flex-col gap-2 text-lg">
              <p>Water Damage Repair</p>
              <p>Phone Unlocking</p>
              <p>Software Troubleshoot</p>
              <p>Battery Replacement</p>
              <p>Screen Replacement</p>
            </div>
          </div>
          <div className="flex flex-col text-center md:text-start gap-3 md:w-[33%]">
            <h2>CONTACT US</h2>
            <p className="text-lg">
              136 Kingston Road SW19 1LY Wimbledon London.
            </p>
            <div className="text-lg">
              <p>Monday - Friday: 9am - 6pm</p>
              <p>Saturday: 9am - 4pm</p>
              <p>Sunday: Appointments only.</p>
            </div>
            <div className="text-lg">
              <p>Office: 0208 543 7088</p>
              <p>Mobile: 0 778 35 166 93</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
