"use client";

import { Alert, Chip, Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

type PredictionResult = {
  failure_prediction: number;
  failure_probability: number;
  risk_percentage: number;
  risk_level: string;
};

type ResultCardProps = {
  prediction?: PredictionResult;
  loading?: boolean;
  error?: string | null;
};

const MotionPaper = motion.create(Paper);

function getChipColor(riskLevel?: string): "success" | "warning" | "error" | "default" {
  if (riskLevel === "High Risk") return "error";
  if (riskLevel === "Medium Risk") return "warning";
  if (riskLevel === "Low Risk") return "success";
  return "default";
}

export function ResultCard({ prediction, loading = false, error = null }: ResultCardProps) {
  return (
    <MotionPaper
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 }}
      whileHover={{ y: -3 }}
      sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 6, boxShadow: "0 24px 70px rgba(0,0,0,0.18)" }}
    >
      <Stack spacing={3}>
        <div>
          <Typography variant="overline" color="text.secondary">
            Decision Output
          </Typography>
          <Typography variant="h2">Prediction Result</Typography>
        </div>
        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
          <Chip
            label={loading ? "Analyzing" : prediction?.risk_level ?? "Awaiting prediction"}
            color={getChipColor(prediction?.risk_level)}
            sx={{ fontWeight: 700 }}
          />
          {prediction && (
            <Typography variant="body2" color="text.secondary">
              Failure class: {prediction.failure_prediction}
            </Typography>
          )}
        </Stack>
        <Grid container spacing={2}>
          {[
            {
              label: "Probability",
              value: prediction
                ? `${(prediction.failure_probability * 100).toFixed(1)}%`
                : "--",
            },
            {
              label: "Risk Score",
              value: prediction ? `${prediction.risk_percentage}%` : "--",
            },
            {
              label: "Status",
              value: prediction ? "Ready" : "Idle",
            },
          ].map((item) => (
            <Grid key={item.label} size={{ xs: 12, sm: 4 }}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2.25,
                  borderRadius: 4,
                  backgroundColor: "rgba(255,255,255,0.02)",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {item.label}
                </Typography>
                {loading ? (
                  <Skeleton variant="text" sx={{ mt: 1.1, fontSize: "2rem", width: "80%" }} />
                ) : (
                  <Typography variant="h4" sx={{ mt: 1.25, fontWeight: 700 }}>
                    {item.value}
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
        {prediction && !loading && (
          <Alert severity="success" sx={{ borderRadius: 3 }}>
            Prediction completed successfully. Review the risk level and assistant guidance.
          </Alert>
        )}
        {error && !loading && (
          <Alert severity="error" sx={{ borderRadius: 3 }}>
            Prediction request failed. Check backend availability and retry.
          </Alert>
        )}
        {!prediction && (
          <Typography variant="body2" color="text.secondary">
            Submit machine telemetry to generate risk probability, classification, and
            maintenance guidance.
          </Typography>
        )}
      </Stack>
    </MotionPaper>
  );
}
