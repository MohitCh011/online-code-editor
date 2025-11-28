export const configureEmmet = (monaco) => {
  // HTML Emmet snippets
  const htmlSnippets = [
    {
      label: 'html:5',
      insertText: [
        '<!DOCTYPE html>',
        '<html lang="en">',
        '<head>',
        '\t<meta charset="UTF-8">',
        '\t<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '\t<title>${1:Document}</title>',
        '</head>',
        '<body>',
        '\t$0',
        '</body>',
        '</html>'
      ].join('\n'),
      documentation: 'HTML5 template'
    },
    {
      label: 'title',
      insertText: '<title>$0</title>',
      documentation: 'Title element'
    },
    {
      label: 'div',
      insertText: '<div>$0</div>',
      documentation: 'Div element'
    },
    {
      label: 'p',
      insertText: '<p>$0</p>',
      documentation: 'Paragraph element'
    },
    {
      label: 'a',
      insertText: '<a href="$1">$0</a>',
      documentation: 'Anchor link'
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
      label: 'h2',
      insertText: '<h2>$0</h2>',
      documentation: 'Heading 2'
    },
    {
      label: 'h3',
      insertText: '<h3>$0</h3>',
      documentation: 'Heading 3'
    },
    {
      label: 'ul',
      insertText: '<ul>\n\t<li>$0</li>\n</ul>',
      documentation: 'Unordered list'
    },
    {
      label: 'ol',
      insertText: '<ol>\n\t<li>$0</li>\n</ol>',
      documentation: 'Ordered list'
    },
    {
      label: 'li',
      insertText: '<li>$0</li>',
      documentation: 'List item'
    },
    {
      label: 'ul>li*3',
      insertText: '<ul>\n\t<li>$1</li>\n\t<li>$2</li>\n\t<li>$3</li>\n</ul>',
      documentation: 'Unordered list with 3 items'
    },
    {
      label: 'span',
      insertText: '<span>$0</span>',
      documentation: 'Span element'
    },
    {
      label: 'form',
      insertText: '<form action="$1">\n\t$0\n</form>',
      documentation: 'Form element'
    },
    {
      label: 'table',
      insertText: '<table>\n\t<tr>\n\t\t<td>$0</td>\n\t</tr>\n</table>',
      documentation: 'Table element'
    },
    {
      label: 'script',
      insertText: '<script>\n\t$0\n</script>',
      documentation: 'Script element'
    },
    {
      label: 'style',
      insertText: '<style>\n\t$0\n</style>',
      documentation: 'Style element'
    },
    {
      label: 'link',
      insertText: '<link rel="stylesheet" href="$1">',
      documentation: 'Link stylesheet'
    },
    {
      label: 'meta',
      insertText: '<meta name="$1" content="$2">',
      documentation: 'Meta tag'
    },
    {
      label: 'header',
      insertText: '<header>\n\t$0\n</header>',
      documentation: 'Header element'
    },
    {
      label: 'footer',
      insertText: '<footer>\n\t$0\n</footer>',
      documentation: 'Footer element'
    },
    {
      label: 'nav',
      insertText: '<nav>\n\t$0\n</nav>',
      documentation: 'Navigation element'
    },
    {
      label: 'section',
      insertText: '<section>\n\t$0\n</section>',
      documentation: 'Section element'
    },
    {
      label: 'article',
      insertText: '<article>\n\t$0\n</article>',
      documentation: 'Article element'
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
    }
  });

  // CSS Emmet snippets
  const cssSnippets = [
    {
      label: 'm',
      insertText: 'margin: ${1:0};',
      documentation: 'margin'
    },
    {
      label: 'mt',
      insertText: 'margin-top: ${1:0};',
      documentation: 'margin-top'
    },
    {
      label: 'mr',
      insertText: 'margin-right: ${1:0};',
      documentation: 'margin-right'
    },
    {
      label: 'mb',
      insertText: 'margin-bottom: ${1:0};',
      documentation: 'margin-bottom'
    },
    {
      label: 'ml',
      insertText: 'margin-left: ${1:0};',
      documentation: 'margin-left'
    },
    {
      label: 'p',
      insertText: 'padding: ${1:0};',
      documentation: 'padding'
    },
    {
      label: 'pt',
      insertText: 'padding-top: ${1:0};',
      documentation: 'padding-top'
    },
    {
      label: 'pr',
      insertText: 'padding-right: ${1:0};',
      documentation: 'padding-right'
    },
    {
      label: 'pb',
      insertText: 'padding-bottom: ${1:0};',
      documentation: 'padding-bottom'
    },
    {
      label: 'pl',
      insertText: 'padding-left: ${1:0};',
      documentation: 'padding-left'
    },
    {
      label: 'bgc',
      insertText: 'background-color: ${1:#fff};',
      documentation: 'background-color'
    },
    {
      label: 'c',
      insertText: 'color: ${1:#000};',
      documentation: 'color'
    },
    {
      label: 'df',
      insertText: 'display: flex;',
      documentation: 'display: flex'
    },
    {
      label: 'dg',
      insertText: 'display: grid;',
      documentation: 'display: grid'
    },
    {
      label: 'dn',
      insertText: 'display: none;',
      documentation: 'display: none'
    },
    {
      label: 'db',
      insertText: 'display: block;',
      documentation: 'display: block'
    },
    {
      label: 'fz',
      insertText: 'font-size: ${1:16px};',
      documentation: 'font-size'
    },
    {
      label: 'fw',
      insertText: 'font-weight: ${1:400};',
      documentation: 'font-weight'
    },
    {
      label: 'w',
      insertText: 'width: ${1:100%};',
      documentation: 'width'
    },
    {
      label: 'h',
      insertText: 'height: ${1:100%};',
      documentation: 'height'
    },
    {
      label: 'pos',
      insertText: 'position: ${1|relative,absolute,fixed,sticky|};',
      documentation: 'position'
    },
    {
      label: 'tac',
      insertText: 'text-align: center;',
      documentation: 'text-align: center'
    },
    {
      label: 'tal',
      insertText: 'text-align: left;',
      documentation: 'text-align: left'
    },
    {
      label: 'tar',
      insertText: 'text-align: right;',
      documentation: 'text-align: right'
    },
    {
      label: 'jcc',
      insertText: 'justify-content: center;',
      documentation: 'justify-content: center'
    },
    {
      label: 'aic',
      insertText: 'align-items: center;',
      documentation: 'align-items: center'
    },
    {
      label: 'brad',
      insertText: 'border-radius: ${1:4px};',
      documentation: 'border-radius'
    },
    {
      label: 'bs',
      insertText: 'box-shadow: ${1:0 2px 4px rgba(0,0,0,0.1)};',
      documentation: 'box-shadow'
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
