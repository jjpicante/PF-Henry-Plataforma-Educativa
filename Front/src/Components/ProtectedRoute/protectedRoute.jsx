import React, { useEffect, useState } from "react";
import { /*  Navigate,  */ Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Redirect from "../Redirect/redirect";
import Unauthorized from "../Redirect/unauthorized";
import Loading from "../Redirect/loading";

const ProtectedRoutes = ({ allowedRoles }) => {
  const userData = useSelector((state) => state.userData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData !== null) setIsLoading(false);
  }, [userData]);

  // console.log(userData.role);
  // console.log(userData?.rol);

  if (isLoading)
    return (
      <>
        <Loading />
        <Redirect />
      </>
    );
  if (userData === false)
    return (
      <>
        <h1>Oops...</h1>
        <Redirect />
      </>
    );

  return allowedRoles.find((rol) => rol === userData?.rol || userData?.role) ? (
    <Outlet />
  ) : (
    <Unauthorized />
  );
};

export default ProtectedRoutes;
