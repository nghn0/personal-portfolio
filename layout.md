# Website Content Structure

## Nithish Gowda H N — AI Engineer Portfolio

---

## 1. Overview

- **Live URL:** `https://personalblog-nghn0.vercel.app/`
- **Type:** Portfolio website (single-page homepage + Projects Archive + individual project case studies)
- **GitHub:** `github.com/nghn0`
- **LinkedIn:** `linkedin.com/in/nithishgowda`
- **Email:** `nithi9905@gmail.com`

---

## 2. Navigation

Fixed top navigation with the following sections accessible as anchor links on the homepage:

- **Projects** → `#projects`
- **Experience** → `#experience`
- **Writing** → `#writing`
- **Contact** → `#contact`
- **"Hire Me"** CTA → `#contact`

The Projects Archive at `/projects` has its own back link to return to the homepage.

---

## 3. Content by Section

### 3.1 Hero Section

| Field | Content |
|-------|---------|
| **Tagline** | System Online |
| **Name** | Nithish |
| **Title** | AI Engineer & Intelligent Systems Builder |
| **Description** | Building end-to-end intelligent systems combining deep learning, scalable architectures, and explainable AI to solve complex real-world problems. |
| **CTAs** | Explore Projects / Talk to My AI |

---

### 3.2 Featured Projects (Homepage — First 6 of 10)

Each project card displays: type label, title, short description, and tech tags. Clicking opens a modal with full details.

#### 1. Digital Contract Platform
- **Type:** Full-Stack + AI + Web3
- **Short description:** Distributed microservices platform for secure contract management, AI risk analysis, and blockchain verification.
- **Full description:** A comprehensive digital contract platform featuring a Next.js frontend, an Express.js orchestrator, a Python gRPC AI service for legal risk analysis, and smart contract integration for cryptographic verification on the blockchain.
- **Key features:**
  - AI-powered legal document risk analysis
  - Blockchain-based cryptographic verification
  - High-performance Python gRPC microservice
  - Supabase integrated secure file management
- **Technologies:** Next.js, Express.js, Python, gRPC, Ethers.js, Supabase
- **Links:** [GitHub](https://github.com/nghn0/digital-contract-platform) | [Case Study](/projects/digital-contract-platform) | [Live Site](https://digital-contract-platform.vercel.app/)

#### 2. Loomera
- **Type:** AI + Full-Stack + E-Commerce
- **Short description:** AI-powered silk classification and recommendation platform integrating deep learning and e-commerce.
- **Full description:** An innovative platform that solves the problem of manual silk classification by using a dual-output CNN model to predict silk type and texture. It features Explainable AI using Grad-CAM to ensure transparency in AI predictions.
- **Key features:**
  - Explainable AI using Grad-CAM
  - Product recommendation system
  - Full-stack e-commerce flow
  - High accuracy classification (~92%)
- **Technologies:** MobileNetV2, TensorFlow, Flask, Grad-CAM, HTML/CSS
- **Links:** [GitHub](https://github.com/nghn0/AI-Based-Silk-Fabric-Type-Texture-Classification-E-Commerce-Website) | [Case Study](/projects/loomera)

#### 3. Emojify
- **Type:** AI + Real-Time System
- **Short description:** Real-time facial emotion detection system with live emoji overlay.
- **Full description:** Built to provide fast and accurate real-time emotion detection. It utilizes a hybrid architecture combining CNN, Attention-based CNN, and CNN + Vision Transformer to detect 7 different emotions with extremely low latency via webcam inference.
- **Key features:**
  - Detects 7 emotions in real-time
  - Webcam-based inference
  - Hybrid CNN + ViT architecture
  - Low latency performance
- **Technologies:** Keras, OpenCV, TensorFlow, CNN, ViT
- **Links:** [GitHub](https://github.com/nghn0/Emojify) | [Case Study](/projects/emojify)

#### 4. AI Resume Builder
- **Type:** Full-Stack + AI
- **Short description:** AI-powered system generating ATS-compliant resumes from minimal input.
- **Full description:** A comprehensive tool that simplifies resume creation by using an AI-powered system to generate full, ATS-compliant resumes. It includes dynamic templates, secure authentication, and high-fidelity PDF exporting capabilities.
- **Key features:**
  - Minimal input to full resume generation
  - Dynamic template customization
  - Secure user authentication
  - High-fidelity PDF export
- **Technologies:** Flask, Together API, Puppeteer, MongoDB, Node.js
- **Links:** [GitHub](https://github.com/nghn0/AI-Powered-Resume-Builder) | [Case Study](/projects/ai-resume-builder)

#### 5. Sentient NPC
- **Type:** AI + Systems + Voice Interface
- **Short description:** Offline conversational AI system with voice interaction.
- **Full description:** A fully offline, lightweight Transformer-based conversational AI system that enables seamless voice interactions with sub-245ms inference latency. It integrates speech-to-text, natural language generation, and text-to-speech in a unified pipeline.
- **Key features:**
  - Fully offline AI interaction
  - Speech-to-Text and Text-to-Speech
  - Transformer-based NLP response generation
  - <245ms inference latency
- **Technologies:** Python, Transformers, STT, TTS
- **Links:** [GitHub](https://github.com/nghn0/Sentient-NPC) | [Case Study](/projects/sentient-npc)

#### 6. QR Code Detection with YOLOv8
- **Type:** Computer Vision + AI
- **Short description:** Complete pipeline for training and inference of a YOLOv8 model to detect QR codes in images.
- **Full description:** An end-to-end computer vision project that prepares a dataset, trains a YOLOv8 model using Ultralytics, and runs inference to detect QR codes. It outputs bounding boxes in both annotated images and structured JSON files.
- **Key features:**
  - Dataset preparation and automatic 80/20 splitting
  - Manual annotation via Label Studio
  - Automated YOLOv8 training pipeline
  - Inference script with precise JSON output for detection and decoding
- **Technologies:** Python, YOLOv8, Ultralytics, Label Studio
- **Links:** [GitHub](https://github.com/nghn0/qr_code_detection) | [Case Study](/projects/qr-detection)

---

### 3.3 Professional Experience

#### 1. Full-Stack Developer Intern @ Janmamithra Trust, Bengaluru
- **Duration:** Dec 2024 – Jan 2025
- **Details:**
  - Designed and implemented responsive web interfaces ensuring cross-device compatibility and seamless user experience.
  - Built a secure PHP–MySQL administrative portal for managing projects, volunteers, and organizational events with role-based access.
  - Implemented authentication mechanisms, session handling, and CRUD database operations to ensure secure data management.

#### 2. AI Intern @ Dhee Center for AI & Data Science
- **Duration:** Jun 2024 – Jul 2024
- **Details:**
  - Developed an LSTM-based time series forecasting model to predict sunspot activity by designing optimized preprocessing pipelines and feature scaling strategies.
  - Conducted trend analysis and data visualization to interpret long-term periodic patterns and model performance stability.
  - Improved prediction accuracy through hyperparameter tuning, loss optimization, and iterative experimentation.

---

### 3.4 Research & Writing

#### 1. Design and Enhanced Analysis of Silk Fabric Classification Using MobileNetV2 with Grad-CAM Interpretability
- **Type:** IEEE Conference Paper
- **Short description:** An AI-based fabric estimator solution to help customers confidently buy silk sarees online, reducing return rates.
- **Full abstract:** The task of choosing the right silk saree online is a great challenge for customers. The sensory experience of the customers is lacking. This drawback accounts for up to 25% of returned orders. Loomera, an online platform for sarees like Kancheepuram, Banarasi, Uppada Pattu, Mysore Silk, and Champa Silk, offers an AI fabric estimator as the solution. Through a saree image, users can instantly identify its texture — smooth and lustrous, firm and crisp, soft and structured, lightweight and flowy, or soft and glossy — and make informed buying decisions and help curb product returns. MobileNetV2, a small-screen deep learning architecture, is strengthened with convolution layers for the effective output of fabric features from images. Having been trained on labeled images of fabrics, it precisely distinguishes textures. Through the combination of AI and online shopping, Loomera fills the gap between online and offline and enables customers to shop for silk sarees with confidence.
- **Key insights:**
  - Solves high return rates (up to 25%) in online silk shopping
  - Identifies 5 distinct silk textures instantly from images
  - Uses MobileNetV2 augmented with custom convolution layers
  - Bridges the gap between online and offline shopping experiences
- **Methodology & tech:** MobileNetV2, Deep Learning, Grad-CAM, Computer Vision
- **Link:** [IEEE Xplore](https://ieeexplore.ieee.org/abstract/document/11368429)

#### 2. SolarCycle Analysis & Prediction
- **Type:** Data Science & AI
- **Short description:** End-to-end analysis of solar sunspot cycles and LSTM-based forecasting modeling.
- **Full abstract:** This project performs an end-to-end analysis of solar sunspot cycles and builds an LSTM-based forecasting model to predict future Solar Sunspot Numbers (SSN). It combines scientific visualization, time-series pattern discovery, and deep learning forecasting to better understand solar activity and its impact on space weather.
- **Key insights:**
  - Analyzes historical sunspot cycles from 1749 to 2021
  - Correlates SSN with 10.7 cm Radio Flux and Polar Field data
  - 3-layer LSTM architecture with 16-step lag window
  - Achieved a highly accurate MAE of 13.29 (inverse transformed)
- **Methodology & tech:** LSTM, Time-Series Analysis, Python, TensorFlow, Pandas
- **Link:** [GitHub](https://github.com/nghn0/SolarCycle-analysis_and_prediction)

---

### 3.5 Contact

- **Intro:** Ready to build the next generation of intelligent systems?
- **Email:** nithi9905@gmail.com
- **GitHub:** github.com/nghn0
- **LinkedIn:** linkedin.com/in/nithishgowda
- **Contact form fields:**
  - Name (required)
  - Email (required)
  - Message (required, textarea)
- **Form action:** Opens default email client via `mailto:` with subject "Portfolio Inquiry from [Name]" and body containing the message + reply-to email.

---

## 4. Projects Archive Page (/projects)

Title: **Complete Archive**

Subtitle: A comprehensive collection of my work spanning Artificial Intelligence, Full-Stack Development, Systems Architecture, and Data Science.

Shows all **10 projects** (including the 4 not shown on the homepage):

#### 7. Smart Lock System
- **Type:** Hardware + IoT
- **Description:** An IoT hardware project implementing a Smart Door Lock System using RFID (MFRC522) and NodeMCU ESP8266. It authenticates users by scanning RFID cards and logs the data securely to a remote PHP server over WiFi.
- **Features:** RFID-based user authentication, Real-time data logging to remote PHP server, Door unlocking via relay/servo motor, Modular codebase with debugging output.
- **Tech:** NodeMCU ESP8266, RFID MFRC522, PHP, MySQL, C++ (Arduino)
- **GitHub:** [nghn0/RFID_smart_locking_system](https://github.com/nghn0/RFID_smart_locking_system)

#### 8. MCP Server
- **Type:** Systems Architecture
- **Description:** Designed a Model Context Protocol server for AI tool routing using Docker and JSON-RPC to handle distributed multi-agent workflows efficiently.
- **Features:** Distributed multi-agent routing, JSON-RPC integration, Dockerized container deployment.
- **Tech:** Docker, JSON-RPC, Python, Systems Design
- **GitHub:** [nghn0/mcpserver](https://github.com/nghn0/mcpserver)

#### 9. SolarCycle Analysis
- **Type:** AI & Data Science
- **Description:** Developed an LSTM-based time series forecasting model to predict sunspot activity by designing optimized preprocessing pipelines and feature scaling strategies.
- **Features:** LSTM-based time series forecasting, Data preprocessing and normalization, Trend analysis and data visualization.
- **Tech:** LSTM, Python, Pandas, NumPy, Data Visualization
- **GitHub:** [nghn0/SolarCycle-analysis_and_prediction](https://github.com/nghn0/SolarCycle-analysis_and_prediction)

#### 10. Sky View
- **Type:** Web Application
- **Description:** A functional weather tracking application that consumes live weather API data and stores user preferences and historical data in a local SQLite database.
- **Features:** Live API data consumption, User preference storage, Responsive web interface.
- **Tech:** JavaScript, API, SQLite, HTML/CSS
- **GitHub:** [nghn0/Sky_View](https://github.com/nghn0/Sky_View)

---

## 5. Case Study Pages

Each of the 10 projects has a dedicated case study page at `/projects/[slug]` containing:

- **Back navigation** to `/projects`
- **Type badges** (e.g., "AI + Full-Stack", "Computer Vision + AI")
- **Full project title** with thematic gradient styling
- **Detailed description** explaining the problem, solution, and approach
- **GitHub repository link**
- **Content sections** specific to each project, such as:
  - Architecture breakdowns
  - Tech stack details
  - Feature highlights
  - Performance metrics / accuracy results
  - Key architectural decisions

Existing case study pages:
- `/projects/loomera` — MobileNetV2 architecture, Grad-CAM explainability, dataset pipeline
- `/projects/emojify` — Three model architectures (Baseline CNN, SE-CNN, CNN+ViT) with ~5M/6.2M/9M parameters
- `/projects/ai-resume-builder`
- `/projects/digital-contract-platform`
- `/projects/sentient-npc`
- `/projects/qr-detection`
- `/projects/smart-lock`
- `/projects/mcp-server`
- `/projects/solarcycle-analysis`
- `/projects/sky-view`

---

## 6. Chat Assistant

A built-in AI assistant accessible via a floating button. **This runs locally (no external API)** — it uses keyword matching to answer questions about Nithish. It handles queries about:

- **Projects** — lists key projects with descriptions
- **Experience** — internship details at Dhee Center and Janmamithra Trust
- **Skills & Tech** — languages (Python, JS, Java, C++), AI/ML (TensorFlow, Keras, OpenCV, PyTorch, scikit-learn), architectures (CNN, LSTM, ViT, Grad-CAM), web (React, Next.js, Flask, Node.js, Tailwind)
- **Education** — B.Tech (Honors) CSE with AI & ML major at RV University, Bengaluru. CGPA: 8.74
- **Contact** — email nithi9905@gmail.com, LinkedIn, GitHub
- **Greetings** — responds with introduction
- **Identity** — explains it is a simulated local assistant

Quick prompts available: "Show my projects", "Explain your AI work", "How can I contact you?"

---

## 7. Data Source

All project data is centralized in `src/data/projects.ts` as a typed `Project[]` array. Each entry contains:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | URL slug |
| `title` | string | Project name |
| `type` | string | Category label |
| `shortDesc` | string | One-line summary |
| `description` | string | Full detail |
| `features` | string[] | Bullet-point features |
| `tech` | string[] | Technology tags |
| `github` | string | Repository URL |
| `color` | "neon-cyan" \| "neon-purple" \| "accent-pink" | Theme color assignment |
| `pageUrl` | string (optional) | Link to case study page |
| `liveUrl` | string (optional) | Link to live deployment |

---

## 8. Education

- **Degree:** B.Tech (Honors) in Computer Science and Engineering
- **Major:** Artificial Intelligence & Machine Learning
- **University:** RV University, Bengaluru
- **CGPA:** 8.74
