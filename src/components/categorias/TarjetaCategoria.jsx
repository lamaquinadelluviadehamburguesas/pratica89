import { Card, Button } from "react-bootstrap";

const TarjetaCategoria = ({ categorias, abrirModalEdicion, abrirModalEliminacion }) => {
  return (
    <div className="d-flex flex-column gap-3">
      {categorias.map((categoria) => (
        <Card key={categoria.id_categoria} className="shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <Card.Title className="mb-0">{categoria.nombre_categoria}</Card.Title>
              <div className="d-flex gap-2">
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => abrirModalEdicion(categoria)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => abrirModalEliminacion(categoria)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </div>
            </div>
            <Card.Text className="mb-0 text-muted">
              {categoria.descripcion_categoria}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TarjetaCategoria;
