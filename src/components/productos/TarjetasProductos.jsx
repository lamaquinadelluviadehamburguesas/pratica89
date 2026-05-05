import React from "react";
import { Card, Button } from "react-bootstrap";

const TarjetasProductos = ({ productos, abrirModalEdicion, abrirModalEliminacion }) => {
  return (
    <div className="d-flex flex-column gap-3">
      {productos.map((producto) => (
        <Card key={producto.id_producto} className="shadow-sm">
          <Card.Body>
            <div className="d-flex align-items-center mb-3">
              <img
                src={producto.url_imagen || "https://via.placeholder.com/150"}
                alt={producto.nombre_producto}
                style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px", marginRight: "15px" }}
              />
              <div className="flex-grow-1">
                <Card.Title className="mb-0 fs-6">{producto.nombre_producto}</Card.Title>
                <Card.Text className="mb-0 text-primary fw-bold">
                  C$ {producto.precio_venta}
                </Card.Text>
              </div>
            </div>
            
            <Card.Text className="mb-3 text-muted small">
              {producto.descripcion_producto || "Sin descripción"}
            </Card.Text>
            
            <div className="d-flex gap-2 justify-content-end">
              <Button
                variant="outline-warning"
                size="sm"
                onClick={() => abrirModalEdicion(producto)}
              >
                <i className="bi bi-pencil"></i> Editar
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => abrirModalEliminacion(producto)}
              >
                <i className="bi bi-trash"></i> Eliminar
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TarjetasProductos;
