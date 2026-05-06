# API Reference

Base URL for local development:

```text
http://127.0.0.1:8000
```

## Endpoints

### `GET /`

Health-style landing response.

Example response:

```json
{
  "message": "MaintenX AI API is running"
}
```

### `GET /health`

Service readiness check.

Example response:

```json
{
  "status": "healthy"
}
```

### `POST /predict`

Runs machine failure inference and returns both prediction metrics and assistant guidance.

Request body:

```json
{
  "Type": 1,
  "Air_temperature_K": 298.1,
  "Process_temperature_K": 308.6,
  "Rotational_speed_rpm": 1551,
  "Torque_Nm": 42.8,
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
    "failure_prediction": 0,
    "failure_probability": 0.0001,
    "risk_percentage": 0.01,
    "risk_level": "Low Risk"
  },
  "assistant": {
    "ai_explanation": "The machine is classified as Low Risk...",
    "maintenance_recommendation": "Continue normal monitoring..."
  }
}
```

## Interactive Docs

FastAPI generates the following local documentation routes:

- `/docs`
- `/redoc`
