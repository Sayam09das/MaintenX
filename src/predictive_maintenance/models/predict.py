import joblib
import pandas as pd


MODEL_PATH = "models/xgboost.pkl"


def sanitize_feature_names(dataframe: pd.DataFrame) -> pd.DataFrame:
    """Normalize feature names to match the trained XGBoost model."""
    sanitized = dataframe.copy()
    sanitized.columns = (
        sanitized.columns.astype(str)
        .str.replace(r"[\[\]<]", "", regex=True)
        .str.replace(r"\s+", "_", regex=True)
    )
    return sanitized


def get_risk_level(probability: float) -> str:
    if probability >= 0.75:
        return "High Risk"
    elif probability >= 0.40:
        return "Medium Risk"
    else:
        return "Low Risk"


def predict_failure(input_data: dict) -> dict:
    model = joblib.load(MODEL_PATH)

    input_df = pd.DataFrame([input_data])
    input_df = sanitize_feature_names(input_df)

    prediction = model.predict(input_df)[0]
    probability = model.predict_proba(input_df)[0][1]

    return {
        "failure_prediction": int(prediction),
        "failure_probability": round(float(probability), 4),
        "risk_percentage": round(float(probability) * 100, 2),
        "risk_level": get_risk_level(probability),
    }


if __name__ == "__main__":
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

    print("\n==== Prediction Result ====")
    print(result)
