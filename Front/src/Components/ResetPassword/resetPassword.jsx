import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(resetPassword(email));
    navigate("/login")
  };

  return (
    <div>
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Recuperar Contraseña</button>
      </form>
    </div>
  );
};

export default ResetPassword;