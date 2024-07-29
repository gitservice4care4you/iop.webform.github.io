"use client";
import {
  Box,
  Container,
  listItemAvatarClasses,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../main.module.css";
import { useTranslations } from "next-intl";
import FormContainerComponent from "./components/FormContainerComponent";
import DatePicker from "./components/DatePicker";
import DefaultTextField from "./components/DefaultTextField";
import ActionList from "./components/ActionList";
import {
  ActionListContext,
  ActionListProvider,
} from "@/context/actionsListContext";
import ActionTitleBar from "./components/ActionTitleBar";
import { FieldType } from "@/shared/enum/selector";
import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";
import FormStepper from "@/components/stepper/FormStepper";
import DefaultButton from "@/components/button/DefaultButton";
import DefaultMultiSelector from "@/components/select/default_multi_selector/DefaultMultiSelector";
import DefaultSelector from "@/components/select/default_selctor/DefaultSelector";
// import MultiStepForm, { FormStep } from "./components/MultiStepForm";
import * as Yup from "yup";
import { Field, Form, Formik, FormikErrors, FormikTouched } from "formik";
type Props = {
  data: any; // TODO: to be changed with the API schema
};

const infoValidationRules = {
  whenHappen: { required: true },
  whenHear: { required: true },
  description: { required: true },
  whatHappened: { required: true },
  whoDidIt: { required: true },
  rootCause: { required: true },
  sourceOfInfo: { required: true },
};
const locationValidationRules = {
  country: { required: true },
  area: { required: true },
  locationDetails: { required: false },
};

type FormData = {
  whenHappen: Date | null;
  whenHear: Date | null;
  description: string;
  whatHappened: string[];
  whoDidIt: string[];
  rootCause: string[];
  sourceOfInfo: string[];
  country: string;
  area: string;
  locationDetails: string;
};
type infoFormData = {
  whenHappen?: string;
  whenHear?: string;
  description?: string;
  whatHappened?: string[];
  whoDidIt?: string[];
  rootCause?: string[];
  sourceOfInfo?: string[];
};
function ClientFormPage({ data }: Props) {
  /**
   *  * Variables
   */

  const { list } = useContext(ActionListContext);
  const t = useTranslations("formpage");
  const [stepperStep, setStepperStep] = useState(0);
  const [infoData, setInfoData] = useState<infoFormData>({});

  const [infoError, setInfoError] = useState<{
    [key: string]: string | undefined;
  }>({});
  const [locationError, setLocationError] = useState<{ [key: string]: string }>(
    {}
  );
  const initialValues: FormData = {
    whenHappen: null,
    whenHear: null,
    description: "",
    whatHappened: [],
    whoDidIt: [],
    rootCause: [],
    sourceOfInfo: [],
    country: "",
    area: "",
    locationDetails: "",
  };
  const validationSchema = Yup.object().shape({
    whenHappen: Yup.date().required(t("validation.general")),
    whenHear: Yup.date().required(t("validation.general")),
    description: Yup.string().required(t("validation.general")),
    whatHappened: Yup.array().min(1, t("validation.atLeastOne")),
    whoDidIt: Yup.array().min(1, t("validation.atLeastOne")),
    rootCause: Yup.array().min(1, t("validation.atLeastOne")),
    sourceOfInfo: Yup.array().min(1, t("validation.atLeastOne")),
    country: Yup.string().required(t("validation.general")),
    area: Yup.string().required(t("validation.general")),
    locationDetails: Yup.string(),
  });
  /**
   * & Functions
   */

  // const handleWhenDateChange = (newValue: Date | null) => {
  //   if (newValue != null) {
  //     setInfoData((prevData) => ({
  //       ...prevData,
  //       whenHappen:
  //         prevData.whenHappen == undefined || prevData.whenHappen == ""
  //           ? newValue.toString()
  //           : prevData.whenHappen,
  //     }));
  //     setInfoError((prevErrors) => ({
  //       ...prevErrors,
  //     }));
  //   }
  // };
  // const handleHeardDateChange = (newValue: Date | null) => {
  //   if (newValue != null) {
  //     setInfoData((prevData) => ({
  //       ...prevData,
  //       whenHear:
  //         prevData.whenHear == undefined || prevData.whenHear == ""
  //           ? newValue.toString()
  //           : prevData.whenHear,
  //     }));
  //     setInfoError((prevErrors) => ({
  //       ...prevErrors,
  //     }));
  //   }
  // };
  // const handleDescriptionChange = (
  //   newValue: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   if (newValue.target.value != null) {
  //     setInfoData((prevData) => ({
  //       ...prevData,
  //       description: newValue.target!.value,
  //     }));
  //     setInfoError((prevErrors) => ({
  //       ...prevErrors,
  //       description: undefined,
  //     }));
  //   }
  // };

  function handleSubmit(values: FormData) {
    console.log(values);
    // TODO: Submit function
  }
  // useEffect(() => {
  //   if (list.length != 0) {
  //     setInfoError((prevData) => ({ ...prevData }));
  //   }
  // }, [list]);

  // const validateInfoPage = () => {
  //   const newErrors: { [key: string]: string } = {};
  //   const requiredFields: (keyof infoFormData)[] = [
  //     "whenHear",
  //     "whenHappen",
  //     "description",
  //     "whatHappened",
  //     "whoDidIt",
  //     "rootCause",
  //     "sourceOfInfo",
  //   ];

  //   requiredFields.forEach((field) => {
  //     if (field == "whatHappened") {
  //       if (list.length === 0) {
  //         newErrors[field] = t("validation.general");
  //       }
  //       // if (
  //       //   Object.keys(!infoData[field]).length === 0 &&
  //       //   infoValidationRules[field as keyof typeof infoValidationRules]
  //       //     ?.required
  //       // ) {
  //       //   newErrors[field] = t("validation.general");
  //       // }
  //     }
  //     if (
  //       !infoData[field] &&
  //       infoValidationRules[field as keyof typeof infoValidationRules]?.required
  //     ) {
  //       newErrors[field] = t("validation.general");
  //     }
  //   });

  //   if (Object.keys(newErrors).length === 0) {
  //     return true;
  //   } else {
  //     setInfoError(newErrors);
  //     return false;
  //   }
  // };

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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <Stack
              direction={"column"}
              spacing={{ xs: 1, sm: 2, md: 9 }}
              width={"100%"}
              justifyContent={"start"}
              alignItems={"center"}
              flexGrow={1}
            >
              <Typography variant="h3" textAlign={"center"}>
                {t("title")}
              </Typography>
              <FormStepper activeStep={stepperStep} />

              {currentPage(errors, touched, setFieldValue, values)}

              {nextPreviousButton(errors)}
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );

  /**
   * Determines the current page to render based on the current stepper step.
   * @returns {JSX.Element} The component for the current page.
   */
  function currentPage(
    errors: FormikErrors<FormData>,
    touched: FormikTouched<FormData>,
    setFieldValue: any,
    values: FormData
  ) {
    switch (stepperStep) {
      case 0:
        return informationSection(errors, touched, setFieldValue, values);
      case 1:
        return locationSection(errors, touched, setFieldValue);
      default:
        return mediaSection();
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                            //^ Location Section                            */
  /* -------------------------------------------------------------------------- */

  function locationSection(
    errors: FormikErrors<FormData>,
    touched: FormikTouched<FormData>,
    setFieldValue: any
  ) {
    return (
      <FormContainerComponent label={t("location")}>
        <Field
          name="country"
          as={DefaultSelector}
          label={t("country")}
          values={[]}
          required={FieldType.Required}
          error={touched.country && errors.country}
          onChange={(value: any) => setFieldValue("country", value)}
        />
        <Field
          name="area"
          as={DefaultSelector}
          label={t("area")}
          values={[]}
          required={FieldType.Required}
          error={touched.area && errors.area}
          onChange={(value: any) => setFieldValue("area", value)}
        />
        <Field
          name="locationDetails"
          as={DefaultSelector}
          label={t("locationDetails")}
          values={[]}
          required={FieldType.Optional}
          error={touched.locationDetails && errors.locationDetails}
          onChange={(value: any) => setFieldValue("locationDetails", value)}
        />
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
  function informationSection(
    errors: FormikErrors<FormData>,
    touched: FormikTouched<FormData>,
    setFieldValue: any,
    values: FormData
  ) {
    return (
      <ActionListProvider initialList={[]}>
        <FormContainerComponent label={t("information")}>
          <Field
            name="whenHappen"
            label={t("whenHappen")}
            as={DatePicker}
            error={touched.whenHappen && errors.whenHappen}
            onChange={(value: Date | null) =>
              setFieldValue("whenHappen", value)
            }
            required={FieldType.Required}
          />
          <Field
            name="whenHear"
            as={DatePicker}
            label={t("whenHear")}
            error={touched.whenHear && errors.whenHear}
            onChange={(value: Date | null) => setFieldValue("whenHear", value)}
            required={FieldType.Required}
          />
          <Field
            name="description"
            as={DefaultTextField}
            rows={4}
            multiline={true}
            fullwidth={true}
            error={touched.description && errors.description}
            label={t("description")}
            required={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFieldValue("description", e.target.value)
            }
            value={values.description}
            validationRules={{
              minLength: 30,
              maxLength: 600,
            }}
          />
          <Stack direction={"column"} width={"100%"}>
            <ActionTitleBar></ActionTitleBar>
            <ActionList
              error={touched.whatHappened && errors.whatHappened ? true : false}
              values={list}
            ></ActionList>
            {touched.whatHappened && errors.whatHappened && (
              <Typography
                marginInlineStart={1.5}
                variant="body2"
                fontSize={"12px"}
                color={"error"}
              >
                {errors.whatHappened}
              </Typography>
            )}
          </Stack>

          <Field
            name="whoDidIt"
            as={DefaultMultiSelector}
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
            label={t("who")}
            error={touched.whoDidIt && errors.whoDidIt}
            required={FieldType.Required}
            onChange={(value: string[]) => setFieldValue("whoDidIt", value)}
          />
          <Field
            name="rootCause"
            as={DefaultMultiSelector}
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
            label={t("rootCause")}
            required={FieldType.Required}
            error={touched.rootCause && errors.rootCause}
            onChange={(value: string[]) => setFieldValue("rootCause", value)}
          />
          <Field
            name="sourceOfInfo"
            as={DefaultMultiSelector}
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
            label={t("sourceInfo")}
            required={FieldType.Required}
            error={touched.sourceOfInfo && errors.sourceOfInfo}
            onChange={(value: string[]) => setFieldValue("sourceOfInfo", value)}
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
  function nextPreviousButton(errors: FormikErrors<FormData>) {
    return (
      <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
        {stepperStep != 0 ? (
          // & Previous
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
        {/* // & Submit */}
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
          //& Next
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
