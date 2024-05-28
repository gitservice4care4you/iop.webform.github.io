import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Typography } from "@mui/material";
import CacheProviderRTL from "../../cacheProviderRTL/CacheProviderRTL";
type Props = {
  values: string[];
  value: string;
  label: string;
  onChange: (value: string) => void;
};

const DefaultSelector = (props: Props) => {
  const [value, setValue] = React.useState(props.value);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <CacheProviderRTL>
      <FormControl sx={{ minWidth: 200 }}>
        <Typography variant={"body1"} marginBottom={1}>
          {props.label}
        </Typography>
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
          value={value}
          onChange={handleChange}
        >
          {props.values.map((item) => {
            return <MenuItem value={item}>{item}</MenuItem>;
          })}
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>
    </CacheProviderRTL>
  );
};

export default DefaultSelector;
