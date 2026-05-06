from pathlib import Path

import pandas as pd

RAW_DATA_PATH = Path("data/raw/ai4i2020.csv")
PROCESSED_DIR = Path("data/processed")


def load_raw_data(path: Path | str = RAW_DATA_PATH) -> pd.DataFrame:
    dataset_path = Path(path)

    if not dataset_path.exists():
        raise FileNotFoundError(f"Raw dataset not found: {dataset_path}")

    return pd.read_csv(dataset_path)


def load_processed_split(processed_dir: Path | str = PROCESSED_DIR) -> tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series]:
    base_dir = Path(processed_dir)

    x_train = pd.read_csv(base_dir / "X_train.csv")
    x_test = pd.read_csv(base_dir / "X_test.csv")
    y_train = pd.read_csv(base_dir / "y_train.csv").squeeze("columns")
    y_test = pd.read_csv(base_dir / "y_test.csv").squeeze("columns")

    return x_train, x_test, y_train, y_test
