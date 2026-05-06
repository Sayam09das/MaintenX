# src/predictive_maintenance/models/random_forest.py

import os
import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report


# -----------------------------
# Paths
# -----------------------------
PROCESSED_DIR = "data/processed"
MODEL_DIR = "models"
MODEL_PATH = f"{MODEL_DIR}/random_forest.pkl"

os.makedirs(MODEL_DIR, exist_ok=True)


# -----------------------------
# Load Processed Data
# -----------------------------
print("Loading processed data...")

X_train = pd.read_csv(f"{PROCESSED_DIR}/X_train.csv")
X_test = pd.read_csv(f"{PROCESSED_DIR}/X_test.csv")
y_train = pd.read_csv(f"{PROCESSED_DIR}/y_train.csv").values.ravel()
y_test = pd.read_csv(f"{PROCESSED_DIR}/y_test.csv").values.ravel()

print("Processed data loaded successfully!")
print(f"X_train Shape: {X_train.shape}")
print(f"X_test Shape: {X_test.shape}")


# -----------------------------
# Train Random Forest Model
# -----------------------------
print("\nTraining Random Forest model...")

model = RandomForestClassifier(
    n_estimators=200,
    max_depth=12,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42,
    class_weight="balanced",
    n_jobs=-1
)

model.fit(X_train, y_train)

print("Random Forest training completed!")


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

print("\n==== Random Forest Evaluation ====")
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
print("Random Forest pipeline completed successfully!")