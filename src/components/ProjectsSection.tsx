
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Link, ExternalLink } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  fork: boolean;
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      },
    },
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://api.github.com/users/lingadevaru-hp/repos");
        
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        
        const data = await response.json();
        
        // Add Academic Mirror project at the beginning
        const academicMirrorProject: Repository = {
          id: 999999, // Unique ID
          name: "Academic Mirror",
          description: "Smart solution to view academic data at a glance. A streamlined platform for academic information management.",
          html_url: "https://github.com/lingadevaru-hp/academic-mirror",
          homepage: "https://academicsmirror.lingadevaru.in",
          topics: ["react", "education", "dashboard", "academic-data"],
          fork: false
        };
        
        const filteredProjects = data
          .filter((repo: Repository) => !repo.fork)
          .slice(0, 5);
          
        setProjects([academicMirrorProject, ...filteredProjects]);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load all projects from GitHub. Showing available ones.");
        
        // Fallback with at least the Academic Mirror project
        setProjects([
          {
            id: 999999,
            name: "Academic Mirror",
            description: "Smart solution to view academic data at a glance. A streamlined platform for academic information management.",
            html_url: "https://github.com/lingadevaru-hp/academic-mirror",
            homepage: "https://academicsmirror.lingadevaru.in",
            topics: ["react", "education", "dashboard", "academic-data"],
            fork: false
          },
          {
            id: 1,
            name: "Portfolio Website",
            description: "Personal portfolio website built with React and Tailwind CSS",
            html_url: "#",
            homepage: "#",
            topics: ["react", "typescript", "tailwindcss"],
            fork: false
          },
          {
            id: 2,
            name: "E-Commerce Platform",
            description: "Full-stack e-commerce application with user authentication and payment processing",
            html_url: "#",
            homepage: "#",
            topics: ["javascript", "node", "mongodb", "express"],
            fork: false
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="py-20 bg-secondary/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <motion.div 
        className="section-container"
        style={{ opacity, y }}
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={cardVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my creations — each one represents a unique challenge and learning opportunity.
          </p>
        </motion.div>

        {isLoading ? (
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
        ) : error ? (
          <div className="text-center text-muted-foreground mb-8">
            <p>{error}</p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
              className={index === 0 ? "md:col-span-2 lg:col-span-3" : ""}
            >
              <Card 
                className={`h-full flex flex-col overflow-hidden ${
                  index === 0 
                    ? "bg-gradient-to-br from-card/90 to-card/60 border-gradient shadow-lg shadow-primary/10" 
                    : "bg-card/50 border-gradient/50"
                }`}
              >
                <CardHeader className={index === 0 ? "pb-2" : ""}>
                  <CardTitle className={`truncate ${index === 0 ? "text-2xl" : "text-lg"}`}>
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
                  <CardDescription className={`text-muted-foreground ${index === 0 ? "text-base line-clamp-4" : "line-clamp-3"}`}>
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
                      variant={index === 0 ? "default" : "ghost"} 
                      size={index === 0 ? "default" : "sm"}
                      asChild
                      className={index === 0 ? "hover:shadow-md hover:shadow-primary/20" : ""}
                    >
                      <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="group">
                        {index === 0 ? (
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
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
