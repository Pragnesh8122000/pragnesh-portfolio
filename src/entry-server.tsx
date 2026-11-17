import { renderToString } from 'react-dom/server';
import { App } from './App';
import { ThemeProvider } from './components/ThemeProvider';

/** Build-time render of the page; scripts/prerender.mjs injects the result into dist/index.html. */
export function render(): string {
  return renderToString(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
