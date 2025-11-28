import React, { useState } from 'react';
import IconButton from '../Common/IconButton';
import toast from 'react-hot-toast';

const PreviewToolbar = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleRefresh = () => {
    window.dispatchEvent(new Event('run-code'));
    toast.success('Preview refreshed!');
  };

  const handleOpenExternal = () => {
    try {
      const iframe = document.querySelector('.preview-iframe');
      if (!iframe) {
        toast.error('Preview not ready');
        return;
      }
      
      const blob = new Blob(
        [iframe.contentDocument.documentElement.outerHTML], 
        { type: 'text/html' }
      );
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      toast.success('Opened in new tab!');
    } catch (error) {
      toast.error('Failed to open preview');
      console.error('External preview error:', error);
    }
  };

  const handleFullscreen = async () => {
    const previewSection = document.querySelector('.preview-section');
    
    try {
      if (!document.fullscreenElement) {
        // Enter fullscreen
        await previewSection.requestFullscreen();
        setIsFullscreen(true);
        previewSection.classList.add('fullscreen-active');
        toast.success('Entered fullscreen mode (Press Esc to exit)');
      } else {
        // Exit fullscreen
        await document.exitFullscreen();
        setIsFullscreen(false);
        previewSection.classList.remove('fullscreen-active');
        toast.success('Exited fullscreen mode');
      }
    } catch (error) {
      toast.error('Fullscreen not supported');
      console.error('Fullscreen error:', error);
    }
  };

  // Listen for fullscreen changes (when user presses Esc)
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
        const previewSection = document.querySelector('.preview-section');
        previewSection?.classList.remove('fullscreen-active');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="preview-toolbar">
      <div className="preview-label">Preview</div>
      <div className="preview-actions">
        <IconButton 
          icon="🔄" 
          tooltip="Refresh preview (Ctrl+R)" 
          onClick={handleRefresh} 
        />
        <IconButton 
          icon="🔗" 
          tooltip="Open in new tab" 
          onClick={handleOpenExternal} 
        />
        <IconButton 
          icon={isFullscreen ? "⊗" : "⛶"} 
          tooltip={isFullscreen ? "Exit fullscreen (Esc)" : "Enter fullscreen"} 
          onClick={handleFullscreen} 
        />
      </div>
    </div>
  );
};

export default PreviewToolbar;
