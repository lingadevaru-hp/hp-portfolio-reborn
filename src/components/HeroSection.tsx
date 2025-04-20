
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const HeroSection = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const roles = ["Computer Science Student", "Software Developer", "Tech Enthusiast"];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-lg font-medium text-accent mb-3 opacity-0 animate-fadeIn animate-delay-100">
            Hello, I'm
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 opacity-0 animate-fadeIn animate-delay-200">
            Lingadevaru <span className="gradient-text">HP</span>
          </h1>
          
          <div className="h-8 md:h-12 mb-6 opacity-0 animate-fadeIn animate-delay-300">
            {roles.map((role, index) => (
              <p 
                key={role} 
                className={`text-xl md:text-2xl text-muted-foreground font-medium transition-all duration-500 absolute left-0 right-0 ${index === visibleIndex ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}
              >
                {role}
              </p>
            ))}
          </div>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto opacity-0 animate-fadeIn animate-delay-400">
            Passionate about creating elegant solutions to complex problems. Currently focusing on web development and machine learning.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 opacity-0 animate-fadeIn animate-delay-500">
            <Button asChild size="lg">
              <a href="#projects">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">
                Get In Touch
              </a>
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6 opacity-0 animate-fadeIn animate-delay-500">
            <a href="https://github.com/lingadevaru-hp" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://linkedin.com/in/lingadevaruhp" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="mailto:contact@lingadevaru.com" className="text-foreground/70 hover:text-foreground transition-colors">
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
