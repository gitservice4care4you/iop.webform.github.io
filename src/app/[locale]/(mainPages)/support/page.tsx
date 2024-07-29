"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import styles from "../../main.module.css";
import { useTranslations } from "next-intl";
import DefaultTextField from "../form/components/DefaultTextField";
import DefaultButton from "@/components/button/DefaultButton";
import { Form, Formik } from "formik";
import FormikTextField from "../form/components/formik_components/FormikTextField";
import { FieldType } from "@/shared/enum/selector";
import * as Yup from "yup";

type Props = {};

const validationSchema = Yup.object({
  email: Yup.string().email().required("Required"),
  description: Yup.string().required("Required"),
});
const initialValues = {
  email: "",
  description: "",
};
const SupportPage = (props: Props) => {
  const [email, setEmail] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (
    e
  ) => {
    e.preventDefault();
    setEmailError(false);
    setDescriptionError(false);

    if (!email) {
      setEmailError(true);
    }

    if (!description) {
      setDescriptionError(true);
    }

    if (email && description) {
      // Submit form data
      console.log("Email:", email);
      console.log("Description:", description);
    }
  };
  const t = useTranslations("supportpage");
  const ft = useTranslations("formpage");
  return (
    <Container maxWidth="md" disableGutters className={styles.bodyHeight}>
      <Stack
        justifyContent={"start"}
        alignItems={"center"}
        // maxWidth={"xl"}
        className={styles.bodyHeight}
        padding={4}
        spacing={3}
      >
        {titles()}
        {supportForm()}
      </Stack>
    </Container>
  );

  function titles() {
    return (
      <>
        <Typography variant="h3">{t("title")}</Typography>
        <Typography variant="body1" textAlign={"center"}>
          {t("paragraph")}
        </Typography>
      </>
    );
  }

  function supportForm() {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log("sub");
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isSubmitting, errors, touched, values }) => {
          return (
            <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Box width={"100%"}>
                <Stack spacing={3} alignItems={"center"}>
                  <FormikTextField
                    label={t("email")}
                    name="email"
                    required={FieldType.Required}
                  />

                  <FormikTextField
                    label={t("issueDescription")}
                    name="description"
                    fullwidth={true}
                    multiline
                    rows={4}
                    required={FieldType.Required}
                  />
                  <DefaultButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    width={200}
                  >
                    {ft("submit")}
                  </DefaultButton>
                </Stack>
              </Box>
            </Form>
          );
        }}
      </Formik>
    );
  }
};

export default SupportPage;
