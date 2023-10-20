import { Button, Carousel } from "antd";
import Image from "next/image";
import { bannerItems } from "@/constants/sliderItems";
import Link from "next/link";

// https://i.ibb.co/6YH29jD/slider-3.jpg
// https://i.ibb.co/b26269k/slider-4.jpg
// https://i.ibb.co/VTD7BK2/slider-31.jpg
// https://i.ibb.co/bmdtz5Z/slider-51.jpg

const Banner = () => {
  return (
    <div>
      <Carousel dots effect="fade" autoplay>
        {bannerItems.map((item) => (
          <div key={item.key} className="h-[65vh] w-full">
            <div
              style={{
                backgroundImage: `url(${item.image})`,
                height: "100%",
                width: "100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backdropFilter: `brightness(20%)`,
              }}
            >
              <div className="px-5 lg:px-20 xl:px-64 h-full w-[50%] flex justify-left items-center">
                <div className="flex flex-col gap-5">
                  <h2 className="text-4xl">{item.heading}</h2>
                  <p className="text-lg">{item.text}</p>
                  <div>
                    <Link href="/services">
                      <Button type="primary" className="uppercase">
                        View Services
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
