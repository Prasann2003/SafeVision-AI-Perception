# SafeVision: Autonomous Vehicle Object Perception System with Explainable AI (XAI)

An industry-grade perception platform designed for autonomous driving scenarios, featuring real-time multi-class object localization paired with Explainable AI interpretability frameworks.

## 🛠️ Technical Architecture
* **Frontend:** Built with **React.js** for handling modular dashboard elements, user authentication, and side-by-side computer vision telemetry.
* **Backend:** Powered by a high-performance **Flask (Python)** wrapper optimized for deep learning models.
* **Core AI Models:** **Ultralytics YOLOv8** for real-time traffic object detection (trained on the **COCO Dataset**).
* **Explainability Framework:** Integrated with **Grad-CAM** implementations to generate real-time visual attention heatmaps, providing transparency for autonomous decision-making.

## 📁 Repository Structure
* `/frontend`: React.js dashboard interface and state configurations.
* `/backend`: Flask server script (`app.py`), pre-trained model weights, and custom visual rendering components.
