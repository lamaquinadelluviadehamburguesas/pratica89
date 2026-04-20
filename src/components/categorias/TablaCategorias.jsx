import React, { useState, useEffect } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaCategorias = ({ categorias, abrirModalEdicion, abrirModalEliminacion }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categorias && categorias.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [categorias]);

  return <></>;
};

export default TablaCategorias;
