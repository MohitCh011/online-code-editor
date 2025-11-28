export const defaultCode = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Online Compiler</title>
</head>
<body>
  <div class="container">
    <h1>Welcome to Online Code Compiler</h1>
    <p>Start coding and see live results!</p>
    <button id="myButton">Click Me!</button>
  </div>
</body>
</html>`,
  css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  text-align: center;
  animation: fadeIn 0.5s ease-in;
}

h1 {
  color: #667eea;
  margin-bottom: 1rem;
}

button {
  margin-top: 1.5rem;
  padding: 12px 30px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

button:hover {
  background: #764ba2;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}`,
  js: `document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('myButton');
  
  button.addEventListener('click', function() {
    alert('Hello from Online Compiler! 🚀');
  });
  
  console.log('JavaScript is working!');
});`
};
