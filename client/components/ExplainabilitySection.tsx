"use client";

import { Box, Chip, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Eye, GaugeCircle, Wrench } from "lucide-react";
import { SectionShell } from "./common/SectionShell";

const MotionPaper = motion.create(Paper);

const trustCards = [
  {
    icon: <Eye size={18} />,
    title: "Explainability Layer",
    body: "SHAP reports expose the strongest contributors behind failure classification so operators can review decisions with more confidence.",
  },
  {
    icon: <GaugeCircle size={18} />,
    title: "Metrics Visibility",
    body: "The product communicates probability, risk percentage, and operational state in a compact executive-style decision panel.",
  },
  {
    icon: <Wrench size={18} />,
    title: "Actionability First",
    body: "Assistant recommendations turn raw model outputs into maintenance next-steps instead of leaving teams with only scores.",
  },
];

export function ExplainabilitySection() {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 5, md: 6 } }}>
      <Grid container spacing={{ xs: 2.5, md: 3.5 }} alignItems="stretch">
        <Grid size={{ xs: 12, lg: 5 }}>
          <MotionPaper
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            sx={{ p: { xs: 2.3, sm: 2.8, md: 3.5 }, borderRadius: { xs: 4, sm: 6 }, height: "100%" }}
          >
            <Stack spacing={2.5}>
              <SectionShell
                id="explainability"
                chipLabel="Trust & Explainability"
                title="Make predictions understandable, not just accurate."
                description="MaintenX combines model inference with explanation and recommendation layers so engineering teams can review why a machine is risky and what action should happen next."
              >
                <></>
              </SectionShell>
              <Box
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  borderRadius: { xs: 3, sm: 4 },
                  background: "linear-gradient(135deg, rgba(224,177,93,0.14), rgba(77,208,225,0.10))",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Included in this flow
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, lineHeight: 1.8 }}>
                  Prediction API, benchmark metrics, assistant guidance, and SHAP report generation
                  are all represented in the product workflow.
                </Typography>
              </Box>
            </Stack>
          </MotionPaper>
        </Grid>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Grid container spacing={{ xs: 2, md: 2.5 }}>
            {trustCards.map((card, index) => (
              <Grid key={card.title} size={{ xs: 12 }}>
                <MotionPaper
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  sx={{ p: { xs: 2.1, sm: 2.8 }, borderRadius: { xs: 4, sm: 5 } }}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box
                      sx={{
                        display: "grid",
                        placeItems: "center",
                        width: 42,
                        height: 42,
                        borderRadius: 3,
                        color: "primary.main",
                        backgroundColor: "rgba(224,177,93,0.12)",
                        flexShrink: 0,
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Box>
                      <Typography variant="h3">{card.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.8 }}>
                        {card.body}
                      </Typography>
                    </Box>
                  </Stack>
                </MotionPaper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
