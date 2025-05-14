import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Hide the PWA install banner
  const [hidePWABanner, setHidePWABanner] = useState(false);

  useEffect(() => {
    // Find and hide the PWA install banner
    const bannerElements = document.querySelectorAll('.pwa-install-banner');
    bannerElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });

    // Also hide any PWA prompts
    const promptElements = document.querySelectorAll('.pwa-install-prompt');
    promptElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });

    setHidePWABanner(true);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-16 md:ml-16 transition-all duration-300 w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
