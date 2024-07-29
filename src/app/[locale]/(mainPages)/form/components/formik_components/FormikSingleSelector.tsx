import React from "react";
import { useField, useFormikContext } from "formik";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
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

const FormikSingleSelector = (props: Props) => {
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(props.name);

  const handleChange = (event: SelectChangeEvent<typeof field.value>) => {
    const {
      target: { value },
    } = event;
    setFieldValue(props.name, value);
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
          value={field.value || ""}
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
            if (!selected) {
              return <em>Select an option</em>;
            }
            return <Box>{selected}</Box>;
          }}
          MenuProps={MenuProps}
          error={meta.touched && !!meta.error}
          name={props.name}
          // required={props.required === FieldType.Required}
        >
          {props.options.map((option) => (
            <MenuItem key={option} value={option}>
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

export default FormikSingleSelector;
