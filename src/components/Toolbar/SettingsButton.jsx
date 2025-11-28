import React from 'react';
import IconButton from '../Common/IconButton';
import { useEditor } from '../../context/EditorContext';

const SettingsButton = () => {
  const { isSettingsOpen, setIsSettingsOpen } = useEditor();

  return (
    <IconButton
      icon="⚙"
      tooltip="Settings"
      onClick={() => setIsSettingsOpen(!isSettingsOpen)}
    />
  );
};

export default SettingsButton;
