from pathlib import Path

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

from src.predictive_maintenance.data.loader import load_raw_data

RAW_DATA_PATH = Path("data/raw/ai4i2020.csv")
PROCESSED_DIR = Path("data/processed")
TARGET_COLUMN = "Machine failure"
DROP_COLUMNS = ["UDI", "Product ID"]


def preprocess_dataset(dataframe: pd.DataFrame) -> tuple[pd.DataFrame, pd.Series]:
    df = dataframe.copy()

    df.drop(columns=DROP_COLUMNS, inplace=True, errors="ignore")

    if "Type" in df.columns:
        encoder = LabelEncoder()
        df["Type"] = encoder.fit_transform(df["Type"])

    x = df.drop(columns=[TARGET_COLUMN])
    y = df[TARGET_COLUMN]

    return x, y


def split_dataset(
    features: pd.DataFrame,
    target: pd.Series,
    test_size: float = 0.2,
    random_state: int = 42,
) -> tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series]:
    return train_test_split(
        features,
        target,
        test_size=test_size,
        random_state=random_state,
        stratify=target,
    )


def save_processed_split(
    x_train: pd.DataFrame,
    x_test: pd.DataFrame,
    y_train: pd.Series,
    y_test: pd.Series,
    processed_dir: Path | str = PROCESSED_DIR,
) -> None:
    output_dir = Path(processed_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    x_train.to_csv(output_dir / "X_train.csv", index=False)
    x_test.to_csv(output_dir / "X_test.csv", index=False)
    y_train.to_csv(output_dir / "y_train.csv", index=False)
    y_test.to_csv(output_dir / "y_test.csv", index=False)


def run_preprocessing() -> tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series]:
    print("Loading dataset...")
    df = load_raw_data(RAW_DATA_PATH)

    print("Dataset loaded successfully!")
    print(df.head())

    x, y = preprocess_dataset(df)

    print("\nFeatures and target separated.")
    print(f"Feature Shape: {x.shape}")
    print(f"Target Shape: {y.shape}")

    x_train, x_test, y_train, y_test = split_dataset(x, y)

    print("\nTrain-test split completed.")
    print(f"X_train Shape: {x_train.shape}")
    print(f"X_test Shape: {x_test.shape}")

    save_processed_split(x_train, x_test, y_train, y_test)

    print("\nProcessed files saved successfully!")
    print("\nSaved Files:")
    print("- X_train.csv")
    print("- X_test.csv")
    print("- y_train.csv")
    print("- y_test.csv")
    print("\nPreprocessing completed successfully!")

    return x_train, x_test, y_train, y_test


if __name__ == "__main__":
    run_preprocessing()
