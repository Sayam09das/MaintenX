from pathlib import Path
import argparse
import json
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.predictive_maintenance.assistant.llm_explainer import generate_risk_explanation
from src.predictive_maintenance.models.predict import predict_failure

DEFAULT_INPUT = {
    "Type": 1,
    "Air temperature [K]": 298.1,
    "Process temperature [K]": 308.6,
    "Rotational speed [rpm]": 1551,
    "Torque [Nm]": 42.8,
    "Tool wear [min]": 0,
    "TWF": 0,
    "HDF": 0,
    "PWF": 0,
    "OSF": 0,
    "RNF": 0,
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run a single MaintenX failure prediction."
    )
    parser.add_argument(
        "--input-json",
        help="Optional JSON string containing model input fields.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    input_data = json.loads(args.input_json) if args.input_json else DEFAULT_INPUT

    prediction = predict_failure(input_data)
    explanation = generate_risk_explanation(prediction, input_data)

    print(json.dumps({
        "success": True,
        "prediction": prediction,
        "assistant": explanation,
    }, indent=2))


if __name__ == "__main__":
    main()
