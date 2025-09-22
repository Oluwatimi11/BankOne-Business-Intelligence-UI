import React from "react";

export default function HomePage() {
  const outerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6" // Tailwind's gray-100 equivalent
  };

  const innerStyle = {
    textAlign: "center",
    padding: "1.5rem",
    borderRadius: "1rem",
    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff"
  };

  const textStyle = {
    fontSize: "2.25rem", // equivalent to text-4xl
    fontWeight: "bold",
    color: "#1f2937" // Tailwind's gray-800 equivalent
  };

  return (
    <div style={outerStyle}>
      <div style={innerStyle as React.CSSProperties}>
        <h1 style={textStyle}>Dashboard Interface</h1>
      </div>
    </div>
  );
}
