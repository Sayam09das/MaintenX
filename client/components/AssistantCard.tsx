"use client";

import { Paper, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

type AssistantPayload = {
  ai_explanation: string;
  maintenance_recommendation: string;
};

type AssistantCardProps = {
  assistant?: AssistantPayload;
};

const MotionPaper = motion.create(Paper);

export function AssistantCard({ assistant }: AssistantCardProps) {
  return (
    <MotionPaper
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.14 }}
      sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 6 }}
    >
      <Stack spacing={3}>
        <div>
          <Typography variant="overline" color="text.secondary">
            AI Assistant
          </Typography>
          <Typography variant="h2">Maintenance Guidance</Typography>
        </div>
        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 4 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Explanation
          </Typography>
          <Typography variant="body1" sx={{ mt: 1.5, lineHeight: 1.8 }}>
            {assistant?.ai_explanation ??
              "The assistant explanation will appear here once a prediction response is received."}
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 4 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Recommendation
          </Typography>
          <Typography variant="body1" sx={{ mt: 1.5, lineHeight: 1.8 }}>
            {assistant?.maintenance_recommendation ??
              "Recommended maintenance action will appear here after inference."}
          </Typography>
        </Paper>
      </Stack>
    </MotionPaper>
  );
}
