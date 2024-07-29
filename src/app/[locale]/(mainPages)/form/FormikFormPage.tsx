"use client";
import styles from "../../main.module.css";
import { Uploader } from "uploader";

import FormStepper from "@/components/stepper/FormStepper";
import {
  Button,
  Stack,
  Typography,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import Container from "@mui/material/Container";
import {
  Field,
  FieldArray,
  Form,
  Formik,
  FormikHelpers,
  FormikValues,
} from "formik";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";
import * as Yup from "yup";
import { FieldType } from "@/shared/enum/selector";
import FormContainerComponent from "./components/FormContainerComponent";
import DefaultButton from "@/components/button/DefaultButton";
import FormikTextField from "./components/formik_components/FormikTextField";
import {
  ActionListContext,
  ActionListProvider,
} from "@/context/actionsListContext";
import ActionTitleBar from "./components/ActionTitleBar";
import ActionList from "./components/ActionList";
import FormikActionList from "./components/formik_components/FormikActionList";
import FormikActionTitleBar from "./components/formik_components/FormikActionTitleBar";
import { ActionListModel } from "./models/ActionListModel";
import FormikMultiSelector from "./components/formik_components/FormikMultiSelector";
import MultiStepForm from "./components/formik_components/MultiStepForm";
import { FormStep } from "./components/formik_components/MultiStepForm";
import { UploadDropzone } from "react-uploader";
import FormikSingleSelector from "./components/formik_components/FormikSingleSelector";
import FormikDatePicker from "./components/formik_components/FormikDatePicker";

export type FormData = {
  whenHappen: Date | null;
  whenHear: Date | null;
  description: string;
  whatHappened: ActionListModel[];
  whoDidIt: string[];
  rootCause: string[];
  sourceOfInfo: string[];
  country: string;
  area: string;
  locationDetails: string;
};
const FormikFormPage = () => {
  const t = useTranslations("formpage");
  const { list } = useContext(ActionListContext);

  const infoValidationSchema = Yup.object({
    whenHappen: Yup.date().required(t("validation.general")),
    whenHear: Yup.date().required(t("validation.general")),
    description: Yup.string().required(t("validation.general")),
    whatHappened: Yup.array().min(1, t("validation.atLeastOne")),
    whoDidIt: Yup.array().min(1, t("validation.atLeastOne")),
    rootCause: Yup.array().min(1, t("validation.atLeastOne")),
    sourceOfInfo: Yup.array().min(1, t("validation.atLeastOne")),
  });

  const locationValidationSchema = Yup.object({
    country: Yup.string().required("Required"),
    area: Yup.string().required("Required"),
    locationDetails: Yup.string(),
  });
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

  return (
    <MultiStepForm
      initialValues={initialValues}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {informationStep()}
      {locationStep()}
      {mediaStep()}
    </MultiStepForm>
  );

  function informationStep() {
    return (
      <FormStep
        stepName="name"
        onSubmit={() => {
          console.log();
        }}
        validationSchema={infoValidationSchema}
      >
        <FormContainerComponent label={t("information")}>
          <FormikDatePicker
            name="whenHappen"
            label={t("whenHappen")}
            required={FieldType.Required}
          />
          <FormikDatePicker
            name="whenHear"
            label={t("whenHear")}
            required={FieldType.Required}
          />
          <FormikTextField
            name="description"
            label={t("description")}
            required={FieldType.Required}
            rows={4}
            multiline={true}
            fullwidth={true}
          />
          <FieldArray name="whatHappened">
            {(arrayMethods) => (
              <Stack direction={"column"} width={"100%"}>
                <FormikActionTitleBar arrayMethods={arrayMethods} />
                <FormikActionList
                  name="whatHappened"
                  error={
                    arrayMethods.form.touched.whatHappened &&
                    arrayMethods.form.errors.whatHappened
                      ? true
                      : false
                  }
                  values={list}
                  arrayMethods={arrayMethods}
                />
                {arrayMethods.form.touched.whatHappened &&
                  arrayMethods.form.errors.whatHappened && (
                    <Typography
                      marginInlineStart={1.5}
                      variant="body2"
                      fontSize={"12px"}
                      color={"error"}
                    >
                      {arrayMethods.form.errors.whatHappened as string}
                    </Typography>
                  )}
              </Stack>
            )}
          </FieldArray>
          <FieldArray name="whoDidIt">
            {(arrayMethods) => (
              <FormikMultiSelector
                required={FieldType.Required}
                name={"whoDidIt"}
                label={t("who")}
                options={[
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
              ></FormikMultiSelector>
            )}
          </FieldArray>
          <FieldArray name="rootCause">
            {(arrayMethods) => (
              <FormikMultiSelector
                required={FieldType.Required}
                name={"rootCause"}
                label={t("rootCause")}
                options={[
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
              ></FormikMultiSelector>
            )}
          </FieldArray>
          <FieldArray name="sourceOfInfo">
            {(arrayMethods) => (
              <FormikMultiSelector
                required={FieldType.Required}
                name={"sourceOfInfo"}
                label={t("sourceInfo")}
                options={[
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
              ></FormikMultiSelector>
            )}
          </FieldArray>
        </FormContainerComponent>
      </FormStep>
    );
  }
  function locationStep() {
    return (
      <FormStep stepName="elias" validationSchema={locationValidationSchema}>
        <FormContainerComponent label={t("location")}>
          <FieldArray name="country">
            {(arrayMethods) => (
              <FormikSingleSelector
                required={FieldType.Required}
                name={"country"}
                label={t("country")}
                options={[
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
              ></FormikSingleSelector>
            )}
          </FieldArray>
          <FieldArray name="area">
            {(arrayMethods) => (
              <FormikSingleSelector
                required={FieldType.Required}
                name={"area"}
                label={t("area")}
                options={[
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
              ></FormikSingleSelector>
            )}
          </FieldArray>
          <FieldArray name="locationDetails">
            {(arrayMethods) => (
              <FormikSingleSelector
                required={FieldType.Optional}
                name={"locationDetails"}
                label={t("locationDetails")}
                options={[
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
              ></FormikSingleSelector>
            )}
          </FieldArray>
        </FormContainerComponent>
      </FormStep>
    );
  }

  function mediaStep() {
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
      <FormStep stepName="elias" validationSchema={locationValidationSchema}>
        <FormContainerComponent label={t("location")}>
          <Stack width={"100%"} height={"100%"} alignItems={"center"}>
            <UploadDropzone
              uploader={uploader}
              options={options}
              onUpdate={(files) =>
                alert(files.map((x) => x.fileUrl).join("\n"))
              }
              width="600px"
              height="375px"
            />
          </Stack>
        </FormContainerComponent>
      </FormStep>
    );
  }
};

export default FormikFormPage;
