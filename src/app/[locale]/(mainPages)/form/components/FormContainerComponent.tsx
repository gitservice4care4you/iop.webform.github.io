import { Container, Box, Stack, Typography } from "@mui/material";

import React from "react";
import MultiStepForm from "./formik_components/MultiStepForm";

type Props = {
  children?: React.ReactNode;
  label: string;
};

/**
 * A React component that renders a form container with a label and children.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the form container.
 * @param {string} props.label - The label to be displayed at the top of the form container.
 * @returns {React.ReactElement} - The form container component.
 */
function FormContainerComponent({ children, label }: Props) {
  return (
    <Container maxWidth="xl" disableGutters>
      <Box
        width={"100%"}
        //   height={"100px"}
        border={2}
        borderColor={"primary.light"}
        borderRadius={5}
        padding={4}
      >
        <Stack
          direction={"column"}
          justifyContent={"start"}
          alignItems={"start"}
          height={"100%"}
          gap={2}
        >
          <Typography marginX={"auto"} variant="h5" marginBottom={4}>
            {label}
          </Typography>

          {children}
        </Stack>
      </Box>
    </Container>
  );
}

export default FormContainerComponent;
