import React from "react";
import { useField, useFormikContext } from "formik";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip,
  Box,
  FormHelperText,
  Stack,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { FieldType } from "@/shared/enum/selector";
import CacheProviderRTL from "@/components/cacheProviderRTL/CacheProviderRTL";
interface Props {
  name: string;
  label: string;
  options: string[];
  required: FieldType;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FormikMultiSelector = (props: Props) => {
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(props.name);

  const handleChange = (event: SelectChangeEvent<typeof field.value>) => {
    const {
      target: { value },
    } = event;
    setFieldValue(
      props.name,
      typeof value === "string" ? value.split(",") : value
    );
  };

  const textColor = props.required === FieldType.Required ? "red" : "black";

  return (
    <CacheProviderRTL>
      <FormControl sx={{ minWidth: 250 }}>
        <Stack direction="row" gap={0.5} marginBottom={1}>
          <Typography variant="body1">{props.label}</Typography>
          {props.required === FieldType.Required && (
            <Typography variant="body1" color={textColor}>
              *
            </Typography>
          )}
        </Stack>
        <Select
          multiple
          value={field.value || []}
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
          onChange={handleChange}
          renderValue={(selected) => {
            if ((selected as string[]).length === 0) {
              return <em>Select options</em>;
            }
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            );
          }}
          MenuProps={MenuProps}
          error={meta.touched && !!meta.error}
          name={props.name}
          // required={props.required === FieldType.Required}
        >
          {props.options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={(field.value || []).indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
        {meta.touched && meta.error ? (
          <FormHelperText error>{meta.error}</FormHelperText>
        ) : null}
      </FormControl>
    </CacheProviderRTL>
  );
};

export default FormikMultiSelector;
