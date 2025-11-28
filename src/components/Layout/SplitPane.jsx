import React, { useState, useRef, useEffect } from 'react';

const SplitPane = ({ left, right }) => {
  const [leftWidth, setLeftWidth] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const splitPaneRef = useRef(null);

  useEffect(() => {
    // Load saved split position
    const saved = localStorage.getItem('splitPosition');
    if (saved) {
      setLeftWidth(parseFloat(saved));
    }
  }, []);

  useEffect(() => {
    // Save split position
    localStorage.setItem('splitPosition', leftWidth.toString());
  }, [leftWidth]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !splitPaneRef.current) return;

    const splitPane = splitPaneRef.current;
    const rect = splitPane.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;

    // Limit between 20% and 80%
    if (percentage >= 20 && percentage <= 80) {
      setLeftWidth(percentage);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  return (
    <div 
      ref={splitPaneRef}
      className={`split-pane ${isDragging ? 'dragging' : ''}`}
    >
      <div 
        className="editor-section"
        style={{ width: `${leftWidth}%` }}
      >
        {left}
      </div>

      <div 
        className={`divider ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
      >
        <div className="divider-handle">
          <span className="divider-icon">⋮</span>
        </div>
      </div>

      <div 
        className="preview-section"
        style={{ width: `${100 - leftWidth}%` }}
      >
        {right}
      </div>

      {/* Overlay to capture mouse events during drag */}
      {isDragging && <div className="drag-overlay"></div>}
    </div>
  );
};

export default SplitPane;
