# MaintenX AI

MaintenX AI is a predictive maintenance system that combines an XGBoost failure prediction model, SHAP-based explainability, a FastAPI backend, and a Next.js frontend for operator-facing risk assessment.

## Highlights

- Predict machine failure probability from live sensor-style inputs.
- Return human-readable maintenance guidance from the AI assistant layer.
- Generate SHAP summary plots for feature attribution.
- Use a clean web dashboard for submitting machine telemetry and reviewing risk.

## Project Structure

```text
MaintenX/
├── Ai system/                         # Python backend, models, reports, docs
│   ├── src/predictive_maintenance/
│   │   ├── api/                       # FastAPI app
│   │   ├── assistant/                 # Risk explanation logic
│   │   ├── explainability/            # SHAP report generation
│   │   └── models/                    # Training and prediction scripts
│   ├── data/                          # Raw, processed, sample datasets
│   ├── models/                        # Trained model artifacts
│   └── reports/figures/               # SHAP outputs
└── client/                            # Next.js frontend
```

## Tech Stack

- Frontend: Next.js 16, React 19, Tailwind CSS 4
- Backend: FastAPI
- ML: XGBoost, scikit-learn, pandas, SHAP
- Model artifacts: `joblib`

## Local Setup

### 1. Start the backend

From [`Ai system`](/Users/sayamdas/Documents/Programming/Mern%20Stack/My%20Website/MaintenX/Ai%20system):

```bash
source .venv/bin/activate
uvicorn src.predictive_maintenance.api.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

### 2. Start the frontend

From [`client`](/Users/sayamdas/Documents/Programming/Mern%20Stack/My%20Website/MaintenX/client):

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

## API

### `POST /predict`

Example request body:

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

Example response:

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

## Model Utilities

Run XGBoost training:

```bash
python src/predictive_maintenance/models/xgboost_model.py
```

Run prediction script:

```bash
python src/predictive_maintenance/models/predict.py
```

Generate SHAP reports:

```bash
python src/predictive_maintenance/explainability/shap_explainer.py
```

## Release

Release notes for the first GitHub release are available in [RELEASE_NOTES_v1.0.0.md](/Users/sayamdas/Documents/Programming/Mern%20Stack/My%20Website/MaintenX/RELEASE_NOTES_v1.0.0.md).
