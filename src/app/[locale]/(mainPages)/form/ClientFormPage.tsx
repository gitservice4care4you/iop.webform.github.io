"use client";
import {
  Box,
  Container,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import FormStepper from "../../components/stepper/FormStepper";
import styles from "../../main.module.css";
import { useTranslations } from "next-intl";
import FormContainerComponent from "./components/FormContainerComponent";
import DatePicker from "./components/DatePicker";
import DefaultTextField from "./components/DefaultTextField";
import DefaultButton from "../../components/button/DefaultButton";
import ActionList from "./components/ActionList";
import {
  ActionListContext,
  ActionListProvider,
} from "@/context/actionsListContext";
import ActionTitleBar from "./components/ActionTitleBar";

import DefaultSelector from "../../components/select/default_selctor/DefaultSelector";
import { FieldType } from "@/shared/enum/selector";
import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";
import DefaultMultiSelector from "../../components/select/default_multi_selector/DefaultMultiSelector";
type Props = {
  data: any;
};

function ClientFormPage({ data }: Props) {
  /**
   *  * Variables
   */
  const t = useTranslations("formpage");
  const [stepperStep, setStepperStep] = useState(0);
  const [whenDate, setWhenDate] = useState<Date>();
  const [heardDate, setHeardDate] = useState<Date>();
  const [description, setDescription] = useState<Date>();
  const [whoDidIt, setWhoDidIt] = useState<Date>();
  const [rootCause, setRootCause] = useState<Date>();
  const [sourceOfInfo, setSourceOfInfo] = useState<Date>();
  const { list } = useContext(ActionListContext);

  /**
   * & Functions
   */

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
      // maxWidth="xl"
      disableGutters
      sx={{
        marginY: "auto",
        padding: "30px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        direction={"column"}
        spacing={{ xs: 1, sm: 2, md: 9 }}
        // maxWidth="xl"

        width={"100%"}
        justifyContent={"start"}
        alignItems={"center"}
        flexGrow={1}
      >
        <Typography variant="h3">{t("title")}</Typography>
        <FormStepper activeStep={stepperStep} />
        {currentPage()}

        {nextPreviousButton()}
      </Stack>
    </Container>
  );

  /**
   * Determines the current page to render based on the current stepper step.
   * @returns {JSX.Element} The component for the current page.
   */
  function currentPage() {
    switch (stepperStep) {
      case 0:
        return informationSection();
      case 1:
        return locationSection();
      default:
        return mediaSection();
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                            //^ Location Section                            */
  /* -------------------------------------------------------------------------- */

  function locationSection() {
    return (
      <FormContainerComponent label={t("location")}>
        <DefaultSelector
          label={t("country")}
          values={[]}
          value={undefined}
          required={FieldType.Required}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        ></DefaultSelector>
        <DefaultSelector
          label={"Area"}
          values={[]}
          value={undefined}
          required={FieldType.Required}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        ></DefaultSelector>
        {/* <DefaultSelector
          label={t("city")}
          values={[]}
          value={undefined}
          required={FieldType.Required}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        ></DefaultSelector> */}
        <DefaultSelector
          label={t("locationDetails")}
          values={[]}
          value={undefined}
          required={FieldType.Optional}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        ></DefaultSelector>
      </FormContainerComponent>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                            //^ Media Section                            */
  /* -------------------------------------------------------------------------- */

  function mediaSection() {
    const uploader = Uploader({
      apiKey: "free", // Get production API keys from Bytescale
    });
    const options = {
      multi: true,
      showFinishButton: false,
      styles: {
        colors: {
          primary: "#1F8A70",
        },
      },
    };

    return (
      <FormContainerComponent label={t("media")}>
        <Stack width={"100%"} height={"100%"} alignItems={"center"}>
          <UploadDropzone
            uploader={uploader}
            options={options}
            onUpdate={(files) => alert(files.map((x) => x.fileUrl).join("\n"))}
            width="600px"
            height="375px"
          />
        </Stack>
      </FormContainerComponent>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                           //^ Information Section                          */
  /* -------------------------------------------------------------------------- */
  /**
   * Renders the information section of the client form page.
   * This section includes fields for when the incident happened, when the user heard about it, a description, and selectors for who was involved, the root cause, and the source of the information.
   * The section is wrapped in an `ActionListProvider` to manage the state of the action list.
   */
  function informationSection() {
    return (
      <ActionListProvider initialList={[]}>
        <FormContainerComponent label={t("information")}>
          <DatePicker
            label={t("whenHappen")}
            value={whenDate!}
            onChange={handleWhenDateChange}
            required={FieldType.Required}
            helperText={
              ""
              // errors.whenDate
            }
          />
          <DatePicker
            label={t("whenHear")}
            value={heardDate!}
            onChange={handleHeardDateChange}
            required={FieldType.Required}
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

          <DefaultMultiSelector
            values={[
              "Oliver Hansen",
              "Van Henry",
              "April Tucker",
              "Ralph Hubbard",
              "Omar Alexander",
              "Carlos Abbott",
              "Miriam Wagner",
              "Bradley Wilkerson",
              "Virginia Andrews",
              "Kelly Snyder",
            ]}
            value={0}
            label={t("who")}
            required={FieldType.Required}
            onChange={function (value: SelectChangeEvent): void {
              throw new Error("Function not implemented.");
            }}
          />
          <DefaultMultiSelector
            values={[
              "Oliver Hansen",
              "Van Henry",
              "April Tucker",
              "Ralph Hubbard",
              "Omar Alexander",
              "Carlos Abbott",
              "Miriam Wagner",
              "Bradley Wilkerson",
              "Virginia Andrews",
              "Kelly Snyder",
            ]}
            value={0}
            label={t("rootCause")}
            required={FieldType.Required}
            onChange={function (value: SelectChangeEvent): void {
              throw new Error("Function not implemented.");
            }}
          />
          <DefaultMultiSelector
            values={[
              "Oliver Hansen",
              "Van Henry",
              "April Tucker",
              "Ralph Hubbard",
              "Omar Alexander",
              "Carlos Abbott",
              "Miriam Wagner",
              "Bradley Wilkerson",
              "Virginia Andrews",
              "Kelly Snyder",
            ]}
            value={0}
            label={t("sourceInfo")}
            required={FieldType.Required}
            onChange={function (value: SelectChangeEvent): void {
              throw new Error("Function not implemented.");
            }}
          />
        </FormContainerComponent>
      </ActionListProvider>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                // ^ Buttons                                */
  /* -------------------------------------------------------------------------- */

  /**
   * Renders a stack of "Previous" and "Next" buttons for navigating through a multi-step form.
   *
   * The buttons are displayed with a space between them, and the "Previous" button is only shown if the current step is not the first step.
   * The "Next" button is only shown if the current step is not the last step.
   *
   * When the "Previous" or "Next" button is clicked, the `setStepperStep` function is called to update the current step.
   *
   * @returns A React element containing the "Previous" and "Next" buttons.
   */
  function nextPreviousButton() {
    return (
      <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
        {stepperStep != 0 ? (
          <DefaultButton
            size="small"
            width={120}
            // width={200}
            onClick={() => {
              const nextStep = stepperStep - 1;
              if (nextStep >= 0) {
                setStepperStep(nextStep);
              }
            }}
          >
            {t("previous")}{" "}
          </DefaultButton>
        ) : (
          <Box></Box>
        )}
        {stepperStep == 2 ? (
          <DefaultButton
            size="small"
            width={120}
            onClick={(e) => {
              // TODO: Submit function
            }}
          >
            {t("submit")}
          </DefaultButton>
        ) : (
          <DefaultButton
            size="small"
            width={120}
            onClick={(e) => {
              const nextStep = stepperStep + 1;
              if (nextStep <= 2) {
                setStepperStep(nextStep);
              }
            }}
          >
            {t("next")}
          </DefaultButton>
        )}
      </Stack>
    );
  }
}

export default ClientFormPage;
