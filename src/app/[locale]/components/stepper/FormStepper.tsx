"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useLocale, useTranslations } from "next-intl";
import styles from "./FormStepper.module.css";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { getAppLanguage } from "@/shared/constants/languageVar";
import caches from "@/hooks/useCacheHook";
import CacheProviderRTL from "../cacheProviderRTL/CacheProviderRTL";

interface StepperProps {
  activeStep: number;
}

export default function FormStepper(props: StepperProps) {
  const t = useTranslations("formpage");
  const steps = [t("information"), t("location"), t("media")];

  return (
    <CacheProviderRTL>
      <Box sx={{ width: "100%" }}>
        <Stepper
          activeStep={props.activeStep}
          alternativeLabel
          sx={{ alignItems: "center" }}
        >
          {steps.map((label, index) => (
            <Step
              key={index}
              sx={{
                width: { md: "300px", sm: "150px", xs: "75px" },
                "& .MuiStepIcon-root": {
                  fontSize: "2rem", // Adjust this value to change the circle size
                },
                "& .MuiStep-root": {
                  height: "68px",
                },
                "& .MuiStepConnector-root": {
                  paddingTop: "5px",
                },
              }}
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </CacheProviderRTL>
  );
}
