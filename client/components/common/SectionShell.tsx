"use client";

import { Box, Chip, Typography } from "@mui/material";
import type { ReactNode } from "react";

type SectionShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  chipLabel?: string;
  children: ReactNode;
  id?: string;
};

export function SectionShell({
  eyebrow,
  title,
  description,
  chipLabel,
  children,
  id,
}: SectionShellProps) {
  return (
    <Box component="section" id={id} aria-labelledby={id ? `${id}-title` : undefined}>
      {chipLabel ? (
        <Chip label={chipLabel} color="secondary" sx={{ mb: 2, fontWeight: 700 }} />
      ) : null}
      {eyebrow ? (
        <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          {eyebrow}
        </Typography>
      ) : null}
      <Typography id={id ? `${id}-title` : undefined} variant="h2" sx={{ mt: eyebrow ? 0.5 : 0 }}>
        {title}
      </Typography>
      {description ? (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 1.5, mb: { xs: 2.5, md: 3 }, lineHeight: 1.85, maxWidth: 780 }}
        >
          {description}
        </Typography>
      ) : null}
      {children}
    </Box>
  );
}
