import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useEditor } from '../../context/EditorContext';
import { useTheme } from '../../context/ThemeContext';
import { editorConfig } from '../../config/editorConfig';
import { emmetHTML, emmetCSS, emmetJSX } from 'emmet-monaco-es';

const EditorPanel = () => {
  const { html, css, js, activeTab, setHtml, setCss, setJs, fontSize } = useEditor();
  const { theme } = useTheme();
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    
    // Initialize Emmet for HTML
    emmetHTML(monaco);
    
    // Initialize Emmet for CSS
    emmetCSS(monaco);
    
    // Initialize Emmet for JavaScript/JSX (optional)
    emmetJSX(monaco);
    
    // Add custom keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      console.log('Code saved to localStorage');
    });

    // Enhanced HTML/CSS completion
    monaco.languages.registerCompletionItemProvider('html', {
      triggerCharacters: ['<', ' ', '.', '#'],
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };

        // Common HTML snippets
        const htmlSnippets = [
          {
            label: 'html5',
            kind: monaco.languages.CompletionItemKind.Snippet,
            // eslint-disable-next-line no-template-curly-in-string
            insertText: [
              '<!DOCTYPE html>',
              '<html lang="en">',
              '<head>',
              '  <meta charset="UTF-8">',
              '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
              '  <title>${1:Document}</title>',
              '</head>',
              '<body>',
              '  ${2}',
              '</body>',
              '</html>'
            ].join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'HTML5 boilerplate',
            range: range
          },
          {
            label: 'div',
            kind: monaco.languages.CompletionItemKind.Snippet,
            // eslint-disable-next-line no-template-curly-in-string
            insertText: '<div>${1}</div>',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'div element',
            range: range
          },
          {
            label: 'button',
            kind: monaco.languages.CompletionItemKind.Snippet,
            // eslint-disable-next-line no-template-curly-in-string
            insertText: '<button type="${1:button}">${2:Click me}</button>',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'button element',
            range: range
          },
          {
            label: 'input',
            kind: monaco.languages.CompletionItemKind.Snippet,
            // eslint-disable-next-line no-template-curly-in-string
            insertText: '<input type="${1:text}" placeholder="${2}" />',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'input element',
            range: range
          },
          {
            label: 'link',
            kind: monaco.languages.CompletionItemKind.Snippet,
            // eslint-disable-next-line no-template-curly-in-string
            insertText: '<link rel="stylesheet" href="${1:style.css}">',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'link stylesheet',
            range: range
          },
          {
            label: 'script',
            kind: monaco.languages.CompletionItemKind.Snippet,
            // eslint-disable-next-line no-template-curly-in-string
            insertText: '<script src="${1:script.js}"></script>',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'script element',
            range: range
          }
        ];

        return { suggestions: htmlSnippets };
      }
    });

    // Focus the editor
    editor.focus();
  };

  const handleEditorChange = (value) => {
    const safeValue = value || '';
    if (activeTab === 'html') setHtml(safeValue);
    else if (activeTab === 'css') setCss(safeValue);
    else if (activeTab === 'js') setJs(safeValue);
  };

  const getEditorValue = () => {
    if (activeTab === 'html') return html;
    if (activeTab === 'css') return css;
    return js;
  };

  const getLanguage = () => {
    if (activeTab === 'html') return 'html';
    if (activeTab === 'css') return 'css';
    return 'javascript';
  };

  return (
    <div className="editor-panel">
      <Editor
        height="100%"
        language={getLanguage()}
        value={getEditorValue()}
        theme={theme}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{ ...editorConfig, fontSize }}
        loading={
          <div style={{ 
            padding: '20px', 
            color: '#888',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div>Loading Monaco Editor...</div>
            <div style={{ fontSize: '12px', opacity: 0.7 }}>
              Emmet autocomplete enabled
            </div>
          </div>
        }
      />
    </div>
  );
};

export default EditorPanel;
