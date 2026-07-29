# 🧠 Mental Health Prediction Intelligence (Aura AI)

![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![XGBoost](https://img.shields.io/badge/XGBoost-Machine_Learning-green?style=for-the-badge)
![HTML/CSS/JS](https://img.shields.io/badge/Frontend-Vanilla_JS-E34F26?style=for-the-badge&logo=html5)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)


Deployment Link :- https://mental-health-prediction-intelligence-3.onrender.com/#hero

FastAPi Backedn Link :- https://mental-health-prediction-intelligence-2.onrender.com/docs


A cutting-edge, machine learning-powered web application that analyzes behavioral, academic, and lifestyle metrics to predict the likelihood of depression. Built with a lightning-fast **FastAPI backend (XGBoost)** and a premium, modern **Glassmorphism frontend**.

---

## ✨ Features

    - **Predictive AI Engine**: Utilizes a pre-trained XGBoost pipeline to analyze 12 distinct lifestyle and behavioral features.
    - **RESTful API**: Robust, strictly-typed backend API built with FastAPI and Pydantic.
    - **Premium UI/UX**: A responsive, single-page application (SPA) featuring glassmorphism, fluid CSS animations, and pure CSS circular progress charts.
    - **Instant Diagnostics**: Real-time inference with zero perceived latency.
    - **No-Dependency Frontend**: Built entirely with HTML5, CSS3, and Vanilla JavaScript—no heavy frameworks required.

---

## 💻 Tech Stack

### Backend (Machine Learning & API)
    *   **Python**: Core programming language.
    *   **FastAPI**: High-performance web framework for building APIs.
    *   **XGBoost**: Advanced gradient boosting library for the predictive model.
    *   **Pandas & Joblib**: For data wrangling and model deserialization.
    *   **Pydantic**: For strict request payload validation.

### Frontend (User Interface)
    *   **HTML5 / CSS3**: Semantic structure with modern styling (CSS Variables, Flexbox/Grid, Backdrop Filters).
    *   **Vanilla JavaScript**: DOM manipulation, asynchronous API fetching, and custom data binding.
    *   **FontAwesome & Google Fonts**: For iconography and Poppins typography.

---

## 📸 Application Previews


| <img src=![Output](images/1.png)  alt="Hero Section"> | <img src= ![Output](images/2.png) alt="Dashboard"> | <img src= ![Output](images/3.png) alt="Result Card"> |

---

## 🚀 Installation & Setup

### Prerequisites
* Python 3.8 or higher
* Git

### 1. Clone the Repository

    git clone [https://github.com/akshitgajera1013/Mental-Health-Prediction-Intelligence.git](https://github.com/akshitgajera1013/Mental-Health-Prediction-Intelligence.git)
    cd Mental-Health-Prediction-Intelligence


2. Backend Setup
   
Navigate to the backend directory (or root, depending on your structure) and install dependencies:

    pip install fastapi uvicorn pandas xgboost joblib pydantic
    
Note: Ensure your pre-trained model file (xgboost_mental_health_prediction_pipeline.pkl) is placed in the same directory as your FastAPI script.

    Run the FastAPI server: uvicorn main:app --reload

The API will be available at http://127.0.0.1:8000. You can view the automatic Swagger documentation at http://127.0.0.1:8000/docs.


3. Frontend Setup
Because the frontend uses Vanilla JS, no build step is required.

Open the frontend folder.

Serve the index.html file using any local web server (e.g., VS Code Live Server, or Python's http.server):  python -m http.server 5500

Open http://localhost:5500 in your browser.
