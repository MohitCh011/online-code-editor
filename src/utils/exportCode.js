import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const exportAsZip = async (html, css, js) => {
  const zip = new JSZip();
  
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Project</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  ${html}
  <script src="script.js"></script>
</body>
</html>`;

  zip.file('index.html', fullHtml);
  zip.file('style.css', css);
  zip.file('script.js', js);

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'code-project.zip');
};
