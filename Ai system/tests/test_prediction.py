from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.predictive_maintenance.models.predict import get_risk_level, predict_failure


class DummyModel:
    def __init__(self, prediction: int, probability: float):
        self.prediction = prediction
        self.probability = probability
        self.last_input_columns = None

    def predict(self, dataframe):
        self.last_input_columns = list(dataframe.columns)
        return [self.prediction]

    def predict_proba(self, dataframe):
        self.last_input_columns = list(dataframe.columns)
        return [[1 - self.probability, self.probability]]


def test_get_risk_level_thresholds():
    assert get_risk_level(0.2) == "Low Risk"
    assert get_risk_level(0.5) == "Medium Risk"
    assert get_risk_level(0.9) == "High Risk"


def test_predict_failure_returns_expected_structure(monkeypatch):
    dummy_model = DummyModel(prediction=1, probability=0.91)

    from src.predictive_maintenance.models import predict as predict_module

    monkeypatch.setattr(predict_module.joblib, "load", lambda _: dummy_model)

    sample_input = {
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

    result = predict_failure(sample_input)

    assert result["failure_prediction"] == 1
    assert result["risk_level"] == "High Risk"
    assert result["failure_probability"] == 0.91
    assert "Temperature_delta_K" in dummy_model.last_input_columns
    assert "Power_proxy" in dummy_model.last_input_columns
    assert "Wear_stress_proxy" in dummy_model.last_input_columns
