"use client";

import { Box, Container, Stack, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        backgroundColor: "rgba(0,0,0,0.08)",
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              MaintenX AI
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Predictive maintenance interface for model-driven industrial decisions.
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            © 2026 MaintenX. Phase 1 MVP with MUI, Framer Motion, and backend-connected prediction flow.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
