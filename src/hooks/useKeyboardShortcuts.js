import { useEffect } from 'react';

const useKeyboardShortcuts = (callbacks) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey) {
        Object.keys(callbacks).forEach(key => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            event.preventDefault();
            callbacks[key]();
          }
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callbacks]);
};

export default useKeyboardShortcuts;
