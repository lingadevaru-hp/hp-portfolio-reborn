import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Repository } from "./types";

interface ProjectCardProps {
  project: Repository;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  // Card animation variant (can be simplified or made consistent)
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="h-full flex flex-col bg-white/5 hover:bg-white/10 transition-colors duration-300 rounded-lg shadow-lg overflow-hidden border border-white/10"
      // Removed whileHover for a cleaner look, relying on bg change
    >
      <div className="p-5 sm:p-6 flex-grow flex flex-col">
        <h3 className="text-xl lg:text-2xl font-semibold text-white mb-2 truncate">
          {project.name}
        </h3>
        <p className="text-sm text-white/70 mb-4 line-clamp-3 flex-grow">
          {project.description || "No description available."}
        </p>
        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.topics.slice(0, 4).map((topic) => (
              <Badge
                key={topic}
                variant="secondary" // This uses theme colors, ensure it looks good on dark bg
                className="bg-white/10 text-white/80 text-xs px-2 py-1"
              >
                {topic}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="p-5 sm:p-6 border-t border-white/10 flex items-center justify-between bg-black/10">
        <Button variant="ghost" size="sm" asChild className="text-white/80 hover:text-white hover:bg-white/5 group">
          <a href={project.html_url} target="_blank" rel="noopener noreferrer" aria-label={`View source code for ${project.name} on GitHub`}>
            <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            Code
          </a>
        </Button>
        {project.homepage && (
          <Button variant="outline" size="sm" asChild className="text-white/80 hover:text-white bg-transparent hover:bg-white/10 border-white/30 hover:border-white/50 group">
            <a href={project.homepage} target="_blank" rel="noopener noreferrer" aria-label={`Visit live demo for ${project.name}`}>
              Demo
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;

