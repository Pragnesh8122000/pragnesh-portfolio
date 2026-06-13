"use client";

import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PlaceIcon from "@mui/icons-material/Place";
import SendIcon from "@mui/icons-material/Send";

import { ResumeData } from "@/config/defaultResumeData";

interface ContactProps {
  data: ResumeData["contact"];
}

export default function Contact({ data }: ContactProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setIsSent(true);
      setFormState({ name: "", email: "", message: "" });
    }, 800);
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      id="contact"
      sx={{
        pt: { xs: 10, md: 14 },
        pb: 6,
        position: "relative",
        zIndex: 2,
        backgroundColor: "rgba(16, 19, 26, 0.4)",
        borderTop: "1px solid rgba(255, 255, 255, 0.03)",
      }}
    >
      <Container maxWidth="lg">
        {/* Main grid */}
        <Grid container spacing={6} sx={{ mb: 10 }}>
          {/* Left Side: Contact Information */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Box>
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
                  Let&apos;s Work Together
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    fontSize: "1.05rem",
                    lineHeight: 1.6,
                  }}
                >
                  Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s discuss how I can help bring your ideas to life.
                </Typography>
              </Box>

              {/* Info Items */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <IconButton
                    disabled
                    sx={{
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      color: "primary.main",
                      "&.Mui-disabled": { color: "primary.main" },
                    }}
                  >
                    <EmailIcon />
                  </IconButton>
                  <Box>
                    <Typography variant="caption" sx={{ display: "block", color: "text.secondary", fontSize: "0.8rem" }}>
                      Direct Email
                    </Typography>
                    <Typography
                      component="a"
                      href={`mailto:${data.email}`}
                      sx={{
                        color: "text.primary",
                        textDecoration: "none",
                        fontWeight: 600,
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      {data.email}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <IconButton
                    disabled
                    sx={{
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      color: "primary.main",
                      "&.Mui-disabled": { color: "primary.main" },
                    }}
                  >
                    <PlaceIcon />
                  </IconButton>
                  <Box>
                    <Typography variant="caption" sx={{ display: "block", color: "text.secondary", fontSize: "0.8rem" }}>
                      Locations
                    </Typography>
                    <Typography variant="body1" sx={{ color: "text.primary", fontWeight: 600 }}>
                      {data.location}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Social Icon Row */}
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <IconButton
                  component="a"
                  href={data.github}
                  target="_blank"
                  sx={{
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "text.secondary",
                    "&:hover": {
                      color: "primary.light",
                      borderColor: "primary.main",
                      backgroundColor: "rgba(59, 130, 246, 0.05)",
                    },
                  }}
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton
                  component="a"
                  href={data.linkedin}
                  target="_blank"
                  sx={{
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "text.secondary",
                    "&:hover": {
                      color: "primary.light",
                      borderColor: "primary.main",
                      backgroundColor: "rgba(59, 130, 246, 0.05)",
                    },
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Right Side: Contact Form Card */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card
              sx={{
                background: "rgba(25, 27, 35, 0.5)",
                borderColor: "rgba(255, 255, 255, 0.05)",
              }}
            >
              <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
                {isSent ? (
                  <Box sx={{ py: 6, textAlign: "center" }}>
                    <Typography variant="h5" sx={{ color: "primary.light", mb: 2, fontWeight: 700 }}>
                      Message Sent!
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Thanks for reaching out! I&apos;ll get back to you as soon as possible.
                    </Typography>
                    <Button onClick={() => setIsSent(false)} sx={{ mt: 3 }} size="small">
                      Send another message
                    </Button>
                  </Box>
                ) : (
                  <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          required
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          variant="outlined"
                          sx={{
                            "& .MuiInputLabel-root": { color: "#94a3b8" },
                            "& .MuiOutlinedInput-input": { color: "#e1e2ec" },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.08)" },
                              "&:hover fieldset": { borderColor: "rgba(59, 130, 246, 0.4)" },
                              "&.Mui-focused fieldset": { borderColor: "primary.main" },
                            },
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          required
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          variant="outlined"
                          sx={{
                            "& .MuiInputLabel-root": { color: "#94a3b8" },
                            "& .MuiOutlinedInput-input": { color: "#e1e2ec" },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.08)" },
                              "&:hover fieldset": { borderColor: "rgba(59, 130, 246, 0.4)" },
                              "&.Mui-focused fieldset": { borderColor: "primary.main" },
                            },
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          required
                          fullWidth
                          multiline
                          rows={4}
                          label="Message / Project Details"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          variant="outlined"
                          sx={{
                            "& .MuiInputLabel-root": { color: "#94a3b8" },
                            "& .MuiOutlinedInput-input": { color: "#e1e2ec" },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.08)" },
                              "&:hover fieldset": { borderColor: "rgba(59, 130, 246, 0.4)" },
                              "&.Mui-focused fieldset": { borderColor: "primary.main" },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 1 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon />}
                        sx={{ px: 4, py: 1.5, fontWeight: 700 }}
                      >
                        Send Message
                      </Button>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Footer line */}
        <Box
          sx={{
            pt: 6,
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, alignItems: { xs: "center", md: "flex-start" } }}>
            <Typography variant="body1" sx={{ fontFamily: "var(--font-sora)", fontWeight: 800, color: "text.primary" }}>
              Pragnesh Prajapati
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              © {new Date().getFullYear()} Pragnesh Prajapati. All rights reserved.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 4, fontSize: "0.85rem", color: "text.secondary" }}>
            <a href="#hero" onClick={handleScrollToTop} style={{ textDecoration: "none", color: "inherit" }} className="hover:text-white">
              Back to Top
            </a>
            <a href="#skills" style={{ textDecoration: "none", color: "inherit" }} className="hover:text-white">
              Skills
            </a>
            <a href="#projects" style={{ textDecoration: "none", color: "inherit" }} className="hover:text-white">
              Projects
            </a>
            <a href="#experience" style={{ textDecoration: "none", color: "inherit" }} className="hover:text-white">
              Experience
            </a>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
