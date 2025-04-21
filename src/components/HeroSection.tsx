
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail, Twitter, Instagram, Code } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import Scene3D from "@/components/Scene3D";
import { useInView } from "react-intersection-observer";
import { YogaIcon } from "@/components/icons/CustomIcons";

const HeroSection = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const roles = ["Computer Science Student", "Linux Enthusiast", "Yoga Practitioner"];
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
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
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
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            variants={itemVariants}
          >
            Lingadevaru <span className="gradient-text">HP</span>
          </motion.h1>
          
          <div className="h-8 md:h-12 mb-6 relative">
            {roles.map((role, index) => (
              <motion.p 
                key={role} 
                className={`text-xl md:text-2xl text-muted-foreground font-medium transition-all duration-500 absolute left-0 right-0 lg:left-0 lg:right-auto ${index === visibleIndex ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}
                variants={itemVariants}
              >
                {role}
              </motion.p>
            ))}
          </div>
          
          <motion.p 
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
            variants={itemVariants}
          >
            I'm a curious mind exploring the intersection of technology and mindfulness. 
            Passionate about creating elegant solutions while maintaining balance through yoga and open-source contributions.
          </motion.p>
          
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
                <YogaIcon className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                Explore Yoga
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
              whileHover={{ 
                scale: 1.1,
                y: -5,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/lingadevaruhp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground/70 hover:text-foreground transition-colors"
              whileHover={{ 
                scale: 1.1,
                y: -5,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </motion.a>
            <motion.a 
              href="https://twitter.com/lingadevaruhp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground/70 hover:text-foreground transition-colors"
              whileHover={{ 
                scale: 1.1,
                y: -5,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </motion.a>
            <motion.a 
              href="https://instagram.com/lingadevaruhp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground/70 hover:text-foreground transition-colors"
              whileHover={{ 
                scale: 1.1,
                y: -5,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="w-full h-[400px] lg:h-[500px] relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3,
            type: "spring",
            stiffness: 50
          }}
        >
          <Scene3D />
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        animate={{ 
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop"
        }}
        style={{ opacity }}
      >
        <p className="text-sm text-muted-foreground mb-2">Scroll to explore</p>
        <ArrowRight className="h-5 w-5 rotate-90 text-primary" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
