"use client";

import {
  Alert,
  Button,
  Chip,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import type { ChangeEvent } from "react";
import { SectionShell } from "./common/SectionShell";
import type { FormData } from "../types/prediction";

type FieldConfig = {
  key: keyof FormData;
  label: string;
  description: string;
  step?: string;
};

type PredictionFormCardProps = {
  fields: FieldConfig[];
  formData: FormData;
  loading: boolean;
  error: string | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  onSubmit: () => void;
  apiBaseUrl: string;
};

const MotionPaper = motion.create(Paper);

export function PredictionFormCard({
  fields,
  formData,
  loading,
  error,
  onChange,
  onReset,
  onSubmit,
  apiBaseUrl,
}: PredictionFormCardProps) {
  return (
    <MotionPaper
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -3 }}
      sx={{
        p: { xs: 2.5, md: 3.5 },
        borderRadius: 6,
        boxShadow: "0 24px 70px rgba(0,0,0,0.18)",
      }}
    >
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <SectionShell
            id="prediction"
            eyebrow="Sensor Inputs"
            title="Prediction Form"
          >
            <></>
          </SectionShell>
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Chip
              label={loading ? "Inference Running" : "Ready"}
              color={loading ? "warning" : "success"}
              size="small"
              sx={{ fontWeight: 700 }}
            />
            <Button variant="text" color="inherit" onClick={onReset}>
              Reset defaults
            </Button>
          </Stack>
        </Stack>

        {loading && (
          <LinearProgress
            color="primary"
            sx={{ borderRadius: 999, height: 6 }}
            aria-label="Prediction request in progress"
          />
        )}

        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid key={field.key} size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <Typography variant="subtitle2">{field.label}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {field.description}
                </Typography>
                <TextField
                  type="number"
                  name={field.key}
                  aria-label={field.label}
                  value={formData[field.key]}
                  onChange={onChange}
                  slotProps={{
                    htmlInput: {
                      step: field.step ?? "1",
                    },
                  }}
                />
              </Stack>
            </Grid>
          ))}
        </Grid>

        {error && (
          <Alert severity="error" sx={{ borderRadius: 3 }} role="status" aria-live="polite">
            {error}
          </Alert>
        )}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button
            variant="contained"
            size="large"
            onClick={onSubmit}
            disabled={loading}
            aria-label="Submit predictive maintenance request"
          >
            {loading ? "Running prediction..." : "Predict failure"}
          </Button>
          <Button variant="outlined" size="large" color="inherit" onClick={onReset}>
            Clear results
          </Button>
          <Typography variant="caption" color="text.secondary" sx={{ alignSelf: "center" }}>
            API: {apiBaseUrl}
          </Typography>
        </Stack>
      </Stack>
    </MotionPaper>
  );
}
