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
  X,
  ChevronDown, // For submenu indicator
  ChevronUp // For submenu indicator
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isEffectivelyExpanded: boolean;
  active: boolean;
  isSubmenuItem?: boolean;
  submenu?: { label: string; to: string }[]; // Updated submenu structure
  onClick?: () => void;
  isSubmenuOpen?: boolean;
  toggleSubmenu?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = memo(({
  icon,
  label,
  to,
  isEffectivelyExpanded,
  active,
  isSubmenuItem = false,
  submenu,
  onClick,
  isSubmenuOpen,
  toggleSubmenu
}) => {
  const baseClasses = `flex items-center w-full py-3 transition-all duration-200 ease-in-out cursor-pointer group relative`;
  const expandedPadding = isSubmenuItem ? "pl-10 pr-4" : "pl-4 pr-4"; // Indent submenu items
  const collapsedPadding = "justify-center px-4";

  const activeClasses = active
    ? "text-white font-semibold before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-0.5 before:bg-hotstar-active-border before:rounded-r-sm"
    : "text-neutral-400 hover:text-white hover:bg-white/5";

  const commonIconTextClasses = `transition-opacity duration-200 ease-in-out ${active ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`;

  const handleItemClick = () => {
    if (submenu && submenu.length > 0 && toggleSubmenu) {
      toggleSubmenu(); // Toggle submenu if it exists
    }
    if (onClick) onClick(); // For mobile menu close
  };

  return (
    <>
      <Link
        to={to}
        tabIndex={0}
        aria-label={label}
        className={`${baseClasses} ${isEffectivelyExpanded ? expandedPadding : collapsedPadding} ${activeClasses}`}
        onClick={handleItemClick}
      >
        <span className={`${commonIconTextClasses} ${isEffectivelyExpanded ? 'mr-3' : ''}`}>
          {icon}
        </span>
        <span
          className={`text-sm whitespace-nowrap ${commonIconTextClasses} ${isEffectivelyExpanded ? "opacity-100" : "opacity-0 absolute pointer-events-none"} transition-all duration-200 ease-in-out delay-75`}
        >
          {label}
        </span>
        {isEffectivelyExpanded && submenu && submenu.length > 0 && (
          <span className="ml-auto transition-transform duration-200">
            {isSubmenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        )}
      </Link>
      {isEffectivelyExpanded && submenu && isSubmenuOpen && (
        <div className="pl-4 pb-1 pt-0 text-neutral-400" aria-expanded={isSubmenuOpen}>
          {submenu.map((subItem) => (
            <SidebarItem
              key={subItem.label}
              icon={<span className="w-6 h-6 flex items-center justify-center"><span className="w-1.5 h-1.5 bg-neutral-500 rounded-full group-hover:bg-white transition-colors"></span></span>} // Placeholder or specific icons for subitems
              label={subItem.label}
              to={subItem.to} // Assuming submenus also navigate
              isEffectivelyExpanded={isEffectivelyExpanded}
              active={location.pathname === subItem.to} // Active state for subitems
              isSubmenuItem={true}
              onClick={onClick} // Pass mobile close handler
            />
          ))}
        </div>
      )}
    </>
  );
});

const Sidebar = () => {
  const [desktopHoverExpanded, setDesktopHoverExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const isEffectivelyExpanded = desktopHoverExpanded || isMobileOpen;

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (!isEffectivelyExpanded) {
      setOpenSubmenu(null); // Close submenu when sidebar collapses
    }
  }, [isEffectivelyExpanded]);

  const handleMobileMenuClose = () => setIsMobileOpen(false);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const navItems = [
    { icon: <Home size={24} />, label: "Home", to: "/" },
    { icon: <User size={24} />, label: "About", to: "/about" },
    { icon: <Code size={24} />, label: "Skills", to: "/skills" },
    {
      icon: <Briefcase size={24} />,
      label: "Projects",
      to: "/projects", // Main projects link
      submenu: [
        { label: "Web", to: "/projects/web" }, 
        { label: "AI/ML", to: "/projects/ai-ml" }, 
        { label: "Linux Tools", to: "/projects/linux-tools" }
      ]
    },
    { icon: <Heart size={24} />, label: "Yoga", to: "/yoga" },
    { icon: <Mail size={24} />, label: "Contact", to: "/contact" }
  ];

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-[60] p-2 rounded-md bg-black/30 text-white/80 md:hidden shadow-lg hover:bg-black/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 md:hidden transition-opacity duration-300"
          onClick={handleMobileMenuClose}
          aria-hidden="true"
        />
      )}

      <div
        onMouseEnter={() => setDesktopHoverExpanded(true)}
        onMouseLeave={() => setDesktopHoverExpanded(false)}
        className={`fixed left-0 top-0 h-screen flex flex-col items-center justify-center z-[55] transition-all duration-300 ease-in-out shadow-2xl
          ${isEffectivelyExpanded
            ? "w-[220px] bg-hotstar-sidebar-dark" // Updated width and solid background
            : "w-[60px] bg-transparent"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {isMobileOpen && (
          <button
            onClick={handleMobileMenuClose}
            className="absolute top-3 right-3 text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-1 md:hidden z-[60]"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        )}
        
        {/* Placeholder for Logo/Brand Icon - as seen in Hotstar */} 
        {isEffectivelyExpanded && (
            <div className="py-4 px-4 w-full">
                 {/* Replace with actual logo if available */}
                <span className="text-xl font-bold text-white">Portfolio</span> 
            </div>
        )}
        {!isEffectivelyExpanded && (
             <div className="pt-4 pb-2 w-full flex justify-center">
                {/* Collapsed Logo/Icon - e.g. a star or initial */}
                <span className="text-2xl text-white opacity-80 group-hover:opacity-100">✨</span>
            </div>
        )}

        <nav className="flex flex-col w-full h-auto py-2 space-y-1 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
          {navItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              to={item.to}
              submenu={item.submenu}
              isEffectivelyExpanded={isEffectivelyExpanded}
              active={location.pathname === item.to || (item.submenu && item.submenu.some(sub => location.pathname.startsWith(sub.to)))}
              onClick={isMobileOpen ? handleMobileMenuClose : undefined}
              isSubmenuOpen={openSubmenu === item.label}
              toggleSubmenu={() => toggleSubmenu(item.label)}
            />
          ))}
        </nav>
        
        {/* Optional: User Profile / Settings link at the bottom if needed */}
        {isEffectivelyExpanded && (
            <div className="py-4 px-4 mt-auto w-full border-t border-neutral-700/50">
                {/* Example: User Profile Link */}
                {/* <SidebarItem icon={<UserCircle size={24}/>} label="My Profile" to="/profile" isEffectivelyExpanded={isEffectivelyExpanded} active={location.pathname === '/profile'} /> */}
            </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;

