import { Box, Container, Stack, Typography } from "@mui/material";
import React, { Suspense, use, useState } from "react";
import styles from "../../main.module.css";
import { useTranslations } from "next-intl";

import LoadinIndicator from "../../components/loadingIndicator/LoadingIndicator";
import ClientFormPage from "./ClientFormPage";
type Props = {};

interface Data {
  message: string;
  status: string;
}
const FormPage = (props: Props) => {
  const data: any[] = [];
  return (
    <Suspense
      fallback={
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          className={styles.bodyHeight}
        >
          <LoadinIndicator />
        </Stack>
      }
    >
      <Container maxWidth="md" disableGutters className={styles.bodyHeight}>
        <ClientFormPage data={data}></ClientFormPage>
      </Container>
    </Suspense>
  );
};

export default FormPage;
