import CacheProviderRTL from "@/components/cacheProviderRTL/CacheProviderRTL";
import { Stack, TextField, Typography } from "@mui/material";
import React from "react";
import FormControl from "@mui/material/FormControl";
import { useTranslations } from "next-intl";
import { FieldType } from "@/shared/enum/selector";
import { useField, useFormikContext } from "formik";

type Props = {
  label: string;
  name: string;
  multiline?: boolean;
  fullwidth?: boolean;
  rows?: number;

  type?: string;
  required?: FieldType;
  validationRules?: {
    minLength?: number;
    maxLength?: number;
  };
  // setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => {};
  // error: string;
  // helperText?: string;
};

function FormikTextField(props: Props) {
  const [field, meta] = useField(props.name);
  const { setFieldValue } = useFormikContext();

  return (
    <CacheProviderRTL>
      <Stack gap={1} width={"100%"}>
        <Stack direction={"row"} gap={0.5}>
          {/* main title */}
          <Typography variant={"body1"}>{props.label}</Typography>
          {/* required (*) */}
          {props.required ? (
            <Typography variant={"body1"} color={"red"}>
              {props.required == FieldType.Required ? "*" : ""}
            </Typography>
          ) : null}
        </Stack>
        <TextField
          label=""
          multiline={props.multiline}
          fullWidth={props.fullwidth}
          type={props.type}
          sx={{
            backgroundColor: "white",
            "& .MuiFormHelperText-root": {
              margin: 0,
              paddingTop: "3px",
              paddingInlineEnd: "14px",
              paddingInlineStart: "14px",
              backgroundColor: "background.default",
            },
          }}
          rows={props.rows}
          // value={props.value}
          variant="outlined"
          {...field}
          // required={props.required}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
          onChange={(event) => {
            setFieldValue?.(props.name, event.target.value);
          }}
        />
      </Stack>
    </CacheProviderRTL>
  );
}

export default FormikTextField;
