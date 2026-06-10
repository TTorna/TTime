import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date());
  const [theme, setTheme] = useState('light');
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    let timeoutId;
    const tick = () => {
      setTime(new Date());
      const now = new Date();
      // Calculate milliseconds until the next exact second to keep it precise
      const msToNextSecond = 1000 - now.getMilliseconds();
      timeoutId = setTimeout(tick, msToNextSecond);
    };
    tick();

    return () => clearTimeout(timeoutId);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getWeekNumber = (d) => {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
    return weekNo;
  };

  const dateStr = formatDate(time);
  const capitalizedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

  return (
    <div className="app-container">
      {!isFocusMode && (
        <header className="header">
          <div className="logo">T . T</div>
          <div className="header-right">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>
          </div>
        </header>
      )}

      <main className="main-content">
        {!isFocusMode && (
          <div className="location-title">
            Tiempo exacto ahora
          </div>
        )}

        <div className="clock-container" onClick={() => setIsFocusMode(!isFocusMode)} title="Click to toggle focus mode">
          <div className="time">
            {formatTime(time)}
          </div>
        </div>

        {!isFocusMode && (
          <div className="date-container">
            <div className="date">
              {capitalizedDate}
            </div>
            <div className="week-num">
              Semana {getWeekNumber(time)}
            </div>
          </div>
        )}
      </main>

      {!isFocusMode && (
        <footer className="footer">
          © 2026 TTime - Disfruta del tiempo
        </footer>
      )}
    </div>
  );
}

export default App;
