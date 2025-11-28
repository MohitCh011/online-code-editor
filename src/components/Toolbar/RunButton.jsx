import React from 'react';
import Button from '../Common/Button';
import toast from 'react-hot-toast';

const RunButton = () => {
  const handleRun = () => {
    // Trigger a re-render of preview by dispatching event
    window.dispatchEvent(new Event('run-code'));
    toast.success('Code executed!');
  };

  return <Button onClick={handleRun} variant="primary">▶ Run</Button>;
};

export default RunButton;
