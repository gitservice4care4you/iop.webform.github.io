import * as React from "react";
import dayjs from "dayjs";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CacheProviderRTL from "@/app/[locale]/components/cacheProviderRTL/CacheProviderRTL";
import { useLocale } from "next-intl";
import { ar, faIR, enUS, fr } from "date-fns/locale";
import { Stack, TextField, Typography } from "@mui/material";
interface Props {
  label: string;
  helperText: string;
  required?: boolean;
  value: Date;
  onChange?: (date: Date | null) => void;
}

export default function BasicDatePicker(props: Props) {
  const today = dayjs();
  const locale = useLocale();
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
  // Map locale to respective localeText object
  const localeTextMap: { [key: string]: any } = {
    ar: customArSY,
    en: enUS,
    fa: faIR,
    fr: fr,
  };
  const adapterLocale = localeTextMap[locale] || null;
  // console.log(adapterLocale["localize"]["monthValues"]);
  return (
    <CacheProviderRTL>
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
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={adapterLocale}
          localeText={adapterLocale}
        >
          <DatePicker
            sx={{ backgroundColor: "common.white" }}
            label=""
            value={props.value}
            onChange={props.onChange}
            slotProps={{
              textField: {
                helperText: props.helperText,
              },
            }}
          />
        </LocalizationProvider>

        {/* {props.helperText != "" ? (
          <Typography variant={"body1"}>{props.helperText}</Typography>
        ) : null} */}
      </Stack>
    </CacheProviderRTL>
  );
}
