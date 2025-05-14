
import ProjectsSection from "@/components/ProjectsSection";
// Sidebar is now handled by Layout component
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Projects = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col"
    >
      {/* Sidebar is now handled by Layout component */}
      <main className="flex-grow">
        <ProjectsSection />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Projects;
