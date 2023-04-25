import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Redirect from "../Redirect/redirect";

const ProtectedRoutes = () => {
  const userData = useSelector((state) => state.userData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData !== null) setIsLoading(false);
  }, [userData]);

  if (isLoading)
    return (
      <>
        <h1>Cargando</h1>
        <Redirect />
      </>
    );
  if (userData === false)
    return (
      <>
        <h1>Credenciales invalidas</h1>
        <Redirect />
      </>
    );

  return <Outlet />;
};

export default ProtectedRoutes;
