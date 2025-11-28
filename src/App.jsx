import React, { useState } from 'react';
import { EditorProvider } from './context/EditorContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingPage from './components/LoadingPage';
import Header from './components/Layout/Header';
import Toolbar from './components/Layout/Toolbar';
import SplitPane from './components/Layout/SplitPane';
import EditorTabs from './components/Editor/EditorTabs';
import CodeEditor from './components/Editor/CodeEditor';
import Preview from './components/Preview/Preview';
import Footer from './components/Layout/Footer';
import Console from './components/Console/Console';
import { Toaster } from 'react-hot-toast';

// Main App Content Component
function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  // Show loading page
  if (isLoading) {
    return <LoadingPage onLoadComplete={handleLoadComplete} />;
  }

  // Show main application
  return (
    <div className="app">
      {/* Header Section */}
      <Header />
      
      {/* Toolbar Section */}
      <Toolbar />
      
      {/* Main Split Pane Layout */}
      <SplitPane
        left={
          <>
            <EditorTabs />
            <CodeEditor />
          </>
        }
        right={<Preview />}
      />
      
      {/* Footer Section */}
      <Footer />
      
      {/* JavaScript Console Panel */}
      <Console />
      
      {/* Toast Notifications */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: 'white',
            },
          },
        }}
      />
    </div>
  );
}

// Root App Component with Context Providers
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <EditorProvider>
          <AppContent />
        </EditorProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
