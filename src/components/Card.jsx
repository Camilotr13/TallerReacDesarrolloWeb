import React from "react";

const Card = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        width: "80%",
        maxWidth: "400px",
        padding: "20px",
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "tan" }}>
        ¡Agregado al carrito!
      </p>
      <p style={{ color: "gray" }}>El producto ha sido añadido a tu carrito.</p>
    </div>
  );
};

export default Card;
