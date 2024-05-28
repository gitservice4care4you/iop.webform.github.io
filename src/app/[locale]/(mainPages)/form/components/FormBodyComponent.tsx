import { Box, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  children?: React.ReactNode;
  label: string;
};

function FormBodyComponent({ children, label }: Props) {
  return (
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
  );
}

export default FormBodyComponent;
