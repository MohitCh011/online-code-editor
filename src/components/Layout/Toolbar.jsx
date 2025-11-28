import React from 'react';
import { useEditor } from '../../context/EditorContext';
import toast from 'react-hot-toast';

const Toolbar = () => {
  const { code, clearCode, runCode } = useEditor();

  const handleRun = () => {
    runCode();
    toast.success('Code executed!');
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all code?')) {
      clearCode();
      toast.success('Code cleared!');
    }
  };

  const handleSave = () => {
    localStorage.setItem('savedCode', JSON.stringify(code));
    toast.success('Code saved to browser storage!');
  };

  const handleExport = () => {
    // Create HTML file with all code
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Code</title>
  <style>
${code.css}
  </style>
</head>
<body>
${code.html}
  <script>
${code.js}
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'exported-code.html';
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Code exported successfully!');
  };

  return (
    <div className="main-toolbar">
      <div className="toolbar-left">
        <button className="btn btn-primary" onClick={handleRun} title="Run Code (Ctrl+R)">
          <span className="btn-icon">▶️</span>
          <span className="btn-text">Run</span>
        </button>
        <button className="btn btn-default" onClick={handleClear} title="Clear All Code">
          <span className="btn-icon">🗑️</span>
          <span className="btn-text">Clear</span>
        </button>
      </div>

      <div className="toolbar-right">
        <button className="btn btn-default" onClick={handleSave} title="Save to Browser (Ctrl+S)">
          <span className="btn-icon">💾</span>
          <span className="btn-text">Save</span>
        </button>
        <button className="btn btn-default" onClick={handleExport} title="Export as HTML">
          <span className="btn-icon">📥</span>
          <span className="btn-text">Export</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
