from pathlib import Path
import sys
import unittest

PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

import pandas as pd

from src.predictive_maintenance.data.preprocessing import (
    preprocess_dataset,
    split_dataset,
)
from src.predictive_maintenance.features.feature_engineering import engineer_features


def make_sample_dataframe() -> pd.DataFrame:
    return pd.DataFrame(
        {
            "UDI": [1, 2, 3, 4, 5, 6],
            "Product ID": ["A", "B", "C", "D", "E", "F"],
            "Type": ["L", "M", "H", "L", "M", "H"],
            "Air temperature [K]": [298.0, 299.0, 300.0, 301.0, 302.0, 303.0],
            "Process temperature [K]": [308.0, 309.0, 310.0, 311.0, 312.0, 313.0],
            "Rotational speed [rpm]": [1500, 1490, 1510, 1520, 1480, 1470],
            "Torque [Nm]": [40.0, 41.0, 39.5, 42.0, 43.0, 44.0],
            "Tool wear [min]": [10, 20, 30, 40, 50, 60],
            "TWF": [0, 0, 0, 1, 0, 0],
            "HDF": [0, 1, 0, 0, 0, 1],
            "PWF": [0, 0, 0, 0, 1, 0],
            "OSF": [0, 0, 1, 0, 0, 0],
            "RNF": [0, 0, 0, 0, 0, 1],
            "Machine failure": [0, 0, 1, 0, 1, 1],
        }
    )


class TestPreprocessing(unittest.TestCase):
    def test_preprocess_dataset_removes_ids_and_encodes_type(self):
        dataframe = make_sample_dataframe()

        features, target = preprocess_dataset(dataframe)

        self.assertNotIn("UDI", features.columns)
        self.assertNotIn("Product ID", features.columns)
        self.assertTrue(pd.api.types.is_integer_dtype(features["Type"]))
        self.assertEqual(len(features), 6)
        self.assertEqual(len(target), 6)

    def test_split_dataset_returns_expected_sizes(self):
        dataframe = make_sample_dataframe()
        features, target = preprocess_dataset(dataframe)

        x_train, x_test, y_train, y_test = split_dataset(features, target, test_size=0.33)

        self.assertEqual(len(x_train) + len(x_test), len(features))
        self.assertEqual(len(y_train) + len(y_test), len(target))
        self.assertTrue(set(y_train.unique()).issubset({0, 1}))
        self.assertTrue(set(y_test.unique()).issubset({0, 1}))

    def test_engineer_features_adds_derived_columns(self):
        dataframe = make_sample_dataframe().drop(columns=["Machine failure"])

        engineered = engineer_features(dataframe)

        self.assertIn("Temperature delta [K]", engineered.columns)
        self.assertIn("Power proxy", engineered.columns)
        self.assertIn("Wear stress proxy", engineered.columns)


if __name__ == "__main__":
    unittest.main()
