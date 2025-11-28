import React from 'react';
import RunButton from './RunButton';
import DownloadButton from './DownloadButton';
import ShareButton from './ShareButton';
import FormatButton from './FormatButton';
import SettingsButton from './SettingsButton';
import ClearButton from './ClearButton';

const MainToolbar = () => {
  return (
    <div className="main-toolbar">
      <div className="toolbar-left">
        <RunButton />
        <FormatButton />
        <ClearButton />
      </div>
      <div className="toolbar-right">
        <DownloadButton />
        <ShareButton />
      </div>
    </div>
  );
};

export default MainToolbar;
