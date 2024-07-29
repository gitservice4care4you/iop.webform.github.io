import * as React from "react";
import dayjs from "dayjs";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useLocale, useTranslations } from "next-intl";
import { ar, faIR, enUS, fr } from "date-fns/locale";
import { Stack, TextField, Typography } from "@mui/material";
import { FieldType } from "@/shared/enum/selector";
import CacheProviderRTL from "@/components/cacheProviderRTL/CacheProviderRTL";
import FormControl from "@mui/material/FormControl";
import { FormikProps, useField, useFormikContext } from "formik";

interface Values {
  label: string;
  name: string;
  required?: FieldType;
  // setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => {};
}

export default function FormikDatePicker({ label, name, required }: Values) {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext();
  const today = dayjs();
  const locale = useLocale();
  const t = useTranslations("formpage");

  // Map locale to respective localeText object
  const localeTextMap: { [key: string]: any } = {
    ar: customArSY,
    en: enUS,
    fa: faIR,
    fr: fr,
  };
  const adapterLocale = localeTextMap[locale] || null;
  return (
    <CacheProviderRTL>
      <Stack gap={1}>
        <Stack direction={"row"} gap={0.5}>
          {/* main title */}
          <Typography variant={"body1"}>{label}</Typography>
          {/* required (*) */}
          {required ? (
            <Typography variant={"body1"} color={"red"}>
              {required == FieldType.Required
                ? "*"
                : required == FieldType.Optional
                ? t("optional")
                : ""}
            </Typography>
          ) : null}
        </Stack>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={adapterLocale}
          localeText={adapterLocale}
        >
          <DatePicker
            // label={label}
            {...field}
            // value={field.value ? new Date(field.value) : null}
            onChange={(value) => {
              setFieldValue(name, value);
            }}
            sx={{
              backgroundColor: "common.white",
              "& .MuiFormHelperText-root": {
                margin: 0,
                paddingTop: "3px",
                paddingInlineEnd: "14px",
                paddingInlineStart: "14px",
                backgroundColor: "background.default",
              },
            }}
            slotProps={{
              textField: {
                helperText: meta.touched && meta.error,
                error: meta.touched && !!meta.error,
              },
            }}
          />
        </LocalizationProvider>
      </Stack>
    </CacheProviderRTL>
  );
}

const customArSY = {
  // You can copy the entire enUS (or any other locale) object and modify only the month names
  ...ar,
  localize: {
    ...ar.localize,
    monthValues: {
      narrow: ["ك", "ش", "آ", "ن", "أ", "ح", "ت", "آ", "أ", "ت", "ت", "ك"],
      abbreviated: [
        "كانون الثاني",
        "شباط",
        "آذار",
        "نيسان",
        "أيار",
        "حزيران",
        "تموز",
        "آب",
        "أيلول",
        "تشرين الأول",
        "تشرين الثاني",
        "كانون الأول",
      ],
      wide: [
        "كانون الثاني",
        "شباط",
        "آذار",
        "نيسان",
        "أيار",
        "حزيران",
        "تموز",
        "آب",
        "أيلول",
        "تشرين الأول",
        "تشرين الثاني",
        "كانون الأول",
      ],
    },
  },
};

// whatHappened must be a `array` type, but the final value was: `{ "id": "1", "category": { "id": "\"5\"", "name": "\"Hardware\"" }, "subCategory": { "id": "\"9\"", "name": "\"Firmware\"" }, "action": { "id": "\"1\"", "name": "\"Update\"" }, "howMany": "\"2\"" }`.
