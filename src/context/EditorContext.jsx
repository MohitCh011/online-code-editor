import React, { createContext, useContext, useState, useEffect } from 'react';

const EditorContext = createContext(undefined);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within EditorProvider');
  }
  return context;
};

const defaultCode = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Online Code Compiler</title>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 Online Code Compiler</h1>
      <p class="subtitle">Write. Run. Create.</p>
    </div>
    
    <div class="content">
      <div class="card">
        <div class="icon">⚡</div>
        <h2>Lightning Fast</h2>
        <p>See your code come to life instantly with real-time preview</p>
      </div>
      
      <div class="card">
        <div class="icon">🎨</div>
        <h2>Beautiful UI</h2>
        <p>Clean and modern interface for the best coding experience</p>
      </div>
      
      <div class="card">
        <div class="icon">💻</div>
        <h2>Powerful Editor</h2>
        <p>Monaco-powered editor with syntax highlighting and IntelliSense</p>
      </div>
    </div>
    
    <div class="actions">
      <button class="btn-primary" id="startBtn">Get Started</button>
      <button class="btn-secondary" id="learnBtn">Learn More</button>
    </div>
    
    <div class="stats">
      <div class="stat-item">
        <span class="stat-number" id="counter">0</span>
        <span class="stat-label">Lines of Code</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">∞</span>
        <span class="stat-label">Possibilities</span>
      </div>
    </div>
  </div>
</body>
</html>`,

  css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #ffffff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #2d3748;
}

.container {
  max-width: 900px;
  width: 100%;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

h1 {
  font-size: 3rem;
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 0.5rem;
  letter-spacing: -1px;
}

.subtitle {
  font-size: 1.25rem;
  color: #718096;
  font-weight: 500;
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.card {
  background: #f7fafc;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.card:hover {
  transform: translateY(-5px);
  border-color: #10b981;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
}

.icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.card h2 {
  font-size: 1.25rem;
  color: #1a202c;
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.card p {
  color: #718096;
  font-size: 0.95rem;
  line-height: 1.6;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

button {
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
}

.btn-primary {
  background: #10b981;
  color: white;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
}

.btn-primary:hover {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
}

.btn-secondary {
  background: white;
  color: #10b981;
  border: 2px solid #10b981;
}

.btn-secondary:hover {
  background: #10b981;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
}

.stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding: 2rem;
  background: #f7fafc;
  border-radius: 12px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  color: #10b981;
  margin-bottom: 0.25rem;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.container > * {
  animation: fadeIn 0.6s ease-out backwards;
}

.header { animation-delay: 0.1s; }
.content { animation-delay: 0.2s; }
.actions { animation-delay: 0.3s; }
.stats { animation-delay: 0.4s; }

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  
  .content {
    grid-template-columns: 1fr;
  }
  
  .stats {
    gap: 2rem;
  }
}`,

  js: `document.addEventListener('DOMContentLoaded', function() {
  const counter = document.getElementById('counter');
  let count = 0;
  const target = 1337;
  const duration = 2000;
  const increment = target / (duration / 16);

  function updateCounter() {
    count += increment;
    if (count < target) {
      counter.textContent = Math.floor(count);
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target;
    }
  }

  updateCounter();

  const startBtn = document.getElementById('startBtn');
  startBtn.addEventListener('click', function() {
    createConfetti();
    setTimeout(() => {
      alert('🎉 Awesome! Start coding in the editor above!');
    }, 500);
  });

  const learnBtn = document.getElementById('learnBtn');
  learnBtn.addEventListener('click', function() {
    const features = [
      '✨ Real-time preview',
      '🎨 Syntax highlighting',
      '⚡ Auto-save',
      '🚀 Emmet support',
      '💾 Export code',
      '⌨️ Keyboard shortcuts'
    ];
    alert('Amazing Features:\\n\\n' + features.join('\\n'));
  });

  function createConfetti() {
    const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = \`
        position: fixed;
        width: 10px;
        height: 10px;
        background: \${colors[Math.floor(Math.random() * colors.length)]};
        left: \${Math.random() * 100}%;
        top: -10px;
        opacity: 1;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: fall \${2 + Math.random() * 2}s linear forwards;
      \`;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }
  }

  const style = document.createElement('style');
  style.textContent = \`
    @keyframes fall {
      to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
  \`;
  document.head.appendChild(style);

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});`
};

export const EditorProvider = ({ children }) => {
  // Initialize with default code or load from localStorage
  const [code, setCode] = useState(() => {
    try {
      const savedCode = localStorage.getItem('code');
      if (savedCode) {
        const parsed = JSON.parse(savedCode);
        // Ensure all keys exist
        return {
          html: parsed.html || defaultCode.html,
          css: parsed.css || defaultCode.css,
          js: parsed.js || defaultCode.js
        };
      }
    } catch (error) {
      console.error('Error loading saved code:', error);
    }
    return defaultCode;
  });

  const [activeTab, setActiveTab] = useState('html');
  const [fontSize, setFontSize] = useState(() => {
    try {
      const saved = localStorage.getItem('fontSize');
      return saved ? parseInt(saved) : 14;
    } catch (error) {
      return 14;
    }
  });

  // Save code to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('code', JSON.stringify(code));
    } catch (error) {
      console.error('Error saving code:', error);
    }
  }, [code]);

  // Save fontSize to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fontSize', fontSize.toString());
    } catch (error) {
      console.error('Error saving fontSize:', error);
    }
  }, [fontSize]);

  const updateCode = (language, value) => {
    setCode(prev => ({
      ...prev,
      [language]: value
    }));
  };

  const clearCode = () => {
    setCode({
      html: '',
      css: '',
      js: ''
    });
  };

  const runCode = () => {
    // Trigger preview update (handled by Preview component)
    console.log('Running code...');
  };

  const value = {
    code,
    updateCode,
    activeTab,
    setActiveTab,
    fontSize,
    setFontSize,
    clearCode,
    runCode
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
};
