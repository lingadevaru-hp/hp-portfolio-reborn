
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Link } from "lucide-react";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://api.github.com/users/lingadevaru-hp/repos");
        
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        
        const data = await response.json();
        
        // Filter out forked repositories and sort by updated date
        const filteredProjects = data
          .filter((repo: Repository) => !repo.fork)
          .slice(0, 6);
          
        setProjects(filteredProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
        // Set fallback projects if GitHub API fails
        setProjects([
          {
            id: 1,
            name: "Portfolio Website",
            description: "Personal portfolio website built with React and Tailwind CSS",
            html_url: "#",
            homepage: "#",
            topics: ["react", "typescript", "tailwindcss"]
          },
          {
            id: 2,
            name: "E-Commerce Platform",
            description: "Full-stack e-commerce application with user authentication and payment processing",
            html_url: "#",
            homepage: "#",
            topics: ["javascript", "node", "mongodb", "express"]
          },
          {
            id: 3,
            name: "Task Management App",
            description: "A task management application with drag-and-drop functionality",
            html_url: "#",
            homepage: "#",
            topics: ["react", "redux", "firebase"]
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects. Each one represents a unique challenge and learning opportunity.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-card/50 border border-border/50 h-64 animate-pulse">
                <CardContent className="p-6">
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground">Loading projects...</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-destructive">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="bg-card/50 border-gradient overflow-hidden h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg truncate">{project.name}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.topics && project.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-muted-foreground line-clamp-3">
                    {project.description || "No description available"}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 border-t border-border/30">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  {project.homepage && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                        <Link className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/lingadevaru-hp" target="_blank" rel="noopener noreferrer">
              View More on GitHub
              <Github className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
