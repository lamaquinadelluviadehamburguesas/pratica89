import React from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaProductos = ({ productos, abrirModalEdicion, abrirModalEliminacion }) => {
  return (
    <Table striped hover responsive className="align-middle shadow-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto, index) => (
          <tr key={producto.id_producto}>
            <td>{index + 1}</td>
            <td>
              <img 
                src={producto.url_imagen} 
                alt={producto.nombre_producto}
                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
              />
            </td>
            <td>{producto.nombre_producto}</td>
            <td>{producto.descripcion_producto}</td>
            <td>C$ {producto.precio_venta}</td>
            <td className="text-center">
              <Button
                variant="outline-warning"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEdicion(producto)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => abrirModalEliminacion(producto)}
              >
                <i className="bi bi-trash"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaProductos;