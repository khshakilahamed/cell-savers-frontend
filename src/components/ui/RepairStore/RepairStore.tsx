/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import aboutImage from "./../../../assets/about-image.png";

const RepairStore = () => {
  return (
    <div className="my-10 px-5 lg:px-20 xl:px-50  2xl:px-50 3xl:px-64">
      <div className="text-center my-20">
        <h2 className="text-3xl">We are repair store</h2>
        <p className="uppercase text-sm mt-2">
          Explore new ways to see what’s working and fix what’s not.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center">
        <div className="md:w-[50%] flex justify-end">
          <img
            className="w-full"
            src="https://i.ibb.co/GHqD4VK/about-image.png"
            alt="about mobile"
          />
        </div>
        <div className="md:w-[50%] flex flex-col gap-5">
          <p className="text-2xl text-red-400">
            We strive to help people by providing extraordinary service and
            expert repairs using only the highest quality parts available.
          </p>
          <p className="text-lg">
            Of course we love fixing cracked iPhone screens and broken charge
            ports, but we get our satisfaction from helping out folks who lost
            their connection to the outside world.
          </p>
          <div className="flex flex-col gap-3">
            <h4 className="text-xl">What We Do</h4>
            <p className="text-lg">
              We service all the newest and popular mobile phones, tablets and
              laptops. natis sed id nisl magna auris et neque sollicitudin
              ullamcorper fusce molestie felis mi id.Vestibulum venenatis sed id
              nisl magna suspendisse a mauris.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairStore;
