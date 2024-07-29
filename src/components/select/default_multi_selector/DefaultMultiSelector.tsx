import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Box,
  Checkbox,
  Chip,
  ListItemText,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import CacheProviderRTL from "../../cacheProviderRTL/CacheProviderRTL";
import { useTranslations } from "next-intl";
import { FieldType } from "@/shared/enum/selector";
import {
  Action,
  Category,
  SubCategory,
} from "@/app/[locale]/(mainPages)/form/fakeData";
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
type Props = {
  values: string[];
  value: string[];
  error: string | null;
  required: FieldType;
  label: string;
  onChange: (event: SelectChangeEvent) => void;
};

const DefaultSelector = (props: Props) => {
  const t = useTranslations("formpage");
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleDelete = (event: any) => {
    // event.preventDefault();

    // event.stopPropagation();
    console.log("delete");
    // const tempList:string[]=[]
    // personName.map((name)=>{
    //   if(name!=m)
    // });
  };
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("click");
    //   event.stopPropagation();
    // console.log(event);
    // const tempList: string[] = [];
    // personName.map((item) => {
    //   if (item != event.target) {
    //     tempList.push(item);
    //   }
    //   console.log(item);
    // });
    // setPersonName(tempList);
  };

  let textColor = "";
  if (props.required == FieldType.Optional) {
    textColor = "black";
  } else {
    textColor = "red";
  }
  return (
    <CacheProviderRTL>
      <FormControl
        sx={{ minWidth: 200 }}
        error={props.error != null ? true : false}
      >
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
          multiple
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
          value={personName}
          onChange={handleChange}
          onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.stopPropagation();
            console.log(event.isPropagationStopped());
          }}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  component={"div"}
                  label={value}
                  color="primary"
                  variant="outlined"
                  // onClick={handleClick}
                  // onDelete={handleDelete}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {props.values.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                <Checkbox checked={personName.includes(item)} />
                <ListItemText primary={item} />
              </MenuItem>
            );
          })}
        </Select>
        {props.error != "" ? (
          <FormHelperText sx={{ color: "red" }}>{props.error}</FormHelperText>
        ) : null}
      </FormControl>
    </CacheProviderRTL>
  );
};

export default DefaultSelector;
