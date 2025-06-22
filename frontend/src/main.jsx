import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import CookieModal from "./components/CookieModal";

function App() {
  return (
    <>
      <CookieModal />
      <h1 className="text-3xl font-bold text-blue-600 mt-4 text-center">
        🎉 Bannière cookie d’une UI RGPD-Compliant !
      </h1>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
