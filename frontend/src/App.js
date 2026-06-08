import Home from "./Home";
import React, { useState, useRef } from "react";
import { 
  FolderOpen, 
  Camera, 
  Cpu, 
  BarChart2, 
  Clock, 
  ShieldAlert, 
  RefreshCw, 
  FileText, 
  Layers 
} from "lucide-react";

function App() {
  // Navigation View State ('landing' shows the home page, 'dashboard' shows the AI suite)
  const [viewMode, setViewMode] = useState("landing");

  // Core Dashboard Data States
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  // Fully expanded State Matrix tracking all 4 visualization channels
  const [metrics, setMetrics] = useState({
    type: null,
    detection_url: null,
    xai_url: null,
    gradcam_url: null,
    gradcam_plus_url: null,
    count: 0,
    accuracy: 0,
    latency: "0ms"
  });

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const handleBrowseClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      // Reset old image links cleanly to clear out cached screen blurs
      setMetrics({ type: null, detection_url: null, xai_url: null, gradcam_url: null, gradcam_plus_url: null, count: 0, accuracy: 0, latency: "0ms" });
      processMediaPayload(selectedFile);
    }
  };

  const processMediaPayload = async (mediaFile) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", mediaFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/process", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server processed data with errors");

      const data = await response.json();
      setMetrics({
        type: data.type,
        detection_url: data.detection_url,
        xai_url: data.xai_url,             // Your custom geometric Gaussian representation
        gradcam_url: data.gradcam_url,         // Standard coarse layer activation weights
        gradcam_plus_url: data.gradcam_plus_url,   // Advanced optimized second-order partial derivative weights
        count: data.count,
        accuracy: data.accuracy,
        latency: data.latency
      });
    } catch (error) {
      console.error(error);
      alert("Backend Communication Error. Make sure Flask Server is live on Port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const toggleWebcamStream = async () => {
    if (isCameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      setIsCameraActive(false);
    } else {
      setIsCameraActive(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Webcam hardware allocation failed:", err);
        setIsCameraActive(false);
      }
    }
  };

  const captureWebcamFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob((blob) => {
      const capturedFile = new File([blob], "camera_snapshot.jpg", { type: "image/jpeg" });
      setFile(capturedFile);
      setPreviewUrl(URL.createObjectURL(capturedFile));
      processMediaPayload(capturedFile);
    }, "image/jpeg");
  };

  const resetDashboardState = () => {
    setFile(null);
    setPreviewUrl(null);
    setMetrics({
      type: null,
      detection_url: null,
      xai_url: null,
      gradcam_url: null,
      gradcam_plus_url: null,
      count: 0,
      accuracy: 0,
      latency: "0ms"
    });
    if (isCameraActive) toggleWebcamStream();
  };

  const handleLogout = () => {
    resetDashboardState();
    setViewMode("landing"); // Routes back to the main landing viewport safely
  };

  // --- FLOATING CHROMATIC MASTER STYLING BLUEPRINT ---
  const styles = {
    container: { display: "flex", height: "100vh", width: "100vw", backgroundColor: "#090b11", color: "#e2e8f0", fontFamily: "sans-serif", overflow: "hidden" },
    sidebar: { width: "260px", backgroundColor: "#0d0f17", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRight: "1px solid #1a1d29", padding: "20px" },
    sidebarTop: { display: "flex", flexDirection: "column", gap: "30px" },
    brandBox: { display: "flex", alignItems: "center", gap: "12px", padding: "0 8px" },
    nav: { display: "flex", flexDirection: "column", gap: "6px" },
    navActive: { display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "12px", backgroundColor: "rgba(139, 92, 246, 0.15)", color: "#a78bfa", fontSize: "13px", fontWeight: "600", borderLeft: "3px solid #8b5cf6" },
    navDisabled: { display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "12px", color: "#475569", fontSize: "13px", cursor: "not-allowed" },
    sidebarBottom: { display: "flex", flexDirection: "column", gap: "12px" },
    webcamBox: { borderRadius: "16px", overflow: "hidden", backgroundColor: "#141724", border: "1px solid #1e2235", position: "relative", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center" },
    btnPrimary: { width: "100%", padding: "10px", background: "linear-gradient(to right, #8b5cf6, #ec4899)", border: "none", color: "white", fontWeight: "bold", fontSize: "12px", borderRadius: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" },
    btnSecondary: { width: "100%", padding: "10px", backgroundColor: "#141724", border: "1px solid #1e2235", color: "#94a3b8", fontWeight: "500", fontSize: "12px", borderRadius: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" },
    btnLogout: { width: "100%", padding: "10px", backgroundColor: "rgba(248, 113, 113, 0.05)", border: "1px solid rgba(248, 113, 113, 0.2)", color: "#f87171", fontWeight: "bold", fontSize: "12px", borderRadius: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "4px" },
    mainContent: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", background: "linear-gradient(to bottom, #111422, #090b11)", overflowY: "auto" },
    displayWorkspace: { padding: "24px 32px", display: "flex", flexDirection: "column", gap: "24px", flex: 1 },
    heroBanner: { borderRadius: "24px", backgroundColor: "#0d0f17", border: "1px solid #1e2235", minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
    resultsGrid: { width: "100%", height: "100%", display: "flex", gap: "16px" },
    resultColumn: { flex: 1, display: "flex", flexDirection: "column", gap: "8px", overflow: "hidden" },
    columnTitle: { fontSize: "10px", textTransform: "uppercase", tracking: "wider", fontWeight: "bold", whiteSpace: "nowrap", textOverflow: "ellipsis" },
    imageWrapper: { flex: 1, borderRadius: "14px", overflow: "hidden", backgroundColor: "rgba(0,0,0,0.4)", border: "1px solid #1e2235", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "280px" },
    tableContainer: { display: "flex", flexDirection: "column", gap: "12px" },
    tableHeader: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "14px 24px", borderBottom: "1px solid #1a1d29", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold", color: "#64748b", backgroundColor: "rgba(13, 15, 23, 0.4)" },
    tableRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "16px 24px", borderBottom: "1px solid #141724", fontSize: "13px" },
    badge: (color) => ({ padding: "4px 10px", borderRadius: "6px", backgroundColor: "#141724", border: "1px solid #1e2235", color: color, fontWeight: "bold", fontSize: "12px" }),
    metaSlot: { width: "25%", display: "flex", alignItems: "center", gap: "14px" },
    metaIcon: { height: "44px", width: "44px", borderRadius: "12px", background: "linear-gradient(to top right, #8b5cf6, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }
  };

  // --- RENDER MAPPING CONDITIONAL ---
  if (viewMode === "landing") {
    return <Home onLaunchDashboard={() => setViewMode("dashboard")} />;
  }

  return (
    <div style={styles.container}>
      
      {/* ─── CONTROL SIDEBAR ─── */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarTop}>
          <div style={styles.brandBox}>
            <div style={{ h: "36px", w: "36px", borderRadius: "12px", background: "linear-gradient(to top right, #ec4899, #8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", padding: "8px" }}>
              <Cpu style={{height: "20px", width: "20px", color: "white"}} />
            </div>
            <div>
              <h1 style={{fontSize: "14px", fontWeight: "bold", margin: 0, letterSpacing: "1px", color: "white"}}>SAFEVISION AI</h1>
              <span style={{fontSize: "10px", color: "#a78bfa", fontWeight: "500", textTransform: "uppercase", letterSpacing: "1px"}}>Perception Hub</span>
            </div>
          </div>

          <nav style={styles.nav}>
            <div style={styles.navActive}>
              <Layers style={{height: "16px", width: "16px"}} /> Real-time Dashboard
            </div>
            <div style={styles.navDisabled}>
              <FileText style={{height: "16px", width: "16px"}} /> Model Logs
            </div>
          </nav>
        </div>

        <div style={styles.sidebarBottom}>
          <div style={styles.webcamBox}>
            {isCameraActive ? (
              <video ref={videoRef} autoPlay playsInline style={{width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)"}} />
            ) : (
              <div style={{textAlign: "center", color: "#334155"}}>
                <Camera style={{height: "24px", width: "24px", opacity: 0.4, margin: "0 auto 6px"}} />
                <span style={{fontSize: "10px", textTransform: "uppercase", fontWeight: "bold", letterSpacing: "1px"}}>Camera Standby</span>
              </div>
            )}
          </div>
          {isCameraActive && (
            <button onClick={captureWebcamFrame} style={styles.btnPrimary}>Capture Frame</button>
          )}
          <button onClick={resetDashboardState} style={styles.btnSecondary}>
            <RefreshCw style={{height: "14px", width: "14px"} } /> Reset Session
          </button>
          <button onClick={handleLogout} style={styles.btnLogout}>
            Secure Logout
          </button>
        </div>
      </div>

      {/* ─── MAIN CONTENT VIEWPORTS ─── */}
      <div style={styles.mainContent}>
        <div style={styles.displayWorkspace}>
          
          {/* Dynamic 4-Column Media Output Player Deck */}
          <div style={styles.heroBanner}>
            {loading ? (
              <div style={{textAlign: "center"}}>
                <div style={{height: "40px", width: "40px", border: "4px solid rgba(139,92,246,0.2)", borderTopColor: "#8b5cf6", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px"}} />
                <h3 style={{fontSize: "14px", fontWeight: "bold", color: "white", margin: 0}}>COMPUTING QUAD-CORE VISUAL MATRIX ATTENTIONS...</h3>
              </div>
            ) : metrics.detection_url || metrics.xai_url || metrics.gradcam_url || metrics.gradcam_plus_url ? (
              <div style={styles.resultsGrid}>
                
                {/* Viewport 1: Standard Object Trackers */}
                <div style={styles.resultColumn}>
                  <span style={{...styles.columnTitle, color: "#a78bfa"}}>YOLOv8 Localization</span>
                  <div style={styles.imageWrapper}>
                    <img src={`${metrics.detection_url}?t=${Date.now()}`} alt="Detections" style={{width: "100%", height: "100%", objectFit: "contain"}} />
                  </div>
                </div>

                {/* Viewport 2: Custom Geodesic XAI Maps */}
                <div style={styles.resultColumn}>
                  <span style={{...styles.columnTitle, color: "#22d3ee"}}>Gaussian XAI Focus</span>
                  <div style={styles.imageWrapper}>
                    <img src={`${metrics.xai_url}?t=${Date.now()}`} alt="Custom XAI" style={{width: "100%", height: "100%", objectFit: "contain"}} />
                  </div>
                </div>

                {/* Viewport 3: Coarse Grad-CAM Maps */}
                <div style={styles.resultColumn}>
                  <span style={{...styles.columnTitle, color: "#3b82f6"}}>Grad-CAM Feature Activation</span>
                  <div style={styles.imageWrapper}>
                    <img src={`${metrics.gradcam_url}?t=${Date.now()}`} alt="Grad-CAM" style={{width: "100%", height: "100%", objectFit: "contain"}} />
                  </div>
                </div>

                {/* Viewport 4: Sharpened Grad-CAM++ Maps */}
                <div style={styles.resultColumn}>
                  <span style={{...styles.columnTitle, color: "#ec4899"}}>Grad-CAM++ Pixel Weighting</span>
                  <div style={styles.imageWrapper}>
                    <img src={`${metrics.gradcam_plus_url}?t=${Date.now()}`} alt="Grad-CAM Plus Plus" style={{width: "100%", height: "100%", objectFit: "contain"}} />
                  </div>
                </div>

              </div>
            ) : previewUrl ? (
              <div style={{maxWidth: "500px", borderRadius: "16px", overflow: "hidden", border: "1px solid #1e2235"}}>
                {file?.type.startsWith("video") ? (
                  <video src={previewUrl} controls style={{width: "100%", maxHeight: "300px"}} />
                ) : (
                  <img src={previewUrl} alt="Source" style={{width: "100%", maxHeight: "300px", objectFit: "contain"}} />
                )}
              </div>
            ) : (
              <div style={{textAlign: "center", maxWidth: "360px"}}>
                <div style={{height: "56px", width: "56px", borderRadius: "16px", backgroundColor: "#141724", border: "1px solid #22273d", display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6", margin: "0 auto 16px"}}>
                  <Layers style={{height: "24px", width: "24px"}} />
                </div>
                <h2 style={{fontSize: "16px", fontWeight: "bold", color: "white", margin: "0 0 6px"}}>No Target Asset Loaded</h2>
                <p style={{fontSize: "12px", color: "#64748b", margin: 0, lineHeight: "1.6"}}>Upload an orchestration sequence file or trigger your webcam to parse geometric and convolutional interpretability weight layers.</p>
              </div>
            )}
          </div>

          {/* Telemetry Report Rows */}
          <div style={styles.tableContainer}>
            <div style={{display: "flex", justifyContent: "space-between", padding: "0 16px"}}>
              <h3 style={{fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#64748b", margin: 0}}>Model Telemetry Report</h3>
              <span style={{fontSize: "11px", color: "#334155", fontWeight: "600"}}>ID: URN 2302728</span>
            </div>
            
            <div style={{backgroundColor: "rgba(13,15,23,0.6)", border: "1px solid #1a1d29", borderRadius: "16px", overflow: "hidden"}}>
              <div style={styles.tableHeader}>
                <div>Analytical Feature</div>
                <div>Target Class</div>
                <div>Engine Score</div>
                <div style={{textAlign: "right"}}>Operational Status</div>
              </div>

              {/* Row 1 */}
              <div style={styles.tableRow}>
                <div style={{display: "flex", alignItems: "center", gap: "12px", fontWeight: "600", color: "white"}}>
                  <ShieldAlert style={{height: "16px", width: "16px", color: "#3b82f6"}} /> Obstacle Count
                </div>
                <div style={{color: "#94a3b8"}}>Dynamic Road Objects</div>
                <div><span style={styles.badge("#3b82f6")}>{metrics.count} Targets</span></div>
                <div style={{textAlign: "right", color: "#475569"}}>Pre-Inference Clear</div>
              </div>

              {/* Row 2 */}
              <div style={styles.tableRow}>
                <div style={{display: "flex", alignItems: "center", gap: "12px", fontWeight: "600", color: "white"}}>
                  <BarChart2 style={{height: "16px", width: "16px", color: "#10b981"}} /> Confidence Rating
                </div>
                <div style={{color: "#94a3b8"}}>Softmax Probability</div>
                <div><span style={styles.badge("#10b981")}>{metrics.accuracy}% Mean</span></div>
                <div style={{textAlign: "right", color: "#475569"}}>Bounds Guard Checked</div>
              </div>

              {/* Row 3 */}
              <div style={styles.tableRow}>
                <div style={{display: "flex", alignItems: "center", gap: "12px", fontWeight: "600", color: "white", borderBottom: "none"}}>
                  <Clock style={{height: "16px", width: "16px", color: "#ec4899"}} /> Inference Delay
                </div>
                <div style={{color: "#94a3b8"}}>Forward Pass Latency</div>
                <div><span style={styles.badge("#ec4899")}>{metrics.latency}</span></div>
                <div style={{textAlign: "right", color: "#475569"}}>Quad-Core Visuals Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM CONTROL DECK PLAYER BAR ─── */}
        <div style={{backgroundColor: "#0d0f17", borderTop: "1px solid #1a1d29", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div style={styles.metaSlot}>
            <div style={styles.metaIcon}>
              <FolderOpen style={{height: "20px", width: "20px"}} />
            </div>
            <div style={{overflow: "hidden"}}>
              <h4 style={{fontSize: "13px", fontWeight: "bold", color: "white", margin: 0, textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>
                {file ? file.name : "Select Target Media"}
              </h4>
              <p style={{fontSize: "10px", color: "#475569", margin: "2px 0 0", textTransform: "uppercase", fontWeight: "600"}}>
                {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB Mounted` : "Drive Deck Empty"}
              </p>
            </div>
          </div>

          <div style={{display: "flex", alignItems: "center", gap: "16px"}}>
            <button onClick={handleBrowseClick} style={{...styles.btnPrimary, width: "auto", padding: "10px 24px", borderRadius: "30px", textTransform: "uppercase", letterSpacing: "1px"}}>
              <FolderOpen style={{height: "14px", width: "14px"}} /> Load Media File
            </button>
            <button onClick={toggleWebcamStream} style={{...styles.btnSecondary, width: "auto", padding: "10px 24px", borderRadius: "30px", textTransform: "uppercase", letterSpacing: "1px", color: isCameraActive ? "#f87171" : "#cbd5e1", borderColor: isCameraActive ? "#f87171" : "#1e2235"}}>
              <Camera style={{height: "14px", width: "14px"} } /> {isCameraActive ? "Disconnect Video" : "Connect Live Webcam"}
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*,video/*" style={{display: "none"}} />
          </div>

          <div style={{width: "25%", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px"}}>
            <div style={{textAlign: "right"}}>
              <span style={{fontSize: "9px", textTransform: "uppercase", fontWeight: "bold", color: "#475569", letterSpacing: "1px", display: "block"}}>Computational Load</span>
              <span style={{fontSize: "12px", fontWeight: "bold", color: "#cbd5e1"}}>{metrics.latency !== "0ms" ? metrics.latency : "Standby"}</span>
            </div>
            <div style={{width: "90px", height: "6px", backgroundColor: "#141724", border: "1px solid #22273d", borderRadius: "10px", overflow: "hidden"}}>
              <div style={{height: "100%", width: metrics.latency !== "0ms" ? "100%" : "0%", background: "linear-gradient(to right, #8b5cf6, #ec4899)", borderRadius: "10px", transition: "width 0.4s ease"}} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;