import FormPage from "./(mainPages)/form/page";
export default function Home() {
  return <FormPage></FormPage>;
}
// // <Container
// //   className={styles.bodyHeight}
// //   maxWidth="xl"
// //   disableGutters
// //   sx={{
// //     marginY: "auto",
// //     padding: "30px",
// //     display: "flex",
// //     flexDirection: "column",
// //     justifyContent: "center",

// //     alignItems: "center",
// //   }}
// // >
// //   <Stack
// //     direction={{ xs: "column", sm: "column", md: "row" }}
// //     spacing={{ xs: 1, sm: 2, md: 4 }}
// //     maxWidth="xl"
// //     justifyContent={"center"}
// //     alignItems={"center"}
// //     flexGrow={1}
// //   >
// //     {/* Image */}
// //     {imageBox()}

// //     {/* Welcome Text */}
// //     {WelcomeTextBox()}
// //   </Stack>
// // </Container>
// {
//   /* </Box> */
// }
// function WelcomeTextBox() {
//   const t = useTranslations("homepage.titles");

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Stack
//         direction="column"
//         spacing={3}
//         display={"flex"}
//         justifyContent={"center"}
//         py={10}
//         alignItems={"center"}
//       >
//         <Typography
//           variant={"h3"}
//           fontWeight={"bold"}
//           sx={{ typography: { sm: "h3", xs: "h4", md: "h3" } }}
//         >
//           {t("welcome")}
//         </Typography>
//         <Typography
//           variant={"h5"}
//           width={"60%"}
//           textAlign={"center"}
//           sx={{ typography: { sm: "subtitle1", xs: "subtitle1", md: "h6" } }}
//         >
//           {t("paragraph")}
//         </Typography>

//         <ToFormButton />
//       </Stack>
//     </Box>
//   );
// }

// function imageBox() {
//   return (
//     <Box sx={{ width: { xs: "80%", md: "100%", sm: "80%" } }}>
//       <Image
//         className={styles.imageStyle}
//         alt={"incidientImage"}
//         src={incidientImage}
//         loading="eager"
//       ></Image>

//       {/* </Box> */}
//     </Box>
//   );
// }
