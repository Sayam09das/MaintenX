import os
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder


# -----------------------------
# Paths
# -----------------------------
RAW_DATA_PATH = "data/raw/ai4i2020.csv"
PROCESSED_DIR = "data/processed"

os.makedirs(PROCESSED_DIR, exist_ok=True)


# -----------------------------
# Load Dataset
# -----------------------------
print("Loading dataset...")

df = pd.read_csv(RAW_DATA_PATH)

print("Dataset loaded successfully!")
print(df.head())


# -----------------------------
# Remove Unnecessary Columns
# -----------------------------
# Remove ID columns if available

columns_to_drop = ["UDI", "Product ID"]

df.drop(columns=columns_to_drop, inplace=True, errors="ignore")

print("\nRemoved ID columns.")


# -----------------------------
# Encode Categorical Columns
# -----------------------------
# Encode 'Type' column

if "Type" in df.columns:
    encoder = LabelEncoder()
    df["Type"] = encoder.fit_transform(df["Type"])

    print("Encoded 'Type' column.")


# -----------------------------
# Define Features and Target
# -----------------------------
TARGET_COLUMN = "Machine failure"

X = df.drop(columns=[TARGET_COLUMN])
y = df[TARGET_COLUMN]

print("\nFeatures and target separated.")
print(f"Feature Shape: {X.shape}")
print(f"Target Shape: {y.shape}")


# -----------------------------
# Train-Test Split
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nTrain-test split completed.")

print(f"X_train Shape: {X_train.shape}")
print(f"X_test Shape: {X_test.shape}")


# -----------------------------
# Save Processed Files
# -----------------------------
X_train.to_csv(f"{PROCESSED_DIR}/X_train.csv", index=False)
X_test.to_csv(f"{PROCESSED_DIR}/X_test.csv", index=False)

y_train.to_csv(f"{PROCESSED_DIR}/y_train.csv", index=False)
y_test.to_csv(f"{PROCESSED_DIR}/y_test.csv", index=False)

print("\nProcessed files saved successfully!")

print("\nSaved Files:")
print("- X_train.csv")
print("- X_test.csv")
print("- y_train.csv")
print("- y_test.csv")

print("\nPreprocessing completed successfully!")