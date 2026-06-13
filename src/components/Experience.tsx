"use client";

import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import WorkIcon from "@mui/icons-material/Work";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { ResumeData } from "@/config/defaultResumeData";

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  location: string;
  bullets: string[];
  skills: string[];
}

interface ExperienceProps {
  data: ResumeData["experience"];
}

export default function Experience({ data }: ExperienceProps) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({
    0: true, // First item open by default
  });

  const handleToggle = (index: number) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Box
      id="experience"
      sx={{
        py: { xs: 10, md: 14 },
        position: "relative",
        zIndex: 2,
        backgroundColor: "rgba(16, 19, 26, 0.4)",
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 8, textAlign: "center" }}>
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
            Professional Milestones
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: "550px",
              mx: "auto",
              fontSize: "1.05rem",
              lineHeight: 1.6,
            }}
          >
            A timeline of contributions across microservices, scaling systems, calling architectures, and machine learning integrations.
          </Typography>
        </Box>

        {/* Timeline container */}
        <Box sx={{ position: "relative", pl: { xs: 4, sm: 8 } }}>
          {/* Vertical track line */}
          <Box
            sx={{
              position: "absolute",
              left: { xs: 15, sm: 31 },
              top: 8,
              bottom: 8,
              width: "2px",
              background: "linear-gradient(to bottom, #3b82f6 0%, rgba(59, 130, 246, 0.08) 100%)",
              borderRadius: "1px",
            }}
          />

          {data.map((exp, index) => {
            const isOpen = !!expanded[index];
            return (
              <Box key={index} sx={{ mb: 6, position: "relative" }}>
                {/* Timeline Dot */}
                <Box
                  sx={{
                    position: "absolute",
                    left: { xs: -25, sm: -48 },
                    top: 14,
                    width: { xs: 18, sm: 26 },
                    height: { xs: 18, sm: 26 },
                    borderRadius: "50%",
                    backgroundColor: isOpen ? "primary.main" : "#191b23",
                    border: isOpen ? "4px solid #10131a" : "2px solid #3b82f6",
                    boxShadow: isOpen ? "0 0 15px rgba(59, 130, 246, 0.8)" : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    zIndex: 2,
                  }}
                >
                  <WorkIcon sx={{ fontSize: { xs: 10, sm: 12 }, color: isOpen ? "white" : "primary.main" }} />
                </Box>

                {/* Experience Card */}
                <Card
                  sx={{
                    background: "rgba(25, 27, 35, 0.55)",
                    borderColor: isOpen ? "rgba(59, 130, 246, 0.3)" : "rgba(255, 255, 255, 0.05)",
                    boxShadow: isOpen ? "0 10px 30px rgba(0, 0, 0, 0.3)" : "0 5px 15px rgba(0,0,0,0.2)",
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                    {/* Header Grid */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", sm: "center" },
                        gap: 1.5,
                        mb: 2,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontFamily: "var(--font-sora)",
                            fontWeight: 700,
                            fontSize: "1.25rem",
                            color: "text.primary",
                          }}
                        >
                          {exp.role}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: "primary.light",
                            mt: 0.5,
                          }}
                        >
                          {exp.company}
                        </Typography>
                      </Box>

                      {/* Date & Location */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                          alignItems: { xs: "flex-start", sm: "flex-end" },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.75,
                            color: "text.secondary",
                            fontSize: "0.85rem",
                          }}
                        >
                          <CalendarMonthIcon sx={{ fontSize: 16 }} />
                          {exp.duration}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.75,
                            color: "text.secondary",
                            fontSize: "0.85rem",
                          }}
                        >
                          <LocationOnIcon sx={{ fontSize: 16 }} />
                          {exp.location}
                        </Box>
                      </Box>
                    </Box>

                    {/* Skill chips */}
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 3 }}>
                      {exp.skills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                          sx={{
                            fontSize: "0.75rem",
                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.05)",
                            color: "text.secondary",
                          }}
                        />
                      ))}
                    </Box>

                    {/* Collapse details */}
                    <Collapse in={isOpen}>
                      <Box
                        sx={{
                          color: "text.secondary",
                          fontSize: "0.9rem",
                          lineHeight: 1.6,
                          pt: 2,
                          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                        }}
                      >
                        <ul style={{ margin: 0, paddingLeft: "18px" }}>
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} style={{ marginBottom: "12px" }}>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </Box>
                    </Collapse>

                    {/* Expand/Collapse Toggle Button */}
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => handleToggle(index)}
                        endIcon={isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        sx={{
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          "&:hover": {
                            color: "primary.main",
                          },
                        }}
                      >
                        {isOpen ? "Show Less" : "Show Details"}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
