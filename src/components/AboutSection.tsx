
import { Card, CardContent } from "@/components/ui/card";
import { User, Code, Book, Heart, Cpu, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutSection = () => {
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
    <section id="about" className="py-20 bg-secondary/30">
      <motion.div 
        className="section-container"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <p className="text-muted-foreground mb-6 text-lg">
              Hello! I'm Lingadevaru HP, a computer science student with a passion for the harmonious blend of technology and mindfulness. I believe in creating technology that enhances human experiences while maintaining a balanced approach to life.
            </p>
            <p className="text-muted-foreground mb-6 text-lg">
              My journey began with a curiosity about how systems work, which led me to fall in love with Linux and open-source philosophy. This same curiosity extends to my yoga practice, where I explore the system of mind and body.
            </p>
            <p className="text-muted-foreground text-lg">
              When I'm not immersed in code or exploring new technologies, you can find me on my yoga mat, contributing to open-source projects, or diving into the fascinating world of intelligent systems that enhance human potential.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <Card className="bg-card/50 border-gradient overflow-hidden h-full hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 text-primary">
                    <User size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Personal</h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li className="flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-accent" />
                      Mindful Practitioner
                    </li>
                    <li className="flex items-center">
                      <Coffee className="h-4 w-4 mr-2 text-accent" />
                      Minimalist
                    </li>
                    <li className="flex items-center">
                      <Cpu className="h-4 w-4 mr-2 text-accent" />
                      Tech Explorer
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-card/50 border-gradient overflow-hidden h-full hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 text-primary">
                    <Code size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Passions</h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li className="flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-accent" />
                      Open Source
                    </li>
                    <li className="flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-accent" />
                      Linux Ecosystem
                    </li>
                    <li className="flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-accent" />
                      Intelligent Systems
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="sm:col-span-2">
              <Card className="bg-card/50 border-gradient overflow-hidden hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 text-accent">
                    <Book size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Education & Philosophy</h3>
                  <div className="text-muted-foreground">
                    <p className="font-medium mb-2">Bachelor of Computer Science</p>
                    <p className="mb-4">Expected Graduation: 2024</p>
                    <p>I believe in the power of mindful technology — creating systems that enhance human capabilities while respecting our inherent need for balance and well-being.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
