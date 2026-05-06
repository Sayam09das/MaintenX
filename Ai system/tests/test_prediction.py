from pathlib import Path
import sys
import unittest
from unittest.mock import patch

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


class TestPrediction(unittest.TestCase):
    def test_get_risk_level_thresholds(self):
        self.assertEqual(get_risk_level(0.2), "Low Risk")
        self.assertEqual(get_risk_level(0.5), "Medium Risk")
        self.assertEqual(get_risk_level(0.9), "High Risk")

    def test_predict_failure_returns_expected_structure(self):
        dummy_model = DummyModel(prediction=1, probability=0.91)

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

        with patch(
            "src.predictive_maintenance.models.predict.joblib.load",
            return_value=dummy_model,
        ):
            result = predict_failure(sample_input)

        self.assertEqual(result["failure_prediction"], 1)
        self.assertEqual(result["risk_level"], "High Risk")
        self.assertEqual(result["failure_probability"], 0.91)
        self.assertIn("Temperature_delta_K", dummy_model.last_input_columns)
        self.assertIn("Power_proxy", dummy_model.last_input_columns)
        self.assertIn("Wear_stress_proxy", dummy_model.last_input_columns)


if __name__ == "__main__":
    unittest.main()
