"use client";

import { Container, Grid, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";

import { AssistantCard } from "../components/AssistantCard";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import {
  PredictionFormCard,
} from "../components/PredictionFormCard";
import { ResultCard } from "../components/ResultCard";
import { defaultFormData, fieldConfig } from "../data/predictionForm";
import { getApiBaseUrl, predictFailure } from "../lib/api";
import type { FormData, PredictionResponse } from "../types/prediction";

const StatsSection = dynamic(() => import("../components/StatsSection").then((mod) => mod.StatsSection));
const ExplainabilitySection = dynamic(() =>
  import("../components/ExplainabilitySection").then((mod) => mod.ExplainabilitySection),
);
const Footer = dynamic(() => import("../components/Footer").then((mod) => mod.Footer));

const apiBaseUrl = getApiBaseUrl();

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
      const data: PredictionResponse = await predictFailure(formData);
      setResult(data);
    } catch (submissionError) {
      console.error(submissionError);
      setError(
        `Unable to reach the prediction API at ${apiBaseUrl}. Check that the backend is running and the public API URL is configured correctly.`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <StatsSection />
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
                apiBaseUrl={apiBaseUrl}
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 5 }}>
              <Stack spacing={3.5}>
                <ResultCard prediction={result?.prediction} loading={loading} error={error} />
                <AssistantCard assistant={result?.assistant} loading={loading} error={error} />
              </Stack>
            </Grid>
          </Grid>
        </Container>
        <ExplainabilitySection />
      </main>
      <Footer />
    </>
  );
}
