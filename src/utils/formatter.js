export const formatCode = async (code, language) => {
  try {
    const prettier = await import('prettier/standalone');
    const parserBabel = await import('prettier/parser-babel');
    const parserHtml = await import('prettier/parser-html');
    const parserCss = await import('prettier/parser-postcss');

    const parsers = {
      html: 'html',
      css: 'css',
      javascript: 'babel'
    };

    return prettier.format(code, {
      parser: parsers[language] || 'babel',
      plugins: [parserBabel, parserHtml, parserCss],
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'es5'
    });
  } catch (error) {
    console.error('Formatting error:', error);
    return code;
  }
};
