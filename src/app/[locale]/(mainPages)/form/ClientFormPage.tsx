"use client";
import {
  Avatar,
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import FormStepper from "../../components/stepper/FormStepper";
import styles from "../../main.module.css";
import { useTranslations } from "next-intl";
import FormBodyComponent from "./components/FormBodyComponent";
import BasicDatePicker from "./components/DatePicker";
import DatePicker from "./components/DatePicker";
import DefaultTextField from "./components/DefaultTextField";
import DefaultButton from "../../components/button/DefaultButton";
import ActionList from "./components/ActionList";
import AddActionModal from "./components/AddActionModal";
import {
  ActionListContext,
  ActionListProvider,
} from "@/context/actionsListContext";
import ActionTitleBar from "./components/ActionTitleBar";
import { error } from "console";
import DefaultSelector from "../../components/select/default_selctor/DefaultSelector";
// import { ActionContext } from "@/context/actionListListContext";
type Props = {
  data: any;
};

function ClientFormPage({ data }: Props) {
  const t = useTranslations("formpage");
  const [stepperStep, setStepperStep] = useState(0);
  const [whenDate, setWhenDate] = useState<Date>();
  const [heardDate, setHeardDate] = useState<Date>();
  const [description, setDescription] = useState<Date>();
  const [whoDidIt, setWhoDidIt] = useState<Date>();
  const [rootCause, setRootCause] = useState<Date>();
  const [sourceOfInfo, setSourceOfInfo] = useState<Date>();
  const { list } = useContext(ActionListContext);

  const handleWhenDateChange = (newValue: Date | null) => {
    if (newValue != null) {
      setWhenDate(newValue!);
    }
  };
  const handleHeardDateChange = (newValue: Date | null) => {
    if (newValue != null) {
      setHeardDate(newValue!);
    }
  };

  return (
    <Container
      className={styles.bodyHeight}
      maxWidth="xl"
      disableGutters
      sx={{
        marginY: "auto",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "column", md: "column" }}
        spacing={{ xs: 1, sm: 2, md: 9 }}
        maxWidth="xl"
        justifyContent={"start"}
        alignItems={"center"}
        flexGrow={1}
      >
        <Typography variant="h3">{t("title")}</Typography>
        <FormStepper activeStep={0} />
        <ActionListProvider initialList={[]}>
          <FormBodyComponent label={t("information")}>
            <DatePicker
              label={t("whenHappen")}
              value={whenDate!}
              onChange={handleWhenDateChange}
              required={true}
              helperText={
                ""
                // errors.whenDate
              }
            />
            <DatePicker
              label={t("whenHear")}
              value={heardDate!}
              onChange={handleHeardDateChange}
              required={true}
              helperText={
                ""
                // errors.heardDate
              }
            />
            {/* Description */}
            <DefaultTextField
              rows={4}
              multiline={true}
              fullwidth={true}
              label={t("description")}
              required={true}
              validationRules={{
                minLength: 30,
                maxLength: 600,
              }}
            />
            <Stack direction={"column"} width={"100%"}>
              <ActionTitleBar></ActionTitleBar>
              <ActionList></ActionList>
            </Stack>

            <DefaultSelector
              values={[]}
              value={""}
              label={t("who")}
              onChange={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
            />
            <DefaultSelector
              values={[]}
              value={""}
              label={t("rootCause")}
              onChange={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
            />
            <DefaultSelector
              values={[]}
              value={""}
              label={t("sourceInfo")}
              onChange={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          </FormBodyComponent>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            {stepperStep == 1 ? (
              <DefaultButton size="small" onClick={() => {}}>
                {t("previous")}{" "}
              </DefaultButton>
            ) : (
              <Box></Box>
            )}
            {stepperStep == 3 ? (
              <Box></Box>
            ) : (
              <DefaultButton size="small" onClick={(e) => {}}>
                {t("next")}
              </DefaultButton>
            )}
          </Stack>
        </ActionListProvider>
      </Stack>
    </Container>
  );
}

export default ClientFormPage;
