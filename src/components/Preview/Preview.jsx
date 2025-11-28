import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useEditor } from '../../context/EditorContext';

const Preview = () => {
  const { code } = useEditor();
  const iframeRef = useRef(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const updateTimeoutRef = useRef(null);

  // Debounced preview update
  const debouncedUpdate = useCallback(() => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(() => {
      updatePreview();
    }, 500); // Wait 500ms after last change
  }, [code]);

  useEffect(() => {
    if (code) {
      debouncedUpdate();
    }

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [code, debouncedUpdate]);

  const updatePreview = () => {
    if (!iframeRef.current || !code) return;

    // Clear console before update
    window.dispatchEvent(new CustomEvent('clearConsole'));

    const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
    
    const content = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html, body {
            width: 100%;
            height: 100%;
            overflow: auto;
          }
          
          ${code.css || ''}
        </style>
      </head>
      <body>
        ${code.html || ''}
        <script>
          // Intercept console methods
          (function() {
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;
            const originalInfo = console.info;

            function sendToParent(method, args) {
              window.parent.postMessage({
                type: 'console',
                method: method,
                args: Array.from(args),
                timestamp: Date.now()
              }, '*');
            }

            console.log = function(...args) {
              originalLog.apply(console, args);
              sendToParent('log', args);
            };

            console.error = function(...args) {
              originalError.apply(console, args);
              sendToParent('error', args);
            };

            console.warn = function(...args) {
              originalWarn.apply(console, args);
              sendToParent('warn', args);
            };

            console.info = function(...args) {
              originalInfo.apply(console, args);
              sendToParent('info', args);
            };

            // Catch runtime errors
            window.onerror = function(message, source, lineno, colno, error) {
              sendToParent('error', [message + ' (Line ' + lineno + ')']);
              return false;
            };
          })();

          try {
            ${code.js || ''}
          } catch (error) {
            console.error('JavaScript Error:', error.message);
            document.body.innerHTML += '<div style="color: red; padding: 20px; background: #fff3cd; border: 2px solid #ffc107; margin: 20px; border-radius: 5px;"><strong>JavaScript Error:</strong><br>' + error.message + '</div>';
          }
        </script>
      </body>
      </html>
    `;

    iframeDoc.open();
    iframeDoc.write(content);
    iframeDoc.close();
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    updatePreview();
    setTimeout(() => setIsRefreshing(false), 300);
  };

  const handleOpenNewTab = () => {
    if (!code) return;
    
    const content = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview - Online Code Compiler</title>
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
      </html>
    `;

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  if (!code) {
    return (
      <div className="preview-container">
        <div className="preview-toolbar">
          <div className="preview-label">
            <span className="preview-icon">👁️</span>
            Preview
          </div>
        </div>
        <div className="preview-loading">
          <div className="loading-spinner"></div>
          <p>Loading preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="preview-container">
      <div className="preview-toolbar">
        <div className="preview-label">
          <span className="preview-icon">👁️</span>
          <span className="preview-text">Preview</span>
        </div>
        <div className="preview-actions">
          <button 
            className="icon-btn" 
            onClick={handleRefresh}
            title="Refresh Preview (Ctrl+R)"
          >
            🔄
          </button>
          <button 
            className="icon-btn" 
            onClick={handleOpenNewTab}
            title="Open in New Tab"
          >
            🔗
          </button>
        </div>
      </div>
      <iframe
        ref={iframeRef}
        className={`preview-frame ${isRefreshing ? 'refreshing' : ''}`}
        title="Preview"
        sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
      />
    </div>
  );
};

export default Preview;
