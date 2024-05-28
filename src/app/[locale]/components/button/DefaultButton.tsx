"use client";
// import React from 'react';
// import { Button, ButtonProps, styled, TypographyProps } from '@mui/material';

// // Define the props interface for the DefaultButton component
// interface DefaultButtonProps extends ButtonProps {
//     // Add any additional props you want to pass to the component
//     customProp?: string;
// }

// // Styled component for the DefaultButton
// const DefaultButtonRoot = styled(Button)<DefaultButtonProps>(({ theme, customProp, }) => ({
//     // Define the base styles for the component
//     padding: theme.spacing(1, 2),
//     borderRadius: theme.shape.borderRadius,
//     textTransform: 'none',

//     // Apply styles based on the additional customProp
//     ...(customProp === 'primary' && {
//         backgroundColor: theme.palette.primary.main,
//         color: theme.palette.primary.contrastText,
//         '&:hover': {
//             backgroundColor: theme.palette.primary.dark,
//         },
//         // typography: {
//         //     sm: 'subtitle1',
//         //     xs: "subtitle1",
//         //     md: "h6",
//         // },
//     }),

//     // Add more style variations based on additional props or component state
// })
// );
// // , (({ theme, customProp, typography }) => ({
// //     // Apply typography styles based on the additional customProp
// //     ...(customProp === 'primary' && {

// //     }),
// // }))

// // DefaultButton component
// const DefaultButton: React.FC<DefaultButtonProps & TypographyProps> = ({
//     children,
//     customProp,
//     ...rest
// }) => {
//     return (
//         <DefaultButtonRoot customProp={customProp} {...rest}>
//             {children}
//         </DefaultButtonRoot>
//     );
// };

// export default DefaultButton;

// Button.tsx
import React, { ReactNode } from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

// Define additional props specific to your custom Button
interface ButtonProps
  extends Omit<MuiButtonProps, "color" | "variant" | "size"> {
  // Add any additional props you need for customization
  children: ReactNode; // Children of the button
  color?: "primary" | "secondary" | "default"; // Button color
  variant?: "contained" | "outlined" | "text"; // Button variant
  size?: "small" | "medium" | "large"; //
}

const DefaultButton: React.FC<ButtonProps> = ({
  children,
  color = "primary",
  variant = "contained",
  ...rest
}) => {
  return (
    <MuiButton
      color={color as "primary" | "secondary"}
      variant={variant}
      {...rest}
      sx={{
        typography: {
          sm: "subtitle1",
          xs: "subtitle1",
          md: "h6",
        },
        textTransform: "none",
      }}
    >
      {children}
    </MuiButton>
  );
};

export default DefaultButton;
