import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useEditor } from '../../context/EditorContext';
import IconButton from '../Common/IconButton';
import SettingsModal from '../Modals/SettingsModal';

const Header = () => {
  const { appTheme, toggleAppTheme } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className="app-header">
        <div className="header-left">
          <h1 className="app-title">⚡ Code Compiler</h1>
          <span className="app-subtitle">Live Preview Editor</span>
        </div>
        <div className="header-right">
          <IconButton
            icon="⚙"
            tooltip="Settings"
            onClick={() => setIsSettingsOpen(true)}
          />
          <IconButton
            icon={appTheme === 'dark' ? '☀️' : '🌙'}
            tooltip={`Switch to ${appTheme === 'dark' ? 'light' : 'dark'} mode`}
            onClick={toggleAppTheme}
          />
        </div>
      </header>
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
};

export default Header;
