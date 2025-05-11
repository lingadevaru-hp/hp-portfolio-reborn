
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Repository } from "./types";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

interface ProjectsGridProps {
  projects: Repository[];
  isLoading: boolean;
  error: string;
  cardVariants: any;
}

const ProjectsGrid = ({ projects, isLoading, error, cardVariants }: ProjectsGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card/50 border border-border/50 h-64 animate-pulse rounded-lg">
            <div className="p-6">
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Loading projects...</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-muted-foreground mb-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            isFeatured={index === 0}
            variants={cardVariants}
          />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Button variant="outline" size="lg" asChild className="group">
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
