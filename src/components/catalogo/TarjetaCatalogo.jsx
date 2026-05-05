import React, { useState } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';

const TarjetaCatalogo = ({ producto, onVerDetalle }) => {
  const [showModal, setShowModal] = useState(false);
  const [descripcionCorta, setDescripcionCorta] = useState(true);
  
  const maxLongitud = 80;
  
  const handleOpenModal = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const truncarDescripcion = (texto) => {
    if (texto.length <= maxLongitud) return texto;
    return texto.substring(0, maxLongitud) + '...';
  };
  
  return (
    <>
      {/* Estructura de la tarjeta */}
      <Card className="h-100 shadow-sm">
        {/* Visualización de la imagen del producto */}
        <Card.Img 
          variant="top" 
          src={producto.imagen || 'https://via.placeholder.com/300x200?text=Sin+Imagen'} 
          alt={producto.nombre}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        
        {/* Cuerpo de la tarjeta */}
        <Card.Body>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>
            {descripcionCorta 
              ? truncarDescripcion(producto.descripcion) 
              : producto.descripcion}
          </Card.Text>
          <Card.Text className="text-primary fw-bold">
            ${producto.precio?.toFixed(2) || '0.00'}
          </Card.Text>
          <Button 
            variant="primary" 
            onClick={handleOpenModal}
          >
            Ver detalles
          </Button>
        </Card.Body>
      </Card>
      
      {/* Modal para mostrar detalles completos */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{producto.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <img 
                src={producto.imagen || 'https://via.placeholder.com/400x300?text=Sin+Imagen'} 
                alt={producto.nombre}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6">
              <h5>Descripción completa</h5>
              <p>{producto.descripcion}</p>
              <h5>Precio</h5>
              <p className="text-primary fw-bold fs-4">${producto.precio?.toFixed(2) || '0.00'}</p>
              {producto.categoria && (
                <>
                  <h5>Categoría</h5>
                  <p>{producto.categoria}</p>
                </>
              )}
              {producto.stock !== undefined && (
                <>
                  <h5>Stock disponible</h5>
                  <p>{producto.stock} unidades</p>
                </>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TarjetaCatalogo;