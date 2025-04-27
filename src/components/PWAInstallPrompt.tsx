
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { X, Download } from 'lucide-react';

const PWAInstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show prompt after 3 seconds for better user experience
      setTimeout(() => {
        const hasPromptBeenShown = localStorage.getItem('pwaPromptShown');
        
        // Only show if not already dismissed or installed
        if (!hasPromptBeenShown && !window.matchMedia('(display-mode: standalone)').matches) {
          setShowPrompt(true);
          console.log('PWA install prompt displayed');
        }
      }, 3000);
    };

    // Log when beforeinstallprompt fires
    console.log('Setting up beforeinstallprompt listener');
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Log when app is installed
    window.addEventListener('appinstalled', (event) => {
      console.log('PWA was successfully installed');
      setShowPrompt(false);
      toast({
        title: "Installation Complete",
        description: "The app has been successfully installed.",
      });
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [toast, isMobile]);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      console.log('No deferred prompt available');
      toast({
        title: "Installation",
        description: "Please use your browser's install option if available.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Prompting for installation');
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log(`User choice: ${outcome}`);
      if (outcome === 'accepted') {
        toast({
          title: "Installation Started",
          description: "The app is being installed on your device.",
        });
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
      localStorage.setItem('pwaPromptShown', 'true');
    } catch (error) {
      console.error('Installation failed:', error);
      toast({
        title: "Installation Failed",
        description: "Please try installing from your browser's menu.",
        variant: "destructive",
      });
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwaPromptShown', 'true');
  };

  // Don't render anything if not showing prompt
  if (!showPrompt) return null;

  return (
    <Sheet open={showPrompt} onOpenChange={setShowPrompt}>
      <SheetContent side="bottom" className="rounded-t-xl sm:max-w-lg sm:rounded-xl mx-auto">
        <SheetHeader className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-0" 
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <SheetTitle className="flex items-center gap-2">
            <motion.img 
              src="/icons/icon-192x192.png" 
              alt="App Icon" 
              className="w-8 h-8 rounded-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            Install Portfolio App
          </SheetTitle>
          <SheetDescription>
            Add this app to your home screen for quick access, offline support, and a better experience
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline" onClick={handleDismiss}>
            Maybe Later
          </Button>
          <Button onClick={handleInstall} className="relative overflow-hidden group">
            <span className="relative z-10">Install Now</span>
            <Download className="ml-2 h-4 w-4" />
            <motion.div
              className="absolute inset-0 bg-primary/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PWAInstallPrompt;
