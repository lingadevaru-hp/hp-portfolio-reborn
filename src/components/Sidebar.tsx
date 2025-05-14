import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Code,
  Briefcase,
  Heart,
  Mail,
  Menu,
  X
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  expanded: boolean;
  active: boolean;
  submenu?: string[];
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  to, 
  expanded, 
  active,
  submenu,
  onClick 
}) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const handleClick = () => {
    if (submenu && submenu.length > 0) {
      setIsSubmenuOpen(!isSubmenuOpen);
    }
    if (onClick) onClick();
  };

  return (
    <div className="relative">
      <Link 
        to={to} 
        className={`flex items-center gap-4 px-4 py-3 transition-all duration-200 cursor-pointer
          ${active ? 'bg-white/20 text-primary' : 'hover:bg-white/10 text-white'}`}
        onClick={handleClick}
      >
        <span className="text-xl">{icon}</span>
        {expanded && (
          <span className="text-sm font-medium whitespace-nowrap">{label}</span>
        )}
      </Link>

      {expanded && submenu && isSubmenuOpen && (
        <div className="ml-10 space-y-2 py-2 text-sm text-white/80">
          {submenu.map((item) => (
            <div key={item} className="hover:text-white cursor-pointer">
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Close sidebar when Escape key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Handle route changes - close mobile sidebar
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  // Define navigation items
  const navItems = [
    { icon: <Home size={20} />, label: "Home", to: "/" },
    { icon: <User size={20} />, label: "About", to: "/about" },
    { icon: <Code size={20} />, label: "Skills", to: "/skills" },
    { 
      icon: <Briefcase size={20} />, 
      label: "Projects", 
      to: "/projects",
      submenu: ["Web", "AI/ML", "Linux Tools"]
    },
    { icon: <Heart size={20} />, label: "Yoga", to: "/yoga" },
    { icon: <Mail size={20} />, label: "Contact", to: "/contact" }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 rounded-full bg-black/50 backdrop-blur-md text-white md:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className={`fixed left-0 top-0 h-screen bg-black/50 backdrop-blur-md border-r border-white/10 text-white z-50 transition-all duration-300 
          ${expanded ? "w-52" : "w-16"} 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Close button (mobile only) */}
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-4 right-4 text-white md:hidden"
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-white/10">
          <span className="text-xl font-bold text-primary">
            {expanded ? "Lingadevaru HP" : "L"}
          </span>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col mt-4 space-y-1">
          {navItems.map((item) => (
            <SidebarItem 
              key={item.label}
              icon={item.icon} 
              label={item.label} 
              to={item.to}
              submenu={item.submenu}
              expanded={expanded} 
              active={location.pathname === item.to}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
