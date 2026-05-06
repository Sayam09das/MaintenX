def generate_risk_explanation(prediction_result: dict, machine_data: dict) -> dict:
    failure_prediction = prediction_result.get("failure_prediction")
    failure_probability = prediction_result.get("failure_probability")
    risk_percentage = prediction_result.get("risk_percentage")
    risk_level = prediction_result.get("risk_level")

    torque = machine_data.get("Torque [Nm]")
    tool_wear = machine_data.get("Tool wear [min]")
    rotational_speed = machine_data.get("Rotational speed [rpm]")
    air_temp = machine_data.get("Air temperature [K]")
    process_temp = machine_data.get("Process temperature [K]")

    reasons = []

    if torque is not None and torque >= 60:
        reasons.append("high torque load")

    if tool_wear is not None and tool_wear >= 200:
        reasons.append("excessive tool wear")

    if rotational_speed is not None and rotational_speed <= 1300:
        reasons.append("low rotational speed")

    if air_temp is not None and air_temp >= 302:
        reasons.append("high air temperature")

    if process_temp is not None and process_temp >= 311:
        reasons.append("high process temperature")

    if not reasons:
        reasons.append("normal operating conditions")

    if failure_prediction == 1:
        explanation = (
            f"The machine is classified as {risk_level}. "
            f"The model predicts a possible failure with {risk_percentage}% probability. "
            f"The main contributing factors are {', '.join(reasons)}."
        )

        recommendation = (
            "Immediate maintenance inspection is recommended. "
            "Check tool condition, torque load, cooling system, and machine operating speed."
        )

    else:
        explanation = (
            f"The machine is classified as {risk_level}. "
            f"The model predicts a low failure chance with {risk_percentage}% probability. "
            f"The current machine condition appears stable."
        )

        recommendation = (
            "Continue normal monitoring. "
            "Schedule regular maintenance and keep tracking sensor values."
        )

    return {
        "ai_explanation": explanation,
        "maintenance_recommendation": recommendation,
    }


if __name__ == "__main__":
    sample_prediction = {
        "failure_prediction": 1,
        "failure_probability": 1.0,
        "risk_percentage": 100.0,
        "risk_level": "High Risk",
    }

    sample_machine_data = {
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

    result = generate_risk_explanation(sample_prediction, sample_machine_data)

    print("\n==== AI Explanation ====")
    print(result)