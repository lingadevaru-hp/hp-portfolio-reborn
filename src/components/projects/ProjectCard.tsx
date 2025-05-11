
import { motion } from "framer-motion";
import { Github, Link, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Repository } from "./types";

interface ProjectCardProps {
  project: Repository;
  isFeatured?: boolean;
  variants: any;
}

const ProjectCard = ({ project, isFeatured = false, variants }: ProjectCardProps) => {
  return (
    <motion.div 
      variants={variants}
      whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
      className={isFeatured ? "md:col-span-2 lg:col-span-3" : ""}
    >
      <Card 
        className={`h-full flex flex-col overflow-hidden ${
          isFeatured 
            ? "bg-gradient-to-br from-card/90 to-card/60 border-gradient shadow-lg shadow-primary/10" 
            : "bg-card/50 border-gradient/50"
        }`}
      >
        <CardHeader className={isFeatured ? "pb-2" : ""}>
          <CardTitle className={`truncate ${isFeatured ? "text-2xl" : "text-lg"}`}>
            {project.name}
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.topics && project.topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="secondary" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className={`text-muted-foreground ${isFeatured ? "text-base line-clamp-4" : "line-clamp-3"}`}>
            {project.description || "No description available"}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between pt-2 border-t border-border/30">
          <Button variant="ghost" size="sm" asChild>
            <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="group">
              <Github className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Code
            </a>
          </Button>
          {project.homepage && (
            <Button 
              variant={isFeatured ? "default" : "ghost"} 
              size={isFeatured ? "default" : "sm"}
              asChild
              className={isFeatured ? "hover:shadow-md hover:shadow-primary/20" : ""}
            >
              <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="group">
                {isFeatured ? (
                  <>
                    Visit Site
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                ) : (
                  <>
                    <Link className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    Demo
                  </>
                )}
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
