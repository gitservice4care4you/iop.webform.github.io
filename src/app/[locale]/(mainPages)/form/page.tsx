import { Container, Stack } from "@mui/material";
import React, { Suspense } from "react";
import styles from "../../main.module.css";

import LoadinIndicator from "@/components/loadingIndicator/LoadingIndicator";
import FormikFormPage from "./FormikFormPage";
// import ClientFormPage from "./FormikFormPage";
// import MultiStepForm from "./components/MultiStepForm";
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
        {/* <ClientFormPage data={data}></ClientFormPage> */}
        <FormikFormPage></FormikFormPage>
      </Container>
    </Suspense>
  );
};

export default FormPage;
