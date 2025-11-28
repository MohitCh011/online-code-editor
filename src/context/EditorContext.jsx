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
  <title>Love Code Compiler ❤️</title>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="love-date">❤️ 31/11/2025 ❤️</div>
      <h1>💕 Love Code Compiler 💕</h1>
      <p class="subtitle">Write with Love. Code with Heart. Create with Passion.</p>
      <div class="hearts-floating">
        <span class="heart">❤️</span>
        <span class="heart">💖</span>
        <span class="heart">💗</span>
        <span class="heart">💓</span>
        <span class="heart">💝</span>
      </div>
    </div>
    
    <div class="love-message">
      <h2>✨ Coding is Love ✨</h2>
      <p>Every line of code is written with passion, every function with care, and every project with love.</p>
    </div>
    
    <div class="content">
      <div class="card">
        <div class="icon">💖</div>
        <h2>Made with Love</h2>
        <p>Every feature crafted with passion and dedication for you</p>
        <div class="heart-beat">❤️</div>
      </div>
      
      <div class="card">
        <div class="icon">💝</div>
        <h2>Beautiful Design</h2>
        <p>A romantic and elegant interface that makes coding feel like love</p>
        <div class="heart-beat">💗</div>
      </div>
      
      <div class="card">
        <div class="icon">💕</div>
        <h2>Powerful & Sweet</h2>
        <p>Monaco-powered editor wrapped in love and care</p>
        <div class="heart-beat">💓</div>
      </div>
    </div>
    
    <div class="love-quote">
      <p>"Code is poetry, and every line we write is a love letter to the future."</p>
      <span class="quote-author">- With Love, 31/11/2025 ❤️</span>
    </div>
    
    <div class="actions">
      <button class="btn-primary" id="loveBtn">💖 Start Coding with Love</button>
      <button class="btn-secondary" id="heartBtn">❤️ Spread the Love</button>
    </div>
    
    <div class="stats">
      <div class="stat-item">
        <span class="stat-number" id="heartCounter">0</span>
        <span class="stat-label">💕 Hearts Given</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">∞</span>
        <span class="stat-label">💖 Love Forever</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">31/11</span>
        <span class="stat-label">💝 Special Date</span>
      </div>
    </div>
    
    <div class="footer-hearts">
      <span>❤️</span>
      <span>💖</span>
      <span>💗</span>
      <span>💕</span>
      <span>💓</span>
      <span>💝</span>
      <span>❤️</span>
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
  background: linear-gradient(135deg, #ffeef8 0%, #ffe0f0 50%, #ffd1e8 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #d91e5a;
  position: relative;
  overflow-x: hidden;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 105, 180, 0.3) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.container {
  max-width: 900px;
  width: 100%;
  position: relative;
  z-index: 1;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.love-date {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ff1493;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(255, 20, 147, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

h1 {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, #ff1493, #ff69b4, #ff1493);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  letter-spacing: -1px;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.subtitle {
  font-size: 1.25rem;
  color: #d91e5a;
  font-weight: 500;
  font-style: italic;
}

.hearts-floating {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.hearts-floating .heart {
  font-size: 2rem;
  animation: float 3s ease-in-out infinite;
  display: inline-block;
}

.hearts-floating .heart:nth-child(1) { animation-delay: 0s; }
.hearts-floating .heart:nth-child(2) { animation-delay: 0.2s; }
.hearts-floating .heart:nth-child(3) { animation-delay: 0.4s; }
.hearts-floating .heart:nth-child(4) { animation-delay: 0.6s; }
.hearts-floating .heart:nth-child(5) { animation-delay: 0.8s; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.love-message {
  text-align: center;
  background: rgba(255, 255, 255, 0.7);
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 2rem;
  border: 3px dashed #ff69b4;
  box-shadow: 0 8px 32px rgba(255, 20, 147, 0.2);
}

.love-message h2 {
  color: #ff1493;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.love-message p {
  color: #d91e5a;
  font-size: 1.1rem;
  line-height: 1.8;
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.card {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
  border: 3px solid #ffb6c1;
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '💕';
  position: absolute;
  font-size: 10rem;
  opacity: 0.05;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card:hover {
  transform: translateY(-10px) scale(1.02);
  border-color: #ff1493;
  box-shadow: 0 15px 40px rgba(255, 20, 147, 0.4);
  background: rgba(255, 240, 245, 1);
}

.icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  10%, 30% { transform: scale(0.9); }
  20%, 40% { transform: scale(1.1); }
}

.heart-beat {
  font-size: 1.5rem;
  margin-top: 1rem;
  animation: heartbeat 1.5s ease-in-out infinite;
}

.card h2 {
  font-size: 1.4rem;
  color: #ff1493;
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.card p {
  color: #d91e5a;
  font-size: 0.95rem;
  line-height: 1.6;
}

.love-quote {
  text-align: center;
  background: linear-gradient(135deg, #fff0f5, #ffe4e1);
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  border-left: 5px solid #ff1493;
  border-right: 5px solid #ff69b4;
}

.love-quote p {
  font-size: 1.3rem;
  font-style: italic;
  color: #d91e5a;
  margin-bottom: 1rem;
  line-height: 1.8;
}

.quote-author {
  display: block;
  font-size: 1rem;
  color: #ff1493;
  font-weight: 600;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

button {
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
  position: relative;
  overflow: hidden;
}

button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

button:hover::before {
  width: 300px;
  height: 300px;
}

.btn-primary {
  background: linear-gradient(135deg, #ff1493, #ff69b4);
  color: white;
  box-shadow: 0 8px 20px rgba(255, 20, 147, 0.4);
  border: 3px solid #ff1493;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #ff69b4, #ff1493);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 12px 30px rgba(255, 20, 147, 0.6);
}

.btn-secondary {
  background: white;
  color: #ff1493;
  border: 3px solid #ff1493;
}

.btn-secondary:hover {
  background: #ff1493;
  color: white;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(255, 20, 147, 0.4);
}

.stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  flex-wrap: wrap;
  border: 3px solid #ffb6c1;
  box-shadow: 0 8px 32px rgba(255, 105, 180, 0.3);
}

.stat-item {
  text-align: center;
  padding: 1rem;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #ff1493, #ff69b4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  color: #d91e5a;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.footer-hearts {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  font-size: 2rem;
}

.footer-hearts span {
  animation: bounce 2s ease-in-out infinite;
  display: inline-block;
}

.footer-hearts span:nth-child(1) { animation-delay: 0s; }
.footer-hearts span:nth-child(2) { animation-delay: 0.1s; }
.footer-hearts span:nth-child(3) { animation-delay: 0.2s; }
.footer-hearts span:nth-child(4) { animation-delay: 0.3s; }
.footer-hearts span:nth-child(5) { animation-delay: 0.4s; }
.footer-hearts span:nth-child(6) { animation-delay: 0.5s; }
.footer-hearts span:nth-child(7) { animation-delay: 0.6s; }

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.container > * {
  animation: fadeIn 0.8s ease-out backwards;
}

.header { animation-delay: 0.1s; }
.love-message { animation-delay: 0.2s; }
.content { animation-delay: 0.3s; }
.love-quote { animation-delay: 0.4s; }
.actions { animation-delay: 0.5s; }
.stats { animation-delay: 0.6s; }
.footer-hearts { animation-delay: 0.7s; }

@media (max-width: 768px) {
  h1 { font-size: 2rem; }
  .love-date { font-size: 1.2rem; }
  .content { grid-template-columns: 1fr; }
  .stats { gap: 1.5rem; }
  .hearts-floating { gap: 0.5rem; }
  .hearts-floating .heart { font-size: 1.5rem; }
}`,

  js: `document.addEventListener('DOMContentLoaded', function() {
  // Heart Counter Animation
  const heartCounter = document.getElementById('heartCounter');
  let count = 0;
  const target = 2025;
  const duration = 2000;
  const increment = target / (duration / 16);

  function updateCounter() {
    count += increment;
    if (count < target) {
      heartCounter.textContent = Math.floor(count);
      requestAnimationFrame(updateCounter);
    } else {
      heartCounter.textContent = target;
    }
  }

  updateCounter();

  // Love Button
  const loveBtn = document.getElementById('loveBtn');
  loveBtn.addEventListener('click', function() {
    createFloatingHearts();
    setTimeout(() => {
      alert('💖 Welcome to the most lovely girl! Start coding with love! ❤️');
    }, 500);
  });

  // Heart Button
  const heartBtn = document.getElementById('heartBtn');
  heartBtn.addEventListener('click', function() {
    createLoveExplosion();
    setTimeout(() => {
      const loveMessages = [
        '❤️ Share this editor with someone you love!',
        '💖 Code is love, love is code!',
        '💕 Every line written with passion!',
        '💝 31/11/2025 - A date to remember!',
        '💗 Built with love, just for you!',
        '💓 Spread love through code!'
      ];
      const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
      alert(randomMessage);
    }, 800);
  });

  // Floating Hearts Animation
  function createFloatingHearts() {
    const hearts = ['❤️', '💖', '💗', '💕', '💓', '💝', '💘', '💞'];
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = \`
          position: fixed;
          font-size: \${20 + Math.random() * 30}px;
          left: \${Math.random() * 100}%;
          top: 100%;
          opacity: 1;
          pointer-events: none;
          z-index: 9999;
          animation: floatUp \${3 + Math.random() * 2}s ease-out forwards;
        \`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
      }, i * 100);
    }
  }

  // Love Explosion
  function createLoveExplosion() {
    const hearts = ['❤️', '💖', '💗', '💕', '💓', '💝'];
    for (let i = 0; i < 50; i++) {
      const heart = document.createElement('div');
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      const angle = (Math.PI * 2 * i) / 50;
      const velocity = 5 + Math.random() * 5;
      heart.style.cssText = \`
        position: fixed;
        font-size: 30px;
        left: 50%;
        top: 50%;
        opacity: 1;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
      \`;
      document.body.appendChild(heart);
      
      let x = 0;
      let y = 0;
      let opacity = 1;
      
      function animate() {
        x += Math.cos(angle) * velocity;
        y += Math.sin(angle) * velocity;
        opacity -= 0.02;
        heart.style.transform = \`translate(\${x}px, \${y}px)\`;
        heart.style.opacity = opacity;
        if (opacity > 0) {
          requestAnimationFrame(animate);
        } else {
          heart.remove();
        }
      }
      animate();
    }
  }

  // Add animations
  const style = document.createElement('style');
  style.textContent = \`
    @keyframes floatUp {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
  \`;
  document.head.appendChild(style);

  // Card hover effects with hearts
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const heart = document.createElement('span');
      heart.textContent = '💖';
      heart.style.cssText = \`
        position: absolute;
        font-size: 3rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
        transition: all 0.5s ease;
        pointer-events: none;
      \`;
      this.appendChild(heart);
      setTimeout(() => {
        heart.style.transform = 'translate(-50%, -50%) scale(1.5)';
        heart.style.opacity = '0.3';
      }, 10);
      setTimeout(() => heart.remove(), 500);
    });
  });

  // Random hearts falling
  setInterval(() => {
    const heart = document.createElement('div');
    heart.textContent = ['❤️', '💖', '💗', '💕'][Math.floor(Math.random() * 4)];
    heart.style.cssText = \`
      position: fixed;
      font-size: 25px;
      left: \${Math.random() * 100}%;
      top: -50px;
      opacity: 0.6;
      pointer-events: none;
      z-index: 0;
      animation: fallHeart \${5 + Math.random() * 5}s linear forwards;
    \`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
  }, 2000);

  const fallStyle = document.createElement('style');
  fallStyle.textContent = \`
    @keyframes fallHeart {
      to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
  \`;
  document.head.appendChild(fallStyle);
});`
};

export const EditorProvider = ({ children }) => {
  const [code, setCode] = useState(() => {
    try {
      const savedCode = localStorage.getItem('code');
      if (savedCode) {
        const parsed = JSON.parse(savedCode);
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

  useEffect(() => {
    try {
      localStorage.setItem('code', JSON.stringify(code));
    } catch (error) {
      console.error('Error saving code:', error);
    }
  }, [code]);

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
    window.dispatchEvent(new CustomEvent('clearConsole'));
    console.log('Running code with love... 💖');
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
