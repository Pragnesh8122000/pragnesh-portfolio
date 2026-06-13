"use client";

import React, { useState, useRef, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function TerminalConsole() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "system_init",
      output: (
        <Box sx={{ color: "text.secondary" }}>
          Welcome to Pragnesh&apos;s Interactive Terminal.
          <br />
          Type <span style={{ color: "#3b82f6", fontWeight: "bold" }}>help</span> to see all available commands.
        </Box>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <Box>
            Available commands:
            <ul style={{ margin: "5px 0 0 20px", padding: 0 }}>
              <li><b style={{ color: "#3b82f6" }}>about</b> - Executive summary of Pragnesh</li>
              <li><b style={{ color: "#3b82f6" }}>skills</b> - Technical skill breakdown</li>
              <li><b style={{ color: "#3b82f6" }}>projects</b> - List of featured engineering projects</li>
              <li><b style={{ color: "#3b82f6" }}>experience</b> - Professional history summary</li>
              <li><b style={{ color: "#3b82f6" }}>clear</b> - Clear terminal history</li>
            </ul>
          </Box>
        );
        break;

      case "about":
        output = (
          <Box sx={{ color: "text.secondary" }}>
            Pragnesh Prajapati is a Full Stack Engineer with 3+ years of experience designing distributed systems,
            microservices, and cloud-native infrastructure on AWS. He specializes in building robust backend services
            handling 10,000+ RPS, event-driven pipelines, and high-performance applications.
          </Box>
        );
        break;

      case "skills":
        output = (
          <Box>
            <div><b>Languages:</b> JavaScript (ES6+), TypeScript, Python, PHP</div>
            <div><b>Backend:</b> Node.js, Express.js, GraphQL, REST, Core PHP</div>
            <div><b>Architecture:</b> Microservices, Event-Driven, System Design</div>
            <div><b>Cloud/DevOps:</b> AWS (EC2, Lambda, S3, ALB), Docker, CI/CD, GitHub Actions</div>
            <div><b>Databases:</b> MongoDB, Redis, PostgreSQL, MySQL, VectorDB</div>
          </Box>
        );
        break;

      case "projects":
        output = (
          <Box>
            <div style={{ marginBottom: "8px" }}>
              <b style={{ color: "#ffdcc6" }}>1. Vedincharyaa</b> - Vedic Wisdom Platform (LLM/GenAI)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;Tech: Node.js, TypeScript, React.js, OpenAI API, VectorDB, MongoDB
            </div>
            <div style={{ marginBottom: "8px" }}>
              <b style={{ color: "#ffdcc6" }}>2. Shuffgroup</b> - Home Security Platform (Real-time WebSockets)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;Tech: Node.js, Express.js, React.js, Redis, AWS, MongoDB
            </div>
            <div>
              <b style={{ color: "#ffdcc6" }}>3. Chandipe</b> - Bullion Trading Platform (Event-Driven Trading)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;Tech: Node.js, Express.js, PostgreSQL, Docker, AWS EC2
            </div>
          </Box>
        );
        break;

      case "experience":
        output = (
          <Box>
            <div style={{ marginBottom: "8px" }}>
              <b>Justdial Ltd.</b> | SDE-1 (Backend) | Jan 2026 – Present
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;Dynamic API Gateway routing, observability pipelines, load balancing.
            </div>
            <div style={{ marginBottom: "8px" }}>
              <b>Mypcot Infotech Pvt. Ltd.</b> | Software Engineer | May 2024 – Dec 2025
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;Monolith-to-microservices migration on AWS ECS, GraphQL scale.
            </div>
            <div>
              <b>Weboccult Technologies</b> | Backend Engineer | Jan 2023 – May 2024
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;WebRTC video communication service, AI document review pipelines.
            </div>
          </Box>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        output = (
          <span style={{ color: "#ffb4ab" }}>
            Command not found: &apos;{cmd}&apos;. Type &apos;help&apos; for a list of available commands.
          </span>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput("");
  };

  return (
    <Paper
      elevation={24}
      sx={{
        width: "100%",
        maxWidth: 550,
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        backgroundColor: "rgba(11, 14, 21, 0.85)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
      }}
    >
      {/* Window Controls */}
      <Box
        sx={{
          background: "rgba(39, 42, 49, 0.5)",
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <Box sx={{ width: 12, height: 12, borderRadius: "50%", background: "#ffb4ab" }} />
        <Box sx={{ width: 12, height: 12, borderRadius: "50%", background: "#ffdcc6" }} />
        <Box sx={{ width: 12, height: 12, borderRadius: "50%", background: "#adc6ff" }} />
        <Typography
          variant="caption"
          sx={{
            mx: "auto",
            fontFamily: "var(--font-mono)",
            color: "text.secondary",
            fontSize: "0.75rem",
            userSelect: "none",
          }}
        >
          guest@pragnesh-dev:~
        </Typography>
      </Box>

      {/* Terminal Screen */}
      <Box
        sx={{
          p: 3,
          height: 280,
          overflowY: "auto",
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          lineHeight: 1.6,
          color: "#adc6ff", // Light Blue terminal text
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {history.map((item, index) => (
          <Box key={index}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span style={{ color: "#3b82f6" }}>$</span>
              <span style={{ color: "#e1e2ec", fontWeight: 600 }}>{item.command}</span>
            </Box>
            <Box sx={{ mt: 0.5, color: "text.primary" }}>{item.output}</Box>
          </Box>
        ))}
        <div ref={terminalEndRef} />
      </Box>

      {/* Input Line */}
      <Box
        component="form"
        onSubmit={handleCommandSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 3,
          py: 2,
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          background: "rgba(11, 14, 21, 0.5)",
        }}
      >
        <span style={{ color: "#3b82f6", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>$</span>
        <InputBase
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type a command..."
          sx={{
            color: "#e1e2ec",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            p: 0,
          }}
        />
      </Box>
    </Paper>
  );
}
