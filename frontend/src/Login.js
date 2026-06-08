import React, { useState } from "react";
import { Cpu, Lock, User, ShieldCheck } from "lucide-react";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Standard presentation credentials
    if (username === "admin" && password === "admin123") {
      setError("");
      onLoginSuccess(); // Switch to the main AI Dashboard view
    } else {
      setError("Invalid Authentication Credentials. Please try again.");
    }
  };

  // Modern Glassmorphism Styles Matrix
  const styles = {
    wrapper: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(circle at 50% 50%, #1a1528 0%, #090b11 100%)",
      fontFamily: "sans-serif",
      color: "#e2e8f0",
      overflow: "hidden"
    },
    loginCard: {
      width: "380px",
      padding: "40px",
      backgroundColor: "rgba(13, 15, 23, 0.7)",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      borderRadius: "28px",
      backdropFilter: "blur(16px)",
      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
      display: "flex",
      flexDirection: "column",
      gap: "24px"
    },
    headerZone: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" },
    logoContainer: {
      height: "52px",
      width: "52px",
      borderRadius: "16px",
      background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 8px 20px rgba(139, 92, 246, 0.3)"
    },
    inputGroup: { display: "flex", flexDirection: "column", gap: "6px", position: "relative" },
    inputIcon: { position: "absolute", left: "14px", top: "36px", color: "#475569", height: "16px", width: "16px" },
    inputField: {
      width: "100%",
      padding: "12px 16px 12px 42px",
      backgroundColor: "#141724",
      border: "1px solid #22273d",
      borderRadius: "12px",
      color: "white",
      fontSize: "13px",
      outline: "none",
      transition: "border-color 0.2s ease",
      boxSizing: "border-box"
    },
    label: { fontSize: "11px", textTransform: "uppercase", tracking: "wider", fontWeight: "bold", color: "#64748b" },
    submitBtn: {
      width: "100%",
      padding: "12px",
      background: "linear-gradient(to right, #8b5cf6, #ec4899)",
      border: "none",
      borderRadius: "12px",
      color: "white",
      fontWeight: "bold",
      fontSize: "13px",
      cursor: "pointer",
      boxShadow: "0 6px 20px rgba(236, 72, 153, 0.15)",
      marginTop: "10px",
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    },
    errorText: { fontSize: "11px", color: "#f87171", textAlign: "center", backgroundColor: "rgba(248, 113, 113, 0.1)", padding: "8px", borderRadius: "8px", border: "1px solid rgba(248, 113, 113, 0.2)" }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.loginCard}>
        
        {/* Header Block */}
        <div style={styles.headerZone}>
          <div style={styles.logoContainer}>
            <Cpu style={{ height: "26px", width: "26px", color: "white" }} />
          </div>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 4px", color: "white", letterSpacing: "0.5px" }}>Gateway Authentication</h2>
            <p style={{ fontSize: "11px", color: "#475569", margin: 0, fontWeight: "500", textTransform: "uppercase", letterSpacing: "1px" }}>SafeVision Autonomous Core</p>
          </div>
        </div>

        {/* Form Block */}
        <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          
          {error && <div style={styles.errorText}>{error}</div>}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Operator User ID</label>
            <User style={styles.inputIcon} />
            <input 
              type="text" 
              placeholder="Enter admin username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.inputField} 
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Security Passkey</label>
            <Lock style={styles.inputIcon} />
            <input 
              type="password" 
              placeholder="Enter security key" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.inputField} 
              required
            />
          </div>

          <button type="submit" style={styles.submitBtn}>
            Verify Credentials
          </button>
        </form>

        {/* Footer Notice */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "#334155", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" }}>
          <ShieldCheck style={{ height: "12px", width: "12px", color: "#8b5cf6" }} /> Secured Access Session API v1.0
        </div>

      </div>
    </div>
  );
}

export default Login;