import { useState } from 'react';

export const usePopup = () => {
  const [popup, setPopup] = useState({ mensaje: '', tipo: 'success', visible: false });

  const triggerPopup = (mensaje, tipo = 'success') => {
    setPopup({ mensaje, tipo, visible: true });
    setTimeout(() => setPopup(prev => ({ ...prev, visible: false })), 2000);
  };

  return { popup, triggerPopup };
};
