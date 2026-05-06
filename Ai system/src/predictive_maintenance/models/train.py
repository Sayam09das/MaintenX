from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[3]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

import joblib
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier

from src.predictive_maintenance.data.loader import load_processed_split
from src.predictive_maintenance.evaluation.metrics import print_classification_summary
from src.predictive_maintenance.features.feature_engineering import (
    engineer_features,
    sanitize_feature_names,
)
from src.predictive_maintenance.utils.logger import get_logger

MODEL_DIR = Path("models")
XGBOOST_MODEL_PATH = MODEL_DIR / "xgboost.pkl"
RANDOM_FOREST_MODEL_PATH = MODEL_DIR / "random_forest.pkl"

logger = get_logger(__name__)


def _load_training_data(apply_xgboost_sanitization: bool = False):
    x_train, x_test, y_train, y_test = load_processed_split()

    x_train = engineer_features(x_train)
    x_test = engineer_features(x_test)

    if apply_xgboost_sanitization:
        x_train = sanitize_feature_names(x_train)
        x_test = sanitize_feature_names(x_test)

    return x_train, x_test, y_train, y_test


def train_random_forest_model(
    model_path: Path | str = RANDOM_FOREST_MODEL_PATH,
) -> tuple[RandomForestClassifier, dict[str, float]]:
    logger.info("Loading processed data for Random Forest training")
    x_train, x_test, y_train, y_test = _load_training_data()

    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=12,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42,
        class_weight="balanced",
        n_jobs=-1,
    )

    logger.info("Training Random Forest model")
    model.fit(x_train, y_train)

    y_pred = model.predict(x_test)
    metrics = print_classification_summary("Random Forest", y_test, y_pred)

    output_path = Path(model_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, output_path)
    logger.info("Random Forest model saved at %s", output_path)

    return model, metrics


def train_xgboost_model(
    model_path: Path | str = XGBOOST_MODEL_PATH,
) -> tuple[XGBClassifier, dict[str, float]]:
    logger.info("Loading processed data for XGBoost training")
    x_train, x_test, y_train, y_test = _load_training_data(
        apply_xgboost_sanitization=True
    )

    negative_count = int((y_train == 0).sum())
    positive_count = int((y_train == 1).sum())
    scale_pos_weight = negative_count / positive_count

    logger.info(
        "Calculated class balance for XGBoost: negative=%s positive=%s scale_pos_weight=%.2f",
        negative_count,
        positive_count,
        scale_pos_weight,
    )

    model = XGBClassifier(
        n_estimators=300,
        max_depth=5,
        learning_rate=0.05,
        subsample=0.9,
        colsample_bytree=0.9,
        objective="binary:logistic",
        eval_metric="logloss",
        scale_pos_weight=scale_pos_weight,
        random_state=42,
        n_jobs=-1,
    )

    logger.info("Training XGBoost model")
    model.fit(x_train, y_train)

    y_pred = model.predict(x_test)
    metrics = print_classification_summary("XGBoost", y_test, y_pred)

    output_path = Path(model_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, output_path)
    logger.info("XGBoost model saved at %s", output_path)

    return model, metrics


if __name__ == "__main__":
    train_xgboost_model()
