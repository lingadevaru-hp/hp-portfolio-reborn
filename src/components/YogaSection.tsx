import { useRef } from "react";
import { motion } from "framer-motion";
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
  Code as CodeIcon, // Renamed to avoid conflict with Code component if any
  Network,
  Flower,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Component for interest cards - simplified for less prominence
const InterestCard = ({
  icon: Icon,
  title,
  description,
  delay = 0
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}) => {
  return (
    <motion.div
      className="p-6 bg-white/5 rounded-lg border border-white/10 transition-all duration-300 hover:bg-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }} // Trigger sooner
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100
      }}
    >
      <div className="flex items-start">
        <div className="bg-white/10 p-3 rounded-full">
          {/* Use a consistent, less vibrant color for icons in this section if needed */}
          <Icon className="h-6 w-6 text-white/70" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold mb-1 text-white/90">{title}</h3>
          <p className="text-sm text-white/60">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// 3D Model - Kept as existing content, ensure it doesn't cause performance issues on less prominent page
const YogaPoseModel = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <Center>
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.5}>
          {/* Using a simpler representation or a pre-made model would be better for performance */}
          {/* For now, keeping the existing "BALANCE" text model */}
          <group scale={0.8}> {/* Scaled down slightly */}
            {/* B */}
            <group position={[-1.75, 0, 0]}>
              <mesh>
                <boxGeometry args={[0.2, 1, 0.1]} />
                <meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} />
              </mesh>
              <mesh position={[0, 0.45, 0]}><boxGeometry args={[0.5, 0.1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
              <mesh position={[0, 0, 0]}><boxGeometry args={[0.5, 0.1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
              <mesh position={[0, -0.45, 0]}><boxGeometry args={[0.5, 0.1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
            </group>
            {/* A */}
            <group position={[-1, 0, 0]}>
              <mesh position={[-0.15, 0, 0]}><boxGeometry args={[0.1, 1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
              <mesh position={[0.15, 0, 0]}><boxGeometry args={[0.1, 1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
              <mesh position={[0, 0.45, 0]}><boxGeometry args={[0.4, 0.1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
              <mesh position={[0, 0, 0]}><boxGeometry args={[0.4, 0.1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
            </group>
            {/* L */}
            <group position={[-0.25, 0, 0]}>
              <mesh position={[-0.15, 0, 0]}><boxGeometry args={[0.1, 1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
              <mesh position={[0.05, -0.45, 0]}><boxGeometry args={[0.4, 0.1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
            </group>
            {/* A */}
            <group position={[0.5, 0, 0]}>
              <mesh position={[-0.15, 0, 0]}><boxGeometry args={[0.1, 1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
              <mesh position={[0.15, 0, 0]}><boxGeometry args={[0.1, 1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
              <mesh position={[0, 0.45, 0]}><boxGeometry args={[0.4, 0.1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
              <mesh position={[0, 0, 0]}><boxGeometry args={[0.4, 0.1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
            </group>
            {/* N */}
            <group position={[1.25, 0, 0]}>
              <mesh position={[-0.15, 0, 0]}><boxGeometry args={[0.1, 1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
              <mesh position={[0.15, 0, 0]}><boxGeometry args={[0.1, 1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
              <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[0.5, 0.1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
            </group>
            {/* C */}
            <group position={[2, 0, 0]}>
              <mesh position={[-0.15, 0, 0]}><boxGeometry args={[0.1, 1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
              <mesh position={[0.05, 0.45, 0]}><boxGeometry args={[0.4, 0.1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
              <mesh position={[0.05, -0.45, 0]}><boxGeometry args={[0.4, 0.1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
            </group>
            {/* E */}
            <group position={[2.65, 0, 0]}>
              <mesh position={[-0.15, 0, 0]}><boxGeometry args={[0.1, 1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
              <mesh position={[0.05, 0.45, 0]}><boxGeometry args={[0.4, 0.1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
              <mesh position={[0.05, 0, 0]}><boxGeometry args={[0.4, 0.1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
              <mesh position={[0.05, -0.45, 0]}><boxGeometry args={[0.4, 0.1, 0.1]} /><meshStandardMaterial color="#A899F7" emissive="#8B5CF6" emissiveIntensity={0.3} /></mesh>
            </group>
          </group>
        </Float>
      </Center>
      <Environment preset="sunset" /> {/* Changed environment for a calmer feel */}
    </>
  );
};

const YogaSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Animate once
    threshold: 0.1,
  });

  // Simplified animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const interests = [
    {
      icon: Terminal,
      title: "Linux Enthusiast",
      description: "Exploring Linux systems with a focus on customization and open-source.",
      delay: 0.1
    },
    {
      icon: GitBranch,
      title: "Open Source Advocate",
      description: "Contributing to open-source projects that empower developers globally.",
      delay: 0.2
    },
    {
      icon: Brain,
      title: "AI Exploration",
      description: "Delving into AI and machine learning for innovative solutions.",
      delay: 0.3
    },
    {
      icon: Flower, // Yoga icon
      title: "Yoga & Mindfulness", // Title more specific to Yoga
      description: "Integrating mind-body awareness into daily life and technical work.",
      delay: 0.4
    }
  ];

  return (
    <motion.section
      id="yoga" // Ensure ID matches sidebar link if this is the target page
      ref={ref}
      // Use standard Hotstar dark background, remove extra gradients for less prominence
      className="section-container py-16 md:py-24 bg-hotstar-dark text-white min-h-[calc(100vh-80px)]" 
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div className="text-center mb-12 md:mb-16" variants={itemVariants}>
        {/* Title can be more subdued or specific to Yoga if this page is solely for Yoga */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-white/90">
          Interests & Balance
        </h2>
        <div className="w-16 h-0.5 bg-white/30 mx-auto mb-6"></div> {/* More subdued divider */}
        <p className="text-md text-white/70 max-w-xl mx-auto">
          A glimpse into areas that fascinate me and how I find equilibrium.
        </p>
      </motion.div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16" variants={itemVariants}>
        {interests.map((interest, index) => (
          <InterestCard
            key={index}
            icon={interest.icon}
            title={interest.title}
            description={interest.description}
            delay={interest.delay}
          />
        ))}
      </motion.div>

      {/* Section with 3D Model - kept but styled to be less overpowering */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center" variants={itemVariants}>
        <div className="lg:col-span-2 relative w-full h-[300px] sm:h-[350px] bg-black/20 rounded-lg overflow-hidden">
          <Canvas className="!absolute inset-0">
            <YogaPoseModel />
          </Canvas>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-white/90">
            The Philosophy of Balance
          </h3>
          <p className="text-sm text-white/70">
            My approach to technology is deeply influenced by the principles of mindfulness and balance. I believe that true innovation stems from a harmonious blend of technical expertise and a human-centered perspective. This philosophy guides me in creating solutions that are not only efficient and robust but also ethical and considerate of their impact.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
            {[ "Clean Code", "System Optimization", "AI Applications", "Open Source"].map(tag => (
              <div key={tag} className="flex items-center text-sm text-white/70">
                <CodeIcon className="h-4 w-4 mr-2 text-white/50" /> {/* Using a generic code icon */}
                {tag}
              </div>
            ))}
          </div>
          <div className="pt-4">
            <Button asChild variant="outline" className="group bg-transparent hover:bg-white/10 border-white/30 hover:border-white/50 text-white transition-colors duration-300">
              <Link to="/projects">
                Explore My Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default YogaSection;

