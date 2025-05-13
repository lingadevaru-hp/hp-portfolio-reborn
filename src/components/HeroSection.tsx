import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail, Twitter, Instagram } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import TypewriterText from "@/components/TypewriterText";
import NameSwitcher from "@/components/NameSwitcher";

const HeroSection = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const roles = ["Computer Science Student", "Linux Enthusiast", "Yoga Practitioner", "AI Enthusiast"];
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section 
      ref={containerRef} 
      id="home" 
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden snap-start"
    >
      <motion.div 
        className="absolute inset-0 -z-10" 
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl"></div>
      </motion.div>
      
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div 
          className="max-w-3xl mx-auto text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          ref={ref}
        >
          <motion.h2 
            className="text-lg font-medium text-accent mb-3"
            variants={itemVariants}
          >
            Hello, I'm
          </motion.h2>
          
          <NameSwitcher className="gradient-text" />
          
          <div className="h-12 mb-8 flex items-center justify-center lg:justify-start overflow-hidden">
            <motion.div
              key={visibleIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground font-medium"
            >
              {roles[visibleIndex]}
            </motion.div>
          </div>
          
          <motion.div 
            className="relative max-h-[120px] overflow-hidden mb-8"
            variants={itemVariants}
          >
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 line-clamp-3 sm:line-clamp-none">
              Tech enthusiast | Linux & open-source advocate | AI explorer | Yoga for balance
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            variants={itemVariants}
          >
            <Button asChild size="lg" className="group">
              <Link to="/projects">
                View My Work 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="group">
              <Link to="/yoga">
                Explore Yoga
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex justify-center lg:justify-start space-x-6"
            variants={itemVariants}
          >
            <motion.a 
              href="https://github.com/lingadevaru-hp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground/70 hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/lingadevaruhp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground/70 hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </motion.a>
            <motion.a 
              href="https://twitter.com/lingadevaruhp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground/70 hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </motion.a>
            <motion.a 
              href="https://instagram.com/lingadevaruhp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground/70 hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </motion.a>
            <motion.a 
              href="https://devfolio.co/@lingadevaruhp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground/70 hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1, y: -5 }}
              aria-label="Devfolio"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm0 4.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM12 6c3.312 0 6 2.688 6 6s-2.688 6-6 6-6-2.688-6-6 2.688-6 6-6z"/>
              </svg>
              <span className="sr-only">Devfolio</span>
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="w-full h-[350px] sm:h-[400px] lg:h-[500px] relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img src="https://media1.tenor.com/m/Bpv9wTLKMskAAAAC/computer-nerds.gif" alt="Computer Nerds" className="w-full h-full object-contain mx-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
