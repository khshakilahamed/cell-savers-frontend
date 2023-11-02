import Banner from "@/components/ui/Banner/Banner";
import BannerBottom from "@/components/ui/Banner/BannerBottom";
import FaqSection from "@/components/ui/FaqSection/FaqSection";
import CustomerFeedback from "@/components/ui/Feedback/Feedback";
import Footer from "@/components/ui/Footer/Footer";
import HomeServices from "@/components/ui/HomeServices/HomeServices";
import Navbar from "@/components/ui/Navbar/Navbar";
import RepairStore from "@/components/ui/RepairStore/RepairStore";
import HomeBlog from "./home-blogs/page";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "64px" }}>
        <Banner />
        <BannerBottom />
        <RepairStore />
        <HomeServices />
        <FaqSection />
        <CustomerFeedback />
        <HomeBlog />
        {/* <div className="mt-36"> */}
        <Footer />
        {/* </div> */}
      </div>
    </div>
  );
};

export default HomePage;
