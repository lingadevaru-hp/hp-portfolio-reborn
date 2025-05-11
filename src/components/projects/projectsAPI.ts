
import { Repository } from "./types";

export const fetchGithubProjects = async (): Promise<Repository[]> => {
  const response = await fetch("https://api.github.com/users/lingadevaru-hp/repos");
  
  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }
  
  return await response.json();
};

export const getDefaultProjects = () => {
  // LocalPulse project
  const localPulseProject: Repository = {
    id: 888888, // Unique ID
    name: "LocalPulse",
    description: "A platform for local insights and community engagement. Discover what's happening in your area with real-time updates.",
    html_url: "https://github.com/lingadevaru-hp/localpulse",
    homepage: "https://localpulse.lingadevaru.in",
    topics: ["react", "community", "local-insights", "real-time"],
    fork: false
  };
  
  // Academic Mirror project
  const academicMirrorProject: Repository = {
    id: 999999, // Unique ID
    name: "Academic Mirror",
    description: "Smart solution to view academic data at a glance. A streamlined platform for academic information management.",
    html_url: "https://github.com/lingadevaru-hp/academic-mirror-final",
    homepage: "https://academic-mirror.lingadevaru.in",
    topics: ["react", "education", "dashboard", "academic-data"],
    fork: false
  };
  
  // Fallback projects in case GitHub API fails
  const fallbackProjects: Repository[] = [
    localPulseProject,
    academicMirrorProject,
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
  ];

  return { localPulseProject, academicMirrorProject, fallbackProjects };
};
