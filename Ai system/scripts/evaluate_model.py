from pathlib import Path
import argparse
import sys

import joblib

PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.predictive_maintenance.data.loader import load_processed_split
from src.predictive_maintenance.evaluation.metrics import print_classification_summary
from src.predictive_maintenance.features.feature_engineering import (
    engineer_features,
    sanitize_feature_names,
)

MODEL_PATHS = {
    "xgboost": Path("models/xgboost.pkl"),
    "random_forest": Path("models/random_forest.pkl"),
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Evaluate a trained MaintenX model on the processed test split."
    )
    parser.add_argument(
        "--model",
        choices=["xgboost", "random_forest"],
        default="xgboost",
        help="Select which trained model to evaluate.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    x_train, x_test, y_train, y_test = load_processed_split()
    del x_train, y_train

    x_test = engineer_features(x_test)
    if args.model == "xgboost":
        x_test = sanitize_feature_names(x_test)

    model = joblib.load(MODEL_PATHS[args.model])
    y_pred = model.predict(x_test)
    print_classification_summary(args.model.replace("_", " ").title(), y_test, y_pred)


if __name__ == "__main__":
    main()
