import { useEffect } from "react";
import { auth } from "../../config/firebase";
import { signOut, deleteUser } from "firebase/auth";

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
    deleteUserFromFirebase();
    const timeout = setTimeout(() => {
      // 👇️ redirects to an external URL
      window.location.replace("/login");
      alert(
        "No cuentas con las credenciales necesarias para ingresar a la ruta indicada, verifica que estes logeado correctamente"
      );
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return <>Will redirect in 3 seconds...</>;
}

export default Redirect;
