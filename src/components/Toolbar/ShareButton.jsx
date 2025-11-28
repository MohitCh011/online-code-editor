import React from 'react';
import Button from '../Common/Button';
import { useEditor } from '../../context/EditorContext';
import { copyToClipboard } from '../../utils/clipboardHelper';

const ShareButton = () => {
  const { html, css, js } = useEditor();

  const handleShare = () => {
    const code = `HTML:\n${html}\n\nCSS:\n${css}\n\nJavaScript:\n${js}`;
    copyToClipboard(code);
  };

  return <Button onClick={handleShare}>📋 Share</Button>;
};

export default ShareButton;
