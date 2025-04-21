
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Canvas } from "@react-three/fiber";
import { Float, PerspectiveCamera, Center, Environment } from "@react-three/drei";

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

  return (
    <section ref={containerRef} className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <motion.div 
        style={{ opacity, y }}
        className="section-container py-32 flex flex-col items-center"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Finding <span className="gradient-text">Balance</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Yoga is more than exercise — it's a practice that connects mind, body, and technology in perfect harmony.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="relative w-full h-[400px]" 
            variants={itemVariants}
          >
            <Canvas className="!absolute inset-0">
              <YogaPoseModel />
            </Canvas>
          </motion.div>

          <motion.div 
            className="space-y-8" 
            variants={itemVariants}
          >
            <motion.div 
              className="p-6 bg-card/30 rounded-lg backdrop-blur-sm border border-accent/10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h3 className="text-xl font-semibold mb-3 gradient-text">Balance in Technology</h3>
              <p className="text-muted-foreground">
                Just as yoga helps find balance in postures, I seek balance in my relationship with technology — being immersed yet mindful, connected yet present.
              </p>
            </motion.div>

            <motion.div 
              className="p-6 bg-card/30 rounded-lg backdrop-blur-sm border border-primary/10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h3 className="text-xl font-semibold mb-3 gradient-text">Daily Practice</h3>
              <p className="text-muted-foreground">
                My morning yoga routine grounds me before diving into code. This intentional practice brings clarity to problem-solving and creativity to my technical work.
              </p>
            </motion.div>

            <motion.div 
              className="p-6 bg-card/30 rounded-lg backdrop-blur-sm border border-accent/10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h3 className="text-xl font-semibold mb-3 gradient-text">Mindful Development</h3>
              <p className="text-muted-foreground">
                The principles of yoga — patience, persistence, and presence — inform how I approach software development and learning new technologies.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default YogaSection;
