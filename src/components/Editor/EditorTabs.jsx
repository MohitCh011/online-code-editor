import React, { useState, useEffect } from 'react';
import { useEditor } from '../../context/EditorContext';

const EditorTabs = () => {
  const { activeTab, setActiveTab } = useEditor();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');

  const tabs = [
    { id: 'html', label: 'HTML', icon: '📄', color: '#e34c26' },
    { id: 'css', label: 'CSS', icon: '🎨', color: '#264de4' },
    { id: 'js', label: 'JavaScript', icon: '⚡', color: '#f0db4f' }
  ];

  const handleTabClick = (tabId) => {
    if (tabId === activeTab) return;

    // Determine slide direction
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    const newIndex = tabs.findIndex(tab => tab.id === tabId);
    setSlideDirection(newIndex > currentIndex ? 'right' : 'left');

    // Start transition
    setIsTransitioning(true);

    // Change tab after animation starts
    setTimeout(() => {
      setActiveTab(tabId);
    }, 150);

    // End transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="editor-tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''} ${
            isTransitioning && activeTab === tab.id ? `slide-${slideDirection}` : ''
          }`}
          onClick={() => handleTabClick(tab.id)}
          style={{
            '--tab-color': tab.color
          }}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
          {activeTab === tab.id && (
            <span 
              className="tab-indicator" 
              style={{ background: tab.color }}
            ></span>
          )}
        </button>
      ))}
      
      {/* Animated slider */}
      <div 
        className="tab-slider"
        style={{
          left: `${tabs.findIndex(tab => tab.id === activeTab) * (100 / tabs.length)}%`,
          width: `${100 / tabs.length}%`,
          background: tabs.find(tab => tab.id === activeTab)?.color
        }}
      ></div>
    </div>
  );
};

export default EditorTabs;
