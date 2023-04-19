import React from "react";
import axios from "axios";

const ProductDisplayer = () => {
  const onsubmit = async (ev) => {
    ev.preventDefault();
    const response = await axios.post("http://localhost:3001/Pagar", {});
    const pagar = response.data.init_point;
    window.location.href = pagar;
  };
  return (
    <div>
      <button onClick={onsubmit}>PAGAR!</button>
    </div>
  );
};

export default ProductDisplayer;
