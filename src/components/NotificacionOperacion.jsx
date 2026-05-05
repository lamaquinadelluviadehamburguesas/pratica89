import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const NotificacionOperacion = ({ mostrar, tipo, mensaje, onCerrar }) => {
  const [visible, setVisible] = useState(mostrar);

  useEffect(() => {
    setVisible(mostrar);
  }, [mostrar]);

  const getBackgroundColor = () => {
    switch (tipo) {
      case 'exito': return 'success';
      case 'advertencia': return 'warning';
      case 'error': return 'danger';
      default: return 'info';
    }
  };

  const getIcono = () => {
    switch (tipo) {
      case 'exito': return 'bi-check-circle-fill';
      case 'advertencia': return 'bi-exclamation-triangle-fill';
      case 'error': return 'bi-x-circle-fill';
      default: return 'bi-info-circle-fill';
    }
  };

  const fechaHora = () => {
    const ahora = new Date();
    return `${ahora.getDate().toString().padStart(2, '0')}-${(ahora.getMonth() + 1).toString().padStart(2, '0')}-${ahora.getFullYear()} ${ahora.getHours().toString().padStart(2, '0')}:${ahora.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      <Toast 
        show={visible} 
        onClose={() => { setVisible(false); onCerrar(); }} 
        delay={2500} 
        autohide 
        bg={getBackgroundColor()}
      >
        <Toast.Header>
          <i className={`${getIcono()} me-2`}></i>
          <strong className="me-auto">Sistema</strong>
          <small>{fechaHora()}</small>
        </Toast.Header>
        <Toast.Body className="text-white">{mensaje}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default NotificacionOperacion;