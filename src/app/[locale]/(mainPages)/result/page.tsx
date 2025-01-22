"use client";
import { Container, Stack, Typography } from "@mui/material";
import React, { Suspense } from "react";
import styles from "../../main.module.css";

import LoadinIndicator from "@/components/loadingIndicator/LoadingIndicator";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import theme from "@/styles/theme";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import DefaultButton from "@/components/button/DefaultButton";
import { useLocale, useTranslations } from "next-intl";
type Props = {};

interface Data {
  message: string;
  status: string;
}
const ResultPage = (props: Props) => {
  const router = useRouter();
  const t = useTranslations("resultpage");
  const tNavBar = useTranslations("Navbar");
  const currentLocale = useLocale();

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

        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          className={styles.bodyHeight}
          padding={4}
        >
          <CheckCircleIcon
            style={{
              color: theme.palette.primary.main,
              fontSize: 150,
              marginBottom: 20,
            }}
          />
          <Typography
            variant="h2"
            fontWeight={"bold"}
            align="center"
            marginBottom={3}
          >
            {t("successful-title")}
          </Typography>
          <Typography variant="h6" marginBottom={5} align="center">
            {t("successful-paragraph")}
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }}>
            <DefaultButton
              onClick={() => router.push("/")}
              width={150}
              sx={{ marginInlineEnd: 5, marginBottom: { xs: 2, sm: 0 } }}
            >
              {tNavBar("form")}
            </DefaultButton>
            <DefaultButton
              width={150}
              onClick={() => router.push(`/${currentLocale}/support`)}
            >
              {tNavBar("support")}
            </DefaultButton>
          </Stack>
        </Stack>
      </Container>
    </Suspense>
  );
};

export default ResultPage;
