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

const apiBaseUrl = "http://127.0.0.1:8000";

const fieldConfig: Array<{
  key: keyof FormData;
  label: string;
  description: string;
  step?: string;
}> = [
  {
    key: "Type",
    label: "Machine Type",
    description: "Encoded product type identifier.",
  },
  {
    key: "Air_temperature_K",
    label: "Air Temperature",
    description: "Ambient operating temperature in Kelvin.",
    step: "0.1",
  },
  {
    key: "Process_temperature_K",
    label: "Process Temperature",
    description: "Internal process temperature in Kelvin.",
    step: "0.1",
  },
  {
    key: "Rotational_speed_rpm",
    label: "Rotational Speed",
    description: "Spindle or shaft speed in RPM.",
  },
  {
    key: "Torque_Nm",
    label: "Torque",
    description: "Mechanical load in Newton meters.",
    step: "0.1",
  },
  {
    key: "Tool_wear_min",
    label: "Tool Wear",
    description: "Accumulated wear time in minutes.",
  },
  {
    key: "TWF",
    label: "TWF Flag",
    description: "Tool wear failure indicator.",
  },
  {
    key: "HDF",
    label: "HDF Flag",
    description: "Heat dissipation failure indicator.",
  },
  {
    key: "PWF",
    label: "PWF Flag",
    description: "Power failure indicator.",
  },
  {
    key: "OSF",
    label: "OSF Flag",
    description: "Overstrain failure indicator.",
  },
  {
    key: "RNF",
    label: "RNF Flag",
    description: "Random failure indicator.",
  },
];

const defaultFormData: FormData = {
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
};

function getRiskTone(riskLevel?: string) {
  switch (riskLevel) {
    case "High Risk":
      return "border-rose-400/40 bg-rose-500/10 text-rose-100";
    case "Medium Risk":
      return "border-amber-400/40 bg-amber-500/10 text-amber-100";
    default:
      return "border-emerald-400/40 bg-emerald-500/10 text-emerald-100";
  }
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResponse | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };

  const handleReset = () => {
    setFormData(defaultFormData);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${apiBaseUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Prediction request failed with status ${response.status}`);
      }

      const data: PredictionResponse = await response.json();
      setResult(data);
    } catch (submissionError) {
      console.error(submissionError);
      setError(
        "Unable to reach the prediction API. Make sure the FastAPI server is running on http://127.0.0.1:8000.",
      );
    } finally {
      setLoading(false);
    }
  };

  const riskLevel = result?.prediction.risk_level;
  const riskTone = getRiskTone(riskLevel);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(228,181,91,0.16),_transparent_28%),linear-gradient(180deg,_#11161f_0%,_#090b11_100%)] text-stone-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <header className="mb-10 grid gap-6 rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur md:grid-cols-[1.35fr_0.65fr] md:p-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-amber-100">
              MaintenX v1.0.0
            </div>
            <h1 className="max-w-3xl font-serif text-4xl leading-tight text-white sm:text-5xl">
              Predict machine failures before downtime becomes expensive.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
              MaintenX combines predictive modeling, SHAP explainability, and an
              AI maintenance assistant in one operator-ready dashboard.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                Model
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                XGBoost Classifier
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                Output
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                Risk + Recommendation
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                API
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                FastAPI on port 8000
              </p>
            </div>
          </div>
        </header>

        <section className="grid flex-1 gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#0f141d]/85 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-stone-400">
                  Sensor Inputs
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Maintenance prediction form
                </h2>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="rounded-full border border-white/12 px-4 py-2 text-sm text-stone-300 transition hover:border-white/25 hover:text-white"
              >
                Reset defaults
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {fieldConfig.map((field) => (
                <label
                  key={field.key}
                  className="group rounded-3xl border border-white/8 bg-white/[0.03] p-4 transition hover:border-amber-200/20 hover:bg-white/[0.05]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="block text-sm font-medium text-white">
                        {field.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-stone-400">
                        {field.description}
                      </span>
                    </div>
                  </div>

                  <input
                    type="number"
                    step={field.step ?? "1"}
                    name={field.key}
                    value={formData[field.key]}
                    onChange={handleChange}
                    className="mt-4 w-full rounded-2xl border border-white/8 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-stone-500 focus:border-amber-200/40 focus:ring-2 focus:ring-amber-200/20"
                  />
                </label>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[#e0b15d] px-6 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Running prediction..." : "Run failure prediction"}
              </button>

              <div className="rounded-full border border-white/10 px-5 py-4 text-sm text-stone-400">
                Endpoint: {apiBaseUrl}/predict
              </div>
            </div>

            {error && (
              <div className="mt-5 rounded-2xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-[2rem] border border-white/10 bg-[#101722]/85 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur">
              <p className="text-sm uppercase tracking-[0.24em] text-stone-400">
                Decision Output
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div
                  className={`inline-flex rounded-full border px-4 py-2 text-sm font-medium ${riskTone}`}
                >
                  {riskLevel ?? "Awaiting prediction"}
                </div>
                {result && (
                  <span className="text-sm text-stone-400">
                    Failure class: {result.prediction.failure_prediction}
                  </span>
                )}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    Probability
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    {result
                      ? `${(result.prediction.failure_probability * 100).toFixed(1)}%`
                      : "--"}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    Risk Score
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    {result ? `${result.prediction.risk_percentage}%` : "--"}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    Response
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    {loading ? "..." : result ? "Ready" : "Idle"}
                  </p>
                </div>
              </div>

              {!result && !loading && (
                <p className="mt-6 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-5 text-sm leading-7 text-stone-400">
                  Submit machine telemetry to generate a failure prediction, a
                  confidence score, and a maintenance recommendation.
                </p>
              )}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#0d131c]/90 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-stone-400">
                    Assistant Summary
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    Maintenance guidance
                  </h3>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    Explanation
                  </p>
                  <p className="mt-3 text-sm leading-7 text-stone-300">
                    {result?.assistant?.ai_explanation ??
                      "The AI assistant will explain why the machine was classified the way it was once a prediction is returned."}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    Recommended action
                  </p>
                  <p className="mt-3 text-sm leading-7 text-stone-300">
                    {result?.assistant?.maintenance_recommendation ??
                      "Recommended maintenance actions will appear here after prediction."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
