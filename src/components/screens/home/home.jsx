import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #141e30, #243b55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "rgba(255,255,255,0.05)",
          padding: "50px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1
          style={{
            color: "white",
            marginBottom: "40px",
            fontSize: "32px",
          }}
        >
          Smart TV Control
        </h1>

        <div style={{ display: "flex", gap: "20px" }}>
          <Link href="/tv">
            <button
              style={{
                padding: "20px 40px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                background: "#28a745",
                color: "white",
                fontWeight: "bold",
              }}
            >
              📺 Open TV
            </button>
          </Link>

          <Link href="/remote">
            <button
              style={{
                padding: "20px 40px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                background: "#007bff",
                color: "white",
                fontWeight: "bold",
              }}
            >
              📱 Open Remote
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
