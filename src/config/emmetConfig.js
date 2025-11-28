export const configureEmmet = (monaco) => {
  // HTML Emmet snippets
  const htmlSnippets = [
    {
      label: 'html:5',
      insertText: '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Document}</title>\n</head>\n<body>\n\t$0\n</body>\n</html>',
      documentation: 'HTML5 template'
    },
    {
      label: 'div',
      insertText: '<div>$0</div>',
      documentation: 'Div element'
    },
    {
      label: 'title',
      insertText: '<title>$0</title>',
      documentation: 'Title element'
    },
    {
      label: 'p',
      insertText: '<p>$0</p>',
      documentation: 'Paragraph element'
    },
    {
      label: 'a',
      insertText: '<a href="$1">$0</a>',
      documentation: 'Anchor element'
    },
    {
      label: 'img',
      insertText: '<img src="$1" alt="$2">',
      documentation: 'Image element'
    },
    {
      label: 'button',
      insertText: '<button>$0</button>',
      documentation: 'Button element'
    },
    {
      label: 'input',
      insertText: '<input type="$1" placeholder="$2">',
      documentation: 'Input element'
    },
    {
      label: 'h1',
      insertText: '<h1>$0</h1>',
      documentation: 'Heading 1'
    },
    {
      label: 'ul>li*3',
      insertText: '<ul>\n\t<li>$1</li>\n\t<li>$2</li>\n\t<li>$3</li>\n</ul>',
      documentation: 'Unordered list with 3 items'
    }
  ];

  // Register completion provider for HTML
  monaco.languages.registerCompletionItemProvider('html', {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      const suggestions = htmlSnippets.map(snippet => ({
        label: snippet.label,
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: snippet.insertText,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: snippet.documentation,
        range: range
      }));

      return { suggestions };
    },
    triggerCharacters: ['<', ' ', '\t']
  });

  // CSS Emmet snippets
  const cssSnippets = [
    {
      label: 'm',
      insertText: 'margin: ${1:0};',
      documentation: 'Margin'
    },
    {
      label: 'p',
      insertText: 'padding: ${1:0};',
      documentation: 'Padding'
    },
    {
      label: 'bgc',
      insertText: 'background-color: ${1:#fff};',
      documentation: 'Background color'
    },
    {
      label: 'c',
      insertText: 'color: ${1:#000};',
      documentation: 'Color'
    },
    {
      label: 'df',
      insertText: 'display: flex;',
      documentation: 'Display flex'
    },
    {
      label: 'fz',
      insertText: 'font-size: ${1:16px};',
      documentation: 'Font size'
    }
  ];

  // Register completion provider for CSS
  monaco.languages.registerCompletionItemProvider('css', {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      const suggestions = cssSnippets.map(snippet => ({
        label: snippet.label,
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: snippet.insertText,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: snippet.documentation,
        range: range
      }));

      return { suggestions };
    }
  });
};
