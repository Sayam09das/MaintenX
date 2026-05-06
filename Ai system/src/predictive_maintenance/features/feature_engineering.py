import pandas as pd


def sanitize_feature_names(dataframe: pd.DataFrame) -> pd.DataFrame:
    """Normalize feature names to a format accepted by XGBoost and shared across inference."""
    sanitized = dataframe.copy()
    sanitized.columns = (
        sanitized.columns.astype(str)
        .str.replace(r"[\[\]<]", "", regex=True)
        .str.replace(r"\s+", "_", regex=True)
    )
    return sanitized


def add_temperature_delta(dataframe: pd.DataFrame) -> pd.DataFrame:
    engineered = dataframe.copy()

    if {
        "Air temperature [K]",
        "Process temperature [K]",
    }.issubset(engineered.columns):
        engineered["Temperature delta [K]"] = (
            engineered["Process temperature [K]"]
            - engineered["Air temperature [K]"]
        )

    if {
        "Air_temperature_K",
        "Process_temperature_K",
    }.issubset(engineered.columns):
        engineered["Temperature_delta_K"] = (
            engineered["Process_temperature_K"] - engineered["Air_temperature_K"]
        )

    return engineered


def add_power_proxy(dataframe: pd.DataFrame) -> pd.DataFrame:
    engineered = dataframe.copy()

    if {"Rotational speed [rpm]", "Torque [Nm]"}.issubset(engineered.columns):
        engineered["Power proxy"] = (
            engineered["Rotational speed [rpm]"] * engineered["Torque [Nm]"]
        )

    if {"Rotational_speed_rpm", "Torque_Nm"}.issubset(engineered.columns):
        engineered["Power_proxy"] = (
            engineered["Rotational_speed_rpm"] * engineered["Torque_Nm"]
        )

    return engineered


def add_wear_stress_proxy(dataframe: pd.DataFrame) -> pd.DataFrame:
    engineered = dataframe.copy()

    if {"Tool wear [min]", "Torque [Nm]"}.issubset(engineered.columns):
        engineered["Wear stress proxy"] = (
            engineered["Tool wear [min]"] * engineered["Torque [Nm]"]
        )

    if {"Tool_wear_min", "Torque_Nm"}.issubset(engineered.columns):
        engineered["Wear_stress_proxy"] = (
            engineered["Tool_wear_min"] * engineered["Torque_Nm"]
        )

    return engineered


def engineer_features(dataframe: pd.DataFrame) -> pd.DataFrame:
    engineered = add_temperature_delta(dataframe)
    engineered = add_power_proxy(engineered)
    engineered = add_wear_stress_proxy(engineered)
    return engineered
