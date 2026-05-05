import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import TarjetaCatalogo from '../components/catalogo/TarjetaCatalogo';

const Catalogo = () => {
  // Variables de estado
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  
  // Método para la carga de categorías y productos
  useEffect(() => {
    cargarDatos();
  }, []);
  
  const cargarDatos = () => {
    // Datos de ejemplo - En un caso real, estos vendrían de una API
    const categoriasEjemplo = [
      { id: 1, nombre: 'Electrónicos' },
      { id: 2, nombre: 'Ropa' },
      { id: 3, nombre: 'Hogar' },
      { id: 4, nombre: 'Deportes' }
    ];
    
    const productosEjemplo = [
      {
        id: 1,
        nombre: 'Smartphone X',
        descripcion: 'Teléfono inteligente con pantalla de 6.5 pulgadas, cámara de 48MP, batería de 5000mAh y procesador de última generación. Ideal para multitarea y fotografía profesional.',
        precio: 599.99,
        categoria: 'Electrónicos',
        imagen: 'https://via.placeholder.com/300x200?text=Smartphone',
        stock: 15
      },
      {
        id: 2,
        nombre: 'Laptop Pro',
        descripcion: 'Laptop de 15.6 pulgadas con procesador Intel Core i7, 16GB de RAM, SSD de 512GB y gráficos dedicados. Perfecta para programación y diseño.',
        precio: 1299.99,
        categoria: 'Electrónicos',
        imagen: 'https://via.placeholder.com/300x200?text=Laptop',
        stock: 8
      },
      {
        id: 3,
        nombre: 'Camiseta Deportiva',
        descripcion: 'Camiseta transpirable para actividades deportivas, fabricada con material de secado rápido. Disponible en varios colores y tallas.',
        precio: 29.99,
        categoria: 'Ropa',
        imagen: 'https://via.placeholder.com/300x200?text=Camiseta',
        stock: 50
      },
      {
        id: 4,
        nombre: 'Lámpara LED',
        descripcion: 'Lámpara de escritorio LED con intensidad ajustable, ideal para lectura y trabajo. Consume poca energía y tiene larga duración.',
        precio: 39.99,
        categoria: 'Hogar',
        imagen: 'https://via.placeholder.com/300x200?text=Lampara',
        stock: 25
      },
      {
        id: 5,
        nombre: 'Balón de Fútbol',
        descripcion: 'Balón oficial de fútbol tamaño 5, cosido a mano con material resistente. Ideal para partidos y entrenamientos.',
        precio: 34.99,
        categoria: 'Deportes',
        imagen: 'https://via.placeholder.com/300x200?text=Balon',
        stock: 30
      },
      {
        id: 6,
        nombre: 'Auriculares Bluetooth',
        descripcion: 'Auriculares inalámbricos con cancelación de ruido, batería de 20 horas y sonido de alta calidad. Compatibles con todos los dispositivos.',
        precio: 89.99,
        categoria: 'Electrónicos',
        imagen: 'https://via.placeholder.com/300x200?text=Auriculares',
        stock: 20
      }
    ];
    
    setCategorias(categoriasEjemplo);
    setProductos(productosEjemplo);
    setCargando(false);
  };
  
  // Variable para la manipulación de categorías filtradas
  const productosFiltrados = productos.filter(producto => {
    // Filtro por categoría
    const cumpleCategoria = categoriaSeleccionada === 'todas' || 
                            producto.categoria === categoriaSeleccionada;
    
    // Filtro por búsqueda
    const cumpleBusqueda = terminoBusqueda === '' || 
                           producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                           producto.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase());
    
    return cumpleCategoria && cumpleBusqueda;
  });
  
  // Métodos de manejo de variables de estado
  const manejarCambioCategoria = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };
  
  const manejarCambioBusqueda = (e) => {
    setTerminoBusqueda(e.target.value);
  };
  
  const limpiarFiltros = () => {
    setCategoriaSeleccionada('todas');
    setTerminoBusqueda('');
  };
  
  const manejarVerDetalle = (producto) => {
    console.log('Ver detalle del producto:', producto);
    // Aquí se puede implementar navegación o lógica adicional
  };
  
  // Obtener lista única de categorías para el selector
  const categoriasUnicas = ['todas', ...new Set(productos.map(p => p.categoria))];
  
  return (
    <Container className="py-4">
      {/* Título */}
      <h1 className="text-center mb-4">Catálogo de Productos</h1>
      
      {/* Selector de categoría y cuadro de búsqueda */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Categoría</Form.Label>
            <Form.Select 
              value={categoriaSeleccionada} 
              onChange={manejarCambioCategoria}
            >
              <option value="todas">Todas las categorías</option>
              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.nombre}>
                  {categoria.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group>
            <Form.Label>Buscar producto</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre o descripción..."
                value={terminoBusqueda}
                onChange={manejarCambioBusqueda}
              />
              {terminoBusqueda && (
                <Button variant="outline-secondary" onClick={() => setTerminoBusqueda('')}>
                  ✕
                </Button>
              )}
            </InputGroup>
          </Form.Group>
        </Col>
        
        <Col md={2} className="d-flex align-items-end">
          <Button variant="outline-primary" onClick={limpiarFiltros} className="w-100">
            Limpiar filtros
          </Button>
        </Col>
      </Row>
      
      {/* Implementación del componente TarjetaCatalogo */}
      {cargando ? (
        <div className="text-center py-5">
          <h4>Cargando productos...</h4>
        </div>
      ) : (
        <>
          <div className="mb-3">
            <p>Mostrando {productosFiltrados.length} de {productos.length} productos</p>
          </div>
          
          <Row xs={1} md={2} lg={3} className="g-4">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map(producto => (
                <Col key={producto.id}>
                  <TarjetaCatalogo 
                    producto={producto}
                    onVerDetalle={manejarVerDetalle}
                  />
                </Col>
              ))
            ) : (
              <Col xs={12}>
                <div className="text-center py-5">
                  <h4>No se encontraron productos</h4>
                  <p>Intenta con otros criterios de búsqueda</p>
                  <Button variant="primary" onClick={limpiarFiltros}>
                    Ver todos los productos
                  </Button>
                </div>
              </Col>
            )}
          </Row>
        </>
      )}
    </Container>
  );
};

export default Catalogo;