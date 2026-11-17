import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from './components/ThemeProvider';
import './styles/globals.css';
import './styles/flow.css';
import './styles/work.css';

// Privacy-friendly visit and click counts. Set VITE_GOATCOUNTER_CODE (the account code) to enable.
const goatcounter = import.meta.env.VITE_GOATCOUNTER_CODE;
if (goatcounter && /^[a-z0-9-]+$/i.test(goatcounter)) {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.dataset.goatcounter = `https://${goatcounter}.goatcounter.com/count`;
  document.body.appendChild(script);
}

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);

// Production HTML is prerendered (scripts/prerender.mjs); the dev server serves an empty root.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
