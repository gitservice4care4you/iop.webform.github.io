// "use client";
// import React, { useState } from "react";
// import { Formik, Form, Field, FormikHelpers } from "formik";
// import * as Yup from "yup";
// import styles from "../../main.module.css";

// import {
//   Button,
//   Stepper,
//   Step,
//   StepLabel,
//   TextField,
//   Box,
//   Typography,
//   Container,
//   Stack,
// } from "@mui/material";
// import FormStepper from "@/components/stepper/FormStepper";
// import { useTranslations } from "next-intl";
// import { ActionListProvider } from "@/context/actionsListContext";
// import FormContainerComponent from "./components/FormContainerComponent";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// // Define the shape of our form values
// interface FormValues {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// // Define the validation schema for each step
// const Step1Schema = Yup.object().shape({
//   firstName: Yup.string().required("First name is required"),
//   lastName: Yup.string().required("Last name is required"),
// });

// const Step2Schema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Email is required"),
// });

// const Step3Schema = Yup.object().shape({
//   password: Yup.string()
//     .min(8, "Password must be at least 8 characters")
//     .required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password")], "Passwords must match")
//     .required("Confirm password is required"),
// });

// const MultiStepForm: React.FC = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const t = useTranslations("formpage");

//   const steps = [
//     "Personal Information",
//     "Contact Information",
//     "Account Setup",
//   ];

//   const initialValues: FormValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSubmit = (values: FormValues) => {
//     console.log(values);
//     // Here you would typically send the form data to your backend
//     alert("Form submitted successfully!");
//   };

//   const currentValidationSchema = () => {
//     switch (activeStep) {
//       case 0:
//         return Step1Schema;
//       case 1:
//         return Step2Schema;
//       case 2:
//         return Step3Schema;
//       default:
//         return Yup.object().shape({});
//     }
//   };

//   return (
//     <Container
//       className={styles.bodyHeight}
//       // maxWidth="xl"
//       disableGutters
//       sx={{
//         marginY: "auto",
//         padding: "30px",
//         width: "100%",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Stack
//         direction={"column"}
//         spacing={{ xs: 1, sm: 2, md: 9 }}
//         // maxWidth="xl"

//         width={"100%"}
//         justifyContent={"start"}
//         alignItems={"center"}
//         flexGrow={1}
//       >
//         <Typography variant="h3" textAlign={"center"}>
//           {t("title")}
//         </Typography>
//         <FormStepper activeStep={activeStep}></FormStepper>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={currentValidationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ errors, touched, validateForm, setTouched, isValid }) => (
//             <Form>
//               <Box sx={{ mt: 4 }}>
//                 {activeStep === 0 && (
//                   <>
//                     <Field
//                       as={TextField}
//                       fullWidth
//                       name="firstName"
//                       label="First Name"
//                       error={touched.firstName && errors.firstName}
//                       helperText={touched.firstName && errors.firstName}
//                       sx={{ mb: 2 }}
//                     />
//                     <Field
//                       as={TextField}
//                       fullWidth
//                       name="lastName"
//                       label="Last Name"
//                       error={touched.lastName && errors.lastName}
//                       helperText={touched.lastName && errors.lastName}
//                       sx={{ mb: 2 }}
//                     />
//                   </>
//                 )}
//                 {activeStep === 1 && (
//                   <Field
//                     as={TextField}
//                     fullWidth
//                     name="email"
//                     label="Email"
//                     error={touched.email && errors.email}
//                     helperText={touched.email && errors.email}
//                     sx={{ mb: 2 }}
//                   />
//                 )}
//                 {activeStep === 2 && (
//                   <>
//                     <Field
//                       as={TextField}
//                       fullWidth
//                       name="password"
//                       label="Password"
//                       type="password"
//                       error={touched.password && errors.password}
//                       helperText={touched.password && errors.password}
//                       sx={{ mb: 2 }}
//                     />
//                     <Field
//                       as={TextField}
//                       fullWidth
//                       name="confirmPassword"
//                       label="Confirm Password"
//                       type="password"
//                       error={touched.confirmPassword && errors.confirmPassword}
//                       helperText={
//                         touched.confirmPassword && errors.confirmPassword
//                       }
//                       sx={{ mb: 2 }}
//                     />
//                   </>
//                 )}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     mt: 2,
//                   }}
//                 >
//                   <Button disabled={activeStep === 0} onClick={handleBack}>
//                     Back
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={async () => {
//                       const validationSchema = currentValidationSchema();
//                       const touchedFields = Object.keys(
//                         validationSchema.fields
//                       ).reduce((acc, field) => {
//                         acc[field] = true;
//                         return acc;
//                       }, {} as Record<string, boolean>);

//                       setTouched(touchedFields);
//                       const errors = await validateForm();

//                       if (Object.keys(errors).length === 0) {
//                         if (activeStep === steps.length - 1) {
//                           // Submit the form
//                           handleSubmit(initialValues);
//                         } else {
//                           // Move to the next step
//                           setActiveStep((prevActiveStep) => prevActiveStep + 1);
//                         }
//                       }
//                     }}
//                   >
//                     {activeStep === steps.length - 1 ? "Submit" : "Next"}
//                   </Button>
//                 </Box>
//               </Box>
//             </Form>
//           )}
//         </Formik>
//       </Stack>
//     </Container>
//   );

//   function informationSection() {
//         // alert(infoError.whenDate);
//         return (
//           <ActionListProvider initialList={[]}>
//             <FormContainerComponent label={t("information")}>
//               <DatePicker
//                 label={t("whenHappen")}
//                 value={infoData.whenHappen!}
//                 error={infoError.whenHappen!}
//                 onChange={handleWhenDateChange}
//                 required={FieldType.Required}
//                 // helperText={infoError.whenDate}
//               />
//               <DatePicker
//                 label={t("whenHear")}
//                 value={infoData.whenHear!}
//                 error={infoError.whenHear!}
//                 onChange={handleHeardDateChange}
//                 required={FieldType.Required}
//                 // helperText={infoError.heardDate}
//               />
//               {/* Description */}
//               <DefaultTextField
//                 rows={4}
//                 multiline={true}
//                 fullwidth={true}
//                 error={infoError.description!}
//                 label={t("description")}
//                 required={true}
//                 onChange={handleDescriptionChange}
//                 value={infoData.description!}
//                 validationRules={{
//                   minLength: 30,
//                   maxLength: 600,
//                 }}
//               />
//               <Stack direction={"column"} width={"100%"}>
//                 <ActionTitleBar></ActionTitleBar>
//                 <ActionList
//                   error={infoError.whatHappened != null ? true : false}
//                   values={list}
//                 ></ActionList>
//                 {infoError.whatHappened != null ? (
//                   <Typography
//                     marginInlineStart={1.5}
//                     variant="body2"
//                     fontSize={"12px"}
//                     color={"error"}
//                   >
//                     {infoError.whatHappened}
//                   </Typography>
//                 ) : null}
//               </Stack>

//               <DefaultMultiSelector
//                 values={[
//                   "Oliver Hansen",
//                   "Van Henry",
//                   "April Tucker",
//                   "Ralph Hubbard",
//                   "Omar Alexander",
//                   "Carlos Abbott",
//                   "Miriam Wagner",
//                   "Bradley Wilkerson",
//                   "Virginia Andrews",
//                   "Kelly Snyder",
//                 ]}
//                 value={infoData.whoDidIt!}
//                 label={t("who")}
//                 error={infoError.whoDidIt!}
//                 required={FieldType.Required}
//                 onChange={function (value: SelectChangeEvent): void {
//                   throw new Error("Function not implemented.");
//                 }}
//               />
//               <DefaultMultiSelector
//                 values={[
//                   "Oliver Hansen",
//                   "Van Henry",
//                   "April Tucker",
//                   "Ralph Hubbard",
//                   "Omar Alexander",
//                   "Carlos Abbott",
//                   "Miriam Wagner",
//                   "Bradley Wilkerson",
//                   "Virginia Andrews",
//                   "Kelly Snyder",
//                 ]}
//                 value={infoData.rootCause!}
//                 label={t("rootCause")}
//                 required={FieldType.Required}
//                 error={infoError.rootCause!}
//                 onChange={function (value: SelectChangeEvent): void {
//                   throw new Error("Function not implemented.");
//                 }}
//               />
//               <DefaultMultiSelector
//                 values={[
//                   "Oliver Hansen",
//                   "Van Henry",
//                   "April Tucker",
//                   "Ralph Hubbard",
//                   "Omar Alexander",
//                   "Carlos Abbott",
//                   "Miriam Wagner",
//                   "Bradley Wilkerson",
//                   "Virginia Andrews",
//                   "Kelly Snyder",
//                 ]}
//                 value={infoData.sourceOfInfo!}
//                 label={t("sourceInfo")}
//                 required={FieldType.Required}
//                 error={infoError.sourceOfInfo!}
//                 onChange={function (value: SelectChangeEvent): void {
//                   throw new Error("Function not implemented.");
//                 }}
//               />
//             </FormContainerComponent>
//           </ActionListProvider>
//         );
//       }

// };

// export default MultiStepForm;
