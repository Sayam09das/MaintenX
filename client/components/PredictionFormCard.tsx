"use client";

import {
  Alert,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import type { ChangeEvent } from "react";

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
}: PredictionFormCardProps) {
  return (
    <MotionPaper
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 6 }}
    >
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <div>
            <Typography variant="overline" color="text.secondary">
              Sensor Inputs
            </Typography>
            <Typography variant="h2">Prediction Form</Typography>
          </div>
          <Button variant="text" color="inherit" onClick={onReset}>
            Reset defaults
          </Button>
        </Stack>

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

        {error && <Alert severity="error">{error}</Alert>}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button variant="contained" size="large" onClick={onSubmit} disabled={loading}>
            {loading ? "Running prediction..." : "Predict failure"}
          </Button>
          <Button variant="outlined" size="large" color="inherit" onClick={onReset}>
            Clear results
          </Button>
        </Stack>
      </Stack>
    </MotionPaper>
  );
}
