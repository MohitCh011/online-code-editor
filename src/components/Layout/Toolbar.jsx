import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';

const Toolbar = () => {
  const { code, clearCode, runCode } = useEditor();
  const { uiTheme } = useTheme();

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all code?')) {
      clearCode();
      toast.success('Code cleared!');
    }
  };

  const handleRun = () => {
    runCode();
    toast.success('Code executed!');
  };

  const handleSave = () => {
    localStorage.setItem('code', JSON.stringify(code));
    toast.success('Code saved!');
  };

  const handleFormat = () => {
    // Trigger Monaco editor format
    window.dispatchEvent(new CustomEvent('formatCode'));
    toast.success('Code formatted!');
  };

  const handleExport = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Code</title>
  <style>
    ${code.css || ''}
  </style>
</head>
<body>
  ${code.html || ''}
  <script>
    ${code.js || ''}
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Code exported!');
  };

  return (
    <div className={`main-toolbar ${uiTheme}`}>
      <div className="toolbar-left">
        <button className="btn btn-primary" onClick={handleRun}>
          <span className="btn-icon">▶️</span>
          <span className="btn-text">Run</span>
        </button>
        
        <button className="btn btn-default" onClick={handleFormat}>
          <span className="btn-icon">✨</span>
          <span className="btn-text">Format</span>
        </button>
        
        <button className="btn btn-default" onClick={handleClear}>
          <span className="btn-icon">🗑️</span>
          <span className="btn-text">Clear</span>
        </button>
      </div>

      <div className="toolbar-right">
        <button className="btn btn-default" onClick={handleSave}>
          <span className="btn-icon">💾</span>
          <span className="btn-text">Save</span>
        </button>
        
        <button className="btn btn-default" onClick={handleExport}>
          <span className="btn-icon">📥</span>
          <span className="btn-text">Export</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
