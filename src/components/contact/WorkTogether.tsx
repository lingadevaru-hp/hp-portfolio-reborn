
import { BookUser } from "lucide-react";
import { motion } from "framer-motion";

const WorkTogether = () => {
  return (
    <motion.div 
      className="mt-8 p-6 bg-card/30 rounded-lg backdrop-blur-sm border border-primary/10"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="flex items-start">
        <BookUser className="h-6 w-6 text-primary mt-1" />
        <div className="ml-4">
          <h4 className="text-lg font-medium mb-2">Let's Work Together</h4>
          <p className="text-muted-foreground">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkTogether;
