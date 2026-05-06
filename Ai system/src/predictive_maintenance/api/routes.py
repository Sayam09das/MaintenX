from fastapi import APIRouter
from pydantic import BaseModel

from src.predictive_maintenance.assistant.llm_explainer import generate_risk_explanation
from src.predictive_maintenance.models.predict import predict_failure
from src.predictive_maintenance.utils.logger import get_logger

router = APIRouter()
logger = get_logger(__name__)


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


def build_model_input(data: MachineData) -> dict:
    return {
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


@router.get("/")
def home():
    return {"message": "MaintenX AI API is running"}


@router.get("/health")
def health_check():
    return {"status": "healthy"}


@router.post("/predict")
def predict(data: MachineData):
    input_data = build_model_input(data)

    logger.info("Running prediction for machine type %s", data.Type)

    result = predict_failure(input_data)
    explanation = generate_risk_explanation(result, input_data)

    return {
        "success": True,
        "prediction": result,
        "assistant": explanation,
    }
