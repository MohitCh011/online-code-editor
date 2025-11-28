import React, { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const ShortcutsModal = ({ isOpen, onClose }) => {
  const { uiTheme } = useTheme();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const shortcuts = [
    {
      category: 'General',
      icon: '⚡',
      items: [
        { keys: ['Ctrl', 'S'], description: 'Save code to localStorage', icon: '💾' },
        { keys: ['Ctrl', 'R'], description: 'Run/Refresh preview', icon: '▶️' },
        { keys: ['Ctrl', '/'], description: 'Show keyboard shortcuts', icon: '⌨️' },
        { keys: ['Esc'], description: 'Close modal/dialogs', icon: '❌' }
      ]
    },
    {
      category: 'Editor',
      icon: '📝',
      items: [
        { keys: ['Ctrl', 'F'], description: 'Find in editor', icon: '🔍' },
        { keys: ['Ctrl', 'H'], description: 'Find and replace', icon: '🔄' },
        { keys: ['Alt', 'Shift', 'F'], description: 'Format code', icon: '✨' },
        { keys: ['Ctrl', '/'], description: 'Toggle line comment', icon: '💬' },
        { keys: ['Alt', '↑/↓'], description: 'Move line up/down', icon: '↕️' },
        { keys: ['Ctrl', 'D'], description: 'Delete current line', icon: '🗑️' },
        { keys: ['Ctrl', 'Z'], description: 'Undo', icon: '↩️' },
        { keys: ['Ctrl', 'Y'], description: 'Redo', icon: '↪️' }
      ]
    },
    {
      category: 'Selection',
      icon: '🎯',
      items: [
        { keys: ['Ctrl', 'A'], description: 'Select all', icon: '📝' },
        { keys: ['Ctrl', 'L'], description: 'Select current line', icon: '📏' },
        { keys: ['Shift', '↑/↓'], description: 'Extend selection', icon: '📋' },
        { keys: ['Ctrl', 'Shift', 'K'], description: 'Delete line', icon: '✂️' }
      ]
    },
    {
      category: 'Navigation',
      icon: '🧭',
      items: [
        { keys: ['Ctrl', 'Home'], description: 'Go to beginning', icon: '⬆️' },
        { keys: ['Ctrl', 'End'], description: 'Go to end', icon: '⬇️' },
        { keys: ['Ctrl', 'G'], description: 'Go to line', icon: '🎯' },
        { keys: ['Ctrl', '←/→'], description: 'Move cursor by word', icon: '⬅️' }
      ]
    },
    {
      category: 'Emmet',
      icon: '⚡',
      items: [
        { keys: ['Tab'], description: 'Expand Emmet abbreviation', icon: '⚡' },
        { keys: ['!', 'Tab'], description: 'HTML5 boilerplate', icon: '📄' },
        { keys: ['div.class', 'Tab'], description: 'Element with class', icon: '🎨' },
        { keys: ['ul>li*3', 'Tab'], description: 'Nested elements', icon: '🌳' }
      ]
    }
  ];

  return (
    <div className={`shortcuts-overlay ${uiTheme}`} onClick={onClose}>
      <div className={`shortcuts-container ${uiTheme}`} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className={`shortcuts-header ${uiTheme}`}>
          <div className="shortcuts-title-wrapper">
            <span className="shortcuts-main-icon">⌨️</span>
            <div>
              <h2 className="shortcuts-title">
                {uiTheme === 'modern' ? 'KEYBOARD SHORTCUTS' : 'SHORTCUT COMMANDS'}
              </h2>
              <p className="shortcuts-subtitle">
                {uiTheme === 'modern' ? 'Master your workflow' : 'SYSTEM COMMAND REFERENCE'}
              </p>
            </div>
          </div>
          <button className={`shortcuts-close ${uiTheme}`} onClick={onClose}>
            {uiTheme === 'modern' ? '✕' : '[X]'}
          </button>
        </div>

        {/* Body */}
        <div className={`shortcuts-body ${uiTheme}`}>
          <div className={`shortcuts-grid ${uiTheme}`}>
            {shortcuts.map((section, index) => (
              <div key={index} className={`shortcuts-section ${uiTheme}`}>
                <h3 className={`shortcuts-category ${uiTheme}`}>
                  <span className="category-icon">{section.icon}</span>
                  {section.category}
                </h3>
                <div className="shortcuts-list">
                  {section.items.map((shortcut, idx) => (
                    <div key={idx} className={`shortcut-item ${uiTheme}`}>
                      <div className="shortcut-left">
                        <span className="shortcut-icon">{shortcut.icon}</span>
                        <span className="shortcut-description">{shortcut.description}</span>
                      </div>
                      <div className="shortcut-keys">
                        {shortcut.keys.map((key, keyIdx) => (
                          <React.Fragment key={keyIdx}>
                            <kbd className={`key ${uiTheme}`}>{key}</kbd>
                            {keyIdx < shortcut.keys.length - 1 && (
                              <span className="key-separator">+</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`shortcuts-footer ${uiTheme}`}>
          <p className="shortcuts-tip">
            {uiTheme === 'modern' ? (
              <>💡 <strong>Pro Tip:</strong> Press <kbd className={`key ${uiTheme}`}>Ctrl+/</kbd> anytime to access shortcuts</>
            ) : (
              <>{'>'} PRESS [CTRL+/] TO ACCESS THIS SCREEN</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShortcutsModal;
