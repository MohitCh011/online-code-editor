import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/variables.css';
import './styles/main.css';
import './styles/editor.css';
import './styles/preview.css';
import './styles/toolbar.css';
import './styles/themes.css';
import './styles/themes-modern.css';
import './styles/themes-classic.css';
import './styles/responsive.css';
import './styles/animations.css';
import './styles/modal.css';
import './styles/settings.css';
import './styles/error-boundary.css'; // Add this

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
