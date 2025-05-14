
import AboutSection from "@/components/AboutSection";
// Sidebar is now handled by Layout component
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar is now handled by Layout component */}
      <main className="flex-grow">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
