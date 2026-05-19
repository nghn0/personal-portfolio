export type Project = {
  id: string;
  title: string;
  type: string;
  shortDesc: string;
  description: string;
  features: string[];
  tech: string[];
  github: string;
  color: "neon-cyan" | "neon-purple" | "accent-pink";
  pageUrl?: string;
  liveUrl?: string;
};

export const allProjects: Project[] = [
  {
    id: "digital-contract-platform",
    title: "Digital Contract Platform",
    type: "Full-Stack + AI + Web3",
    shortDesc: "Distributed microservices platform for secure contract management, AI risk analysis, and blockchain verification.",
    description: "A comprehensive digital contract platform featuring a Next.js frontend, an Express.js orchestrator, a Python gRPC AI service for legal risk analysis, and smart contract integration for cryptographic verification on the blockchain.",
    features: [
      "AI-powered legal document risk analysis",
      "Blockchain-based cryptographic verification",
      "High-performance Python gRPC microservice",
      "Supabase integrated secure file management"
    ],
    tech: ["Next.js", "Express.js", "Python", "gRPC", "Ethers.js", "Supabase"],
    github: "https://github.com/nghn0/digital-contract-platform",
    color: "neon-cyan",
    pageUrl: "/projects/digital-contract-platform",
    liveUrl: "https://digital-contract-platform.vercel.app/"
  },
  {
    id: "loomera",
    title: "Loomera",
    type: "AI + Full-Stack + E-Commerce",
    shortDesc: "AI-powered silk classification and recommendation platform integrating deep learning and e-commerce.",
    description: "An innovative platform that solves the problem of manual silk classification by using a dual-output CNN model to predict silk type and texture. It features Explainable AI using Grad-CAM to ensure transparency in AI predictions.",
    features: [
      "Explainable AI using Grad-CAM",
      "Product recommendation system",
      "Full-stack e-commerce flow",
      "High accuracy classification (~92%)"
    ],
    tech: ["MobileNetV2", "TensorFlow", "Flask", "Grad-CAM", "HTML/CSS"],
    github: "https://github.com/nghn0/AI-Based-Silk-Fabric-Type-Texture-Classification-E-Commerce-Website",
    color: "neon-cyan",
    pageUrl: "/projects/loomera"
  },
  {
    id: "emojify",
    title: "Emojify",
    type: "AI + Real-Time System",
    shortDesc: "Real-time facial emotion detection system with live emoji overlay.",
    description: "Built to provide fast and accurate real-time emotion detection. It utilizes a hybrid architecture combining CNN, Attention-based CNN, and CNN + Vision Transformer to detect 7 different emotions with extremely low latency via webcam inference.",
    features: [
      "Detects 7 emotions in real-time",
      "Webcam-based inference",
      "Hybrid CNN + ViT architecture",
      "Low latency performance"
    ],
    tech: ["Keras", "OpenCV", "TensorFlow", "CNN", "ViT"],
    github: "https://github.com/nghn0/Emojify",
    color: "neon-purple",
    pageUrl: "/projects/emojify"
  },
  {
    id: "resume-builder",
    title: "AI Resume Builder",
    type: "Full-Stack + AI",
    shortDesc: "AI-powered system generating ATS-compliant resumes from minimal input.",
    description: "A comprehensive tool that simplifies resume creation by using an AI-powered system to generate full, ATS-compliant resumes. It includes dynamic templates, secure authentication, and high-fidelity PDF exporting capabilities.",
    features: [
      "Minimal input to full resume generation",
      "Dynamic template customization",
      "Secure user authentication",
      "High-fidelity PDF export"
    ],
    tech: ["Flask", "Together API", "Puppeteer", "MongoDB", "Node.js"],
    github: "https://github.com/nghn0/AI-Powered-Resume-Builder",
    color: "accent-pink",
    pageUrl: "/projects/ai-resume-builder"
  },
  {
    id: "sentient-npc",
    title: "Sentient NPC",
    type: "AI + Systems + Voice Interface",
    shortDesc: "Offline conversational AI system with voice interaction.",
    description: "A fully offline, lightweight Transformer-based conversational AI system that enables seamless voice interactions with sub-245ms inference latency. It integrates speech-to-text, natural language generation, and text-to-speech in a unified pipeline.",
    features: [
      "Fully offline AI interaction",
      "Speech-to-Text and Text-to-Speech",
      "Transformer-based NLP response generation",
      "<245ms inference latency"
    ],
    tech: ["Python", "Transformers", "STT", "TTS"],
    github: "https://github.com/nghn0/Sentient-NPC",
    color: "neon-cyan",
    pageUrl: "/projects/sentient-npc"
  },
  {
    id: "qr-detection",
    title: "QR Code Detection with YOLOv8",
    type: "Computer Vision + AI",
    shortDesc: "Complete pipeline for training and inference of a YOLOv8 model to detect QR codes in images.",
    description: "An end-to-end computer vision project that prepares a dataset, trains a YOLOv8 model using Ultralytics, and runs inference to detect QR codes. It outputs bounding boxes in both annotated images and structured JSON files.",
    features: [
      "Dataset preparation and automatic 80/20 splitting",
      "Manual annotation via Label Studio",
      "Automated YOLOv8 training pipeline",
      "Inference script with precise JSON output for detection and decoding"
    ],
    tech: ["Python", "YOLOv8", "Ultralytics", "Label Studio"],
    github: "https://github.com/nghn0/qr_code_detection",
    color: "neon-cyan",
    pageUrl: "/projects/qr-detection"
  },
  {
    id: "smart-lock",
    title: "Smart Lock System",
    type: "Hardware + IoT",
    shortDesc: "RFID-based door locking system with real-time logging via NodeMCU (ESP8266).",
    description: "An IoT hardware project implementing a Smart Door Lock System using RFID (MFRC522) and NodeMCU ESP8266. It authenticates users by scanning RFID cards and logs the data securely to a remote PHP server over WiFi.",
    features: [
      "RFID-based user authentication",
      "Real-time data logging to remote PHP server",
      "Door unlocking via relay/servo motor",
      "Modular codebase with debugging output"
    ],
    tech: ["NodeMCU ESP8266", "RFID MFRC522", "PHP", "MySQL", "C++ (Arduino)"],
    github: "https://github.com/nghn0/RFID_smart_locking_system",
    color: "neon-purple",
    pageUrl: "/projects/smart-lock"
  },
  {
    id: "mcp-server",
    title: "MCP Server",
    type: "Systems Architecture",
    shortDesc: "AI tool routing server using Docker and JSON-RPC.",
    description: "Designed a Model Context Protocol server for AI tool routing using Docker and JSON-RPC to handle distributed multi-agent workflows efficiently.",
    features: [
      "Distributed multi-agent routing",
      "JSON-RPC integration",
      "Dockerized container deployment"
    ],
    tech: ["Docker", "JSON-RPC", "Python", "Systems Design"],
    github: "https://github.com/nghn0/mcpserver",
    color: "accent-pink",
    pageUrl: "/projects/mcp-server"
  },
  {
    id: "solarcycle-analysis",
    title: "SolarCycle Analysis",
    type: "AI & Data Science",
    shortDesc: "LSTM-based forecasting model for predicting solar sunspot activity.",
    description: "Developed an LSTM-based time series forecasting model to predict sunspot activity by designing optimized preprocessing pipelines and feature scaling strategies.",
    features: [
      "LSTM-based time series forecasting",
      "Data preprocessing and normalization",
      "Trend analysis and data visualization"
    ],
    tech: ["LSTM", "Python", "Pandas", "NumPy", "Data Visualization"],
    github: "https://github.com/nghn0/SolarCycle-analysis_and_prediction",
    color: "neon-purple",
    pageUrl: "/projects/solarcycle-analysis"
  },
  {
    id: "sky-view",
    title: "Sky View",
    type: "Web Application",
    shortDesc: "Weather application integrating external APIs with an SQLite backend.",
    description: "A functional weather tracking application that consumes live weather API data and stores user preferences and historical data in a local SQLite database.",
    features: [
      "Live API data consumption",
      "User preference storage",
      "Responsive web interface"
    ],
    tech: ["JavaScript", "API", "SQLite", "HTML/CSS"],
    github: "https://github.com/nghn0/Sky_View",
    color: "neon-cyan",
    pageUrl: "/projects/sky-view"
  }
];
