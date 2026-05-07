"use client";

import { Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { BarChart3, Brain, Shield, Zap } from "lucide-react";
import { SectionShell } from "./common/SectionShell";

const MotionPaper = motion.create(Paper);

const stats = [
  {
    icon: <BarChart3 size={18} />,
    label: "XGBoost Accuracy",
    value: "99.90%",
    detail: "Primary production model benchmark",
  },
  {
    icon: <Shield size={18} />,
    label: "Operational Readiness",
    value: "3 Layers",
    detail: "Prediction, explanation, recommendation",
  },
  {
    icon: <Brain size={18} />,
    label: "AI Assist Mode",
    value: "Gemini",
    detail: "Natural-language maintenance guidance",
  },
  {
    icon: <Zap size={18} />,
    label: "Inference Flow",
    value: "Realtime",
    detail: "FastAPI-connected dashboard experience",
  },
];

export function StatsSection() {
  return (
    <Container maxWidth="xl" sx={{ pb: { xs: 5, md: 6 } }}>
      <SectionShell
        id="metrics"
        eyebrow="Platform Snapshot"
        title="Core Metrics and Reliability Signals"
        description="A compact benchmark and product-readiness layer to help teams quickly understand performance, delivery flow, and AI support status."
      >
        <></>
      </SectionShell>
      <Grid container spacing={{ xs: 2, md: 2.5 }}>
        {stats.map((stat, index) => (
          <Grid key={stat.label} size={{ xs: 12, sm: 6, lg: 3 }}>
            <MotionPaper
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              sx={{
                p: { xs: 2.2, sm: 2.6 },
                borderRadius: { xs: 4, sm: 5 },
                height: "100%",
                background:
                  "linear-gradient(180deg, rgba(17,25,38,0.9) 0%, rgba(11,18,28,0.92) 100%)",
                boxShadow: "0 18px 50px rgba(0,0,0,0.18)",
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1.2} alignItems="center" color="primary.main">
                  {stat.icon}
                  <Typography
                    variant="caption"
                    sx={{ letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1.5 }}
                  >
                    {stat.label}
                  </Typography>
                </Stack>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.detail}
                </Typography>
              </Stack>
            </MotionPaper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
