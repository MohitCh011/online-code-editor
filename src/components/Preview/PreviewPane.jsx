import React, { useEffect, useRef, useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import useDebounce from '../../hooks/useDebounce';
import { bundleCode } from '../../utils/codeRunner';

const PreviewPane = () => {
  const { html, css, js, libraries } = useEditor();
  const iframeRef = useRef(null);
  const [error, setError] = useState(null);
  
  const debouncedHtml = useDebounce(html, 300);
  const debouncedCss = useDebounce(css, 300);
  const debouncedJs = useDebounce(js, 300);

  useEffect(() => {
    const updatePreview = () => {
      try {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const document = iframe.contentDocument;
        const srcDoc = bundleCode(debouncedHtml, debouncedCss, debouncedJs, libraries);
        
        document.open();
        document.write(srcDoc);
        document.close();
        
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Preview error:', err);
      }
    };

    updatePreview();

    // Listen for manual run events
    const handleRun = () => updatePreview();
    window.addEventListener('run-code', handleRun);
    
    return () => {
      window.removeEventListener('run-code', handleRun);
    };
  }, [debouncedHtml, debouncedCss, debouncedJs, libraries]);

  return (
    <div className="preview-pane">
      {error && (
        <div className="preview-error">
          <strong>Preview Error:</strong> {error}
        </div>
      )}
      <iframe
        ref={iframeRef}
        title="preview"
        sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
        className="preview-iframe"
      />
    </div>
  );
};

export default PreviewPane;
