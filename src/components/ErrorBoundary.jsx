import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log to analytics service (optional)
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleClearStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h1 className="error-title">Oops! Something went wrong</h1>
            <p className="error-message">
              The application encountered an unexpected error. Don't worry, your code is safe!
            </p>
            
            <div className="error-details">
              <details>
                <summary>Technical Details</summary>
                <div className="error-stack">
                  <strong>Error:</strong>
                  <pre>{this.state.error && this.state.error.toString()}</pre>
                  <strong>Stack Trace:</strong>
                  <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                </div>
              </details>
            </div>

            <div className="error-actions">
              <button className="btn btn-primary" onClick={this.handleReset}>
                🔄 Reload Application
              </button>
              <button className="btn btn-secondary" onClick={this.handleClearStorage}>
                🗑️ Clear Storage & Reload
              </button>
            </div>

            <p className="error-help">
              If the problem persists, please contact support or try using a different browser.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
