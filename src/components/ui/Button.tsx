import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(MuiButton)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 8,
  padding: "12px 24px",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: theme.shadows[4],
  },
  transition: "all 0.2s ease-in-out",
}));

interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  disabled,
  ...props
}) => {
  return (
    <StyledButton disabled={disabled || loading} {...props}>
      {loading ? <CircularProgress size={20} color="inherit" /> : children}
    </StyledButton>
  );
};
