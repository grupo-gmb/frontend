import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

interface InputProps extends Omit<TextFieldProps, "variant"> {
  label: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = "",
  ...props
}) => {
  return (
    <StyledTextField
      variant="outlined"
      fullWidth
      label={label}
      error={error}
      helperText={helperText}
      className={`${className}`}
      {...props}
    />
  );
};
