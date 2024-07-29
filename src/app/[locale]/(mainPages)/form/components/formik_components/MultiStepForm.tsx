import React, { useContext } from "react";
import styles from "../../../../main.module.css";

import {
  Form,
  Formik,
  FormikConfig,
  FormikHelpers,
  FormikValues,
} from "formik";
import { Box, Container, Stack, Typography } from "@mui/material";
import FormNavigation from "./FormNavigation";
import FormStepper from "@/components/stepper/FormStepper";
import { useTranslations } from "next-intl";
import {
  ActionListContext,
  ActionListProvider,
} from "@/context/actionsListContext";
import { ActionListModel } from "../../models/ActionListModel";
interface Props extends FormikConfig<FormikValues> {
  children: React.ReactNode;
}

const MultiStepForm = (props: Props) => {
  const [stepNumber, setStepNumber] = React.useState(0);
  const steps = React.Children.toArray(props.children);
  const t = useTranslations("formpage");
  const [snapshot, setSnapshot] = React.useState(props.initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const { list, addItem } = useContext(ActionListContext);

  const next = (values: FormikValues) => {
    setSnapshot(values);
    setStepNumber(stepNumber + 1);
  };
  const previous = (values: FormikValues) => {
    setSnapshot(values);
    // console.log(values.whatHappened);
    // values.whatHappened.map((item: ActionListModel) => {
    //   addItem(item);
    // });
    setStepNumber(stepNumber - 1);
    // console.log(list);
  };

  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    if (React.isValidElement(step) && step.props.onSubmit) {
      await step.props.onSubmit(values);
    }
    if (isLastStep) {
      return props.onSubmit(values, actions);
    } else {
      actions.setTouched({});
      next(values);
    }
  };

  return (
    <Box>
      <ActionListProvider initialList={[]}>
        <Formik
          initialValues={snapshot}
          onSubmit={handleSubmit}
          validationSchema={
            React.isValidElement(step) ? step.props.validationSchema : null
          }
        >
          {({ handleSubmit, isSubmitting, errors, touched, values }) => (
            <Form onSubmit={handleSubmit}>
              <Container
                className={styles.bodyHeight}
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
                  width={"100%"}
                  justifyContent={"start"}
                  alignItems={"center"}
                  flexGrow={1}
                >
                  <Typography variant="h3" textAlign={"center"}>
                    {t("title")}
                  </Typography>
                  <FormStepper activeStep={stepNumber} />

                  {step}
                  <FormNavigation
                    isLastStep={isLastStep}
                    hasPrevious={stepNumber > 0}
                    onBackClick={() => previous(values)}
                  ></FormNavigation>
                </Stack>
              </Container>
            </Form>
          )}
        </Formik>
      </ActionListProvider>
    </Box>
  );
};

export default MultiStepForm;

export const FormStep = ({ stepName = "", children }: any) => children;
