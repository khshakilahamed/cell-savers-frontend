import Banner from "@/components/ui/Banner/Banner";
import BannerBottom from "@/components/ui/Banner/BannerBottom";
import FaqSection from "@/components/ui/FaqSection/FaqSection";
import Footer from "@/components/ui/Footer/Footer";
import HomeServices from "@/components/ui/HomeServices/HomeServices";
import Navbar from "@/components/ui/Navbar/Navbar";
import RepairStore from "@/components/ui/RepairStore/RepairStore";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <BannerBottom />
      <RepairStore />
      <HomeServices />
      <FaqSection />
      <div className="mt-36">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
