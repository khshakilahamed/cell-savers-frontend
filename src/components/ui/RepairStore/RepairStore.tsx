/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import aboutImage from "./../../../assets/about-image.png";

const RepairStore = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="px-5 xl:px-0 max-w-[1280px]">
        <div className="text-center my-20">
          <h2 className="text-3xl uppercase">We are repair store</h2>
          <p className=" text-base mt-2">
            Explore new ways to see what’s working and fix what’s not.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center">
          <div className="md:w-[50%] flex justify-end">
            <img
              className="w-full"
              // src="https://i.ibb.co/GHqD4VK/about-image.png"
              src="https://res.cloudinary.com/dkpy2zq2x/image/upload/v1702109358/cell-repair/about-image_brtge8.png"
              alt="about mobile"
            />
          </div>
          <div className="md:w-[50%] flex flex-col gap-5 text-justify text-base lg:text-xl">
            <p className=" text-red-400">
              We strive to help people by providing extraordinary service and
              expert repairs using only the highest quality parts available.
            </p>
            <p>
              Of course we love fixing cracked iPhone screens and broken charge
              ports, but we get our satisfaction from helping out folks who lost
              their connection to the outside world.
            </p>
            <div className="flex flex-col gap-3">
              <h4 className="text-xl">What We Do</h4>
              <p>
                We service all the newest and popular mobile phones, tablets and
                laptops. natis sed id nisl magna auris et neque sollicitudin
                ullamcorper fusce molestie felis mi id.Vestibulum venenatis sed
                id nisl magna suspendisse a mauris.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairStore;
