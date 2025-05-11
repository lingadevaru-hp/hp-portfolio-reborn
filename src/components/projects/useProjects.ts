
import { useState, useEffect } from "react";
import { fetchGithubProjects, getDefaultProjects } from "./projectsAPI";
import { Repository } from "./types";

export const useProjects = () => {
  const [projects, setProjects] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGithubProjects();
        
        const { localPulseProject, academicMirrorProject } = getDefaultProjects();
        
        const filteredProjects = data
          .filter((repo: Repository) => !repo.fork)
          .slice(0, 4); // Reduced to 4 to make room for our custom projects
          
        setProjects([localPulseProject, academicMirrorProject, ...filteredProjects]);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load all projects from GitHub. Showing available ones.");
        
        // Fallback with default projects if GitHub API fails
        const { fallbackProjects } = getDefaultProjects();
        setProjects(fallbackProjects);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  return { projects, isLoading, error };
};
