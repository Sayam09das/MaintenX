"use client";

import { useState } from "react";

type FormData = {
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

type PredictionResponse = {
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

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    Type: 1,
    Air_temperature_K: 298,
    Process_temperature_K: 308,
    Rotational_speed_rpm: 1500,
    Torque_Nm: 40,
    Tool_wear_min: 0,
    TWF: 0,
    HDF: 0,
    PWF: 0,
    OSF: 0,
    RNF: 0,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data: PredictionResponse = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const fields: Array<keyof FormData> = [
    "Type",
    "Air_temperature_K",
    "Process_temperature_K",
    "Rotational_speed_rpm",
    "Torque_Nm",
    "Tool_wear_min",
    "TWF",
    "HDF",
    "PWF",
    "OSF",
    "RNF",
  ];

  return (
    <main className="min-h-screen bg-black px-8 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-5xl font-bold">MaintenX AI</h1>
        <p className="mb-10 text-gray-400">
          Predictive Maintenance + AI Assistant
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field}>
              <label className="mb-2 block text-sm text-gray-300">
                {field}
              </label>

              <input
                type="number"
                step="any"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 outline-none"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-white p-4 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Predicting..." : "Predict Failure"}
        </button>

        {result && (
          <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-4 text-2xl font-bold">Prediction Result</h2>

            <div className="space-y-2 text-sm text-zinc-200">
              <p>
                Failure Prediction: {result.prediction.failure_prediction}
              </p>
              <p>
                Failure Probability: {result.prediction.failure_probability}
              </p>
              <p>Risk Percentage: {result.prediction.risk_percentage}%</p>
              <p>Risk Level: {result.prediction.risk_level}</p>
            </div>

            {result.assistant && (
              <div className="mt-6 space-y-3 border-t border-zinc-800 pt-6">
                <h3 className="text-xl font-semibold">AI Assistant</h3>
                <p className="text-zinc-300">
                  {result.assistant.ai_explanation}
                </p>
                <p className="text-zinc-300">
                  {result.assistant.maintenance_recommendation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
