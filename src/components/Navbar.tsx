
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if navbar should be visible or hidden based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      // Determine if navbar should have background
      setIsScrolled(currentScrollY > 50);
      
      // Update the last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/skills", label: "Skills" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ 
        y: isHidden ? -100 : 0,
        opacity: isHidden ? 0 : 1
      }}
      transition={{
        y: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
    >
      <div className="section-container py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 font-semibold">
            <Code className="h-6 w-6 text-primary" />
            <span>Lingadevaru HP</span>
          </Link>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path ? "text-primary" : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="default" className="bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25">
              <Link to="/contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-screen bg-background z-40 p-6 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="mb-8">
                <Link to="/" className="flex items-center space-x-2 font-semibold" onClick={closeMenu}>
                  <Code className="h-6 w-6 text-primary" />
                  <span>Lingadevaru HP</span>
                </Link>
              </div>
              <div className="flex flex-col items-center space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      location.pathname === item.path ? "text-primary" : "text-foreground"
                    }`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild variant="default" className="mt-4 bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25">
                  <Link to="/contact" onClick={closeMenu}>
                    Contact Me
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
