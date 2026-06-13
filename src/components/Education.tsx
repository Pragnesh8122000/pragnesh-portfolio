"use client";

import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarsIcon from "@mui/icons-material/Stars";

import { ResumeData } from "@/config/defaultResumeData";

interface EducationProps {
  data: ResumeData["education"];
  achievements: ResumeData["achievements"];
}

export default function Education({ data, achievements }: EducationProps) {
  return (
    <Box
      id="education"
      sx={{
        py: { xs: 10, md: 14 },
        position: "relative",
        zIndex: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Left Column: Education */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
            <Card
              sx={{
                width: "100%",
                background: "rgba(25, 27, 35, 0.5)",
                borderColor: "rgba(255, 255, 255, 0.05)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: { xs: 4, sm: 5 }, display: "flex", flexDirection: "column", gap: 3, flexGrow: 1 }}>
                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <SchoolIcon color="primary" sx={{ fontSize: 36 }} />
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "var(--font-sora)",
                      fontWeight: 700,
                      fontSize: "1.6rem",
                      color: "text.primary",
                    }}
                  >
                    Academic Foundation
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1, flexGrow: 1 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "var(--font-sora)",
                      fontWeight: 600,
                      fontSize: "1.2rem",
                      color: "text.primary",
                    }}
                  >
                    {data.school}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: "primary.light",
                    }}
                  >
                    {data.degree}
                  </Typography>
                  
                  <Box sx={{ display: "flex", justifyContent: "space-between", color: "text.secondary", fontSize: "0.9rem", mt: 1 }}>
                    <span>Graduation: {data.duration}</span>
                    <span style={{ fontWeight: 600, color: "#ffdcc6" }}>CGPA: {data.cgpa}</span>
                  </Box>

                  <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6, mt: 2 }}>
                    {data.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column: Achievements */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
            <Card
              sx={{
                width: "100%",
                background: "rgba(25, 27, 35, 0.5)",
                borderColor: "rgba(255, 255, 255, 0.05)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: { xs: 4, sm: 5 }, display: "flex", flexDirection: "column", gap: 3, flexGrow: 1 }}>
                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <EmojiEventsIcon color="primary" sx={{ fontSize: 36 }} />
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "var(--font-sora)",
                      fontWeight: 700,
                      fontSize: "1.6rem",
                      color: "text.primary",
                    }}
                  >
                    Key Accomplishments
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1, flexGrow: 1 }}>
                  {achievements.map((ach, idx) => (
                    <Box key={idx} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                      <StarsIcon color="primary" sx={{ fontSize: 20, mt: 0.25 }} />
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: "text.primary",
                            fontSize: "0.95rem",
                          }}
                        >
                          {ach.text}
                        </Typography>
                        {ach.subtext && (
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              fontSize: "0.85rem",
                              mt: 0.5,
                              lineHeight: 1.5,
                            }}
                          >
                            {ach.subtext}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
