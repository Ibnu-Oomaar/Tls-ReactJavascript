import React from "react";

const Sidebar = ({ name, age, phone }) => {
  return (
    <div
      style={{
        background: "red",
        width: "20vw",
        height: "100vh",
        display: "inline-block",
      }}
    >
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Support</li>
        <li>Contact</li>
      </ul>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>{name}</h1>
        <h1>{age}</h1>
        <h1>{phone}</h1>
        <p></p>
      </div>
    </div>
  );
};

export default Sidebar;