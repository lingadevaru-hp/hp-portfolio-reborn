
// Sidebar is now handled by Layout component
import HeroSection from "@/components/HeroSection";
import YogaSection from "@/components/YogaSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { motion } from "framer-motion";

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col"
    >
      {/* Sidebar is now handled by Layout component */}
      <main className="flex-grow">
        <HeroSection />
        <YogaSection />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
