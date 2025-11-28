import React from 'react';
import Button from '../Common/Button';
import { useEditor } from '../../context/EditorContext';
import { exportAsZip } from '../../utils/exportCode';
import toast from 'react-hot-toast';

const DownloadButton = () => {
  const { html, css, js } = useEditor();

  const handleDownload = async () => {
    try {
      await exportAsZip(html, css, js);
      toast.success('Project downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download project');
      console.error('Download error:', error);
    }
  };

  return <Button onClick={handleDownload}>⬇ Download</Button>;
};

export default DownloadButton;
