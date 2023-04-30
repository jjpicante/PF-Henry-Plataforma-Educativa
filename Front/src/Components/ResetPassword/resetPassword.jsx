import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const response = await dispatch(resetPassword(email, password));
    if (response.success) {
      navigate("/login");
    } else {
      setError("Failed to reset password");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;