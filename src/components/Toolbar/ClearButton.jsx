import React from 'react';
import Button from '../Common/Button';
import { useEditor } from '../../context/EditorContext';
import toast from 'react-hot-toast';

const ClearButton = () => {
  const { clearCode } = useEditor();

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all code? This action cannot be undone.')) {
      clearCode();
      toast.success('All code cleared!');
    }
  };

  return <Button onClick={handleClear} variant="danger">🗑 Clear</Button>;
};

export default ClearButton;
