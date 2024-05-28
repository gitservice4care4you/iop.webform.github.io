import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DefaultSelector from "@/app/[locale]/components/select/default_selctor/DefaultSelector";
import { useTranslations } from "next-intl";
import DefaultTextField from "./DefaultTextField";
import { Box, Grid, Paper, styled } from "@mui/material";
import { faker } from "@faker-js/faker";
export default function AddActionModal({
  open,
  data,
  update,
  onClose,
  onSubmit,
}: {
  open: boolean;
  update?: boolean;
  data?: ActionListModel | null;
  onClose: () => void;
  onSubmit: (data: ActionListModel) => void;
}) {
  const t = useTranslations("formpage");
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [category, setCategory] = React.useState<string | null>(
    data?.category ? data?.category.name : null
  );
  const [subCategory, setSubCategory] = React.useState<string | null>(
    data?.subCategory ? data?.subCategory.name : null
  );
  const [action, setAction] = React.useState<string | null>(
    data?.action ? data?.action.name : null
  );
  const [howMany, setHowMany] = React.useState<number | null>(
    data?.howMany ? data?.howMany : null
  );
  React.useEffect(() => {
    if (data) {
      setCategory(data.category!.name);
      setSubCategory(data.subCategory!.name);
      setAction(data.action!.name);
      setHowMany(data.howMany);
    }
  }, [data]);

  // Handle function for text field
  const handleHowManyChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHowMany(parseInt(event.target.value!));
  };

  const handleChangeCategory = (newValue: string) => {
    setCategory(newValue);
  };

  const handleChangeSubCategory = (newValue: string) => {
    setSubCategory(newValue);
  };

  const handleChangeAction = (newValue: string) => {
    setAction(newValue);
  };

  const handleSubmit:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = () => {
    const newData: ActionListModel = {
      id: data?.id!,
      category: {
        id: data?.category!.id!,
        name: category!,
      },
      subCategory: {
        id: data?.subCategory!.id!,
        name: subCategory,
      },
      action: {
        id: data?.action!.id!,
        name: action,
      },
      howMany: parseInt(howMany!.toString()),
    };
    onSubmit(newData);
    clearInputs();
    onClose();
  };

  const clearInputs = () => {
    setCategory(null);
    setSubCategory(null);
    setAction(null);
    setHowMany(null);
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{"Add action"}</DialogTitle>
      <DialogContent>
        <DialogContentText marginBottom={3}>
          Please start by selecting the category.
        </DialogContentText>

        <Grid container spacing={2} gap={2}>
          <Grid xs={6}>
            <DefaultSelector
              value={category!}
              values={[
                "Category 1",
                "Category 2",
                "Category 3",
                "Category 4",
                "Category 5",
              ]}
              label={t("category")}
              onChange={handleChangeCategory}
            />
          </Grid>
          {category ? (
            <Grid xs={6}>
              <DefaultSelector
                value={subCategory!}
                values={[
                  "SubCategory 1",
                  "SubCategory 2",
                  "SubCategory 3",
                  "SubCategory 4",
                  "SubCategory 5",
                ]}
                label={t("subCategory")}
                onChange={handleChangeSubCategory}
              />
            </Grid>
          ) : null}
          {subCategory ? (
            <Grid xs={6}>
              <DefaultSelector
                value={action!}
                values={[
                  "Action 1",
                  "Action 2",
                  "Action 3",
                  "Action 4",
                  "Action 5",
                ]}
                label={t("action")}
                onChange={handleChangeAction}
              />
            </Grid>
          ) : null}
          {action ? (
            <Grid xs={6}>
              {" "}
              <DefaultTextField
                fullwidth={false}
                label={t("howMany")}
                value={howMany!}
                onChange={handleHowManyChange}
              ></DefaultTextField>
            </Grid>
          ) : null}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSubmit}>
          {update ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
