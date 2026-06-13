"use client";

import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import TerminalIcon from "@mui/icons-material/Terminal";
import StorageIcon from "@mui/icons-material/Storage";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CodeIcon from "@mui/icons-material/Code";
import SpeedIcon from "@mui/icons-material/Speed";

import { ResumeData } from "@/config/defaultResumeData";

interface SkillsProps {
  data: ResumeData["skills"];
}

const getIcon = (index: number) => {
  switch (index) {
    case 0: return <TerminalIcon color="primary" sx={{ fontSize: 32 }} />;
    case 1: return <StorageIcon color="primary" sx={{ fontSize: 32 }} />;
    case 2: return <CloudQueueIcon color="primary" sx={{ fontSize: 32 }} />;
    case 3: return <PsychologyIcon color="primary" sx={{ fontSize: 32 }} />;
    case 4: return <CodeIcon color="primary" sx={{ fontSize: 32 }} />;
    default: return <SpeedIcon color="primary" sx={{ fontSize: 32 }} />;
  }
};

export default function Skills({ data }: SkillsProps) {
  return (
    <Box
      id="skills"
      sx={{
        py: { xs: 10, md: 14 },
        position: "relative",
        zIndex: 2,
        backgroundColor: "rgba(16, 19, 26, 0.4)",
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ mb: 8, textAlign: { xs: "center", md: "left" } }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "var(--font-sora)",
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.5rem" },
              color: "text.primary",
              mb: 2,
            }}
          >
            Skills & Technologies
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: "650px",
              fontSize: "1.05rem",
              lineHeight: 1.6,
            }}
          >
            Technologies I use to build robust, scalable solutions for my clients.
          </Typography>
        </Box>

        {/* Skills Grid */}
        <Grid container spacing={4}>
          {data.map((group, groupIdx) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={group.title}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  background: "rgba(25, 27, 35, 0.6)",
                  borderColor: "rgba(255, 255, 255, 0.05)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3, height: "100%" }}>
                  {/* Group Header */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {getIcon(groupIdx)}
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "var(--font-sora)",
                        fontWeight: 600,
                        fontSize: "1.15rem",
                        color: "text.primary",
                      }}
                    >
                      {group.title}
                    </Typography>
                  </Box>

                  {/* Skills List */}
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                    {group.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        sx={{
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          backgroundColor: "rgba(11, 14, 21, 0.7)",
                          color: "text.secondary",
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "primary.main",
                            color: "primary.light",
                            boxShadow: "0 0 10px rgba(59, 130, 246, 0.2)",
                            backgroundColor: "rgba(59, 130, 246, 0.05)",
                          },
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
