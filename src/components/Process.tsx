import React from "react";
import { Box, Typography, Grid, Step } from "@mui/material";

export default function Process({ data }: { data: any[] }) {
  return (
    <Box sx={{ py: 8, px: 2 }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "white", mb: 4 }}
      >
        My Working Process
      </Typography>
      <Grid container spacing={0} sx={{ justifyContent: "center", alignItems: "start" }}>
        {data.map((step, index) => (
          <Grid size={{ xs: 12, md: 3 }} key={index} sx={{ position: "relative", textAlign: "center", px: 3 }}>
            <Box sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
              fontWeight: "bold",
              zIndex: 2,
              position: "relative"
            }}>
              {step.step}
            </Box>

            {/* Connector line for desktop */}
            {index < data.length - 1 && (
              <Box sx={{
                display: { xs: 'none', md: 'block' },
                position: "absolute",
                top: 20,
                left: "50%",
                right: "50%",
                width: "100%",
                height: "2px",
                bgcolor: "rgba(255, 255, 255, 0.1)",
                zIndex: 1,
                transform: "translateX(0)"
              }}
              style={{
                left: '50%',
                width: '100%',
                marginLeft: '20px'
              }}
              />
            )}

            <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", mb: 1 }}>
              {step.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {step.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
