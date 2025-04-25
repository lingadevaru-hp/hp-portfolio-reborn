
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const PWAInstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const isMobile = useIsMobile();

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

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA installed successfully');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
    localStorage.setItem('pwaPromptShown', 'true');
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwaPromptShown', 'true');
  };

  if (!showPrompt) return null;

  return (
    <Sheet open={showPrompt} onOpenChange={setShowPrompt}>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Install Portfolio App</SheetTitle>
          <SheetDescription>
            Add this app to your home screen for quick access to my portfolio
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline" onClick={handleDismiss}>
            Dismiss
          </Button>
          <Button onClick={handleInstall}>
            Install
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PWAInstallPrompt;
