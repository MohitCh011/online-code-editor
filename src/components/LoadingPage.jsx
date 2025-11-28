import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/loading-page.css';

const LoadingPage = ({ onLoadComplete }) => {
  const { uiTheme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    const loadingSteps = [
      { progress: 20, text: 'Loading Frontend Editor...', delay: 300 },
      { progress: 40, text: 'Setting up workspace...', delay: 500 },
      { progress: 60, text: 'Configuring themes...', delay: 400 },
      { progress: 80, text: 'Preparing preview...', delay: 400 },
      { progress: 100, text: 'Almost ready...', delay: 300 }
    ];

    let currentStep = 0;

    const loadStep = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setTimeout(() => {
          setProgress(step.progress);
          setLoadingText(step.text);
          currentStep++;
          loadStep();
        }, step.delay);
      } else {
        setTimeout(() => {
          onLoadComplete();
        }, 500);
      }
    };

    loadStep();
  }, [onLoadComplete]);

  return (
    <div className={`loading-page ${uiTheme}`}>
      <div className="loading-content">
        {/* Logo/Icon */}
        <div className="loading-logo">
          <div className="logo-icon">⚡</div>
          <div className="logo-pulse"></div>
        </div>

        {/* Title */}
        <h1 className="loading-title">Online Code Compiler</h1>
        <p className="loading-subtitle">Powered by Monaco Editor</p>

        {/* Progress Bar */}
        <div className="loading-progress-container">
          <div className="loading-progress-bar">
            <div 
              className="loading-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="loading-percentage">{progress}%</div>
        </div>

        {/* Loading Text */}
        <p className="loading-text">{loadingText}</p>

        {/* Feature Pills */}
        <div className="loading-features">
          <span className="feature-pill">HTML</span>
          <span className="feature-pill">CSS</span>
          <span className="feature-pill">JavaScript</span>
        </div>
      </div>

      {/* Animated Background */}
      <div className="loading-background">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
