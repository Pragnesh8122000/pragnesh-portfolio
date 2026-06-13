"use client";

import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

import { ResumeData } from "@/config/defaultResumeData";

interface HeroProps {
  data: ResumeData["hero"];
}

export default function Hero({ data }: HeroProps) {
  const handleScrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      id="hero"
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 12 },
        zIndex: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ alignItems: "center" }}>
          {/* Text Content - Full Width */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Availability Tag */}
              <Box sx={{ display: "flex" }}>
                <Chip
                  label="Available for Freelance Projects"
                  color="primary"
                  variant="filled"
                  size="small"
                  sx={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    color: "#ffffff",
                    background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                    boxShadow: "0 4px 14px rgba(59, 130, 246, 0.4)",
                    letterSpacing: "0.5px",
                    px: 1,
                  }}
                />
              </Box>

              {/* Title */}
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "var(--font-sora)",
                  fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                  lineHeight: 1.15,
                  fontWeight: 800,
                  letterSpacing: "-1px",
                  color: "text.primary",
                }}
              >
                Building Robust
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    color: "primary.main",
                    mt: 0.5,
                  }}
                >
                  Backend Systems That Scale
                </Box>
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "var(--font-inter)",
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  color: "text.secondary",
                  lineHeight: 1.6,
                  fontWeight: 400,
                  maxWidth: "520px",
                }}
              >
                Full Stack Engineer specialized in scalable backends, cloud architecture, and AI integration
              </Typography>

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  color: "text.secondary",
                  lineHeight: 1.7,
                  maxWidth: "560px",
                }}
              >
                {data.description}
              </Typography>

              {/* CTA Buttons */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, pt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleScrollToSection("#contact")}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    px: 3.5,
                    py: 1.5,
                  }}
                >
                  Let's Discuss Your Project
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleScrollToSection("#projects")}
                  sx={{
                    color: "text.primary",
                    borderColor: "rgba(255, 255, 255, 0.15)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    px: 3.5,
                    py: 1.5,
                    backdropFilter: "blur(8px)",
                    background: "rgba(255, 255, 255, 0.03)",
                    "&:hover": {
                      borderColor: "primary.main",
                      background: "rgba(59, 130, 246, 0.08)",
                    },
                  }}
                >
                  View My Work
                </Button>
              </Box>

              {/* Professional Stats */}
              <Box sx={{ display: "flex", gap: { xs: 3, md: 5 }, pt: 4, flexWrap: "wrap" }}>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "var(--font-sora)",
                      fontWeight: 700,
                      color: "primary.light",
                      fontSize: { xs: "1.75rem", md: "2rem" }
                    }}
                  >
                    {data.yearsOfExp}+
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                    Years Experience
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "var(--font-sora)",
                      fontWeight: 700,
                      color: "primary.light",
                      fontSize: { xs: "1.75rem", md: "2rem" }
                    }}
                  >
                    {data.projectsDelivered || "15+"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                    Projects Delivered
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "var(--font-sora)",
                      fontWeight: 700,
                      color: "primary.light",
                      fontSize: { xs: "1.75rem", md: "2rem" }
                    }}
                  >
                    {data.clientSuccessRate || "100%"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                    Client Success Rate
                  </Typography>
                </Box>
              </Box>

              {/* Social Links */}
              <Box sx={{ display: "flex", gap: 2, pt: 2 }}>
                <Button
                  variant="text"
                  startIcon={<LinkedInIcon />}
                  href="https://linkedin.com/in/pragnesh-prajapati"
                  target="_blank"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.9rem",
                    "&:hover": { color: "primary.light" },
                  }}
                >
                  LinkedIn
                </Button>
                <Button
                  variant="text"
                  startIcon={<GitHubIcon />}
                  href="https://github.com/pragnesh"
                  target="_blank"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.9rem",
                    "&:hover": { color: "primary.light" },
                  }}
                >
                  GitHub
                </Button>
                <Button
                  variant="text"
                  startIcon={<EmailIcon />}
                  href="mailto:pragnesh8122000@gmail.com"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.9rem",
                    "&:hover": { color: "primary.light" },
                  }}
                >
                  Email
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Professional Visual */}
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 400,
                height: 450,
                borderRadius: 4,
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 4,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                },
              }}
            >
              {/* Abstract Professional Visual */}
              <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: "var(--font-sora)",
                    fontWeight: 800,
                    fontSize: "4rem",
                    color: "primary.main",
                    mb: 2,
                  }}
                >
                  PP
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Pragnesh Prajapati
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    maxWidth: 280,
                  }}
                >
                  Full Stack & Distributed Systems Engineer
                </Typography>
                <Box
                  sx={{
                    mt: 3,
                    pt: 3,
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    gap: 3,
                    justifyContent: "center"
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h5" sx={{ color: "primary.light", fontWeight: 700 }}>Remote</Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>Available</Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h5" sx={{ color: "primary.light", fontWeight: 700 }}>Full-Time</Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>Open to Contract</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}