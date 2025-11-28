import React from 'react';
import { useEditor } from '../../context/EditorContext';
import Dropdown from '../Common/Dropdown';

const EditorSettings = () => {
  const { fontSize, setFontSize } = useEditor();

  const fontSizes = [12, 14, 16, 18, 20, 22, 24];

  return (
    <div className="editor-settings">
      <Dropdown
        label="Font Size"
        value={fontSize}
        options={fontSizes.map(size => ({ value: size, label: `${size}px` }))}
        onChange={setFontSize}
      />
    </div>
  );
};

export default EditorSettings;
