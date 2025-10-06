'use client';

import { useEffect } from 'react';

export function ScrollToHash() {
  useEffect(() => {
    // Function to scroll to hash
    const scrollToHash = () => {
      // Get the hash from the URL
      const hash = window.location.hash;
      if (!hash) return;
      
      // Remove the # from the hash
      const id = hash.substring(1);
      
      // Wait for the element to be available (accounting for dynamic imports)
      let attempts = 0;
      const maxAttempts = 10;
      
      const tryScroll = () => {
        const element = document.getElementById(id);
        
        if (element) {
          // Use setTimeout to ensure we're at the end of the render cycle
          setTimeout(() => {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 0);
        } else if (attempts < maxAttempts) {
          attempts++;
          // Try again after a short delay
          setTimeout(tryScroll, 100);
        }
      };
      
      // Start the scroll attempt
      tryScroll();
    };

    // Handle initial load
    scrollToHash();
    
    // Handle hash changes
    const handleHashChange = () => {
      scrollToHash();
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return null;
}