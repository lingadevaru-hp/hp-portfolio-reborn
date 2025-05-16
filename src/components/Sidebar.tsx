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
  isEffectivelyExpanded: boolean; // Renamed from 'expanded'
  active: boolean;
  submenu?: string[];
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = memo(({
  icon,
  label,
  to,
  isEffectivelyExpanded, // Use this prop
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
        className={`flex items-center ${isEffectivelyExpanded ? 'justify-start' : 'justify-center'} w-full px-4 py-3 transition-all duration-300 ease-in-out cursor-pointer group
          ${active
            ? 'bg-gradient-to-r from-[#6B48FF] to-[#3B1F9E] text-white' // User wants to keep existing active state
            : 'text-white hover:text-white'}`}
        onClick={handleClick}
      >
        {/* Icon: Opacity 80% to 100% on hover (if not active) */}
        <span className={`transition-opacity duration-300 ease-in-out ${active ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
          {icon}
        </span>
        
        {/* Text Label */}
        <span className={`text-base font-medium whitespace-nowrap ml-3 ${isEffectivelyExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute pointer-events-none'} transition-all duration-300 ease-in-out delay-100`}>
          {label}
        </span>
      </Link>

      {isEffectivelyExpanded && submenu && isSubmenuOpen && (
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
  const [desktopHoverExpanded, setDesktopHoverExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const isEffectivelyExpanded = desktopHoverExpanded || isMobileOpen;

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

  useEffect(() => {
    setIsMobileOpen(false); // Close mobile sidebar on route change
  }, [location]);

  const navItems = [
    { icon: <Home size={24} />, label: "Home", to: "/" },
    { icon: <User size={24} />, label: "About", to: "/about" },
    { icon: <Code size={24} />, label: "Skills", to: "/skills" },
    {
      icon: <Briefcase size={24} />,
      label: "Projects",
      to: "/projects",
      submenu: ["Web", "AI/ML", "Linux Tools"] // Existing submenu
    },
    { icon: <Heart size={24} />, label: "Yoga", to: "/yoga" },
    { icon: <Mail size={24} />, label: "Contact", to: "/contact" }
  ];

  return (
    <>
      {/* Mobile Menu Button (Hamburger) */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-[60] p-2 rounded-full bg-transparent text-white/80 md:hidden shadow-[0_0_8px_rgba(255,255,255,0.2)] hover:shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Open menu"
        tabIndex={0}
      >
        <Menu size={24} />
      </button>

      {/* Overlay for Mobile Menu - uses Hotstar gradient and blur */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-gradient-to-r from-hotstar-gradient-start to-hotstar-gradient-end backdrop-blur-[5px] z-50 md:hidden opacity-100 transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <div
        onMouseEnter={() => setDesktopHoverExpanded(true)}
        onMouseLeave={() => setDesktopHoverExpanded(false)}
        style={{ willChange: 'width, background' }} // Removed transform as it's handled by translate classes
        className={`fixed left-0 top-0 h-screen flex items-center justify-center z-[55] transition-all duration-300 ease-in-out
          ${isEffectivelyExpanded
            ? "w-[200px] bg-gradient-to-r from-hotstar-gradient-start to-hotstar-gradient-end backdrop-blur-[5px] border-r border-white/10"
            : "w-[60px] bg-transparent"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Close Button (Mobile Only) - Placed inside the sidebar */}
        {isMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-4 right-4 text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-1 md:hidden z-[60]"
            aria-label="Close menu"
            tabIndex={0}
          >
            <X size={24} />
          </button>
        )}

        {/* Navigation Items - Compact and Centered */}
        <div className="flex flex-col w-full h-auto py-4 space-y-1">
          {navItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              to={item.to}
              submenu={item.submenu}
              isEffectivelyExpanded={isEffectivelyExpanded}
              active={location.pathname === item.to}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

