
import YogaSection from "@/components/YogaSection";
// Sidebar is now handled by Layout component
import Footer from "@/components/Footer";

const Yoga = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar is now handled by Layout component */}
      <main className="flex-grow">
        <YogaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Yoga;
