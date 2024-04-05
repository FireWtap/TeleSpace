import ReactDOM from 'react-dom/client';
import App from './App';
import { registerSW } from 'virtual:pwa-register';
if ('serviceWorker' in navigator) {
  // && !/localhost/.test(window.location)) {
  registerSW();
}
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
