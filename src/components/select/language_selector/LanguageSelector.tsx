"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styles from "./LanguageSelector.module.css";
import { useMediaQuery } from "@mui/material";

import TranslateIcon from "@mui/icons-material/Translate";
import { Stack } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { setAppLanguage } from "@/shared/constants/languageVar";
import CacheProviderRTL from "../../cacheProviderRTL/CacheProviderRTL";

interface Language {
  id: number;
  name: string;
  locale: string;
}
const langs: Language[] = [
  {
    id: 2,
    name: "Arabic (العريبة)",
    locale: "ar",
  },
  {
    id: 1,
    name: "English",
    locale: "en",
  },
  {
    id: 4,
    name: "Farsi (فارسی)",
    locale: "fa",
  },
  {
    id: 3,
    name: "French",
    locale: "fr",
  },
];

export default function LanguageSelector() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const mobileScreen = useMediaQuery("(min-width:500px)");

  const SelectStyle = {
    backgroundColor: "background.default",
    color: "common.black",
    paddingY: "0px",
    paddingX: "0px", // Add this line to remove horizontal padding
    "&:hover": {
      color: "primary.main",
      border: "0 solid primary",
    },
    "& .MuiSelect-select": {
      padding: "10px", // Remove right padding for the select box
    },
    "&:Mui.active": {
      border: "0 solid red",
    },
  };
  const [language, setLanguage] = React.useState(currentLocale);

  /**
   * Updates the selected language and redirects to the corresponding page.
   * @param event - The event object from the Select component.
   */
  const handleChange = (event: SelectChangeEvent) => {
    // Get the selected locale from the event target value
    const locale = event.target.value;

    // Update the selected language state
    setLanguage(locale as string);

    // Update the app language Global variable which is used to update theme direction
    setAppLanguage(locale);

    // Redirect to the corresponding page
    router.push(`/${locale}/${pathname.slice(4)}`);
  };

  return (
    // <CacheProvider>
    <CacheProviderRTL>
      <Box sx={{ minWidth: { md: 150, sm: 100, xs: 70 } }}>
        <FormControl fullWidth sx={{ padding: "0" }}>
          <Select
            className={styles.MuiSelect}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={language}
            value={language}
            // label="Lanugage"
            onChange={handleChange}
            renderValue={() => (
              <Stack direction={"row"} gap={2}>
                <TranslateIcon sx={{ fontWeight: "light", fontSize: "18px" }} />
                {mobileScreen &&
                  langs.map((e) => {
                    if (e.locale === language) {
                      return e.name;
                    }
                  })}
              </Stack>
            )}
            sx={SelectStyle}
            // startDecorator={<FavoriteBorder />}
          >
            {langs.map((e) => {
              return (
                <MenuItem
                  sx={{
                    margin: "0",
                    "&:hover": {
                      border: "0 solid",
                    },
                  }}
                  key={e.id}
                  value={e.locale}
                >
                  {e.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </CacheProviderRTL>
    // </CacheProvider>
  );
}
