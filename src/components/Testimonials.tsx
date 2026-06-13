import React from "react";
import { Box, Typography, Grid, Avatar, Card, CardContent } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export default function Testimonials({ data }: { data: any[] }) {
  return (
    <Box sx={{ py: 8, px: 2, bgcolor: "rgba(0, 0, 0, 0.2)" }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "white", mb: 4 }}
      >
        What Clients Say
      </Typography>
      <Grid container spacing={4} sx={{ justifyContent: "center" }}>
        {data.map((testimonial, index) => (
          <Grid size={{ xs: 12, md: 5 }} key={index}>
            <Card sx={{
              bgcolor: "rgba(255, 255, 255, 0.03)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              position: "relative",
              p: 2
            }}>
              <CardContent>
                <Typography variant="body1" sx={{ fontStyle: "italic", mb: 3, lineHeight: 1.6 }}>
                  "{testimonial.text}"
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    src={testimonial.image}
                    alt={testimonial.name}
                    sx={{ bgcolor: "primary.main" }}
                  >
                    {testimonial.name?.[0] || <PersonIcon />}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", lineHeight: 1 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
