# MaintenX AI

MaintenX AI is a production-deployed predictive maintenance platform that combines machine failure prediction, explainability, and AI-assisted maintenance guidance in a single full-stack workflow.

The platform is designed to help teams assess machine risk earlier, reduce unplanned downtime, and turn model output into practical maintenance decisions through a live web interface.

## Production Status

- Release: `v3.0.0`
- Frontend: `https://mainten-x.vercel.app`
- Backend API: `https://maintenx-s395.onrender.com`
- Deployment State: Stable production release

## Key Capabilities

- Predict machine failure risk from structured operational inputs
- Return failure probability, risk percentage, and risk level in real time
- Generate AI-assisted explanations and maintenance recommendations
- Support explainability-driven decision making with SHAP integration
- Provide a responsive operator-facing dashboard for live usage

## Live Architecture

- Frontend: Next.js on Vercel
- Backend: FastAPI on Render
- Machine Learning Model: XGBoost
- AI Assistant: Google Gemini
- Explainability Layer: SHAP

## Product Overview

MaintenX AI connects a modern frontend experience with a deployed ML inference backend. Users submit machine telemetry through the web dashboard, the backend evaluates failure risk using the trained model, and the assistant layer converts the prediction into readable maintenance guidance.

This flow is built for practical industrial monitoring scenarios where teams need more than a raw score. The platform emphasizes prediction visibility, operator trust, and production deployment readiness.

## Repository Structure

```text
MaintenX/
├── client/                 Frontend application built with Next.js
├── Ai system/              FastAPI backend, ML pipeline, and AI assistant logic
├── README.md               Production project overview
├── Problem Statement       Project problem definition
└── LICENSE                 Project license
```

## Frontend

- Framework: Next.js 16
- UI: React 19, MUI, Framer Motion
- Hosting: Vercel
- Includes production metadata, sitemap, robots, and social preview generation

Frontend source and setup details are documented in [client/README.md](/Users/sayamdas/Documents/Programming/Mern%20Stack/My%20Website/MaintenX/client/README.md).

## Backend

- Framework: FastAPI
- Hosting: Render
- Prediction endpoint: `POST /predict`
- Health endpoint: `GET /health`
- CORS configured for local development and deployed frontend access

## API Example

### Request

```json
{
  "Type": 1,
  "Air_temperature_K": 298,
  "Process_temperature_K": 308,
  "Rotational_speed_rpm": 1500,
  "Torque_Nm": 40,
  "Tool_wear_min": 0,
  "TWF": 0,
  "HDF": 0,
  "PWF": 0,
  "OSF": 0,
  "RNF": 0
}
```

### Response

```json
{
  "success": true,
  "prediction": {
    "failure_prediction": 1,
    "failure_probability": 1,
    "risk_percentage": 100,
    "risk_level": "High Risk"
  },
  "assistant": {
    "ai_explanation": "The machine is classified as High Risk...",
    "maintenance_recommendation": "Immediate maintenance inspection is recommended..."
  }
}
```

## Local Development

### Backend

From `Ai system/`:

```bash
source .venv/bin/activate
uvicorn src.predictive_maintenance.api.main:app --reload
```

### Frontend

From `client/`:

```bash
npm install
npm run dev
```

## Problem Statement

The detailed project motivation and industrial context are documented in [Problem Statement](/Users/sayamdas/Documents/Programming/Mern%20Stack/My%20Website/MaintenX/Problem%20Statement).

## License

This project is licensed under the MIT License. See [LICENSE](/Users/sayamdas/Documents/Programming/Mern%20Stack/My%20Website/MaintenX/LICENSE).
