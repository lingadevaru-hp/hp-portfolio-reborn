import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Repository } from "./types";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

interface ProjectsGridProps {
  projects: Repository[];
  isLoading: boolean;
  error: string | null; // Allow null for error
}

const ProjectsGrid = ({ projects, isLoading, error }: ProjectsGridProps) => {
  // Animation for the grid container itself, if needed, or rely on parent section animation
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animation for each card
      },
    },
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={`skeleton-${i}`} className="bg-white/5 p-6 rounded-lg shadow-lg min-h-[200px] flex flex-col justify-between animate-pulse">
            <div className="w-3/4 h-6 bg-white/10 rounded mb-4"></div>
            <div className="w-full h-4 bg-white/10 rounded mb-2"></div>
            <div className="w-5/6 h-4 bg-white/10 rounded mb-4"></div>
            <div className="w-1/2 h-8 bg-white/10 rounded mt-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-white/70 py-10">
        <p className="text-xl">Could not load projects.</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center text-white/70 py-10">
        <p className="text-xl">No projects to display at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            // isFeatured={index === 0} // Simplified: feature status can be part of project data if needed
          />
        ))}
      </motion.div>

      <div className="mt-12 md:mt-16 text-center">
        <Button
          variant="outline" // This will use Tailwind CSS variables for border/text which should be white/light gray on dark
          size="lg"
          asChild
          className="group bg-transparent hover:bg-white/10 border-white/30 hover:border-white/50 text-white transition-colors duration-300"
        >
          <a href="https://github.com/lingadevaru-hp" target="_blank" rel="noopener noreferrer">
            View More on GitHub
            <Github className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
    </>
  );
};

export default ProjectsGrid;

