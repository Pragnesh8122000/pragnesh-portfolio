"use client";

import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { defaultResumeData, ResumeData } from "@/config/defaultResumeData";

export default function CustomizePage() {
  const [data, setData] = useState<ResumeData | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("resume_data");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        setData(defaultResumeData);
      }
    } else {
      setData(defaultResumeData);
    }
  }, []);

  if (!data) return null;

  const handleSave = () => {
    localStorage.setItem("resume_data", JSON.stringify(data));
    setToastMessage("Configuration saved successfully! Visit the home page to preview changes.");
    setToastOpen(true);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all data back to the default resume?")) {
      setData(defaultResumeData);
      localStorage.removeItem("resume_data");
      setToastMessage("Data reset to defaults.");
      setToastOpen(true);
    }
  };

  // Helper change handlers
  const toggleVisibility = (section: keyof ResumeData["visibility"]) => {
    setData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        visibility: {
          ...prev.visibility,
          [section]: !prev.visibility[section],
        },
      };
    });
  };

  const updateHeroField = (field: keyof ResumeData["hero"], value: string) => {
    setData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        hero: {
          ...prev.hero,
          [field]: value,
        },
      };
    });
  };

  const updateHeroRoles = (value: string) => {
    setData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        hero: {
          ...prev.hero,
          roles: value.split(",").map((s) => s.trim()),
        },
      };
    });
  };

  const updateSkill = (index: number, field: "title" | "skills", value: string) => {
    setData((prev) => {
      if (!prev) return null;
      const newSkills = [...prev.skills];
      if (field === "title") {
        newSkills[index] = { ...newSkills[index], title: value };
      } else {
        newSkills[index] = { ...newSkills[index], skills: value.split(",").map((s) => s.trim()) };
      }
      return {
        ...prev,
        skills: newSkills,
      };
    });
  };

  const updateProject = (
    index: number,
    field: "title" | "category" | "tags" | "description",
    value: string
  ) => {
    setData((prev) => {
      if (!prev) return null;
      const newProjects = [...prev.projects];
      if (field === "tags") {
        newProjects[index] = { ...newProjects[index], tags: value.split(",").map((s) => s.trim()) };
      } else if (field === "description") {
        newProjects[index] = {
          ...newProjects[index],
          description: value.split("\n").filter((l) => l.trim() !== ""),
        };
      } else {
        newProjects[index] = { ...newProjects[index], [field]: value };
      }
      return {
        ...prev,
        projects: newProjects,
      };
    });
  };

  const updateExperience = (
    index: number,
    field: "role" | "company" | "duration" | "location" | "skills" | "bullets",
    value: string
  ) => {
    setData((prev) => {
      if (!prev) return null;
      const newExp = [...prev.experience];
      if (field === "skills") {
        newExp[index] = { ...newExp[index], skills: value.split(",").map((s) => s.trim()) };
      } else if (field === "bullets") {
        newExp[index] = {
          ...newExp[index],
          bullets: value.split("\n").filter((l) => l.trim() !== ""),
        };
      } else {
        newExp[index] = { ...newExp[index], [field]: value };
      }
      return {
        ...prev,
        experience: newExp,
      };
    });
  };

  const updateEducationField = (field: keyof ResumeData["education"], value: string) => {
    setData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        education: {
          ...prev.education,
          [field]: value,
        },
      };
    });
  };

  const updateAchievement = (index: number, field: "text" | "subtext", value: string) => {
    setData((prev) => {
      if (!prev) return null;
      const newAch = [...prev.achievements];
      newAch[index] = { ...newAch[index], [field]: value };
      return {
        ...prev,
        achievements: newAch,
      };
    });
  };

  const updateContactField = (field: keyof ResumeData["contact"], value: string) => {
    setData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        contact: {
          ...prev.contact,
          [field]: value,
        },
      };
    });
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#10131a", py: 6 }}>
      <Container maxWidth="md">
        {/* Navigation & Actions Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 5 }}>
          <Button
            component="a"
            href="/"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "text.secondary",
              "&:hover": { color: "primary.main" },
            }}
          >
            Back to Portfolio
          </Button>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<RestartAltIcon />}
              onClick={handleReset}
              sx={{ borderColor: "rgba(255, 255, 255, 0.15)", color: "text.primary" }}
            >
              Reset to Defaults
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save Configuration
            </Button>
          </Box>
        </Box>

        {/* Header Title */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h2" sx={{ fontFamily: "var(--font-sora)", fontWeight: 700, fontSize: "2rem", color: "text.primary" }}>
            Resume Customizer Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
            Tweak section visibility and rewrite your project details or job scopes dynamically.
          </Typography>
        </Box>

        {/* ACCORDION GROUP */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          
          {/* SECTION 1: VISIBILITY CONTROL */}
          <Accordion sx={{ backgroundColor: "rgba(25, 27, 35, 0.6)", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontFamily: "var(--font-sora)", fontWeight: 600 }}>1. Section Visibility Control</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Grid container spacing={3}>
                {(Object.keys(data.visibility) as Array<keyof ResumeData["visibility"]>).map((key) => (
                  <Grid size={{ xs: 6, sm: 4 }} key={key}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={data.visibility[key]}
                          onChange={() => toggleVisibility(key)}
                          color="primary"
                        />
                      }
                      label={<span style={{ textTransform: "capitalize" }}>{key} Section</span>}
                    />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* SECTION 2: HERO & METRICS EDITOR */}
          <Accordion sx={{ backgroundColor: "rgba(25, 27, 35, 0.6)", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontFamily: "var(--font-sora)", fontWeight: 600 }}>2. Hero Content & Metrics</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={data.hero.name}
                onChange={(e) => updateHeroField("name", e.target.value)}
              />
              <TextField
                fullWidth
                label="Roles (Comma separated list)"
                value={data.hero.roles.join(", ")}
                onChange={(e) => updateHeroRoles(e.target.value)}
                helperText="Dynamic rotating roles shown on the hero headline."
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Hero Biography Summary"
                value={data.hero.description}
                onChange={(e) => updateHeroField("description", e.target.value)}
              />
              <Grid container spacing={3}>
                <Grid size={{ xs: 4 }}>
                  <TextField
                    fullWidth
                    label="Years of Experience"
                    value={data.hero.yearsOfExp}
                    onChange={(e) => updateHeroField("yearsOfExp", e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <TextField
                    fullWidth
                    label="RPS Maintained"
                    value={data.hero.rpsMaintained}
                    onChange={(e) => updateHeroField("rpsMaintained", e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <TextField
                    fullWidth
                    label="Client Success Rate"
                    value={data.hero.clientSuccessRate}
                    onChange={(e) => updateHeroField("clientSuccessRate", e.target.value)}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* SECTION 3: SKILLS BUILDER */}
          <Accordion sx={{ backgroundColor: "rgba(25, 27, 35, 0.6)", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontFamily: "var(--font-sora)", fontWeight: 600 }}>3. Skills Categories</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {data.skills.map((group, idx) => (
                <Box key={idx} sx={{ p: 2, border: "1px solid rgba(255,255,255,0.05)", borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: "primary.light" }}>
                    Group #{idx + 1}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Group Title"
                        value={group.title}
                        onChange={(e) => updateSkill(idx, "title", e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        multiline
                        label="Skills (Comma separated list)"
                        value={group.skills.join(", ")}
                        onChange={(e) => updateSkill(idx, "skills", e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>

          {/* SECTION 4: PROJECTS SHOWCASE */}
          <Accordion sx={{ backgroundColor: "rgba(25, 27, 35, 0.6)", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontFamily: "var(--font-sora)", fontWeight: 600 }}>4. Projects Showcase</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {data.projects.map((project, idx) => (
                <Box key={idx} sx={{ p: 2, border: "1px solid rgba(255,255,255,0.05)", borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: "primary.light" }}>
                    Project #{idx + 1}: {project.title.split("—")[0].trim()}
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Project Title"
                        value={project.title}
                        onChange={(e) => updateProject(idx, "title", e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Category Type"
                        value={project.category}
                        onChange={(e) => updateProject(idx, "category", e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Technology Tags (Comma separated list)"
                        value={project.tags.join(", ")}
                        onChange={(e) => updateProject(idx, "tags", e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Key Contributions (One bullet point per line)"
                        value={project.description.join("\n")}
                        onChange={(e) => updateProject(idx, "description", e.target.value)}
                        helperText="Press Enter to create a new bullet point."
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>

          {/* SECTION 5: EXPERIENCE TIMELINE */}
          <Accordion sx={{ backgroundColor: "rgba(25, 27, 35, 0.6)", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontFamily: "var(--font-sora)", fontWeight: 600 }}>5. Career Timeline (Experience)</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {data.experience.map((exp, idx) => (
                <Box key={idx} sx={{ p: 2, border: "1px solid rgba(255,255,255,0.05)", borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: "primary.light" }}>
                    Job #{idx + 1}: {exp.company}
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Role Title"
                        value={exp.role}
                        onChange={(e) => updateExperience(idx, "role", e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Company Name"
                        value={exp.company}
                        onChange={(e) => updateExperience(idx, "company", e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Employment Duration"
                        value={exp.duration}
                        onChange={(e) => updateExperience(idx, "duration", e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Job Location"
                        value={exp.location}
                        onChange={(e) => updateExperience(idx, "location", e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Skills Used (Comma separated)"
                        value={exp.skills.join(", ")}
                        onChange={(e) => updateExperience(idx, "skills", e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Achievements & Bullet Points (One per line)"
                        value={exp.bullets.join("\n")}
                        onChange={(e) => updateExperience(idx, "bullets", e.target.value)}
                        helperText="Press Enter to write a new bullet point."
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>

          {/* SECTION 6: EDUCATION & ACHIEVEMENTS */}
          <Accordion sx={{ backgroundColor: "rgba(25, 27, 35, 0.6)", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontFamily: "var(--font-sora)", fontWeight: 600 }}>6. Academic & Achievements</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "primary.light" }}>
                Education
              </Typography>
              <TextField
                fullWidth
                label="School / University"
                value={data.education.school}
                onChange={(e) => updateEducationField("school", e.target.value)}
              />
              <TextField
                fullWidth
                label="Degree / Major"
                value={data.education.degree}
                onChange={(e) => updateEducationField("degree", e.target.value)}
              />
              <Grid container spacing={3}>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    fullWidth
                    label="Graduation Years"
                    value={data.education.duration}
                    onChange={(e) => updateEducationField("duration", e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    fullWidth
                    label="CGPA Grade"
                    value={data.education.cgpa}
                    onChange={(e) => updateEducationField("cgpa", e.target.value)}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Studies Description"
                value={data.education.description}
                onChange={(e) => updateEducationField("description", e.target.value)}
              />

              <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 600, color: "primary.light" }}>
                Key Accomplishments
              </Typography>
              {data.achievements.map((ach, idx) => (
                <Box key={idx} sx={{ p: 2, border: "1px solid rgba(255,255,255,0.05)", borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label={`Achievement #${idx + 1}`}
                        value={ach.text}
                        onChange={(e) => updateAchievement(idx, "text", e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Details / Description"
                        value={ach.subtext}
                        onChange={(e) => updateAchievement(idx, "subtext", e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>

          {/* SECTION 7: CONTACT CHANNELS */}
          <Accordion sx={{ backgroundColor: "rgba(25, 27, 35, 0.6)", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontFamily: "var(--font-sora)", fontWeight: 600 }}>7. Contact & Social Channels</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                fullWidth
                label="Direct Email"
                value={data.contact.email}
                onChange={(e) => updateContactField("email", e.target.value)}
              />
              <TextField
                fullWidth
                label="Locations"
                value={data.contact.location}
                onChange={(e) => updateContactField("location", e.target.value)}
              />
              <TextField
                fullWidth
                label="GitHub URL"
                value={data.contact.github}
                onChange={(e) => updateContactField("github", e.target.value)}
              />
              <TextField
                fullWidth
                label="LinkedIn URL"
                value={data.contact.linkedin}
                onChange={(e) => updateContactField("linkedin", e.target.value)}
              />
            </AccordionDetails>
          </Accordion>

        </Box>

        {/* SAVE FLOAT BUTTONS BAR */}
        <Box sx={{ mt: 5, display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{ borderColor: "rgba(255, 255, 255, 0.15)", color: "text.primary" }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Box>
      </Container>

      {/* Snackbar notification */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={6000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: "100%" }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
