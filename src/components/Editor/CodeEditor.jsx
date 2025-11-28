import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useEditor } from '../../context/EditorContext';
import { useTheme } from '../../context/ThemeContext';

const CodeEditor = () => {
  const { code, updateCode, activeTab, fontSize } = useEditor();
  const { theme } = useTheme();
  const editorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevTab, setPrevTab] = useState(activeTab);

  // Track tab changes for animation
  useEffect(() => {
    if (prevTab !== activeTab) {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
        setPrevTab(activeTab);
      }, 300);
    }
  }, [activeTab, prevTab]);

  // Simulate loading progress
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    setLoadingProgress(100);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleEditorChange = (value) => {
    updateCode(activeTab, value || '');
  };

  const getLanguage = () => {
    const languages = {
      html: 'html',
      css: 'css',
      js: 'javascript'
    };
    return languages[activeTab] || 'html';
  };

  return (
    <div className={`code-editor ${isTransitioning ? 'transitioning' : ''}`}>
      {isLoading && (
        <div className="editor-loading">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <div className="loading-text">
              <h3>Initializing Monaco Editor</h3>
              <p>Loading language support and IntelliSense...</p>
            </div>
            <div className="loading-progress">
              <div 
                className="loading-progress-bar" 
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <span className="loading-percentage">{loadingProgress}%</span>
          </div>
        </div>
      )}
      
      <div className={`editor-wrapper ${isTransitioning ? 'fade-transition' : ''}`}>
        <Editor
          height="100%"
          language={getLanguage()}
          value={code[activeTab]}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme={theme}
          options={{
            fontSize: fontSize,
            minimap: { enabled: false },
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            emmet: {
              showExpandedAbbreviation: 'always',
            },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
