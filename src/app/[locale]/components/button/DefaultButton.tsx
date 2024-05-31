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
}

const DefaultButton: React.FC<ButtonProps> = ({
  children,
  color = "primary",
  variant = "contained",
  width,
  height,
  ...rest
}) => {
  let style: SxProps<Theme> | undefined = {
    typography: {
      sm: "subtitle1",
      xs: "subtitle1",
      md: "subtitle1",
    },
    textTransform: "none",
    width: width != null ? `${width}px` : null,
    height: height != null ? `${height}px` : null,
  };

  return (
    <MuiButton
      color={color as "primary" | "secondary"}
      variant={variant}
      {...rest}
      sx={style}
    >
      {children}
    </MuiButton>
  );
};

export default DefaultButton;
