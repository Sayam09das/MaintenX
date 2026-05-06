"use client";

import { Container, Grid, Stack } from "@mui/material";
import { useState } from "react";

import { AssistantCard } from "../components/AssistantCard";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import {
  PredictionFormCard,
  type FormData,
} from "../components/PredictionFormCard";
import { ResultCard } from "../components/ResultCard";

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
  { key: "Type", label: "Machine Type", description: "Encoded product family identifier." },
  {
    key: "Air_temperature_K",
    label: "Air Temperature",
    description: "Ambient operating temperature in Kelvin.",
    step: "0.1",
  },
  {
    key: "Process_temperature_K",
    label: "Process Temperature",
    description: "Process temperature in Kelvin.",
    step: "0.1",
  },
  {
    key: "Rotational_speed_rpm",
    label: "Rotational Speed",
    description: "Machine spindle speed in RPM.",
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
    description: "Accumulated wear exposure in minutes.",
  },
  { key: "TWF", label: "TWF Flag", description: "Tool wear failure indicator." },
  { key: "HDF", label: "HDF Flag", description: "Heat dissipation failure indicator." },
  { key: "PWF", label: "PWF Flag", description: "Power failure indicator." },
  { key: "OSF", label: "OSF Flag", description: "Overstrain failure indicator." },
  { key: "RNF", label: "RNF Flag", description: "Random failure indicator." },
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

export default function Home() {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResponse | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: Number(event.target.value),
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

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Container maxWidth="xl" sx={{ pb: 8 }}>
          <Grid container spacing={3.5}>
            <Grid size={{ xs: 12, lg: 7 }}>
              <PredictionFormCard
                fields={fieldConfig}
                formData={formData}
                loading={loading}
                error={error}
                onChange={handleChange}
                onReset={handleReset}
                onSubmit={handleSubmit}
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 5 }}>
              <Stack spacing={3.5}>
                <ResultCard prediction={result?.prediction} />
                <AssistantCard assistant={result?.assistant} />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </main>
      <Footer />
    </>
  );
}
