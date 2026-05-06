from pathlib import Path
import argparse
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.predictive_maintenance.models.train import (
    train_random_forest_model,
    train_xgboost_model,
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Train MaintenX machine failure prediction models."
    )
    parser.add_argument(
        "--model",
        choices=["xgboost", "random_forest", "all"],
        default="xgboost",
        help="Select which model to train.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    if args.model in {"xgboost", "all"}:
        train_xgboost_model()

    if args.model in {"random_forest", "all"}:
        train_random_forest_model()


if __name__ == "__main__":
    main()
