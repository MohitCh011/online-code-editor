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
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingPage onLoadComplete={handleLoadComplete} />;
  }

  return (
    <div className="app">
      <Header />
      <Toolbar />
      
      <SplitPane
        left={
          <>
            <EditorTabs />
            <CodeEditor />
          </>
        }
        right={<Preview />}
      />
      
      <Footer />
      
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
          },
        }}
      />
    </div>
  );
}

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
