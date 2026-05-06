# src/predictive_maintenance/api/main.py

from fastapi import FastAPI
from pydantic import BaseModel

from src.predictive_maintenance.assistant.llm_explainer import generate_risk_explanation
from src.predictive_maintenance.models.predict import predict_failure


# -----------------------------
# FastAPI App
# -----------------------------
app = FastAPI(
    title="MaintenX AI",
    description="Predictive Maintenance + AI Assistant API",
    version="1.0.0",
)


# -----------------------------
# Input Schema
# -----------------------------
class MachineData(BaseModel):
    Type: int
    Air_temperature_K: float
    Process_temperature_K: float
    Rotational_speed_rpm: int
    Torque_Nm: float
    Tool_wear_min: int
    TWF: int
    HDF: int
    PWF: int
    OSF: int
    RNF: int


# -----------------------------
# Root Endpoint
# -----------------------------
@app.get("/")
def home():
    return {
        "message": "MaintenX AI API is running"
    }


# -----------------------------
# Health Check Endpoint
# -----------------------------
@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# -----------------------------
# Prediction Endpoint
# -----------------------------
@app.post("/predict")
def predict(data: MachineData):

    input_data = {
        "Type": data.Type,
        "Air temperature [K]": data.Air_temperature_K,
        "Process temperature [K]": data.Process_temperature_K,
        "Rotational speed [rpm]": data.Rotational_speed_rpm,
        "Torque [Nm]": data.Torque_Nm,
        "Tool wear [min]": data.Tool_wear_min,
        "TWF": data.TWF,
        "HDF": data.HDF,
        "PWF": data.PWF,
        "OSF": data.OSF,
        "RNF": data.RNF,
    }

    result = predict_failure(input_data)
    explanation = generate_risk_explanation(result, input_data)

    return {
        "success": True,
        "prediction": result,
        "assistant": explanation
    }
