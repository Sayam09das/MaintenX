import os
import joblib
import pandas as pd

from xgboost import XGBClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
)


def sanitize_feature_names(dataframe: pd.DataFrame) -> pd.DataFrame:
    """Normalize feature names to a format XGBoost accepts."""
    sanitized = dataframe.copy()
    sanitized.columns = (
        sanitized.columns.astype(str)
        .str.replace(r"[\[\]<]", "", regex=True)
        .str.replace(r"\s+", "_", regex=True)
    )
    return sanitized


# -----------------------------
# Paths
# -----------------------------
PROCESSED_DIR = "data/processed"
MODEL_DIR = "models"
MODEL_PATH = f"{MODEL_DIR}/xgboost.pkl"

os.makedirs(MODEL_DIR, exist_ok=True)


# -----------------------------
# Load Processed Data
# -----------------------------
print("Loading processed data...")

X_train = pd.read_csv(f"{PROCESSED_DIR}/X_train.csv")
X_test = pd.read_csv(f"{PROCESSED_DIR}/X_test.csv")
y_train = pd.read_csv(f"{PROCESSED_DIR}/y_train.csv").values.ravel()
y_test = pd.read_csv(f"{PROCESSED_DIR}/y_test.csv").values.ravel()

X_train = sanitize_feature_names(X_train)
X_test = sanitize_feature_names(X_test)

print("Processed data loaded successfully!")
print(f"X_train Shape: {X_train.shape}")
print(f"X_test Shape: {X_test.shape}")


# -----------------------------
# Handle Class Imbalance
# -----------------------------
negative_count = (y_train == 0).sum()
positive_count = (y_train == 1).sum()

scale_pos_weight = negative_count / positive_count

print(f"\nNegative Samples: {negative_count}")
print(f"Positive Samples: {positive_count}")
print(f"Scale Pos Weight: {scale_pos_weight:.2f}")


# -----------------------------
# Train XGBoost Model
# -----------------------------
print("\nTraining XGBoost model...")

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

model.fit(X_train, y_train)

print("XGBoost training completed!")


# -----------------------------
# Predictions
# -----------------------------
y_pred = model.predict(X_test)


# -----------------------------
# Evaluation
# -----------------------------
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, zero_division=0)
recall = recall_score(y_test, y_pred, zero_division=0)
f1 = f1_score(y_test, y_pred, zero_division=0)

print("\n==== XGBoost Evaluation ====")
print(f"Accuracy : {accuracy:.4f}")
print(f"Precision: {precision:.4f}")
print(f"Recall   : {recall:.4f}")
print(f"F1 Score : {f1:.4f}")

print("\nClassification Report:")
print(classification_report(y_test, y_pred, zero_division=0))


# -----------------------------
# Save Model
# -----------------------------
joblib.dump(model, MODEL_PATH)

print(f"\nModel saved successfully at: {MODEL_PATH}")
print("XGBoost pipeline completed successfully!")
