AI Resume Builder
AI Stack MongoDB Puppeteer

A robust full-stack web application designed to streamline the job application process. By leveraging the Together AI API, the platform generates professional, ATS-friendly resumes from minimal user input. It features a complete user authentication system, dynamic template selection, and high-fidelity PDF exporting using Puppeteer.

Features
User authentication (sign up, login)
AI-powered resume generation (via Together API)
Multiple resume templates
Save and manage resume templates
Download resumes as PDF
Responsive and modern UI
Project Structure
.vscode/
backend/
  components/
  config/
  controllers/
  models/
  pdfs/
  public/
  routes/
  services/
  views/
  .env
  package.json
  server.js
Getting Started
Prerequisites
Node.js (v18+ recommended)
MongoDB instance (local or remote)
Setup
Clone the repository

git clone https://github.com/yourusername/ai-resume-builder.git
cd ai-resume-builder/backend
Install dependencies

npm install
Configure environment variables

Edit backend/.env with your MongoDB URI and Together API key:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
TOGETHER_API_KEY=your_together_api_key
Start the server

npm run dev
The backend runs at http://localhost:5000.

Usage
Visit http://localhost:5000 in your browser.
Sign up or log in.
Enter your resume details and select a template.
Generate, edit, save, and download your resume.
Technologies Used
Node.js, Express.js
MongoDB, Mongoose
EJS templating
Together API (for AI resume generation)
Puppeteer (for PDF generation)
Axios, bcryptjs, jsonwebtoken
Folder Overview
components/ – React components (if using React)
config/ – Database configuration
controllers/ – Express route controllers
models/ – Mongoose models (User, Template)
public/ – Static assets (CSS, images)
routes/ – Express routes (authRoutes)
services/ – Service modules (authService)
views/ – EJS templates (home.ejs, index.ejs, etc.)
API Endpoints
POST /api/auth/register – Register user
POST /api/auth/login – Login user
POST /generate-resume – Generate resume HTML via AI
POST /save-as-template – Save resume template
POST /download-pdf – Download resume as PDF
GET /get-templates?username=... – Get saved templates
DELETE /delete-template/:id – Delete a template
Credits
Together API
jsPDF
Font Awesome
Authors
Noothan K T - BTech(Hons.) CSE, Cloud & Full Stack Major

Parjna - BTech(Hons.) CSE, Cloud & Full Stack Major

N Sanjana - BTech(Hons.) CSE, Cloud & Full Stack Major

Nithish Gowda - BTech(Hons.) CSE, AI & ML Major

About
AI resume builder with ATS templates and PDF

Topics
nodejs mongodb authentication expressjs artificial-intelligence jwt-authentication resume-builder puppeteer
Resources
 Readme
 Activity
Stars
 0 stars
Watchers
 0 watching
Forks
 0 forks
Releases
No releases published
Create a new release
Packages
No packages published
Publish your first package
Contributors
No contributors
Languages
EJS
55.5%
 
JavaScript
21.0%
 
HTML
19.0%
 
CSS
3.7%
 
Dockerfile
0.8%
Suggested workflows
Based on your tech stack
Jekyll using Docker image logo
Jekyll using Docker image
Package a Jekyll site using the jekyll/builder Docker image.
Deno logo
Deno
Test your Deno project
Webpack logo
Webpack
Build a NodeJS project with npm and webpack.
More workflows
Footer
© 2026 GitHub, Inc.
Footer navigation
Terms
Privacy

https://github.com/nghn0/AI-Powered-Resume-Builder#ai-resume-builder










Sentient_NPC
Lightweight Offline Voice-Interactive NPC Dialogue Framework
AI Transformer Latency Offline

*A research-oriented, fully offline conversational AI system for immersive games*
Project Motivation
Modern games still rely on static dialogue trees or cloud-based AI services for NPC interaction.
This project demonstrates that domain-trained, lightweight Transformer models can enable real-time, voice-driven NPC conversations entirely offline, achieving low latency, strong semantic coherence, and lore consistency.

Sentient_NPC bridges AI research and game engineering, making it relevant for:

Applied Machine Learning / Natural Language Processing roles
Game AI and simulation research
Edge AI and on-device inference
Speech and language systems
Key Contributions
Designed a fully offline STT → NLP → TTS pipeline
Built a custom Transformer dialogue model (~2.6M parameters)
Trained on 7,565 Skyrim-style NPC–Player dialogue pairs
Achieved BERTScore-F1 ~ 0.90 with sub-300 ms inference (excluding TTS playback)
Released the full training notebook (training.ipynb) for reproducibility
System Architecture
Player Speech
     ↓
Offline Speech-to-Text (Vosk)
     ↓
Transformer-based Dialogue Model
     ↓
Offline Text-to-Speech (Silero)
     ↓
Spoken NPC Response
The entire pipeline runs without internet access.

Model Overview
Architecture: Encoder–Decoder Transformer
Attention: Multi-head self-attention + cross-attention
Training: Teacher forcing with masked loss
Optimizer: AdamW + warmup cosine decay
Precision: Mixed precision supported
Inference: Greedy decoding + Top-k sampling
Model Size: ~30 MB
Chatbot Latency: ~245 ms

Experimental Results
Quantitative Metrics
Metric	Score
BLEU	0.178
ROUGE-L	0.539
METEOR	0.424
BERTScore-F1	0.904
The compact domain-trained Transformer outperforms fine-tuned GPT-Neo (125M) on all metrics.

Key Insight: For real-time, offline NPC dialogue, a compact domain-trained Transformer can outperform large general-purpose language models in task relevance, latency, and deployability.

Explainable AI (XAI)
This project includes:

Token-level probability inspection
Attention heatmap visualization
Decoder confidence analysis
These tools help interpret why the model generates a response — useful for research and responsible AI.

Training & Reproducibility
Training Notebook
training.ipynb contains:

Dataset preprocessing
Vocabulary construction
Transformer model definition
Training loop + callbacks
Metric computation (BLEU, ROUGE, METEOR, BERTScore)
XAI experiments
Quick Start (Colab)
pip install transformers datasets sacrebleu bert-score tensorflow
Open training.ipynb and run the cells sequentially.

Repository Structure
Sentient_NPC/
│
├── training.ipynb        # Full research & training pipeline
├── models/               # Saved model checkpoints
├── tokenizers/           # Serialized vocabularies
├── results/              # Plots & figures from report
├── stt/                  # Speech-to-Text (Vosk)
├── tts/                  # Text-to-Speech (Silero)
├── main.py               # End-to-end inference
├── requirements.txt
└── README.md
Applications
Voice-driven NPCs in role-playing games
Offline conversational agents
Edge-device AI assistants
Game AI research and prototyping
Speech + NLP academic research
Limitations
Single-turn dialogue (no memory yet)
Domain-specific (Skyrim-style)
TTS playback dominates latency
Future Work
Multi-turn conversational memory
NPC personality and emotion control
Unity / Unreal Engine integration
Reinforcement learning for adaptive dialogue
Model compression for mobile and virtual reality
Multi-language NPC support
Authors
Mohan Chandra S S - Btech(Hons.) CSE, AI & ML Major
Mohith R - Btech(Hons.) CSE, AI & ML Major
Nithish Gowda H N - Btech(Hons.) CSE, AI & ML Major
https://github.com/nghn0/Sentient-NPC







Emojify: Real-Time Facial Emotion Detection and Emoji Reactions
AI Architectures TensorFlow OpenCV

A deep learning project that enables real-time facial emotion recognition and responds with matching emoji reactions. Built using CNNs, attention mechanisms (SE blocks), and Vision Transformers (ViTs), the project demonstrates the strengths of modern AI for human-computer interaction through facial expressions.

Abstract
Facial emotion recognition is critical in applications like surveillance, healthcare, driver safety, and entertainment. This project implements and compares three architectures:

A baseline CNN
An SE-augmented attention CNN
A hybrid CNN+Vision Transformer (ViT)
These models were trained and evaluated on the FER2013 and a subset of AffectNet datasets using techniques like focal loss, data augmentation, and class weighting. Real-time inference is achieved using OpenCV to overlay detected emotions live from webcam input.

Datasets Used
FER2013
35,887 grayscale images (48x48 px)
7 emotions: Angry, Disgust, Fear, Happy, Neutral, Sad, Surprise
Important:
Download the FER2013 dataset from this Kaggle link
Once downloaded, extract and place it inside your working directory like so:

emojify/
┗ data/
   ┣ train/
   ┗ test/
AffectNet (subset)
12,815 RGB images
Same 7 emotions (excluding “contempt”)
Important:
Download the AffectNet dataset (subset) from this Kaggle link
Once downloaded, extract and place it inside your working directory like below and delete the contempt folder from train and test subfolder:

emojify/
┗ affdata/
   ┣ train/
   ┗ test/
All images were resized to 48x48, normalized, and augmented to ensure training efficiency and model generalization.

Download the requirements using the below code
pip install -r requirements.txt

Directory Files
This section outlines the functionality of each Python script in the project and the dataset it is based on.

GUI Scripts (Real-Time Detection)
gui_base_cnn.py
→ Real-time facial emotion detection using the Base CNN model trained on FER2013.

gui_attn_cnn.py
→ Real-time detection using the Attention-enhanced CNN (SE blocks) model trained on FER2013.

gui_cnn_vit.py
→ Real-time detection using the CNN + Vision Transformer hybrid model trained on FER2013.

Training Scripts (FER2013 Dataset)
train_base_cnn.py
→ Trains a Base CNN model on the FER2013 dataset.

train_attn_cnn.py
→ Trains a CNN model with Squeeze-and-Excitation attention on FER2013.

train_cnn_vit.py
→ Trains a CNN + Vision Transformer hybrid model on FER2013.

Training Scripts (AffectNet Dataset)
train2_base_cnn.py
→ Trains a Base CNN model on the AffectNet dataset.

train2_cnn_attn.py
→ Trains a CNN model with attention layers (multi-head attention) on AffectNet.

train2_cnn_vit.py
→ Trains a CNN + Vision Transformer hybrid model on AffectNet.

Model Architectures
1. Baseline CNN
3 convolutional layers + max pooling
Dense layer (1024 units) + Softmax
~5M parameters
2. Attention CNN (SE-CNN)
Adds Squeeze-and-Excitation (SE) blocks
Emphasizes important facial features
~6.2M parameters
3. CNN + Vision Transformer (ViT)
CNN extracts local features
Transformer captures global context
~9M parameters
Training Details
Optimizer: Adam (lr=0.0001, decay=1e-6)
Epochs: 75
Batch Size: 64
Class weights: Based on inverse class frequencies
Loss Function: Focal loss (to handle class imbalance)
Real-Time Deployment
Face Detection: OpenCV Haar Cascade / DNN

Inference Pipeline:

Capture webcam frame
Detect face
Preprocess (resize to 48x48 grayscale)
Predict emotion
Overlay corresponding emoji on the frame
Performance:

Baseline CNN and SE-CNN run smoothly in real-time.
CNN+ViT performs well but with slight lag.
Results Summary
Dataset	Model	Accuracy	Validation Accuracy
FER2013	Base CNN	52.66%	58.87%
FER2013	Attention CNN	51.35%	57.97%
FER2013	CNN+ViT	52.41%	55.60%
AffectNet	Base CNN	44.99%	48.29%
AffectNet	Attention CNN	34.67%	39.83%
AffectNet	CNN+ViT	40.22%	38.85%
Conclusion
The Baseline CNN provided the best trade-off between accuracy and efficiency for real-time deployment.
The SE-CNN added interpretability by focusing on key facial regions.
The CNN+ViT hybrid showed robustness but was computationally more intensive.
Future Work
Explore lightweight models like MobileNet and EfficientNet for edge deployment.
Implement multimodal emotion recognition combining facial expressions with voice or body language.
Expand dataset diversity to improve cross-population generalization.
Authors
Nithish Gowda H N - Btech(Hons.) CSE, AI & ML Major
Prajna - Btech(Hons.) CSE, Cloud & Full Stack Major
Pratham Rajesh Vernekar - Btech(Hons.) CSE, Cloud & Full Stack Major
Nandan Kumar - Btech(Hons.) CSE, Cloud & Full Stack Major)
Emotion Recognition Demo
Emotion Recognition Result

Real-time inference showing the model identifying facial expressions

https://github.com/nghn0/Emojify









Loomera: AI-Powered Silk Classification & E-Commerce
AI Flask MobileNetV2 SQLite

Loomera is a full-stack e-commerce solution that bridges traditional textile expertise with modern AI. It features a dual-output Deep Learning model capable of classifying silk types and textures from images, integrated into a seamless Flask web application.

Key Features
Dual-Output AI Classification: Predicts both Silk Type (e.g., Mysore, Kancheepuram) and Fabric Texture (e.g., Smooth, Crisp) simultaneously.
Explainable AI (XAI): Implements Grad-CAM heatmaps to visualize exactly which fabric patterns influenced the model's decision.
Smart Recommendations: An integrated engine suggests similar products from the SQLite database based on AI predictions.
Full-Stack Integration: A complete e-commerce UI for browsing, viewing details, and AI-driven fabric estimation.
AI Model Architecture
The core engine utilizes Transfer Learning via MobileNetV2 (pretrained on ImageNet) with custom-dense heads for multi-label classification.

Input: 224×224 Fabric Images
Backbone: MobileNetV2 (Feature Extractor)
Heads: Two separate output layers (Softmax for Type, Softmax for Texture)
Interpretability: Grad-CAM overlays for model transparency
Tech Stack
AI/ML: Python, TensorFlow, Keras, OpenCV, NumPy, tf-keras-vis (Grad-CAM)
Backend: Flask, SQLite, SQLAlchemy
Frontend: HTML5, CSS3, Bootstrap
Dataset Download & Setup
This project utilizes a custom silk dataset specifically curated for classification and texture analysis.

🔗 Kaggle Dataset: Loomera - Silk Saree Images
Required Folder Structure
After downloading and extracting the dataset ZIP, ensure your project directory is structured exactly as shown below.

Warning

Do not rename the dataset folders. The automation scripts (main.py and train.py) look specifically for these directory names to load images and labels.

project-folder/
│── Loom_era_training_dataset/   # Contains training subfolders
│── Loom_era_testing_dataset/    # Contains testing images

Project Structure
project-folder/
│── Loom_era_training_dataset/   # Training images (grouped by category)
│── Loom_era_testing_dataset/    # Test images for validation
│── model/                       # Saved .h5 models and .pkl encoders
│── app.py                       # Main Flask Application
│── train.py                     # Model training script
│── predictor.py                 # Batch prediction script
│── explainable.py               # Grad-CAM visualization logic
│── database.py                  # SQLite DB creation & seeding
│── requirements.txt             # Dependency list
Getting Started
1. Environment Setup
pip install -r requirements.txt
2. Data Preparation & Training
First, generate the labels and train the model:

python main.py      # Generate dataset_labels.csv
python train.py     # Train the multi-output model
3. Database & Web Launch
Initialize the product database and start the server:

python database.py  # Create saree.db
python app.py       # Start Flask server
Visit: http://127.0.0.1:5000/

Modules Overview
File	Purpose
main.py	Scans dataset folders and generates CSV mapping.
train.py	Performs Transfer Learning and saves the top-performing models.
predictor.py	Runs batch predictions on the testing dataset.
explainable.py	Generates Grad-CAM heatmaps for model interpretability.
database.py	Creates and seeds the SQLite database (saree.db).
app.py	Routes the e-commerce frontend and AI estimation logic.
Final Training Accuracy
Silk Type: 92.5%
Texture: 91.4%
Author
Nithish Gowda H N
B.Tech (Hons.) CSE – AI & ML Major

N Sanjana
B.Tech (Hons.) CSE – Cloud & Full Stack Major

Soundarya S
B.Tech (Hons.) CSE – AI & ML Major

Varun S S
B.Tech (Hons.) CSE – AI & ML Major

Screenshots of Working Application
Below are screenshots demonstrating the core functionality of the Loomera platform.

User Interface
Homepage Screenshot Upload Page AI Prediction Screenshot

Left: Homepage | Right: AI Prediction Interface

Silk Section Screenshot Product Section Screenshot

Left: Silk Information | Right: Product Catalog

AI Explainability (GradCam)
These heatmaps visualize which pixels influenced the model's classification decisions.

GradCam Heatmap for silk type GradCam Heatmap for texture type

GradCam: Silk Type Identification vs. Texture Analysis

About
Loomera is an AI-powered silk classification and shopping web app.

Topics
flask machine-learning ecommerce computer-vision deep-learning flask-sqlalchemy mobilenetv2 tensorflow-keras
Resources
 Readme
License
 MIT license
 Activity
Stars
 0 stars
Watchers
 0 watching
Forks
 0 forks
Releases
No releases published
Create a new release
Packages
No packages published
Publish your first package
Contributors
1
@nghn0
nghn0 Nithish Gowda
Languages
Python
59.7%
 
HTML
40.3%
Suggested workflows
Based on your tech stack
Python package logo
Python package
Create and test a Python package on multiple Python versions.
Pylint logo
Pylint
Lint a Python application with pylint.
Python application logo
Python application
Create and test a Python application.
More workflows
Footer
© 2026 GitHub, Inc.

https://github.com/nghn0/AI-Based-Silk-Fabric-Type-Texture-Classification-E-Commerce-Website








QR Code Detection with YOLOv8
CV Model Ultralytics Label Studio

This repository contains the complete source code for training and inference of a YOLOv8 model to detect QR codes in images.

The project prepares a dataset and splits the dataset, trains YOLOv8, and runs inference on test images, outputting bounding boxes in both annotated images and a JSON file.

Working steps/Workflow of this project
Do the necessary environment setup
create labels for training images using Label Studio
run train.py
run infer.py
📂 Project Structure
├── labels/
│   ├── img001.txt
│   ├── img002.txt
│   ├── ...
│   └── all YOLO-annotated txt files for the train_images in QR_Dataset/
│
├── QR_Dataset/
│   ├── train_images/        # Training images
│   ├── test_images/         # Test images for inference
│   ├── labels/              # YOLO format label files (.txt) with split of 80% training and 20% validation. Generated by running train.py
│   │   ├── train/
│   │   └── val/
│   ├── images/              #split of 80% training and 20% validation from the train_images in QR_Dataset. Generated by running train.py
│   │   ├── train/
│   │   └── val/
│   └── data.yaml            # Auto-generated by running train.py
│
├── src/
│   └── model/               # YOLO training outputs (weights, logs)
│
├── outputs/
│   ├── image_output/        # Annotated inference images
│   ├── submission_detection_1.json       # Final detection results
│   └── submission_decoding_2.json       # Final detection,decoding and classification results
│
├── train.py                 # Training script
├── infer.py                 # Inference script
├── requirements.txt
└── README.md                # Project documentation

⚙️ Environment Setup
1️⃣ Install requirements.txt
pip install -r requirements.txt
2️⃣ Install dependencies
pip install ultralytics
Manual annotation of training images in QR_Dataset
1. Install Label Studio
Open a terminal and run:

pip install label-studio
2. Start Label Studio
Launch the tool with:

label-studio start
3. Upload Images
After Label Studio opens in your browser, create a new project.
Upload all images from your dataset.
4. Create Custom Labels
Add a custom label (e.g., "QR Code") for annotating bounding boxes.
5. Annotate Images
Open each image in the project.
Draw bounding boxes around all QR codes present in the image.
Save each annotation.
6. Export Annotations in YOLO Format
After completing all annotations, export them in YOLO format (.txt files).
Each image should have a corresponding .txt annotation file.
Important

The .txt file name must match the image file name. Example

Image: train_images/img001.jpg
Annotation: labels/img001.txt
Note

Only a few images are included in labels and QR_Dataset folder to show the folder structure. During the execution of train.py on Original QR_Dataset you will get the folder structure specified earlier

🚀 Training
Run the training script to prepare the dataset and train YOLOv8:

python train.py
This will:

Split your dataset into train/val
Generate data.yaml
Train YOLOv8 for 50 epochs
Save the best model in src/model/qr_yolo_model_aug/weights/best.pt
Original structure of dataset before running train.py
├── QR_Dataset/
   ├── train_images/        # Training images
   ├── test_images/         # Test images for inference
Structure of dataset after running train.py
├── QR_Dataset/
   ├── train_images/        # Training images
   ├── test_images/         # Test images for inference
   ├── labels/              # YOLO format label files (.txt) with split of 80% training and 20% validation. Generated by running train.py
   │   ├── train/
   │   └── val/
   ├── images/              #split of 80% training and 20% validation from the train_images in QR_Dataset. Generated by running train.py
   │   ├── train/
   │   └── val/
   └── data.yaml            # Auto-generated by running train.py
🔎 Inference
Run inference on a folder of test images:

python infer.py
Note

In the infer.py script, update the line

IMAGES_FOLDER = "QR_Dataset/test_images"
to your own custom folder path. This tells the code where to look for images, and the output (annotated images and JSON) will be generated based on the images inside that folder.

Note

In the infer.py script, make sure this line

MODEL_PATH = "src/model/qr_yolo_model_aug/weights/best.pt"
properly points to weight best.pt generated by the model in src/model by default its currently pointing to the model, but in case the model is trained more than once update it accordingly

This will:

Load your trained YOLOv8 model
Run inference on all .jpg / .png images in the input folder
Save annotated images in outputs/image_output/
Save detection results in outputs/submission_detection_1.json
Save decoding+classification results in outputs/submission_decoding_2.json
Example Detection JSON output:

[
  {
    "image_id": "image_001",
    "qrs": [
      {"bbox": [34, 45, 120, 200]}
    ]
  },
  {
    "image_id": "image_002",
    "qrs": []
  }
]
Example Decoding JSON output:

[
  {
    "image_id": "image_001",
    "qrs": [
      {
         "bbox": [34, 45, 120, 200],
         "value": "5a0SBZ0D",
         "type": "serial"
      }
    ]
  },
  {
    "image_id": "image_002",
    "qrs": [
      {
         "bbox": [869, 616, 990, 730],
         "value": "",
         "type": "undecoded"
      }
   ]
  }
]
Author
Nithish Gowda - BTech(Hons.) CSE, AI & ML Major
https://github.com/nghn0/qr_code_detection










Smart Lock System using RFID & NodeMCU (ESP8266)
Hardware Sensor Backend Connectivity Status

This project implements a Smart Door Lock System using RFID (MFRC522) and NodeMCU ESP8266, which authenticates users by scanning RFID cards and then logs the data to a remote PHP server over WiFi. If the card is authorized, it unlocks the door for a few seconds and logs the access online with a UID and user name.

✅ Features
RFID-based authentication using MFRC522
Door unlocking via relay/servo motor
Real-time data logging to a PHP web server
Serial monitor output for debugging
Modular codebase with test files for WiFi and RFID
Uses HTTP GET to send UID and username
🔧 Hardware Required
Component	Quantity
NodeMCU ESP8266	1
MFRC522 RFID Module	1
RFID Tags/Cards	1+
Relay Module / Servo	1
Breadboard & Wires	As needed
Power Supply (5V)	1
Solenoid lock	1
LCD Display	1
💻 Software Requirements
Arduino IDE
ESP8266 Board Package (via Board Manager)
PHP-enabled hosting (e.g., 000webhost)
📦 Library Installation
Go to Arduino IDE > Tools > Manage Libraries and install the following:

ESP8266WiFi
ESP8266HTTPClient
MFRC522
SPI
🗂️ Project Structure
smart-lock-rfid/
├── main_code.ino       → Full implementation
├── wifi_test.ino       → Checks WiFi connectivity
├── rfid_test.ino       → Reads and prints RFID UIDs
└── add_rfid_data.php   → Backend script to log data online (to be hosted)




⚠️ Caution

Make sure to replace the following lines in your code with your actual WiFi credentials:

#define ssid "wifi_name"
#define password "wifi_password"
If you do not update these, your NodeMCU will fail to connect to WiFi, and the system will not work.

✅ Use your mobile hotspot or router SSID and password that your NodeMCU can access.

🌐 Configuring the Server URL
In your code, update the following line with your actual web hosting domain:

String URL = "https://yourwebsitehostingdomain/add_rfid_data.php";
Use a valid and publicly accessible hosting provider such as 000webhost, InfinityFree, or Hostinger.
Make sure the hosting service supports PHP.

You need to upload the following PHP files to your hosting account, specifically inside the public_html or root directory:

add_rfid_data.php: This script handles saving the scanned RFID card UID and the associated user name.
show_rfid_data.php: This script displays the saved RFID data in a tabular format for easy viewing.
After uploading the files, verify the setup by opening a browser and visiting the following test URL:

https://yourwebsitehostingdomain/add_rfid_data.php?carduid=123456&name=Test
If everything is set up correctly, you should see a confirmation message like:

Data Saved Successfully
📌 MySQL Table Structure (for reference)
Run the following SQL query in phpMyAdmin to create the required table in your database:

CREATE TABLE rfid_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carduid VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
This table will store:

id: Unique identifier for each entry (auto-incremented primary key)
carduid: The UID of the scanned RFID card
name: The associated user name
timestamp: The exact date and time when the card was scanned (defaults to current time)
📋 Access Log
After uploading the show_rfid_data.php file to your hosting provider, you can view the recorded RFID access logs in a clean table format.

Access it via:

https://yourwebsitehostingdomain/show_rfid_data.php
Authors
Nithish Gowda - BTech(Hons.) CSE, AI & ML Major Prajna - BTech(Hons.) CSE, Cloud & Full Stack Major

WhatsApp Image 2025-07-09 at 10 34 29 AM

https://github.com/nghn0/RFID_smart_locking_system

















SolarCycle Analysis & Prediction
AI LSTM Time Series Space Weather

Sunspot Cycle Insights + LSTM Time-Series Forecasting

This project performs an end-to-end analysis of solar sunspot cycles and builds an LSTM-based forecasting model to predict future Solar Sunspot Numbers (SSN).
It combines scientific visualization, time-series pattern discovery, and deep learning forecasting to better understand solar activity and its impact on space weather.

⭐ Why This Project Matters
Solar cycles are approximately 11-year cycles where the Sun’s magnetic activity fluctuates, influencing:

Satellite operations
Communication systems
Navigation signals
Power grid stability (space weather impact)
This repository demonstrates both interpretation (analysis) and prediction (modeling) using real historical SSN trends.

🎯 Objectives
Visualize long-term sunspot activity patterns
Compare SSN with correlated solar indicators
Study cyclic behavior, lag patterns, and seasonality
Forecast SSN values using an LSTM neural network
Evaluate forecasting quality using MAE and visualization
📥 Dataset
This project uses historical Sunspot Number data from the Kaggle dataset:

🔗 Sunspots Dataset:
https://www.kaggle.com/datasets/robervalt/sunspots

📊 About the Dataset
The dataset contains:

Monthly sunspot numbers from 1700s to present
Used for studying solar magnetic activity cycles
Ideal for time-series analysis and forecasting
📊 Sunspot Cycle Analysis (Exploratory Insights)
1) Historical Sunspot Cycle (1749–2021)
Sunspot Cycle Over Time

Cyclical pattern repeats roughly every 11 years
A full cycle can range from 9 to 14 years
Each cycle transitions through:
Solar Minimum → Solar Maximum → Solar Minimum
2) Comparing Radio Flux with Sunspot Number
Sunspot vs Radio Flux

Sunspot Number: direct indicator of solar magnetic activity
10.7 cm Radio Flux: indirect measure via radio energy emission
Both rise and fall together, showing a strong correlation.

3) Comparing Polar Field with Sunspot Number
Polar Field vs Sunspot

This plot highlights an inverse relationship and supports the concept of magnetic polarity reversal approximately every 11 years.

4) Seasonality and Lag Analysis
Lag & Seasonality

Lag plots show the series is not random, meaning it contains strong predictive structure.
Key historical behavior includes:

Dip around 1790–1820 → Dalton Minimum
Major peak around 1960, followed by fluctuations
5) Comparing Total Solar Irradiance (TSI) with Sunspot Numbers
TSI vs Sunspot

A positive correlation is observed:

Higher sunspot activity → higher solar irradiance
6) Asymmetry and Long-Term Seasonality
Asymmetry Heatmap

The heatmap suggests:

Short-term ~11-year solar cycle
Long-term ~100-year brightness cycle
🔮 Solar Sunspot Number Forecasting with LSTM
This module uses a Long Short-Term Memory (LSTM) neural network to forecast SSN values from historical time-series data.

Key Steps
MinMax Scaling for stable neural training
Lag Feature Engineering using 16 time steps
3-layer LSTM architecture with 32 units per layer
Callbacks
Learning rate reduction on plateau
Early stopping to reduce overfitting
Evaluation using Mean Absolute Error (MAE)
🧠 Model Summary
Model Type: LSTM (Time-Series Forecasting)
Lag Window: 16 steps
Loss Function: Mean Squared Error (MSE)
Optimizer: Adam
Output: Next-step SSN prediction
📈 Results
Baseline MAE: (update with your value)
LSTM MAE: 13.29 (inverse transformed)
Prediction vs Actual Plot

🗂️ Repository Contents
SolarCycle-analysis_and_prediction/
│
├── solorcycle_analysis.ipynb          # Full solar cycle analysis notebook
├── Lstm_sunspot_predict_model.ipynb   # LSTM forecasting notebook
├── image1.png                         # Historical SSN cycle plot
├── image2.png                         # SSN vs Radio Flux
├── image3.png                         # Polar Field vs SSN
├── image4.png                         # Lag & Seasonality plots
├── image5.png                         # TSI vs SSN
├── image6.png                         # Asymmetry heatmap
├── prediction_plot.png                # LSTM prediction vs actual
└── README.md
⚙️ Requirements
Python 3.x
Libraries:
NumPy
Pandas
Matplotlib
scikit-learn
statsmodels
TensorFlow / Keras
Install dependencies:

pip install numpy pandas matplotlib scikit-learn statsmodels tensorflow
▶️ How to Run
Option 1: Run in Jupyter / Colab
Open solorcycle_analysis.ipynb and run all cells
Open Lstm_sunspot_predict_model.ipynb and run all cells
Option 2: Local Execution
jupyter notebook
🔍 Conclusion
This project shows that sunspot data contains strong cyclic patterns, meaningful relationships with solar indicators, and clear forecasting potential.
By combining analysis + LSTM prediction, it provides a strong foundation for extending solar forecasting using more advanced deep learning and hybrid time-series methods.

🚀 Future Improvements
Experiment with different lag lengths
Try alternative architectures (GRU, ConvLSTM)
Add exogenous features (radio flux, polar field, TSI)
Perform hyperparameter tuning (Optuna / KerasTuner)
Multi-step forecasting (predict multiple months ahead)
👨‍💻 Author
Nithish Gowda H N - BTech(Hons.) CSE, AI & ML Major

Prajna - BTech(Hons.) CSE, Cloud & Full Stack Major

About
Sunspot cycle analysis and SSN forecasting using LSTM.

Topics
machine-learning deep-learning sunspot lstm time-series-analysis time-series-forecasting solar-cycle
Resources
 Readme
 Activity
Stars
 0 stars
Watchers
 0 watching
Forks
 0 forks
Releases
No releases published
Create a new release
Packages
No packages published
Publish your first package
Contributors
2
@nghn0
nghn0 Nithish Gowda
@shettypp
shettypp Prajna shetty
Languages
Jupyter Notebook
100.0%
Footer
© 2026 GitHub, Inc.

https://github.com/nghn0/SolarCycle-analysis_and_prediction












Sky View: Weather Forecast Web App (Flask + WeatherAPI)
Flask Python SQLite WeatherAPI

A simple and interactive Flask-based Weather Forecast Application that allows users to:

Search weather using City Name or Latitude & Longitude
View detailed real-time weather conditions
Save locations to a SQLite database for quick access
Delete saved locations anytime
✨ Features
🌍 Search weather by City Name
📍 Search weather using Latitude & Longitude
💾 Save favorite locations (stored in SQLite)
🗑️ Delete saved locations
📊 Displays temperature, humidity, wind, pressure, visibility, etc.
⚡ Real-time weather data using WeatherAPI
📂 Project Structure
Weather-App/
│
├── weather.py                 # Main Flask application
├── saved_weather.db           # SQLite database (auto-created on first run)
├── requirements.txt           # Python dependencies
│
├── templates/                 # HTML pages
│   ├── index1.html            # Saved locations + overview
│   └── index2.html            # Detailed weather result page
│
└── static/                    # CSS / images (optional)
    └── style.css
⚙️ Installation & Setup
1) Create and Activate Virtual Environment (Recommended)
python3 -m venv venv
source venv/bin/activate
2) Install Requirements
Install all dependencies using:

pip install -r requirements.txt
✅ Required libraries:

Flask
requests
(sqlite3 comes built-in with Python, so no need to install it separately)
🔑 Get WeatherAPI Key
This project uses WeatherAPI for real-time weather data.

🔗 Website: https://www.weatherapi.com/

Create an account and copy your API key from the dashboard.

🛠️ Update API Key in Code
Open weather.py and replace:

key = "your-api-key"
With your actual key:

key = "YOUR_REAL_API_KEY_HERE"
▶️ Run the Application
Start the Flask server:

python weather.py
Then open in browser:

✅ http://127.0.0.1:5000/

🖼️ Results / Output Screenshots
Homepage - Saved Locations Weather Page - Detailed Forecast

🏠 Dashboard & Saved Locations        |        🌤️ Detailed Weather Insights

The homepage manages your persistent locations, while the weather page provides a deep dive into temperature, humidity, and wind metrics.

👨‍💻 Author
Nithish Gowda H N
B.Tech (Hons.) CSE – AI & ML Major

Nandan
B.Tech (Hons.) CSE – Cloud & Full Stack Major

Pratham Rajesh Vernekar
B.Tech (Hons.) CSE – Cloud & Full Stack Major

https://github.com/nghn0/Sky_View









ntelligent Intake and Triage MCP Server
MCP Gemini Docker Multi-Domain

This project builds and containerizes a Model Context Protocol (MCP) server for an Intelligent Intake and Triage system.
It supports dynamic routing, severity scoring, and category classification using configurable rules, with optional integration to LLM providers like Gemini for smarter intake understanding.

The server is designed for multi-industry usage (Healthcare, Finance, E-commerce) by switching configuration folders at runtime using environment variables and Docker volume mounts.

🚀 Getting Started: Building the MCP Server
1) Project Initialization
Create the main project and server directories:

mkdir intake-mcp
cd intake-mcp
mkdir mcp-server
cd mcp-server
2) Configuration Setup
Create the taxonomy, severity, and routing configuration files:

mkdir -p config/healthcare
touch config/healthcare/taxonomy.json
touch config/healthcare/severity.yaml
touch config/healthcare/routing.json
3) Server Files
Create the main Python server file and the requirements list:

touch mcp_server.py
touch requirements.txt
Add these dependencies to requirements.txt:

fastmcp
pyyaml
python-dotenv
httpx
starlette
4) Installation & Execution
Install the required packages and run the server:

pip install -r requirements.txt
python mcp_server.py
✅ Expected Log:

🚀 Starting Intelligent Intake and Triage MCP Server...
5) Health Check
Status: http://0.0.0.0:8000 → ✅ MCP is running
Health: http://0.0.0.0:8000/health → OK
🐳 Containerization with Docker
1) Multi-Industry Configuration Support
We use Docker to package the server and support multiple industries (Healthcare, Finance, E-commerce) via mounted external configurations.

Default Config: config/healthcare/ (Bundled inside the image as a fallback)
External Config: external-config/ (Mounted at runtime for multi-industry support)
2) Default Configuration Structures
A) routing.json
{
  "default_destination": "General_Queue",
  "severity_override": {
    "min_score": 9,
    "destination": "ER_Triage",
    "priority": "HIGH"
  },
  "routes": [
    {
      "category": "emergency",
      "threshold": 9,
      "destination": "ER_Triage"
    },
    {
      "category": "billing",
      "threshold": 2,
      "destination": "Billing_Department"
    }
  ]
}
B) severity.yaml
severity_rules:
  critical:
    score: 10
    keywords:
      - chest pain
      - unconscious
  low:
    score: 2
    keywords:
      - billing
      - refund
C) taxonomy.json
{
  "taxonomy": [
    {
      "id": "emergency",
      "keywords": ["chest pain", "heavy bleeding"]
    },
    {
      "id": "billing",
      "keywords": ["insurance", "refund"]
    }
  ]
}
3) Build and Run Docker
Create a Dockerfile in the mcp-server folder, then build the image:

docker build -t intake-triage-server .
Run using External Healthcare Config:

docker run -p 8000:8000 \
  -v $(pwd)/external-config:/config \
  -e CONFIG_PATH=/config/healthcare \
  intake-triage-server
Switching Industries (e.g., Finance): Simply change the CONFIG_PATH environment variable:

-e CONFIG_PATH=/config/finance
🤖 LLM Provider Integration (Gemini)
1) Client Setup
Create the client directory and files:

mkdir mcp-client
cd mcp-client
touch intake_mcp_client.py
touch requirements.txt
Add these to mcp-client/requirements.txt:

fastmcp
google-genai
httpx
2) Execution
Install Client Requirements:

pip install -r requirements.txt
Set API Key:

export GOOGLE_API_KEY="YOUR_API_KEY_HERE"
Run Client:

python intake_mcp_client.py
📁 Final Project Structure
intake-mcp/
├── mcp-server/
│   ├── config/healthcare/
│   │   ├── taxonomy.json
│   │   ├── severity.yaml
│   │   └── routing.json
│   ├── external-config/
│   │   ├── healthcare/
│   │   └── finance/
│   ├── Dockerfile
│   ├── mcp_server.py
│   └── requirements.txt
└── mcp-client/
    ├── intake_mcp_client.py
    └── requirements.txt
🤖 Intelligent Intake & Triage Demos
The MCP Server dynamically routes and processes data based on the domain. Below are examples of the server handling high-stakes intake in two different sectors.

Healthcare Intake Demo Finance Intake Demo

🏥 Healthcare Intake              |              💰 Finance Intake

The MCP server identifies document types, extracts key entities, and assigns priority levels (Triage) in real-time.

About
AI-powered MCP server for intelligent intake, triage, and routing with multi-industry config

Topics
docker ai mcp gemini fastapi llm
Resources
 Readme
 Activity
Stars
 0 stars
Watchers
 0 watching
Forks
 0 forks
Releases
No releases published
Create a new release
Packages
No packages published
Publish your first package
Contributors
1
@nghn0
nghn0 Nithish Gowda
Languages
Python
94.3%
 
Dockerfile
5.7%
Suggested workflows
Based on your tech stack
Python Package using Anaconda logo
Python Package using Anaconda
Create and test a Python package on multiple Python versions using Anaconda for package management.
Publish Python Package logo
Publish Python Package
Publish a Python Package to PyPI on release.
SLSA Generic generator logo
SLSA Generic generator
Generate SLSA3 provenance for your existing release workflows
More workflows
Footer
© 2026 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
https://github.com/nghn0/mcpserver












