export const editorConfig = {
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: 'on',
  roundedSelection: false,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
  wordWrap: 'on',
  formatOnPaste: true,
  formatOnType: true,
  
  // Enhanced autocomplete settings
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnEnter: 'on',
  quickSuggestions: {
    other: true,
    comments: false,
    strings: true
  },
  quickSuggestionsDelay: 100,
  
  // IntelliSense settings
  parameterHints: {
    enabled: true
  },
  suggest: {
    insertMode: 'replace',
    showWords: true,
    showSnippets: true,
  },
  
  // Emmet
  emmet: true,
  
  folding: true,
  lineHeight: 24,
  fontFamily: "'Fira Code', 'Consolas', 'Courier New', monospace",
  fontLigatures: true,
  
  // Better HTML editing
  autoClosingBrackets: 'always',
  autoClosingQuotes: 'always',
  autoClosingTags: true,
  autoIndent: 'full',
};
