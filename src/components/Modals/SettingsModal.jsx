import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';

const SettingsModal = ({ isOpen, onClose }) => {
  const { fontSize, setFontSize } = useEditor();
  const { theme, setTheme, appTheme, toggleAppTheme, uiTheme, setUiTheme } = useTheme();

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="min-overlay" onClick={onClose}>
      <div className="min-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="min-header">
          <h2>Settings</h2>
          <button className="min-close" onClick={onClose}>×</button>
        </div>

        {/* Content */}
        <div className="min-content">
          
          {/* UI Theme - NEW */}
          <div className="min-group">
            <label>Interface Style</label>
            <div className="min-toggle-group">
              <button 
                className={uiTheme === 'modern' ? 'active' : ''} 
                onClick={() => {
                  setUiTheme('modern');
                  toast.success('Switched to Modern UI');
                }}
              >
                Modern
              </button>
              <button 
                className={uiTheme === 'classic' ? 'active' : ''} 
                onClick={() => {
                  setUiTheme('classic');
                  toast.success('Switched to Classic UI');
                }}
              >
                Classic
              </button>
            </div>
          </div>

          <div className="min-divider"></div>

          {/* Color Theme */}
          <div className="min-group">
            <label>Color Mode</label>
            <div className="min-toggle-group">
              <button 
                className={appTheme === 'dark' ? 'active' : ''} 
                onClick={appTheme === 'light' ? toggleAppTheme : undefined}
              >
                Dark
              </button>
              <button 
                className={appTheme === 'light' ? 'active' : ''} 
                onClick={appTheme === 'dark' ? toggleAppTheme : undefined}
              >
                Light
              </button>
            </div>
          </div>

          <div className="min-divider"></div>

          {/* Editor Theme */}
          <div className="min-group">
            <label>Editor Theme</label>
            <select 
              className="min-select" 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="vs-dark">Dark+</option>
              <option value="light">Light+</option>
              <option value="hc-black">High Contrast</option>
            </select>
          </div>

          <div className="min-divider"></div>

          {/* Font Size */}
          <div className="min-group">
            <label>Font Size</label>
            <div className="min-font-control">
              <input 
                type="range" 
                className="min-range" 
                min="10" 
                max="24" 
                step="2" 
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
              <span className="min-value">{fontSize}px</span>
            </div>
          </div>

          <div className="min-divider"></div>

          {/* Reset */}
          <button 
            className="min-reset" 
            onClick={() => {
              setFontSize(14);
              setTheme('vs-dark');
              setUiTheme('modern');
              toast.success('Reset to defaults');
            }}
          >
            Reset to Defaults
          </button>

        </div>

      </div>
    </div>
  );
};

export default SettingsModal;
