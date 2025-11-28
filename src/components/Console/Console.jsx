import React, { useState, useEffect, useRef } from 'react';
import '../../styles/console.css';

const Console = () => {
  const [logs, setLogs] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const lastLogRef = useRef(null);

useEffect(() => {
  // Listen for console messages from preview iframe
  const handleConsoleMessage = (event) => {
    if (event.data && event.data.type === 'console') {
      const { method, args, timestamp } = event.data;
      
      // Prevent duplicate logs within 100ms
      const logString = JSON.stringify({ method, args });
      if (lastLogRef.current === logString && Date.now() - timestamp < 100) {
        return;
      }
      lastLogRef.current = logString;
      
      addLog(method, args, timestamp);
    }
  };

  // Listen for clear console event
  const handleClearConsole = () => {
    clearLogs();
  };

  window.addEventListener('message', handleConsoleMessage);
  window.addEventListener('clearConsole', handleClearConsole);

  return () => {
    window.removeEventListener('message', handleConsoleMessage);
    window.removeEventListener('clearConsole', handleClearConsole);
  };
}, []);


  const addLog = (method, args, timestamp) => {
    const newLog = {
      id: Date.now() + Math.random(),
      method,
      args,
      timestamp: new Date(timestamp).toLocaleTimeString()
    };
    
    setLogs(prev => {
      // Prevent exact duplicates
      const isDuplicate = prev.some(log => 
        log.method === method && 
        JSON.stringify(log.args) === JSON.stringify(args) &&
        log.timestamp === newLog.timestamp
      );
      
      if (isDuplicate) return prev;
      return [...prev, newLog];
    });
  };

  const clearLogs = () => {
    setLogs([]);
    lastLogRef.current = null;
  };

  const toggleConsole = () => {
    setIsVisible(!isVisible);
  };

  const getLogClassName = (method) => {
    switch(method) {
      case 'error':
        return 'console-log error';
      case 'warn':
        return 'console-log warn';
      case 'info':
        return 'console-log info';
      default:
        return 'console-log';
    }
  };

  const formatLogValue = (value) => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value, null, 2);
      } catch (e) {
        return String(value);
      }
    }
    return String(value);
  };

  return (
    <>
      {/* Console Toggle Button */}
      <button 
        className={`console-toggle ${isVisible ? 'active' : ''}`}
        onClick={toggleConsole}
        title="Toggle Console"
      >
        <span className="console-icon">⚡</span>
        <span className="console-text">Console</span>
        {logs.length > 0 && <span className="console-badge">{logs.length}</span>}
      </button>

      {/* Console Panel */}
      {isVisible && (
        <div className="console-panel">
          <div className="console-header">
            <div className="console-title">
              <span className="console-icon">💻</span>
              <span>JavaScript Console</span>
            </div>
            <div className="console-actions">
              <button 
                className="console-btn" 
                onClick={clearLogs}
                title="Clear Console"
              >
                🗑️ Clear
              </button>
              <button 
                className="console-btn" 
                onClick={toggleConsole}
                title="Close Console"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="console-body">
            {logs.length === 0 ? (
              <div className="console-empty">
                <span className="empty-icon">📋</span>
                <p>Console is empty. Run your JavaScript code to see output.</p>
                <small>Use console.log(), console.error(), console.warn()</small>
              </div>
            ) : (
              logs.map(log => (
                <div key={log.id} className={getLogClassName(log.method)}>
                  <span className="log-time">{log.timestamp}</span>
                  <span className="log-method">{log.method}</span>
                  <span className="log-content">
                    {log.args.map((arg, index) => (
                      <span key={index} className="log-arg">
                        {formatLogValue(arg)}
                        {index < log.args.length - 1 && ' '}
                      </span>
                    ))}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Console;
