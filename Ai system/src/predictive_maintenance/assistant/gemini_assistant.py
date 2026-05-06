import os
import json
from pathlib import Path
import sys
import time

PROJECT_ROOT = Path(__file__).resolve().parents[3]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from dotenv import load_dotenv
from google import genai

from src.predictive_maintenance.utils.logger import get_logger

load_dotenv(PROJECT_ROOT / ".env")

logger = get_logger(__name__)
GEMINI_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash"]
MAX_RETRIES = 3
BASE_RETRY_DELAY_SECONDS = 2


def get_gemini_client():
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key or api_key == "your_real_api_key_here":
        return None

    return genai.Client(api_key=api_key)


def build_prompt(prediction_result: dict, machine_data: dict) -> str:
    return f"""
You are an AI maintenance assistant.

Explain the machine failure risk in simple professional language.

Prediction Result:
{json.dumps(prediction_result, indent=2)}

Machine Data:
{json.dumps(machine_data, indent=2)}

Return ONLY valid JSON with this format:
{{
  "ai_explanation": "...",
  "maintenance_recommendation": "..."
}}
"""


def parse_gemini_response(text: str) -> dict:
    cleaned_text = text.strip()
    cleaned_text = cleaned_text.replace("```json", "").replace("```", "").strip()
    return json.loads(cleaned_text)


def generate_busy_fallback() -> dict:
    return {
        "ai_explanation": (
            "The prediction service completed successfully, but the Gemini explanation "
            "service is temporarily busy."
        ),
        "maintenance_recommendation": (
            "Use the predicted risk level for now and retry in a few moments for an AI-generated explanation."
        ),
    }


def generate_gemini_explanation(prediction_result: dict, machine_data: dict) -> dict:
    client = get_gemini_client()

    if client is None:
        return {
            "ai_explanation": "Gemini explanation is unavailable because GEMINI_API_KEY is not set.",
            "maintenance_recommendation": "Add a valid GEMINI_API_KEY to your environment or .env file, then restart the API server.",
        }

    prompt = build_prompt(prediction_result, machine_data)
    last_error = None

    for model_name in GEMINI_MODELS:
        for attempt in range(1, MAX_RETRIES + 1):
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                )
                return parse_gemini_response(response.text)
            except Exception as error:
                last_error = error
                logger.warning(
                    "Gemini request failed for model=%s attempt=%s/%s: %s",
                    model_name,
                    attempt,
                    MAX_RETRIES,
                    error,
                )

                error_text = str(error).upper()
                is_retryable = any(
                    marker in error_text
                    for marker in ("503", "UNAVAILABLE", "RESOURCE_EXHAUSTED", "429", "TIMEOUT")
                )

                if attempt < MAX_RETRIES and is_retryable:
                    delay = BASE_RETRY_DELAY_SECONDS * attempt
                    time.sleep(delay)
                    continue

                if not is_retryable:
                    break

    logger.error("Gemini explanation failed after retries: %s", last_error)
    return generate_busy_fallback()


if __name__ == "__main__":
    sample_prediction = {
        "failure_prediction": 1,
        "failure_probability": 0.9999,
        "risk_percentage": 99.99,
        "risk_level": "High Risk",
    }

    sample_machine_data = {
        "Type": 1,
        "Air temperature [K]": 303.5,
        "Process temperature [K]": 312.8,
        "Rotational speed [rpm]": 1200,
        "Torque [Nm]": 65.0,
        "Tool wear [min]": 220,
        "TWF": 1,
        "HDF": 1,
        "PWF": 0,
        "OSF": 1,
        "RNF": 0,
    }

    print(json.dumps(generate_gemini_explanation(sample_prediction, sample_machine_data), indent=2))
