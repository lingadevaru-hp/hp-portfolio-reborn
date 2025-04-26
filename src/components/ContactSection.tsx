import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Github, Twitter, Instagram, Mail, Send, BookUser } from "lucide-react";
import { StackOverflowIcon, YogaIcon } from "@/components/icons/CustomIcons";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  const socialLinks = [
    { 
      name: "GitHub", 
      username: "lingadevaru-hp", 
      icon: Github, 
      url: "https://github.com/lingadevaru-hp",
      color: "hover:text-[#f0f6fc] hover:bg-[#24292e]"
    },
    { 
      name: "Devfolio", 
      username: "lingadevaruhp", 
      icon: () => (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm0 4.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM12 6c3.312 0 6 2.688 6 6s-2.688 6-6 6-6-2.688-6-6 2.688-6 6-6z"/>
        </svg>
      ), 
      url: "https://devfolio.co/@lingadevaruhp",
      color: "hover:text-white hover:bg-[#3770FF]"
    },
    { 
      name: "Twitter", 
      username: "lingadevaruhp", 
      icon: Twitter, 
      url: "https://twitter.com/lingadevaruhp",
      color: "hover:text-white hover:bg-[#1DA1F2]"
    },
    { 
      name: "Instagram", 
      username: "lingadevaruhp", 
      icon: Instagram, 
      url: "https://instagram.com/lingadevaruhp",
      color: "hover:text-white hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]"
    },
    { 
      name: "Stack Overflow", 
      username: "lingadevaruhp", 
      icon: StackOverflowIcon, 
      url: "https://stackoverflow.com/users/lingadevaruhp", 
      color: "hover:text-white hover:bg-[#f48024]"
    },
    { 
      name: "Email", 
      username: "contact@lingadevaru.in", 
      icon: Mail, 
      url: "mailto:contact@lingadevaru.in",
      color: "hover:text-white hover:bg-gradient-to-r from-primary to-accent"
    },
  ];

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <motion.div 
        className="section-container"
        style={{ opacity, y }}
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feel free to reach out if you want to collaborate, have a question, or just want to connect!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <Card className="bg-card/50 border-gradient overflow-hidden h-full shadow-sm hover:shadow-md hover:shadow-primary/10 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-[120px] bg-background/50"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full group" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-6">Connect With Me</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center p-4 rounded-lg bg-card/50 hover:shadow-md border border-border/50 transition-all duration-300 ${social.color}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-background/50 text-primary">
                    <social.icon size={20} />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">{social.name}</p>
                    <p className="text-sm text-muted-foreground">@{social.username}</p>
                  </div>
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              className="mt-8 p-6 bg-card/30 rounded-lg backdrop-blur-sm border border-primary/10"
              variants={itemVariants}
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
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
