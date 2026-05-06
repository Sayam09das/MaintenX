export type FormData = {
  Type: number;
  Air_temperature_K: number;
  Process_temperature_K: number;
  Rotational_speed_rpm: number;
  Torque_Nm: number;
  Tool_wear_min: number;
  TWF: number;
  HDF: number;
  PWF: number;
  OSF: number;
  RNF: number;
};

export type PredictionResponse = {
  success: boolean;
  prediction: {
    failure_prediction: number;
    failure_probability: number;
    risk_percentage: number;
    risk_level: string;
  };
  assistant?: {
    ai_explanation: string;
    maintenance_recommendation: string;
  };
};
