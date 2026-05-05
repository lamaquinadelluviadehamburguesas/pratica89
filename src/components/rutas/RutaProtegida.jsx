import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children }) => {
  const usuarioGuardado = localStorage.getItem("usuario-supabase");

  if (!usuarioGuardado) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {children}
    </>
  );
};

export default RutaProtegida;
