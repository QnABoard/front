import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { worker } from './mocks/browser.ts';
import App from './App.tsx';
import '@/styles/reset.css';

if (process.env.NODE_ENV === 'development') {
  worker.start().then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
