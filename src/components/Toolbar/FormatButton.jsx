import React, { useState } from 'react';
import Button from '../Common/Button';
import { useEditor } from '../../context/EditorContext';
import { formatCode } from '../../utils/formatter';
import toast from 'react-hot-toast';

const FormatButton = () => {
  const { html, css, js, setHtml, setCss, setJs, activeTab } = useEditor();
  const [isFormatting, setIsFormatting] = useState(false);

  const handleFormat = async () => {
    setIsFormatting(true);
    try {
      if (activeTab === 'html') {
        const formatted = await formatCode(html, 'html');
        setHtml(formatted);
      } else if (activeTab === 'css') {
        const formatted = await formatCode(css, 'css');
        setCss(formatted);
      } else {
        const formatted = await formatCode(js, 'javascript');
        setJs(formatted);
      }
      toast.success('Code formatted successfully!');
    } catch (error) {
      toast.error('Failed to format code');
      console.error('Format error:', error);
    } finally {
      setIsFormatting(false);
    }
  };

  return (
    <Button onClick={handleFormat} disabled={isFormatting}>
      {isFormatting ? '⏳ Formatting...' : '✨ Format'}
    </Button>
  );
};

export default FormatButton;
