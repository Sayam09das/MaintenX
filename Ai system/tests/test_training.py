from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

import pandas as pd

from src.predictive_maintenance.models.train import (
    train_random_forest_model,
    train_xgboost_model,
)


class DummyEstimator:
    def __init__(self, **kwargs):
        self.kwargs = kwargs
        self.fitted = False
        self.saved_input_columns = None

    def fit(self, x_train, y_train):
        self.fitted = True
        self.saved_input_columns = list(x_train.columns)
        self.train_rows = len(y_train)
        return self

    def predict(self, x_test):
        return [0] * len(x_test)


def make_processed_split():
    x_train = pd.DataFrame(
        {
            "Type": [0, 1, 2, 0],
            "Air temperature [K]": [298.0, 299.0, 300.0, 301.0],
            "Process temperature [K]": [308.0, 309.0, 310.0, 311.0],
            "Rotational speed [rpm]": [1500, 1490, 1510, 1480],
            "Torque [Nm]": [40.0, 41.0, 39.5, 42.0],
            "Tool wear [min]": [10, 20, 30, 40],
            "TWF": [0, 0, 1, 0],
            "HDF": [0, 1, 0, 0],
            "PWF": [0, 0, 0, 1],
            "OSF": [0, 0, 1, 0],
            "RNF": [0, 0, 0, 1],
        }
    )
    x_test = x_train.copy()
    y_train = pd.Series([0, 1, 0, 1])
    y_test = pd.Series([0, 1, 0, 1])
    return x_train, x_test, y_train, y_test


def test_train_random_forest_model_uses_engineered_features(monkeypatch, tmp_path):
    from src.predictive_maintenance.models import train as train_module

    saved = {}

    monkeypatch.setattr(train_module, "load_processed_split", make_processed_split)
    monkeypatch.setattr(train_module, "RandomForestClassifier", DummyEstimator)
    monkeypatch.setattr(
        train_module.joblib,
        "dump",
        lambda model, path: saved.update({"model": model, "path": path}),
    )

    model, metrics = train_random_forest_model(tmp_path / "rf.pkl")

    assert model.fitted is True
    assert "Power proxy" in model.saved_input_columns
    assert saved["path"] == tmp_path / "rf.pkl"
    assert "accuracy" in metrics


def test_train_xgboost_model_uses_sanitized_engineered_features(monkeypatch, tmp_path):
    from src.predictive_maintenance.models import train as train_module

    saved = {}

    monkeypatch.setattr(train_module, "load_processed_split", make_processed_split)
    monkeypatch.setattr(train_module, "XGBClassifier", DummyEstimator)
    monkeypatch.setattr(
        train_module.joblib,
        "dump",
        lambda model, path: saved.update({"model": model, "path": path}),
    )

    model, metrics = train_xgboost_model(tmp_path / "xgb.pkl")

    assert model.fitted is True
    assert "Power_proxy" in model.saved_input_columns
    assert "Temperature_delta_K" in model.saved_input_columns
    assert model.kwargs["scale_pos_weight"] == 1.0
    assert saved["path"] == tmp_path / "xgb.pkl"
    assert "f1_score" in metrics
