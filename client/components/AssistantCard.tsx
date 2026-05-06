"use client";

import { Alert, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { SectionShell } from "./common/SectionShell";

type AssistantPayload = {
  ai_explanation: string;
  maintenance_recommendation: string;
};

type AssistantCardProps = {
  assistant?: AssistantPayload;
  loading?: boolean;
  error?: string | null;
};

const MotionPaper = motion.create(Paper);

export function AssistantCard({ assistant, loading = false, error = null }: AssistantCardProps) {
  return (
    <MotionPaper
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.14 }}
      whileHover={{ y: -3 }}
      sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 6, boxShadow: "0 24px 70px rgba(0,0,0,0.18)" }}
    >
      <Stack spacing={3} aria-live="polite" id="assistant">
        <SectionShell eyebrow="AI Assistant" title="Maintenance Guidance">
          <></>
        </SectionShell>
        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 4 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Explanation
          </Typography>
          {loading ? (
            <Stack spacing={1.2} sx={{ mt: 1.5 }}>
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="80%" />
            </Stack>
          ) : (
            <Typography variant="body1" sx={{ mt: 1.5, lineHeight: 1.8 }}>
              {assistant?.ai_explanation ??
                "The assistant explanation will appear here once a prediction response is received."}
            </Typography>
          )}
        </Paper>
        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 4 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Recommendation
          </Typography>
          {loading ? (
            <Stack spacing={1.2} sx={{ mt: 1.5 }}>
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="72%" />
            </Stack>
          ) : (
            <Typography variant="body1" sx={{ mt: 1.5, lineHeight: 1.8 }}>
              {assistant?.maintenance_recommendation ??
                "Recommended maintenance action will appear here after inference."}
            </Typography>
          )}
        </Paper>
        {assistant && !loading && (
          <Alert severity="info" sx={{ borderRadius: 3 }} role="status">
            Assistant response is synced to the latest prediction output.
          </Alert>
        )}
        {error && !loading && (
          <Alert severity="warning" sx={{ borderRadius: 3 }} role="status">
            Assistant guidance is unavailable until the API request succeeds.
          </Alert>
        )}
      </Stack>
    </MotionPaper>
  );
}
