
import ProjectsSection from "@/components/ProjectsSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
