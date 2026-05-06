"use client";

import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Cpu, Sparkles } from "lucide-react";

const MotionToolbar = motion.create(Toolbar);

export function Navbar() {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backgroundColor: "rgba(10,16,24,0.68)",
      }}
    >
      <Container maxWidth="xl">
        <Box component="nav" aria-label="Primary navigation">
        <MotionToolbar
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          disableGutters
          sx={{ minHeight: 76, justifyContent: "space-between" }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                width: 42,
                height: 42,
                borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(224,177,93,0.24), rgba(77,208,225,0.2))",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Cpu size={20} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                MaintenX AI
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Predictive Maintenance Dashboard
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button color="inherit" component="a" href="#platform">
              Platform
            </Button>
            <Button color="inherit" component="a" href="#prediction">
              Prediction
            </Button>
            <Button color="inherit" component="a" href="#assistant">
              Assistant
            </Button>
            <Button variant="contained" startIcon={<Sparkles size={16} />}>
              Live Demo
            </Button>
          </Stack>
        </MotionToolbar>
        </Box>
      </Container>
    </AppBar>
  );
}
