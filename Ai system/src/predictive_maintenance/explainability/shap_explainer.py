import os

MPL_CONFIG_DIR = os.path.join("reports", ".matplotlib")
os.makedirs(MPL_CONFIG_DIR, exist_ok=True)
os.environ["MPLCONFIGDIR"] = MPL_CONFIG_DIR

import joblib
import shap
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

MODEL_PATH = "models/xgboost.pkl"
DATA_PATH = "data/processed/X_test.csv"
REPORT_DIR = "reports/figures"

os.makedirs(REPORT_DIR, exist_ok=True)


def sanitize_feature_names(dataframe: pd.DataFrame) -> pd.DataFrame:
    """Normalize feature names to match the trained XGBoost model."""
    sanitized = dataframe.copy()
    sanitized.columns = (
        sanitized.columns.astype(str)
        .str.replace(r"[\[\]<]", "", regex=True)
        .str.replace(r"\s+", "_", regex=True)
    )
    return sanitized


def generate_shap_explanation():
    print("Loading model and test data...")

    model = joblib.load(MODEL_PATH)
    X_test = pd.read_csv(DATA_PATH)
    X_test = sanitize_feature_names(X_test)

    print("Generating SHAP explanations...")

    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(X_test)

    # Summary plot
    shap.summary_plot(shap_values, X_test, show=False)
    plt.tight_layout()
    plt.savefig(f"{REPORT_DIR}/shap_summary.png", dpi=300)
    plt.close()

    # Bar plot
    shap.summary_plot(shap_values, X_test, plot_type="bar", show=False)
    plt.tight_layout()
    plt.savefig(f"{REPORT_DIR}/shap_feature_importance.png", dpi=300)
    plt.close()

    print("SHAP explanation reports saved successfully!")
    print(f"- {REPORT_DIR}/shap_summary.png")
    print(f"- {REPORT_DIR}/shap_feature_importance.png")


if __name__ == "__main__":
    generate_shap_explanation()
