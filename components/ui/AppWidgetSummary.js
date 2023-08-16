import React from "react";
// @mui
import { alpha, styled } from "@mui/material/styles";
import { Card, Icon, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../utils/formatNumber";
// components

import palette from "../../theme/palette";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

export const AppWidgetSummary = ({
  title,
  total,
  icon,
  color = "primary",
  sx,
  icono,
  ...other
}) => {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "center",
        color: palette[color].darker,
        bgcolor: palette[color].lighter,
        borderRadius: "15px",
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(
              palette[color].dark,
              0
            )} 0%, ${alpha(palette[color].dark, 0.24)} 100%)`,
          width: "70px",
          height: "70px",
        }}
      >
        <SpeedOutlinedIcon sx={{ fontSize: 40 }} />
      </StyledIcon>

      <Typography variant="h3">{fShortenNumber(total)}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
};
