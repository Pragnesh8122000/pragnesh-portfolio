"use client";

import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import StarIcon from "@mui/icons-material/Star";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface Repository {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  topics: string[];
  updated_at: string;
}

const GITHUB_USERNAME = "Pragnesh8122000";

export default function Repositories() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=8`
        );
        if (response.ok) {
          const data = await response.json();
          setRepos(data);
        }
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      TypeScript: "#3178c6",
      JavaScript: "#f7df1e",
      Python: "#3572A5",
      Go: "#00ADD8",
      Rust: "#dea584",
      Java: "#b07219",
      "C++": "#f34b7d",
    };
    return colors[language || ""] || "#8b949e";
  };

  if (loading) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography color="text.secondary">Loading repositories...</Typography>
      </Box>
    );
  }

  return (
    <Box
      id="repositories"
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
            GitHub Repositories
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
            Check out my open-source projects on GitHub. Feel free to explore the code and contribute!
          </Typography>
          <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            sx={{
              mt: 3,
              borderColor: "rgba(255, 255, 255, 0.15)",
              color: "text.primary",
              "&:hover": {
                borderColor: "primary.main",
                background: "rgba(59, 130, 246, 0.08)",
              },
            }}
          >
            View All on GitHub
          </Button>
        </Box>

        {/* Repositories Grid */}
        <Grid container spacing={3}>
          {repos.map((repo) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={repo.name}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  background: "rgba(25, 27, 35, 0.6)",
                  borderColor: "rgba(255, 255, 255, 0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: "primary.main",
                  },
                }}
              >
                <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  {/* Repo Name */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                    <GitHubIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "var(--font-sora)",
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "primary.light",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {repo.name}
                    </Typography>
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      mb: 2,
                      flexGrow: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      fontSize: "0.85rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {repo.description || "No description provided"}
                  </Typography>

                  {/* Stats Row */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: "auto", pt: 2 }}>
                    {repo.language && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: getLanguageColor(repo.language),
                          }}
                        />
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          {repo.language}
                        </Typography>
                      </Box>
                    )}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <StarIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {repo.stargazers_count}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: "text.secondary", ml: "auto" }}>
                      {formatDate(repo.updated_at)}
                    </Typography>
                  </Box>

                  {/* View Button */}
                  <Button
                    variant="text"
                    size="small"
                    endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                    href={repo.html_url}
                    target="_blank"
                    sx={{
                      mt: 1.5,
                      p: 0,
                      fontSize: "0.8rem",
                      color: "text.secondary",
                      "&:hover": {
                        color: "primary.light",
                        background: "transparent",
                      },
                    }}
                  >
                    View Repository
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}