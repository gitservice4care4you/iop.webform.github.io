import { Container, Stack, Typography } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
type Props = {};

const Footer = (props: Props) => {
  const currentYear = new Date().getFullYear();
  const currentLanguage = useLocale();
  const isRTL =
    currentLanguage === "ar" || currentLanguage === "fa" ? true : false;
  const t = useTranslations("Footer");
  return (
    <>
      {/* <CssBaseline /> */}
      <Container
        component={"footer"}
        maxWidth={false}
        sx={{ backgroundColor: "primary.main" }}
      >
        <Stack
          display={"flex"}
          padding={2}
          height={"7.83vh"}
          justifyContent={"center"}
          alignItems={"start"}
        >
          <Typography
            variant="h6"
            sx={{
              typography: { sm: "body1", xs: "body2", md: "subtitle" },
              direction: isRTL ? "rtl" : "ltr",
            }}
            color={"background.default"}
          >
            ©️ {currentYear} {t("copyright")}
          </Typography>
        </Stack>
      </Container>
    </>
  );
};

export default Footer;
