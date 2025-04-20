
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    const deviconLink = document.createElement("link");
    deviconLink.rel = "stylesheet";
    deviconLink.href = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css";
    document.head.appendChild(deviconLink);

    return () => {
      document.head.removeChild(deviconLink);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
