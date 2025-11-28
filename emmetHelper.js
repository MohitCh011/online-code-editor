export const emmetAbbreviations = {
  html: {
    'html5': '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  \n</body>\n</html>',
    'title': '<title></title>',
    'meta': '<meta name="" content="">',
    'link': '<link rel="stylesheet" href="">',
    'script': '<script src=""></script>',
    'div': '<div></div>',
    'span': '<span></span>',
    'p': '<p></p>',
    'a': '<a href=""></a>',
    'img': '<img src="" alt="">',
    'input': '<input type="text">',
    'button': '<button></button>',
    'form': '<form action=""></form>',
    'table': '<table></table>',
    'ul': '<ul>\n  <li></li>\n</ul>',
    'ol': '<ol>\n  <li></li>\n</ol>'
  },
  css: {
    'm': 'margin: ',
    'mt': 'margin-top: ',
    'mr': 'margin-right: ',
    'mb': 'margin-bottom: ',
    'ml': 'margin-left: ',
    'p': 'padding: ',
    'pt': 'padding-top: ',
    'pr': 'padding-right: ',
    'pb': 'padding-bottom: ',
    'pl': 'padding-left: ',
    'w': 'width: ',
    'h': 'height: ',
    'bg': 'background: ',
    'bgc': 'background-color: ',
    'c': 'color: ',
    'df': 'display: flex;',
    'dg': 'display: grid;',
    'db': 'display: block;',
    'dn': 'display: none;',
    'fw': 'font-weight: ',
    'fs': 'font-size: ',
    'ta': 'text-align: ',
    'td': 'text-decoration: ',
    'br': 'border-radius: ',
    'b': 'border: '
  }
};

export const expandEmmet = (abbreviation, language) => {
  const abbrevs = emmetAbbreviations[language] || {};
  return abbrevs[abbreviation] || abbreviation;
};
