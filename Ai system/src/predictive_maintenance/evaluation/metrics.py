from typing import Any

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    f1_score,
    precision_score,
    recall_score,
)


def compute_classification_metrics(y_true: Any, y_pred: Any) -> dict[str, float]:
    return {
        "accuracy": float(accuracy_score(y_true, y_pred)),
        "precision": float(precision_score(y_true, y_pred, zero_division=0)),
        "recall": float(recall_score(y_true, y_pred, zero_division=0)),
        "f1_score": float(f1_score(y_true, y_pred, zero_division=0)),
    }


def generate_classification_report(y_true: Any, y_pred: Any) -> str:
    return classification_report(y_true, y_pred, zero_division=0)


def print_classification_summary(model_name: str, y_true: Any, y_pred: Any) -> dict[str, float]:
    metrics = compute_classification_metrics(y_true, y_pred)

    print(f"\n==== {model_name} Evaluation ====")
    print(f"Accuracy : {metrics['accuracy']:.4f}")
    print(f"Precision: {metrics['precision']:.4f}")
    print(f"Recall   : {metrics['recall']:.4f}")
    print(f"F1 Score : {metrics['f1_score']:.4f}")
    print("\nClassification Report:")
    print(generate_classification_report(y_true, y_pred))

    return metrics
