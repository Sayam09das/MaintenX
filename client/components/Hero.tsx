"use client";

import { Box, Button, Chip, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Activity, BrainCircuit, ShieldCheck } from "lucide-react";

const MotionPaper = motion.create(Paper);

export function Hero() {
  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 6, md: 10 }, pb: 6 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack
            spacing={3}
            component={motion.div}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Chip label="Phase 1 MVP" color="primary" sx={{ alignSelf: "flex-start", fontWeight: 700 }} />
            <Typography variant="h1">
              Predict equipment risk before downtime becomes expensive.
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 720, fontWeight: 400 }}>
              MaintenX combines machine failure prediction, explainability, and AI-assisted
              recommendations in one operator-ready interface.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button variant="contained" size="large">
                Run Prediction
              </Button>
              <Button variant="outlined" size="large" color="inherit">
                View API Workflow
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <MotionPaper
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            sx={{
              p: 3,
              borderRadius: 6,
              background:
                "linear-gradient(180deg, rgba(17,25,38,0.96) 0%, rgba(10,16,24,0.96) 100%)",
              boxShadow: "0 24px 70px rgba(0,0,0,0.26)",
            }}
          >
            <Stack spacing={2.5}>
              {[
                {
                  icon: <Activity size={18} />,
                  title: "Realtime Risk Signal",
                  body: "Submit telemetry and receive probability-driven failure classification instantly.",
                },
                {
                  icon: <BrainCircuit size={18} />,
                  title: "AI Maintenance Assistant",
                  body: "Gemini-powered explanations transform model output into actionable operator guidance.",
                },
                {
                  icon: <ShieldCheck size={18} />,
                  title: "Operational Confidence",
                  body: "Expose prediction, recommendation, and readiness in one clean workflow.",
                },
              ].map((item) => (
                <Box
                  key={item.title}
                  sx={{
                    p: 2.2,
                    borderRadius: 4,
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <Box sx={{ color: "primary.main", mt: 0.2 }}>{item.icon}</Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {item.body}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </MotionPaper>
        </Grid>
      </Grid>
    </Container>
  );
}
