import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from './components/ThemeProvider';
import './styles/globals.css';
import './styles/flow.css';

// Privacy-friendly visit and click counts. Set VITE_GOATCOUNTER_CODE (the account code) to enable.
const goatcounter = import.meta.env.VITE_GOATCOUNTER_CODE;
if (goatcounter && /^[a-z0-9-]+$/i.test(goatcounter)) {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.dataset.goatcounter = `https://${goatcounter}.goatcounter.com/count`;
  document.body.appendChild(script);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
