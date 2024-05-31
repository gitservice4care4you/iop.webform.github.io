import CacheProviderRTL from "@/app/[locale]/components/cacheProviderRTL/CacheProviderRTL";
import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

type Props = {
  label: string;
  multiline?: boolean;
  fullwidth?: boolean;
  rows?: number;
  value?: string | number;
  required?: boolean;
  validationRules?: {
    minLength?: number;
    maxLength?: number;
  };
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: boolean;
  helperText?: string;
};

function DefaultTextField(props: Props) {
  return (
    <CacheProviderRTL>
      <Stack gap={1} width={props.fullwidth ? "100%" : undefined}>
        <Stack direction={"row"} gap={0.5}>
          {/* main title */}
          <Typography variant={"body1"}>{props.label}</Typography>
          {/* required (*) */}
          {props.required ? (
            <Typography variant={"body1"} color={"red"}>
              {props.required ? "*" : ""}
            </Typography>
          ) : null}
        </Stack>
        <TextField
          id="standard-multiline-static"
          label=""
          multiline={props.multiline}
          fullWidth={props.fullwidth}
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
          value={props.value}
          variant="outlined"
          required={props.required}
          error={!!props.error}
          helperText={props.error}
          onChange={props.onChange}
        />
      </Stack>
    </CacheProviderRTL>
  );
}

export default DefaultTextField;
