# Architecture

MaintenX AI is organized as a lightweight full-stack predictive maintenance system with a Python backend and a Next.js frontend.

## High-Level Flow

1. Raw machine telemetry is stored in `data/raw`.
2. Preprocessing creates `X_train`, `X_test`, `y_train`, and `y_test` in `data/processed`.
3. Feature engineering adds derived features such as temperature delta, power proxy, and wear stress proxy.
4. Models are trained and saved to `models/`.
5. FastAPI loads the trained XGBoost artifact for inference.
6. The frontend sends telemetry to `/predict` and renders prediction plus assistant guidance.

## Backend Modules

- `api/`
  FastAPI app wiring, routes, and request schemas.
- `assistant/`
  Human-readable maintenance explanation generation.
- `data/`
  Dataset loading and preprocessing utilities.
- `evaluation/`
  Shared metrics and reporting helpers.
- `explainability/`
  SHAP report generation.
- `features/`
  Feature engineering and XGBoost-safe column normalization.
- `models/`
  Training and prediction logic.
- `utils/`
  Settings and logger helpers.

## Artifacts

- `models/xgboost.pkl`
- `models/random_forest.pkl`
- `reports/metrics.json`
- `reports/figures/shap_summary.png`
- `reports/figures/shap_feature_importance.png`

## Local Runtime

- Backend: FastAPI on port `8000`
- Frontend: Next.js on port `3000`
- CORS enabled for local development origins
