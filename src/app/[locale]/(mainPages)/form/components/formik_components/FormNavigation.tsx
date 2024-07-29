import DefaultButton from "@/components/button/DefaultButton";
import { Box, Button, Stack } from "@mui/material";
import { FormikValues } from "formik";
import { useTranslations } from "next-intl";

interface FormNavigationProps {
  hasPrevious?: boolean;
  onBackClick: (values: FormikValues) => void;
  isLastStep: boolean;
}

export default function FormNavigation(props: FormNavigationProps) {
  const t = useTranslations("formpage");

  return (
    <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
      {props.hasPrevious ? (
        <DefaultButton
          size="small"
          width={120}
          // width={200}

          onClick={props.onBackClick}
        >
          {t("previous")}{" "}
        </DefaultButton>
      ) : (
        <Box></Box>
      )}

      <DefaultButton size="small" width={120} type="submit">
        {props.isLastStep ? t("submit") : t("next")}
      </DefaultButton>
    </Stack>
  );
}
