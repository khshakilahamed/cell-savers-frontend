/* eslint-disable @next/next/no-img-element */
import { aboutUsWhyChooseOptions } from "@/constants/aboutUsWhyChoose";
import styles from "./../../styles/About.module.css";

const AboutUs = () => {
  return (
    <div className="w-full">
      <div
        className={`${styles.aboutBanner} h-[200px] text-white flex justify-center items-center bg-fixed`}
      >
        <h2 className="uppercase text-3xl">About us</h2>
      </div>
      <div className="w-full flex justify-center my-20 text-lg ">
        <div className="px-5 xl:px-0 max-w-[1280px]">
          <div className="flex  gap-5">
            <div className="hidden lg:flex w-[40%]">
              <img
                className="w-full"
                src="https://i.ibb.co/QHCKfQC/repair-2.jpg"
                alt="about image"
              />
            </div>
            <div className="w-[100%] lg:w-[60%] text-base sm:text-lg">
              <p>
                Welcome to CellSavers, your go-to destination for reliable and
                professional mobile phone repair services. At CellSavers, we
                understand the importance of your mobile device in your daily
                life, and we are committed to providing top-notch repair
                services to keep you connected.
              </p>
              <div className="mt-2">
                <h2 className="uppercase text-2xl">Our Mission</h2>
                <p>
                  At CellSavers, our mission is to deliver exceptional mobile
                  repair solutions with a focus on quality, efficiency, and
                  customer satisfaction. We strive to be the trusted partner you
                  can rely on when your mobile device needs attention.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20  text-lg">
            <h2 className="text-2xl uppercase text-center">
              Why Choose CellSavers ?
            </h2>
            <div>
              {aboutUsWhyChooseOptions.map((option, i) => (
                <div className="my-3" key={i}>
                  <h3>{option.heading}</h3>
                  <p>{option.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
