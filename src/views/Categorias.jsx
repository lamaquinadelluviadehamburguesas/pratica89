import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { supabase } from "../database/supabaseconfig";
import ModalRegistroCategoria from "../components/categorias/ModalRegistroCategoria";
import ModalEdicionCategoria from "../components/categorias/ModalEdicionCategoria";
import ModalEliminacionCategoria from "../components/categorias/ModalEliminacionCategoria";
import NotificacionOperacion from "../components/NotificacionOperacion";
const Categorias = () => {
  const [toast, setToast] = useState({ mostrar: false, mensaje: "", tipo: "" });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [categoriaEditar, setCategoriaEditar] = useState({
    id_categoria: null,
    nombre_categoria: "",
    descripcion_categoria: "",
  });
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre_categoria: "",
    descripcion_categoria: "",
  });

  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const agregarCategoria = async () => {
    try {
      if (
        !nuevaCategoria.nombre_categoria.trim() ||
        !nuevaCategoria.descripcion_categoria.trim()
      ) {
        setToast({
          mostrar: true,
          mensaje: "Debe llenar todos los campos.",
          tipo: "advertencia",
        });
        return;
      }

      const { data, error } = await supabase
        .from("categorias")
        .insert([
          {
            nombre_categoria: nuevaCategoria.nombre_categoria,
            descripcion_categoria: nuevaCategoria.descripcion_categoria,
          },
        ])
        .select();

      if (error) {
        console.error("Error al agregar categoria:", error.message);
        setToast({
          mostrar: true,
          mensaje: "Error al registrar categoria.",
          tipo: "error",
        });
        return;
      }

      setToast({
        mostrar: true,
        mensaje: `Categoria '${nuevaCategoria.nombre_categoria}' registrada exitosamente.`,
        tipo: "exito",
      });

      setNuevaCategoria({ nombre_categoria: "", descripcion_categoria: "" });
      setMostrarModal(false);
    } catch (err) {
      console.error("Excepcion al agregar categoria:", err.message);
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al registrar categoria.",
        tipo: "error",
      });
    }
  };

  const manejoCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setCategoriaEditar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cargarCategorias = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from("categorias")
        .select("*")
        .order("id_categoria", { ascending: true });

      if (error) {
        console.error("Error al cargar categorias:", error.message);
        setToast({
          mostrar: true,
          mensaje: "Error al cargar categorias.",
          tipo: "error",
        });
        return;
      }

      setCategorias(data || []);
    } catch (err) {
      console.error("Excepcion al cargar categorias:", err.message);
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al cargar categorias.",
        tipo: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  const actualizarCategoria = async () => {
    try {
      if (
        !categoriaEditar.nombre_categoria.trim() ||
        !categoriaEditar.descripcion_categoria.trim()
      ) {
        setToast({
          mostrar: true,
          mensaje: "Debe llenar todos los campos.",
          tipo: "advertencia",
        });
        return;
      }

      setMostrarModalEdicion(false);

      const { error } = await supabase
        .from("categorias")
        .update({
          nombre_categoria: categoriaEditar.nombre_categoria,
          descripcion_categoria: categoriaEditar.descripcion_categoria,
        })
        .eq("id_categoria", categoriaEditar.id_categoria);

      if (error) {
        console.error("Error al actualizar categoría:", error.message);
        setToast({
          mostrar: true,
          mensaje: `Error al actualizar la categoría ${categoriaEditar.nombre_categoria}.`,
          tipo: "error",
        });
        return;
      }

      await cargarCategorias();
      setToast({
        mostrar: true,
        mensaje: `Categoría ${categoriaEditar.nombre_categoria} actualizada exitosamente.`,
        tipo: "exito",
      });
    } catch (err) {
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al actualizar categoría.",
        tipo: "error",
      });
      console.error("Excepción al actualizar categoría:", err.message);
    }
  };

  const eliminarCategoria = async () => {
    if (!categoriaAEliminar) return;
    try {
      setMostrarModalEliminacion(false);

      const { error } = await supabase
        .from("categorias")
        .delete()
        .eq("id_categoria", categoriaAEliminar.id_categoria);

      if (error) {
        console.error("Error al eliminar categoría:", error.message);
        setToast({
          mostrar: true,
          mensaje: `Error al eliminar la categoría ${categoriaAEliminar.nombre_categoria}.`,
          tipo: "error",
        });
        return;
      }

      await cargarCategorias();
      setToast({
        mostrar: true,
        mensaje: `Categoría ${categoriaAEliminar.nombre_categoria} eliminada exitosamente.`,
        tipo: "exito",
      });
    } catch (err) {
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al eliminar categoría.",
        tipo: "error",
      });
      console.error("Excepción al eliminar categoría:", err.message);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <Container className="mt-3">
      <Row className="align-items-center mb-3">
        <Col xs={9} sm={7} md={7} lg={7} className="d-flex align-items-center">
          <h3 className="mb-0">
            <i className="bi-bookmark-plus-fill me-2"></i>categorias
          </h3>
        </Col>
        <Col xs={3} sm={5} md={5} lg={5} className="text-end">
          <Button onClick={() => setMostrarModal(true)} size="md">
            <i className="bi-plus-lg"></i>
            <span className="d-none d-sm-inline ms-2">Nueva Categoria</span>
          </Button>
        </Col>
      </Row>

      <hr />

      <ModalRegistroCategoria
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevaCategoria={nuevaCategoria}
        manejoCambioInput={manejoCambioInput}
        agregarCategoria={agregarCategoria}
      />

      <ModalEdicionCategoria
        mostrarModalEdicion={mostrarModalEdicion}
        setMostrarModalEdicion={setMostrarModalEdicion}
        categoriaEditar={categoriaEditar}
        manejoCambioInputEdicion={manejoCambioInputEdicion}
        actualizarCategoria={actualizarCategoria}
      />

      <ModalEliminacionCategoria
        mostrarModalEliminacion={mostrarModalEliminacion}
        setMostrarModalEliminacion={setMostrarModalEliminacion}
        eliminarCategoria={eliminarCategoria}
        categoria={categoriaAEliminar}
      />

      <NotificacionOperacion
        mostrar={toast.mostrar}
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        onCerrar={() => setToast({ ...toast, mostrar: false })}
      />
    </Container>
  );
};

export default Categorias;
