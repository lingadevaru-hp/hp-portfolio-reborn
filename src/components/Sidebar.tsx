import { useState, useEffect, memo } from "react";
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

// Using memo to prevent unnecessary re-renders
const SidebarItem: React.FC<SidebarItemProps> = memo(({ 
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
    <div className="relative w-full">
      <Link 
        to={to} 
        tabIndex={0}
        aria-label={label}
        className={`flex items-center ${expanded ? 'justify-start' : 'justify-center'} w-full px-4 py-3 transition-opacity duration-300 ease-in-out cursor-pointer group
          ${active 
            ? 'bg-gradient-to-r from-[#6B48FF] to-[#3B1F9E] text-white' 
            : 'text-white/70 hover:text-white'}`}
        onClick={handleClick}
      >
        <span className={`transition-opacity duration-300 ease-in-out ${active ? 'opacity-100' : 'opacity-70'} group-hover:opacity-100`}>
          {icon}
        </span>
        
        <span className={`text-base font-medium whitespace-nowrap ml-3 ${expanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute'} transition-all duration-300 ease-in-out delay-100`}>
          {label}
        </span>
      </Link>

      {expanded && submenu && isSubmenuOpen && (
        <div className="ml-10 space-y-2 py-2 text-sm text-white/80" aria-expanded={isSubmenuOpen}>
          {submenu.map((item) => (
            <div key={item} className="hover:text-white hover:underline cursor-pointer transition-all duration-200">
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

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
    { icon: <Home size={24} />, label: "Home", to: "/" },
    { icon: <User size={24} />, label: "About", to: "/about" },
    { icon: <Code size={24} />, label: "Skills", to: "/skills" },
    { 
      icon: <Briefcase size={24} />, 
      label: "Projects", 
      to: "/projects",
      submenu: ["Web", "AI/ML", "Linux Tools"]
    },
    { icon: <Heart size={24} />, label: "Yoga", to: "/yoga" },
    { icon: <Mail size={24} />, label: "Contact", to: "/contact" }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 rounded-full bg-transparent text-white/80 md:hidden shadow-[0_0_8px_rgba(255,255,255,0.2)] hover:shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Open menu"
        tabIndex={0}
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-gradient-to-r from-[#141519] to-[rgba(20,21,25,0.7)] backdrop-blur-[5px] z-40 md:hidden opacity-100 transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Disney+ Style */}
      <div
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        style={{ willChange: 'width, transform, background' }}
        className={`fixed left-0 top-0 h-screen flex items-center justify-center z-50 transition-all duration-300 ease-in-out
          ${expanded ? "w-[200px] bg-gradient-to-r from-[#141519] to-[rgba(20,21,25,0.7)] backdrop-blur-[5px] border-r border-[rgba(255,255,255,0.1)]" : "w-[60px] bg-transparent"} 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Close button (mobile only) */}
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-4 right-4 text-white md:hidden focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-1"
          aria-label="Close menu"
          tabIndex={0}
        >
          <X size={24} />
        </button>

        {/* Logo removed */}

        {/* Navigation Items - Compact and Centered */}
        <div className="flex flex-col w-full h-auto py-4 space-y-1">
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