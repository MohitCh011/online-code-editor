import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const IconButton = ({ icon, tooltip, onClick, className = '' }) => {
  const { appTheme } = useTheme();
  
  return (
    <button 
      className={`icon-btn ${className}`}
      onClick={onClick} 
      title={tooltip}
      aria-label={tooltip}
      style={{ 
        color: appTheme === 'dark' ? '#ffffff' : '#000000' 
      }}
    >
      {icon}
    </button>
  );
};

export default IconButton;
