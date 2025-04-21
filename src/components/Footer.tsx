
import { Github, Linkedin, Mail, Twitter, Instagram, StackOverflow, Yoga } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: "https://github.com/lingadevaru-hp", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/lingadevaruhp", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/lingadevaruhp", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/lingadevaruhp", label: "Instagram" },
    { icon: StackOverflow, href: "https://stackoverflow.com/users/lingadevaruhp", label: "Stack Overflow" },
    { icon: Mail, href: "mailto:contact@lingadevaru.in", label: "Email" },
  ];

  const mainLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Projects", href: "/projects" },
    { label: "Yoga", href: "/yoga" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-secondary/50 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold gradient-text inline-block mb-4">
              Lingadevaru<span className="text-accent"> HP</span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-4">
              A curious mind exploring the intersection of technology and mindfulness. Passionate about creating elegant solutions while maintaining balance.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors"
                  aria-label={link.label}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <link.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 gradient-text">Pages</h3>
            <ul className="space-y-2">
              {mainLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 gradient-text">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/lingadevaru-hp" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <Github size={16} className="mr-2" />
                  @lingadevaru-hp
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com/in/lingadevaruhp" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <Linkedin size={16} className="mr-2" />
                  @lingadevaruhp
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com/lingadevaruhp" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <Twitter size={16} className="mr-2" />
                  @lingadevaruhp
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@lingadevaru.in" 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <Mail size={16} className="mr-2" />
                  contact@lingadevaru.in
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/30 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm mb-4 sm:mb-0">
            © {currentYear} Lingadevaru HP. All rights reserved.
          </p>
          <div className="flex items-center text-sm text-muted-foreground">
            <Link to="/" className="mr-4 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
