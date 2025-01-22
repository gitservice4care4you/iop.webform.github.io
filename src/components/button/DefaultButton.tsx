"use client";

// Button.tsx
import React, { ReactNode } from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  SxProps,
  Theme,
} from "@mui/material";

interface ButtonProps
  extends Omit<MuiButtonProps, "color" | "variant" | "size"> {
  children: ReactNode; // Children of the button
  color?: "primary" | "secondary" | "default";
  width?: number;
  height?: number;
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large"; //
  type?: "submit" | "button" | "reset";
  sx?: SxProps<Theme>;
}

const DefaultButton: React.FC<ButtonProps> = ({
  children,
  color = "primary",
  variant = "contained",
  width,
  height,
  type,
  sx,
  ...rest
}) => {
  let style: SxProps<Theme> = {
    typography: {
      sm: "subtitle1",
      xs: "subtitle1",
      md: "subtitle1",
    },
    textTransform: "none",
    width: width != null ? `${width}px` : null,
    height: height != null ? `${height}px` : null,
    ...sx,
  };

  return (
    <MuiButton
      color={color as "primary" | "secondary"}
      variant={variant}
      {...rest}
      sx={style}
      type={type}
    >
      {children}
    </MuiButton>
  );
};

export default DefaultButton;
