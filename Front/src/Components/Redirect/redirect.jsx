import { useEffect } from "react";
import { auth } from "../../config/firebase";
import { signOut, deleteUser } from "firebase/auth";
import Swal from "sweetalert2";

function Redirect() {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserFromFirebase = async () => {
    try {
      await deleteUser(auth.currentUser);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    logout();
    const timeout = setTimeout(() => {
      Swal.fire({
        text: "No cuentas con las credenciales necesarias para ingresar a la ruta indicada, verifica que estes logeado correctamente",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteUserFromFirebase();
          window.location.replace("/login");
        }
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return <>Will redirect in 3 seconds...</>;
}

export default Redirect;
