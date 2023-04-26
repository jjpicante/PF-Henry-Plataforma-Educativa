import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Redirect from "../Redirect/redirect";
import Unauthorized from "../Redirect/unauthorized";

const ProtectedRoutes = ({ allowedRoles }) => {
  const userData = useSelector((state) => state.userData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData !== null) setIsLoading(false);
  }, [userData]);

  console.log(userData?.rol);

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

  return allowedRoles.find((rol) => rol === userData?.rol) ? (
    <Outlet />
  ) : (
    <Unauthorized />
  );
};

export default ProtectedRoutes;
