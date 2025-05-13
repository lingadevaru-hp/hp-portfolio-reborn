
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';

const PWAInstallBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const isMobile = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (window.navigator as any).standalone === true;
    
    if (!isStandalone) {
      // Check if user has previously dismissed the banner
      const hasDismissed = localStorage.getItem('pwaBannerDismissed');
      
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
        
        // Only show banner if not previously dismissed
        if (!hasDismissed) {
          // Delay showing banner for better UX
          setTimeout(() => {
            setShowBanner(true);
          }, 1500);
        }
        console.log('beforeinstallprompt event fired and captured');
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      // Hide banner if app is installed
      window.addEventListener('appinstalled', () => {
        console.log('PWA installed from banner');
        setShowBanner(false);
        setDeferredPrompt(null);
        // Clear dismissed flag when installed
        localStorage.removeItem('pwaBannerDismissed');
      });

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log(`User choice from banner: ${outcome}`);
      setDeferredPrompt(null);
      setShowBanner(false);
    } catch (error) {
      console.error('Installation from banner failed:', error);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    // Remember user's choice to not show the banner again
    localStorage.setItem('pwaBannerDismissed', 'true');
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-md border-b border-primary/20 px-4 py-3 shadow-lg"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 relative">
            {/* Close button for mobile and desktop */}
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 sm:right-0 sm:top-1/2 sm:-translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>

            <div className="flex items-center">
              <img 
                src="/icons/icon-192x192.png" 
                alt="App Icon" 
                className="w-6 h-6 mr-2 rounded-md hidden sm:block" 
              />
              <p className="text-sm md:text-base text-foreground pr-8 sm:pr-0">
                {isMobile ? "Install for better experience" : "Install our app for the best offline experience!"}
              </p>
            </div>
            
            <Button 
              onClick={handleInstall}
              className="group w-full sm:w-auto"
              variant="default"
              size="sm"
            >
              Install Now
              <Download className="ml-2 h-4 w-4 group-hover:translate-y-[2px] transition-transform" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstallBanner;
