import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../Redux/actions";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(resetPassword(email));
    setEmail("");
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;