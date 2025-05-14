
import SkillsSection from "@/components/SkillsSection";
// Sidebar is now handled by Layout component
import Footer from "@/components/Footer";

const Skills = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar is now handled by Layout component */}
      <main className="flex-grow">
        <SkillsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Skills;
