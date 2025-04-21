
import YogaSection from "@/components/YogaSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Yoga = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <YogaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Yoga;
