
import { motion } from "framer-motion";
import { Github, Twitter, Instagram, Mail } from "lucide-react";
import { StackOverflowIcon } from "@/components/icons/CustomIcons";

interface SocialLink {
  name: string;
  username: string;
  icon: React.FC<{ size?: number }>;
  url: string;
  color: string;
}

const socialLinks: SocialLink[] = [
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

const SocialLinks = () => {
  return (
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
  );
};

export default SocialLinks;
