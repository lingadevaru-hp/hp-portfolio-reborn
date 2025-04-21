
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Canvas } from "@react-three/fiber";
import { Float, PerspectiveCamera, Center, Environment } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { 
  Terminal, 
  Cpu, 
  Brain, 
  LucideIcon, 
  Layers, 
  GitBranch, 
  Code, 
  Network,
  Flower,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Component for interest cards
const InterestCard = ({ 
  icon: Icon, 
  title, 
  description, 
  colorClass = "bg-primary/10",
  borderClass = "border-primary/10",
  delay = 0 
}: { 
  icon: LucideIcon, 
  title: string, 
  description: string,
  colorClass?: string,
  borderClass?: string,
  delay?: number
}) => {
  return (
    <motion.div
      className={`p-6 ${colorClass} rounded-lg backdrop-blur-sm border ${borderClass} transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ 
        scale: 1.03, 
        boxShadow: "0 10px 30px rgba(155, 135, 245, 0.1)" 
      }}
    >
      <div className="flex items-start">
        <div className="bg-background/50 p-3 rounded-full">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold mb-2 gradient-text">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const YogaPoseModel = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <Center>
        <Float
          speed={1.5} 
          rotationIntensity={0.5}
          floatIntensity={2.0}
        >
          <group>
            {/* Create "BALANCE" with individual letter objects */}
            <group position={[-1.75, 0, 0]}>
              <mesh>
                <boxGeometry args={[0.2, 1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0, 0.45, 0]}>
                <boxGeometry args={[0.5, 0.1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.5, 0.1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0, -0.45, 0]}>
                <boxGeometry args={[0.5, 0.1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
            </group>
            
            {/* A */}
            <group position={[-1, 0, 0]}>
              <mesh position={[-0.15, 0, 0]}>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0.15, 0, 0]}>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0, 0.45, 0]}>
                <boxGeometry args={[0.4, 0.1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.4, 0.1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
            </group>
            
            {/* L */}
            <group position={[-0.25, 0, 0]}>
              <mesh position={[-0.15, 0, 0]}>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0.05, -0.45, 0]}>
                <boxGeometry args={[0.4, 0.1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
            </group>
            
            {/* A */}
            <group position={[0.5, 0, 0]}>
              <mesh position={[-0.15, 0, 0]}>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0.15, 0, 0]}>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0, 0.45, 0]}>
                <boxGeometry args={[0.4, 0.1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.4, 0.1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
            </group>
            
            {/* N */}
            <group position={[1.25, 0, 0]}>
              <mesh position={[-0.15, 0, 0]}>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0.15, 0, 0]}>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[0.5, 0.1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
            </group>
            
            {/* C */}
            <group position={[2, 0, 0]}>
              <mesh position={[-0.15, 0, 0]}>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0.05, 0.45, 0]}>
                <boxGeometry args={[0.4, 0.1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0.05, -0.45, 0]}>
                <boxGeometry args={[0.4, 0.1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
            </group>
            
            {/* E */}
            <group position={[2.65, 0, 0]}>
              <mesh position={[-0.15, 0, 0]}>
                <boxGeometry args={[0.1, 1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0.05, 0.45, 0]}>
                <boxGeometry args={[0.4, 0.1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0.05, 0, 0]}>
                <boxGeometry args={[0.4, 0.1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[0.05, -0.45, 0]}>
                <boxGeometry args={[0.4, 0.1, 0.1]} />
                <meshStandardMaterial color="#9b87f5" emissive="#8B5CF6" emissiveIntensity={0.5} />
              </mesh>
            </group>
          </group>
        </Float>
      </Center>
      <Environment preset="city" />
    </>
  );
};

const YogaSection = () => {
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

  const interests = [
    {
      icon: Terminal,
      title: "Linux Enthusiast",
      description: "Exploring the power and flexibility of Linux systems with a focus on customization and open-source solutions.",
      colorClass: "bg-accent/10",
      borderClass: "border-accent/10",
      delay: 0.1
    },
    {
      icon: GitBranch,
      title: "Open Source Advocate",
      description: "Contributing to and supporting open-source projects that empower developers and users worldwide.",
      colorClass: "bg-primary/10",
      borderClass: "border-primary/10",
      delay: 0.2
    },
    {
      icon: Brain,
      title: "AI Exploration",
      description: "Delving into artificial intelligence and machine learning to create innovative solutions to complex problems.",
      colorClass: "bg-accent/10", 
      borderClass: "border-accent/10",
      delay: 0.3
    },
    {
      icon: Flower,
      title: "Yoga Practice",
      description: "Finding balance through yoga, integrating mind and body awareness into daily life and technical work.",
      colorClass: "bg-primary/10",
      borderClass: "border-primary/10",
      delay: 0.4
    }
  ];

  return (
    <section ref={containerRef} className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <motion.div 
        style={{ opacity, y }}
        className="section-container py-32"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Passions</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exploring the harmonious balance between technology, mindfulness, and creativity in everything I do.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {interests.map((interest, index) => (
            <InterestCard 
              key={index}
              icon={interest.icon}
              title={interest.title}
              description={interest.description}
              colorClass={interest.colorClass}
              borderClass={interest.borderClass}
              delay={interest.delay}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-16">
          <motion.div 
            className="relative w-full h-[400px]" 
            variants={itemVariants}
          >
            <Canvas className="!absolute inset-0">
              <YogaPoseModel />
            </Canvas>
          </motion.div>

          <motion.div 
            className="space-y-6" 
            variants={itemVariants}
          >
            <motion.h3 
              className="text-2xl md:text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Finding <span className="gradient-text">Balance</span> in Technology
            </motion.h3>

            <motion.p 
              className="text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              At the intersection of Linux, open-source, yoga, and AI, I've discovered a unique approach to technology 
              that values both innovation and mindfulness. This balance helps me create solutions that are not only 
              technically sound but also user-centered and ethical.
            </motion.p>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <span className="ml-3 text-foreground">Clean Code</span>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cpu className="h-5 w-5 text-primary" />
                </div>
                <span className="ml-3 text-foreground">System Optimization</span>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Network className="h-5 w-5 text-primary" />
                </div>
                <span className="ml-3 text-foreground">AI Applications</span>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <span className="ml-3 text-foreground">Open Source</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <Button asChild size="lg" className="group">
                <Link to="/projects">
                  Explore My Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default YogaSection;
