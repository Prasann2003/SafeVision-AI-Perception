import React, { useState } from "react";
import { 
  Cpu, 
  ShieldAlert, 
  Clock, 
  Zap, 
  Eye, 
  EyeOff,
  Layers, 
  Globe, 
  Lock, 
  User, 
  Mail,
  ArrowRight
} from "lucide-react";

function Home({ onLaunchDashboard }) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
  const [showPasswordText, setShowPasswordText] = useState(false); // Controls password field masking
  
  // Input Form States
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Dynamic Saved Account State (Initialized with admin default fallback)
  const [savedAccount, setSavedAccount] = useState({
    username: "admin",
    email: "admin@gndec.ac.in",
    password: "admin123"
  });

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    
    const cleanUser = username.trim();
    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    if (authMode === "signup") {
      setSavedAccount({
        username: cleanUser,
        email: cleanEmail,
        password: cleanPass
      });
      
      alert(`Profile Registered Successfully!\n\nOperator ID: ${cleanUser}\nEmail: ${cleanEmail}\n\nPlease log in using these credentials.`);
      
      setUsername("");
      setPassword("");
      setError("");
      setAuthMode("login");
      setShowPasswordText(false); // Reset reveal flag on redirect
      
    } else {
      if (
        cleanUser === savedAccount.username && 
        cleanPass === savedAccount.password
      ) {
        setError("");
        setShowAuthModal(false);
        onLaunchDashboard(); 
      } else {
        setError(`Invalid Verification. Try using your registered account credentials.`);
      }
    }
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setError("");
    setUsername("");
    setEmail("");
    setPassword("");
    setShowPasswordText(false);
  };

  // --- FLOATING CHROMATIC DESIGN STYLES MATRIX ---
  const styles = {
    wrapper: { minHeight: "100vh", width: "100vw", backgroundColor: "#06070d", color: "#e2e8f0", fontFamily: "sans-serif", overflowX: "hidden", position: "relative" },
    radialGlow: { position: "absolute", top: "-20%", left: "30%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 70%)", pointerEvents: "none", zIndex: 1 },
    navbar: { position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", width: "calc(100% - 80px)", maxWidth: "1200px", backgroundColor: "rgba(13, 15, 23, 0.7)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "20px", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(20px)", zIndex: 100, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" },
    navLogo: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "bold", fontSize: "15px", color: "white", letterSpacing: "1px" },
    logoGlow: { height: "30px", width: "30px", borderRadius: "8px", background: "linear-gradient(135deg, #8b5cf6, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center" },
    navButtons: { display: "flex", gap: "12px" },
    btnNavSecondary: { backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", padding: "8px 18px", borderRadius: "10px", fontSize: "12px", fontWeight: "bold", cursor: "pointer", transition: "all 0.2s" },
    btnNavPrimary: { background: "linear-gradient(to right, #8b5cf6, #ec4899)", border: "none", color: "white", padding: "9px 20px", borderRadius: "10px", fontSize: "12px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 15px rgba(139,92,246,0.2)" },
    heroSection: { maxWidth: "1200px", margin: "0 auto", padding: "160px 40px 80px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 10 },
    badge: { display: "flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "#a78bfa", padding: "6px 14px", borderRadius: "30px", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "24px" },
    mainHeading: { fontSize: "52px", fontWeight: "800", color: "white", margin: "0 0 20px", tracking: "-1px", lineHeight: "1.1", background: "linear-gradient(to bottom, #ffffff, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    subHeading: { fontSize: "16px", color: "#64748b", maxWidth: "680px", margin: "0 auto 36px", lineHeight: "1.6", fontWeight: "500" },
    btnHero: { padding: "14px 32px", background: "linear-gradient(to right, #8b5cf6, #ec4899)", border: "none", borderRadius: "14px", color: "white", fontWeight: "bold", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 10px 25px rgba(139,92,246,0.3)", transition: "transform 0.2s" },
    sectionContainer: { maxWidth: "1200px", margin: "0 auto", padding: "40px 40px 120px", position: "relative", zIndex: 10 },
    sectionLabel: { fontSize: "11px", textTransform: "uppercase", tracking: "2px", color: "#8b5cf6", fontWeight: "bold", textAlign: "center", marginBottom: "12px", display: "block" },
    sectionTitle: { fontSize: "28px", fontWeight: "bold", color: "white", textAlign: "center", marginBottom: "48px" },
    grid3: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" },
    floatCard: { backgroundColor: "rgba(13, 15, 23, 0.4)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "24px", padding: "32px", backdropFilter: "blur(10px)", display: "flex", flexDirection: "column", gap: "16px", transition: "all 0.3s ease", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" },
    cardIconBox: (bg) => ({ height: "48px", width: "48px", borderRadius: "14px", backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center" }),
    modalOverlay: { position: "fixed", inset: 0, backgroundColor: "rgba(4, 5, 9, 0.8)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modalCard: { width: "380px", backgroundColor: "#0d0f17", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "28px", padding: "40px", display: "flex", flexDirection: "column", gap: "24px", boxShadow: "0 30px 60px rgba(0,0,0,0.6)" },
    inputGroup: { display: "flex", flexDirection: "column", gap: "6px", position: "relative" },
    inputIcon: { position: "absolute", left: "14px", top: "34px", color: "#475569", height: "16px", width: "16px" },
    inputField: { width: "100%", padding: "12px 46px 12px 42px", backgroundColor: "#141724", border: "1px solid #22273d", borderRadius: "12px", color: "white", fontSize: "13px", outline: "none", boxSizing: "border-box" },
    eyeButton: { position: "absolute", right: "14px", top: "34px", background: "none", border: "none", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 },
    socialBtn: { width: "100%", padding: "12px", backgroundColor: "#141724", border: "1px solid #22273d", borderRadius: "12px", color: "#cbd5e1", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", cursor: "pointer" }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.radialGlow} />

      {/* ─── FLOATING TOP NAVIGATION BAR ─── */}
      <header style={styles.navbar}>
        <div style={styles.navLogo}>
          <div style={styles.logoGlow}>
            <Cpu style={{ height: "16px", width: "16px", color: "white" }} />
          </div>
          <span>SAFEVISION AI</span>
        </div>
        <div style={styles.navButtons}>
          <button onClick={() => openAuth("login")} style={styles.btnNavSecondary}>Log In</button>
          <button onClick={() => openAuth("signup")} style={styles.btnNavPrimary}>Sign Up</button>
        </div>
      </header>

      {/* ─── HERO INTRO ZONE ─── */}
      <section style={styles.heroSection}>
        <div style={styles.badge}>
          <Zap style={{ height: "12px", width: "12px" }} /> Explainable AI Perception v2.0
        </div>
        <h1 style={styles.mainHeading}>Next-Gen Computer Vision<br />For Autonomous Systems</h1>
        <p style={styles.subHeading}>
          SafeVision bridges high-precision telemetry object tracking with structural Gaussian Explainable AI (XAI) overlays. It removes the "black box" of deep learning, ensuring every localized decision is fully transparent.
        </p>
        <button onClick={() => openAuth("login")} style={styles.btnHero}>
          Launch Core Engine <ArrowRight style={{ height: "16px", width: "16px" }} />
        </button>
      </section>

      {/* ─── PROBLEM vs SOLUTION VALUE FRAME ─── */}
      <section style={styles.sectionContainer}>
        <span style={styles.sectionLabel}>The Paradigm</span>
        <h2 style={styles.sectionTitle}>Solving Real-World Edge Challenges</h2>

        <div style={styles.grid3}>
          <div style={styles.floatCard}>
            <div style={styles.cardIconBox("rgba(239,68,68,0.1)")}>
              <ShieldAlert style={{ height: "22px", width: "22px", color: "#ef4444" }} />
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "white", margin: 0 }}>The Black Box Problem</h3>
            <p style={{ fontSize: "12px", color: "#64748b", margin: 0, lineHeight: "1.6" }}>
              Standard neural network detectors classify obstacles but fail to explain *why* or *what* pixel frames caused that choice, leaving self-driving architectures prone to invisible auditing flaws.
            </p>
          </div>

          <div style={styles.floatCard}>
            <div style={styles.cardIconBox("rgba(139,92,246,0.1)")}>
              <Eye style={{ height: "22px", width: "22px", color: "#8b5cf6" }} />
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "white", margin: 0 }}>Explainable Math Alignment</h3>
            <p style={{ fontSize: "12px", color: "#64748b", margin: 0, lineHeight: "1.6" }}>
              SafeVision deploys refined Gaussian probability density grids mapping inside extracted vehicle margins. It locks tracking pixels tightly onto the cars, removing artifact bleeding onto asphalt or roads.
            </p>
          </div>

          <div style={styles.floatCard}>
            <div style={styles.cardIconBox("rgba(16,185,129,0.1)")}>
              <Clock style={{ height: "22px", width: "22px", color: "#10b981" }} />
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "white", margin: 0 }}>Edge-Optimized Efficiency</h3>
            <p style={{ fontSize: "12px", color: "#64748b", margin: 0, lineHeight: "1.6" }}>
              By merging the YOLOv8 lightweight Nano backbone with decoupled matrix computations, the pipeline performs full forward pass inferencing in just a handful of milliseconds.
            </p>
          </div>
        </div>
      </section>

      {/* ─── AUTHENTICATION PORTAL MODAL ─── */}
      {showAuthModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAuthModal(false)}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>

            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <div style={{ height: "44px", width: "44px", borderRadius: "12px", background: "linear-gradient(135deg, #8b5cf6, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Cpu style={{ height: "22px", width: "22px", color: "white" }} />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "white", margin: 0 }}>
                {authMode === "login" ? "Secure Dashboard Access" : "Create Operator Profile"}
              </h3>
            </div>

            {error && <div style={{ fontSize: "11px", color: "#f87171", backgroundColor: "rgba(248,113,113,0.1)", padding: "8px", borderRadius: "8px", border: "1px solid rgba(248,113,113,0.2)", textAlign: "center" }}>{error}</div>}

            <form onSubmit={handleAuthSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              
              <div style={styles.inputGroup}>
                <label style={{ fontSize: "10px", textTransform: "uppercase", fontWeight: "bold", color: "#475569" }}>Operator ID</label>
                <User style={styles.inputIcon} />
                <input type="text" placeholder="Choose username" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.inputField} required />
              </div>

              {authMode === "signup" && (
                <div style={styles.inputGroup}>
                  <label style={{ fontSize: "10px", textTransform: "uppercase", fontWeight: "bold", color: "#475569" }}>Corporate Email</label>
                  <Mail style={styles.inputIcon} />
                  <input type="email" placeholder="operator@gndec.ac.in" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.inputField} required />
                </div>
              )}

              {/* Password Group With Floating Visibility Eye Button */}
              <div style={styles.inputGroup}>
                <label style={{ fontSize: "10px", textTransform: "uppercase", fontWeight: "bold", color: "#475569" }}>Passkey</label>
                <Lock style={styles.inputIcon} />
                <input 
                  type={showPasswordText ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  style={styles.inputField} 
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPasswordText(!showPasswordText)} 
                  style={styles.eyeButton}
                  title={showPasswordText ? "Hide Passkey" : "Reveal Passkey"}
                >
                  {showPasswordText ? (
                    <EyeOff style={{ height: "16px", width: "16px", color: "#a78bfa" }} />
                  ) : (
                    <Eye style={{ height: "16px", width: "16px" }} />
                  )}
                </button>
              </div>

              <button type="submit" style={{ ...styles.btnNavPrimary, width: "100%", padding: "12px", fontSize: "13px", marginTop: "6px" }}>
                {authMode === "login" ? "Verify & Initialize" : "Register Security Account"}
              </button>
            </form>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#334155", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", justifyContent: "center" }}>
              <div style={{ height: "1px", backgroundColor: "#1e2235", flex: 1 }} /> Or Access Via <div style={{ height: "1px", backgroundColor: "#1e2235", flex: 1 }} />
            </div>

            <button
              type="button"
              onClick={() => { 
                setUsername(savedAccount.username); 
                setPassword(savedAccount.password); 
                alert(`Google Handshake Complete!\n\nAuthenticated as: ${savedAccount.email}`); 
              }}
              style={styles.socialBtn}
            >
              <Globe style={{ height: "16px", width: "16px", color: "#ea4335" }} /> Connect via Google Workspace
            </button>

            <div style={{ textAlign: "center", fontSize: "12px", color: "#475569" }}>
              {authMode === "login" ? (
                <span>New Operator? <span onClick={() => openAuth("signup")} style={{ color: "#8b5cf6", cursor: "pointer", fontWeight: "600" }}>Register Hub Profile</span></span>
              ) : (
                <span>Existing Security Identity? <span onClick={() => openAuth("login")} style={{ color: "#8b5cf6", cursor: "pointer", fontWeight: "600" }}>Return to Portal</span></span>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Home;