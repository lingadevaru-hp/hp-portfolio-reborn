
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

const PWAInstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Only show prompt on mobile devices after 5 seconds
      if (isMobile) {
        setTimeout(() => {
          const hasPromptBeenShown = localStorage.getItem('pwaPromptShown');
          if (!hasPromptBeenShown) {
            setShowPrompt(true);
          }
        }, 5000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isMobile]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
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

  if (!showPrompt) return null;

  return (
    <Sheet open={showPrompt} onOpenChange={setShowPrompt}>
      <SheetContent className="sm:max-w-lg rounded-t-xl sm:rounded-xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <img src="/icons/icon-192x192.png" alt="App Icon" className="w-8 h-8" />
            Install Portfolio App
          </SheetTitle>
          <SheetDescription>
            Add this app to your home screen for quick access to my portfolio
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline" onClick={handleDismiss}>
            Maybe Later
          </Button>
          <Button onClick={handleInstall}>
            Install Now
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PWAInstallPrompt;
