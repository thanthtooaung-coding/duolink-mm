import React, { useState, useRef } from 'react';
import './App.css';

type Language = 'en' | 'my';

const translations = {
  en: {
    welcome: 'Welcome to Duo Link WiFi',
    tagline: 'Fast. Simple. Always connected.',
    setupTitle: 'Set Up Your WiFi',
    setupInstruction: 'Tap the button below to configure your device.',
    setupButton: 'Go to Setup',
    helpTitle: 'Help & Tutorial',
    steps: [
      'Power on your Duo Link device.',
      'Connect to the WiFi name on the label.',
      'Click "Go to Setup".',
      'Enter login details.',
      'Save and enjoy internet.'
    ],
    copyright: '© 2025 Duo Link'
  },
  my: {
    welcome: 'Duo Link WiFi မှ ကြိုဆိုပါသည်',
    tagline: 'အမြန်၊ လွယ်ကူ၊ အမြဲတမ်း ချိတ်ဆက်ထားနိုင်ပါသည်။',
    setupTitle: 'WiFi ကို ချိန်ညှိရန်',
    setupInstruction: 'သင့်စက်ကို ချိန်ညှိရန် အောက်ပါခလုတ်ကို နှိပ်ပါ။',
    setupButton: 'Setup သို့ သွားရန်',
    helpTitle: '? အကူအညီ နှင့် လမ်းညွှန်',
    steps: [
      'Duo Link စက်ကို ဖွင့်ပါ။',
      'Label ပေါ်ရှိ WiFi အမည်ကို ချိတ်ဆက်ပါ။',
      '"Setup သို့ သွားရန်" ကို နှိပ်ပါ။',
      'Login အချက်အလက် ထည့်ပါ။',
      'သိမ်းဆည်းပြီး အသုံးပြုနိုင်ပါပြီ။'
    ],
    copyright: '© 2025 Duo Link'
  }
};

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const setupWindowRef = useRef<Window | null>(null);
  const t = translations[language];

  const handleSetupClick = () => {
    const setupUrl = 'http://192.168.100.1';
    
    if (setupWindowRef.current && !setupWindowRef.current.closed) {
      setupWindowRef.current.focus();
    } else {
      setupWindowRef.current = window.open(setupUrl, 'duolink-setup', 'noopener,noreferrer');
      
      if (!setupWindowRef.current) {
        window.location.href = setupUrl;
      }
    }
  };

  return (
    <div className="app-container">
      <div className="language-switcher">
        <button
          className={`lang-button ${language === 'en' ? 'active' : ''}`}
          onClick={() => setLanguage('en')}
        >
          English
        </button>
        <button
          className={`lang-button ${language === 'my' ? 'active' : ''}`}
          onClick={() => setLanguage('my')}
        >
          မြန်မာ
        </button>
      </div>

      <div className="panel welcome-panel">
        <img src="/logoduolink.jpg" alt="Duo Link Logo" className="logo" />
        <h1 className="welcome-title">{t.welcome}</h1>
        <p className="tagline">{t.tagline}</p>
      </div>

      <div className="panel setup-panel">
        <h2 className="panel-title">
          <span className="icon gear-icon">⚙️</span>
          {t.setupTitle}
        </h2>
        <p className="panel-instruction">{t.setupInstruction}</p>
        <button className="setup-button" onClick={handleSetupClick}>{t.setupButton}</button>
      </div>

      <div className="panel help-panel">
        <h2 className="panel-title">
          <span className="icon help-icon">?</span>
          {t.helpTitle}
        </h2>
        <ol className="steps-list">
          {t.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <footer className="footer">{t.copyright}</footer>
    </div>
  );
}

export default App;
