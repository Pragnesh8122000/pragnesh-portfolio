"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ThreeBackground from "@/components/ThreeBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import { defaultResumeData, ResumeData } from "@/config/defaultResumeData";

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  // Load configuration from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("resume_data");
    if (saved) {
      try {
        setResumeData(JSON.parse(saved));
      } catch (e) {
        setResumeData(defaultResumeData);
      }
    } else {
      setResumeData(defaultResumeData);
    }
  }, []);

  // Avoid flash of empty layout before mount
  if (!resumeData) {
    return (
      <Box sx={{ position: "relative", minHeight: "100vh", backgroundColor: "#10131a" }}>
        <ThreeBackground />
      </Box>
    );
  }

  const { visibility } = resumeData;

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      {/* Three.js interactive 3D Background */}
      <ThreeBackground />

      {/* Mouse cursor glow overlay */}
      <div id="mouse-glow" />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Layout */}
      <Box component="main" sx={{ position: "relative", zIndex: 1 }}>

        {/* Hero & Terminal Section */}
        {visibility.hero && <Hero data={resumeData.hero} />}

        {/* Services - What I offer */}
        {visibility.services && <Services data={resumeData.services} />}

        {/* Portfolio projects - Proof of capability */}
        {visibility.projects && <Projects data={resumeData.projects} />}

        {/* Client Testimonials - Social Proof */}
        {visibility.testimonials && <Testimonials data={resumeData.testimonials} />}

        {/* How I Work - Process & Transparency */}
        {visibility.process && <Process data={resumeData.process} />}

        {/* Skills categorizations - Technical Depth */}
        {visibility.skills && <Skills data={resumeData.skills} />}

        {/* Contact Form & Footer */}
        {visibility.contact && <Contact data={resumeData.contact} />}
      </Box>
    </Box>
  );
}
