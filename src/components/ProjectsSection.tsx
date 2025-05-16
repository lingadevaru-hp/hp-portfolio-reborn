import { useRef } from "react";
import { motion } from "framer-motion"; // Removed useScroll, useTransform for simpler design
import { useInView } from "react-intersection-observer";
import ProjectsGrid from "./projects/ProjectsGrid";
import { useProjects } from "./projects/useProjects";

const ProjectsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Animate once when it comes into view
    threshold: 0.1,
  });

  const { projects, isLoading, error } = useProjects();

  // Simplified animation variants for a cleaner look
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1, // Stagger animation for children (title, grid)
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="projects"
      ref={ref}
      className="section-container py-16 md:py-24 bg-hotstar-dark text-white" // Use Hotstar background
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div className="text-center mb-12 md:mb-16" variants={itemVariants}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
          My Projects
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div> {/* Keep accent line if desired, or simplify */}
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Explore my creations — each one represents a unique challenge and learning opportunity.
        </p>
      </motion.div>

      {/* ProjectsGrid will be responsible for the grid layout and card styling */}
      <motion.div variants={itemVariants}>
        <ProjectsGrid
          projects={projects}
          isLoading={isLoading}
          error={error}
        />
      </motion.div>
    </motion.section>
  );
};

export default ProjectsSection;

