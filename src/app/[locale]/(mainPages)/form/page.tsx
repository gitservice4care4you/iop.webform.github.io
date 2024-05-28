import { Box, Container, Stack, Typography } from "@mui/material";
import React, { Suspense, use, useState } from "react";
import styles from "../../main.module.css";
import { useTranslations } from "next-intl";

import { getDogs } from "./getDogs";
import CircularIndeterminate from "../../components/loadingIndicator/LoadingIndicator";
import ClientFormPage from "./ClientFormPage";
type Props = {};

interface Data {
  message: string;
  status: string;
}
const FormPage = (props: Props) => {
  let data: Data = use(getDogs());

  return (
    <Suspense
      fallback={
        <div>
          <CircularIndeterminate />
        </div>
      }
    >
      <Box
        className={styles.bodyHeight}
        sx={{ backgroundColor: "background.default" }}
      >
        <ClientFormPage data={data}></ClientFormPage>
      </Box>
    </Suspense>
  );
};

export default FormPage;
