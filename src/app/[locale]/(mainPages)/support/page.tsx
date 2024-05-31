"use client";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "../../main.module.css";
import { useTranslations } from "next-intl";
import DefaultTextField from "../form/components/DefaultTextField";
import DefaultButton from "../../components/button/DefaultButton";

type Props = {};

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
  return (
    <Container maxWidth="xl" disableGutters className={styles.bodyHeight}>
      <Stack
        justifyContent={"start"}
        alignItems={"center"}
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
        <Typography variant="body1" width={"700px"} textAlign={"center"}>
          {t("paragraph")}
        </Typography>
      </>
    );
  }

  function supportForm() {
    return (
      <Box component="form" onSubmit={handleSubmit} width={"700px"}>
        <Stack spacing={3} alignItems={"center"}>
          <DefaultTextField
            label={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "Please enter your email" : ""}
            fullwidth={true}
          />
          <DefaultTextField
            label="Issue Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={descriptionError}
            helperText={descriptionError ? "Please enter a description" : ""}
            fullwidth={true}
            multiline
            rows={4}
          />
          <DefaultButton
            type="submit"
            variant="contained"
            color="primary"
            width={200}
          >
            Submit
          </DefaultButton>
        </Stack>
      </Box>
    );
  }
};

export default SupportPage;
