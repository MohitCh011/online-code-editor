export const bundleCode = (html, css, js, libraries = []) => {
  const libraryTags = libraries.map(lib => {
    if (lib.url.endsWith('.css')) {
      return `<link rel="stylesheet" href="${lib.url}">`;
    }
    return `<script src="${lib.url}"></script>`;
  }).join('\n');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${libraryTags}
      <style>${css}</style>
    </head>
    <body>
      ${html}
      <script>
        try {
          ${js}
        } catch (error) {
          console.error('Runtime Error:', error);
          document.body.innerHTML += '<div style="color: red; padding: 20px; font-family: monospace;">Error: ' + error.message + '</div>';
        }
      </script>
    </body>
    </html>
  `;
};
