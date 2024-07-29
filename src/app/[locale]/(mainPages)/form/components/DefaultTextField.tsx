import CacheProviderRTL from "@/components/cacheProviderRTL/CacheProviderRTL";
import { Stack, TextField, Typography } from "@mui/material";
import React from "react";
import FormControl from "@mui/material/FormControl";
import { useTranslations } from "next-intl";

type Props = {
  label: string;
  multiline?: boolean;
  fullwidth?: boolean;
  rows?: number;
  value?: string | number;
  type?: string;
  required?: boolean;
  validationRules?: {
    minLength?: number;
    maxLength?: number;
  };
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error: string;
  helperText?: string;
};

function DefaultTextField(props: Props) {
  return (
    <CacheProviderRTL>
      <FormControl
        error={props.error == "" ? false : true}
        sx={{
          width: props.fullwidth ? "100%" : undefined,
        }}
      >
        <Stack gap={1}>
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
            type={props.type}
            inputProps={
              props.type == "number"
                ? { inputMode: "numeric", pattern: "[0-9]*" }
                : {}
            }
            sx={{
              backgroundColor: "white",
              "& .MuiFormHelperText-root": {
                margin: 0,
                paddingTop: "3px",
                paddingInlineEnd: "14px",
                paddingInlineStart: "14px",
                backgroundColor: "white",
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
      </FormControl>
    </CacheProviderRTL>
  );
}

export default DefaultTextField;
