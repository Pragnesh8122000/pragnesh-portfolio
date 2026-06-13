"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import MenuIcon from "@mui/icons-material/Menu";
import TerminalIcon from "@mui/icons-material/Terminal";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "About", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Changes opacity on scroll
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleScrollToSection = (event: React.MouseEvent, href: string) => {
    event.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: trigger ? "rgba(16, 19, 26, 0.75)" : "rgba(16, 19, 26, 0.4)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: trigger ? "0 4px 30px rgba(0, 0, 0, 0.3)" : "none",
          transition: "all 0.3s ease-in-out",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: 80, justifyContent: "space-between" }}>
            {/* Logo */}
            <Typography
              variant="h6"
              component="a"
              href="#"
              sx={{
                fontFamily: "var(--font-sora)",
                fontWeight: 800,
                fontSize: "1.3rem",
                color: "text.primary",
                textDecoration: "none",
                letterSpacing: "-0.5px",
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              <TerminalIcon color="primary" />
              Pragnesh.dev
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={(e) => handleScrollToSection(e, item.href)}
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    "&:hover": {
                      color: "primary.main",
                      background: "rgba(59, 130, 246, 0.08)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Mobile Hamburger Toggle */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: {
            sx: {
              width: 250,
              background: "rgba(16, 19, 26, 0.95)",
              backdropFilter: "blur(16px)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.5)",
              pt: 10,
            },
          },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={(e) => handleScrollToSection(e, item.href)}
                sx={{
                  py: 2,
                  px: 4,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
                  "&:hover": {
                    background: "rgba(59, 130, 246, 0.08)",
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: "var(--font-sora)",
                        fontWeight: 600,
                        color: "text.primary",
                      }}
                    >
                      {item.label}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
