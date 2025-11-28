import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import ShortcutsModal from '../Modals/ShortcutsModal';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { uiTheme, toggleUiTheme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      <footer className="app-footer">
        <div className="footer-left">
          <p>Frontend Compiler</p>
          <button 
            className="ui-theme-badge" 
            onClick={toggleUiTheme}
            title="Switch UI Theme"
          >
            {uiTheme === 'modern' ? '✨ Modern' : '📟 Classic'}
          </button>
        </div>
        
        <div className="footer-center">
          <span className="footer-time">{currentTime.toLocaleTimeString()}</span>
        </div>

        <div className="footer-right">
          <button 
            className="shortcuts-btn" 
            onClick={handleOpenModal}
            title="View all keyboard shortcuts (Ctrl+/)"
          >
            <span className="shortcuts-icon">⌨️</span>
            <span className="shortcuts-text">Shortcuts</span>
            <kbd className="footer-kbd">Ctrl+/</kbd>
          </button>
        </div>
      </footer>

      <ShortcutsModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Footer;
