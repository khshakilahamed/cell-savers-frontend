import { bannerBottomItems } from "@/constants/bannerBottomItems";
import Image from "next/image";
import React from "react";

const BannerBottom = () => {
  return (
    <div style={{ backgroundColor: "#F2F2F2" }}>
      <div className="px-5 lg:px-20 xl:px-64 flex flex-wrap justify-between">
        {bannerBottomItems.map((item, _, items) => (
          <div key={item.key} className="flex flex-between gap-10 py-8 ">
            <div>
              <h2 className="text-gray-500">{item.heading}</h2>
              <p className="text-gray-500">{item.text}</p>
            </div>
            <Image src={item.image} width={50} alt="icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerBottom;
