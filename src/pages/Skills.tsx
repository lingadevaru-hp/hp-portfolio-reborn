
import SkillsSection from "@/components/SkillsSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Skills = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <SkillsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Skills;
