import { useEffect } from "react";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

function Redirect() {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    logout();
    const timeout = setTimeout(() => {
      // 👇️ redirects to an external URL
      window.location.replace("http://localhost:3000");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return <>Will redirect in 3 seconds...</>;
}

export default Redirect;
