"use client";

import React, { useRef } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";

import { ResumeData } from "@/config/defaultResumeData";

interface Project {
  title: string;
  category: string;
  description: string[];
  image: string;
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
}

// Encapsulated 3D Tilt Card Component
function TiltCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
    const rotateY = ((x - centerX) / centerX) * 10;

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <Box
      className="perspective-container"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Tiltable Card Content */}
      <Box
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="tilt-element"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          background: "rgba(25, 27, 35, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: 2,
          height: "100%",
          transition: "transform 0.1s ease-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out",
          flexGrow: 1,
        }}
      >
        {/* Project Image */}
        <Box sx={{ position: "relative", overflow: "hidden", height: 240 }}>
          <CardMedia
            component="img"
            image={project.image}
            alt={project.title}
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              objectPosition: "50% 0%",
              filter: "brightness(0.7) contrast(1.15)",
              transition: "transform 0.5s ease",
              "&:hover": {
                transform: "scale(1.05)",
                filter: "brightness(0.95) contrast(1.15)",
              },
            }}
          />
          {/* Category overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: "rgba(16, 19, 26, 0.85)",
              backdropFilter: "blur(6px)",
              color: "primary.light",
              px: 2,
              py: 0.5,
              borderRadius: 1.5,
              fontSize: "0.75rem",
              fontWeight: 600,
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {project.category}
          </Box>
        </Box>

        {/* Content Area */}
        <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", flexGrow: 1 }}>
          {/* Title */}
          <Typography
            variant="h4"
            sx={{
              fontFamily: "var(--font-sora)",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "text.primary",
              mb: 2,
            }}
          >
            {project.title}
          </Typography>

          {/* Tech Stack Chips */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 3 }}>
            {project.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  backgroundColor: "rgba(59, 130, 246, 0.05)",
                  color: "primary.light",
                  border: "1px solid rgba(59, 130, 246, 0.15)",
                }}
              />
            ))}
          </Box>

          {/* Accomplishments Bullets */}
          <Box sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.6, mb: 4, flexGrow: 1 }}>
            <ul style={{ margin: 0, paddingLeft: "18px" }}>
              {project.description.map((bullet, idx) => (
                <li key={idx} style={{ marginBottom: "10px" }}>
                  {bullet}
                </li>
              ))}
            </ul>
          </Box>
        </CardContent>
      </Box>

      {/* Fixed Action Buttons - Not Affected by Tilt */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          pt: 2,
          pb: 2,
          px: 1,
        }}
      >
        <Button
          variant="text"
          color="primary"
          startIcon={<LinkIcon />}
          href={project.demoUrl}
          sx={{
            fontSize: "0.85rem",
            fontWeight: 600,
            px: 1.5,
            py: 0.75,
            flex: 1,
            justifyContent: "center",
            "&:hover": {
              background: "rgba(59, 130, 246, 0.08)",
            },
          }}
        >
          Live Demo
        </Button>
        <Button
          variant="text"
          sx={{
            color: "text.secondary",
            fontSize: "0.85rem",
            fontWeight: 600,
            px: 1.5,
            py: 0.75,
            flex: 1,
            justifyContent: "center",
            "&:hover": {
              color: "primary.light",
              background: "rgba(255, 255, 255, 0.04)",
            },
          }}
          startIcon={<GitHubIcon />}
          href={project.codeUrl}
        >
          Source Code
        </Button>
      </Box>
    </Box>
  );
}

interface ProjectsProps {
  data: ResumeData["projects"];
}

export default function Projects({ data }: ProjectsProps) {
  return (
    <Box
      id="projects"
      sx={{
        py: { xs: 10, md: 14 },
        position: "relative",
        zIndex: 2,
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
            Recent Projects
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
            A selection of projects that demonstrate my ability to build scalable, user-focused applications.
          </Typography>
        </Box>

        {/* Projects Grid */}
        <Grid container spacing={4}>
          {data.map((project) => (
            <Grid size={{ xs: 12, md: 6, lg: 6 }} key={project.title}>
              <TiltCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
