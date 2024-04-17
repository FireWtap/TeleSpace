// NetworkDetector.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NetworkDetector = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleConnectionChange = () => {
      if (!navigator.onLine) {
        navigate('/offline');
      } else {
        // Modifica questo percorso come preferisci
        // Potrebbe rimanere vuoto o portare alla homepage o all'ultima pagina visitata
        navigate('/');
      }
    };

    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    // Controllo immediato dello stato della connessione
    handleConnectionChange();

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, [navigate]);

  return <>{children}</>;
};

export default NetworkDetector;
