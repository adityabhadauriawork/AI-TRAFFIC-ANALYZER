# 🚦 VisionFlow AI — Intelligent Traffic Analyzer

<p align="center">
  <strong>AI-Powered Traffic Monitoring & Decision Support System</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Flask-Backend-000000?style=for-the-badge&logo=flask&logoColor=white" />
  <img src="https://img.shields.io/badge/YOLOv8-Computer%20Vision-00FFFF?style=for-the-badge" />
  <img src="https://img.shields.io/badge/ByteTrack-Object%20Tracking-7B61FF?style=for-the-badge" />
  <img src="https://img.shields.io/badge/OpenCV-Video%20Processing-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white" />
</p>

---

## 📌 Overview

**VisionFlow AI** is an AI-powered traffic analysis platform that converts ordinary traffic videos into meaningful traffic intelligence.

Instead of manually monitoring CCTV footage, VisionFlow uses **YOLOv8 for vehicle detection** and **ByteTrack for multi-object tracking** to identify, track and count vehicles automatically.

The system analyzes traffic footage and generates:

- Vehicle counts
- Vehicle classification
- Traffic density
- Congestion score
- Traffic flow patterns
- Peak vehicle activity
- Vehicle movement statistics
- Processed AI-annotated video
- AI-generated traffic recommendations
- Interactive analytics dashboard

The long-term goal is to evolve VisionFlow into a complete **Intelligent Transportation System (ITS)** capable of assisting traffic authorities with real-time decision-making.

---

# 🎯 Problem Statement

Traffic monitoring is often dependent on manual observation of CCTV feeds. This approach can be:

- Time-consuming
- Difficult to scale
- Prone to human error
- Inefficient for continuous monitoring
- Difficult to convert into actionable insights

VisionFlow addresses this problem by automatically extracting useful information from traffic footage using computer vision and AI.

---

# 💡 Solution

VisionFlow follows an automated pipeline:

```text
Traffic Video
      ↓
OpenCV Video Processing
      ↓
YOLOv8 Vehicle Detection
      ↓
ByteTrack Object Tracking
      ↓
Vehicle Classification & Counting
      ↓
Traffic Analytics Engine
      ↓
AI Recommendations
      ↓
Interactive React Dashboard
