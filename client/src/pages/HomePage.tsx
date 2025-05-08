import About from "../components/layout/About";
import Callout from "../components/layout/Callout";
import Footer from "../components/layout/Footer";
import Hero from "../components/layout/Hero";
import Navbar from "../components/layout/Navbar";
import Pricing from "../components/layout/Pricing";

const HomePage = () => {
  return (
    <div className="px-8 pt-2">
      <Navbar />
      <Hero />
      <About />
      <Pricing />
      <Callout />
      <Footer />
    </div>
  );
};

export default HomePage;
