import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Stack, Typography } from "@mui/material";
import CacheProviderRTL from "../../cacheProviderRTL/CacheProviderRTL";
import { useTranslations } from "next-intl";
import { FieldType } from "@/shared/enum/selector";
import {
  Action,
  Category,
  SubCategory,
} from "@/app/[locale]/(mainPages)/form/fakeData";

type Props = {
  values: Category[] | SubCategory[] | Action[];
  value: any;
  required: FieldType;
  label: string;
  onChange: (event: SelectChangeEvent) => void;
};

const DefaultSelector = (props: Props) => {
  const t = useTranslations("formpage");

  let textColor = "";
  if (props.required == FieldType.Optional) {
    textColor = "black";
  } else {
    textColor = "red";
  }
  return (
    <CacheProviderRTL>
      <FormControl sx={{ minWidth: 200 }}>
        <Stack direction={"row"} gap={0.5} marginBottom={1}>
          {/* main title */}
          <Typography variant={"body1"}>{props.label}</Typography>
          {/* required (*) */}
          {props.required ? (
            <Typography variant={"body1"} color={textColor}>
              {props.required == FieldType.Required
                ? "*"
                : props.required == FieldType.Optional
                ? `(${t("optional")})`
                : ""}
            </Typography>
          ) : null}
        </Stack>
        {/* <Typography variant={"body1"} marginBottom={1}>
          {props.label}
        </Typography> */}
        <Select
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
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={props.value}
          onChange={props.onChange}
        >
          {props.values.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>
    </CacheProviderRTL>
  );
};

export default DefaultSelector;
