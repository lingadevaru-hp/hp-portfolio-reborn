
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react'; // Changed from Install to Download

const PWAInstallBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (window.navigator as any).standalone === true;
    
    if (!isStandalone) {
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowBanner(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      // Hide banner if app is installed
      window.addEventListener('appinstalled', () => {
        setShowBanner(false);
        setDeferredPrompt(null);
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
      
      if (outcome === 'accepted') {
        console.log('PWA installation accepted');
      }
      setDeferredPrompt(null);
      setShowBanner(false);
    } catch (error) {
      console.error('Installation failed:', error);
    }
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-md border-b border-primary/20 px-4 py-2"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-sm md:text-base text-foreground">
              Install our app for the best experience!
            </p>
            <Button 
              onClick={handleInstall}
              className="ml-4 group"
              variant="default"
              size="sm"
            >
              Install Now
              <Download className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" /> {/* Changed icon */}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstallBanner;
