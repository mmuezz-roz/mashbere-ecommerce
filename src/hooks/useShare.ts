import { useCallback } from 'react';
import { toast } from 'sonner';

interface ShareOptions {
  title: string;
  text: string;
  url: string;
}

/**
 * Custom hook for sharing content using the Web Share API with a clipboard fallback.
 */
export const useShare = () => {
  const share = useCallback(async (options: ShareOptions) => {
    // Native Web Share API
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: options.title,
          text: options.text,
          url: options.url,
        });
      } catch (error) {
        // User cancelled or share failed
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
          copyToClipboard(options.url);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      copyToClipboard(options.url);
    }
  }, []);

  const copyToClipboard = useCallback((url: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url)
        .then(() => {
          toast.success('Link copied to clipboard', {
            description: 'You can now paste and share the product link.',
            duration: 3000,
            style: {
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              borderRadius: '20px',
              fontFamily: 'inherit',
            }
          });
        })
        .catch((err) => {
          console.error('Could not copy text: ', err);
          toast.error('Failed to copy link');
        });
    }
  }, []);

  return { share };
};
