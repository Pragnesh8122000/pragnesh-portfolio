import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { AutoAwesome, AccountTree, Cloud, Code } from "@mui/icons-material";

const iconMap: Record<string, React.ReactNode> = {
  AutoAwesome: <AutoAwesome color="primary" />,
  AccountTree: <AccountTree color="primary" />,
  Cloud: <Cloud color="primary" />,
  Code: <Code color="primary" />,
};

export default function Services({ data }: { data: any[] }) {
  return (
    <Box id="services" sx={{ py: 8, px: 2 }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "white", mb: 4 }}
      >
        What I Can Do For You
      </Typography>
      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        {data.map((service, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card sx={{
              height: "100%",
              bgcolor: "rgba(255, 255, 255, 0.05)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                borderColor: "primary.main",
              }
            }}>
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
                  {iconMap[service.icon] || <AutoAwesome color="primary" />}
                </Box>
                <Typography variant="h6" component="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
