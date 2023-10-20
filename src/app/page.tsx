import Banner from "@/components/ui/Banner/Banner";
import BannerBottom from "@/components/ui/Banner/BannerBottom";
import Footer from "@/components/ui/Footer/Footer";
import Navbar from "@/components/ui/Navbar/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <BannerBottom />
      <div className="mt-36">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
