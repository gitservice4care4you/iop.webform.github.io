"use client";
import React, { useEffect } from "react";

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
import { Box, Grid, Paper, SelectChangeEvent, styled } from "@mui/material";
import { faker } from "@faker-js/faker";
import "../fakeData";
import {
  Action,
  Category,
  SubCategory,
  categoriesData,
  subCategoriesData,
} from "../fakeData";
import { FieldType } from "@/shared/enum/selector";
import { ActionListModel } from "../models/ActionListModel";
import DefaultButton from "@/app/[locale]/components/button/DefaultButton";

type Props = {
  open: boolean;
  update?: boolean;
  data?: ActionListModel | null;
  onClose: () => void;
  onSubmit: (data: ActionListModel) => void;
};

export default function AddActionDialog(props: Props) {
  const { open, update, data, onClose, onSubmit } = props;

  const t = useTranslations("formpage");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [categories, setCategories] = React.useState<Category[] | null>(
    categoriesData
  );
  const [subCategories, setSubCategories] = React.useState<
    SubCategory[] | null
  >(null);
  const [actions, setActions] = React.useState<Action[] | null>(null);

  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>(
    data && data.category ? data.category.id : ""
  );
  const [selectedSubCategoryId, setSelectedSubCategoryId] =
    React.useState<string>(data && data.subCategory ? data.subCategory.id : "");
  const [selectedActionId, setSelectedActionId] = React.useState<string>(
    data && data.action ? data.action.id : ""
  );
  const [selectedHowMany, setSelectedHowMany] = React.useState<string>(
    data ? data.howMany : ""
  );

  useEffect(() => {
    if (data) {
      const { category, subCategory, action, howMany } = data;
      if (category) {
        handleChangeCategory(category.id);
      }
      if (subCategory) {
        handleChangeSubCategory(subCategory.id);
      }
      if (action) {
        handleChangeAction(action.id);
      }
      setSelectedHowMany(howMany!);
    }
  }, [data]);

  useEffect(() => {
    const subCats: SubCategory[] = categoriesData.reduce(
      (acc, cat) =>
        cat.id === selectedCategoryId
          ? [
              ...acc,
              ...subCategoriesData.filter(
                (subCat) => subCat.categoryId === cat.id
              ),
            ]
          : acc,
      [] as SubCategory[]
    );
    setSubCategories(subCats);
  }, [selectedCategoryId]);

  useEffect(() => {
    const actionsList: Action[] =
      subCategories?.flatMap((subCat) =>
        subCat.id === selectedSubCategoryId ? subCat.actions : []
      ) || [];
    setActions(actionsList);
  }, [selectedSubCategoryId, subCategories]);

  const handleChangeCategory = (categoryId: string) => {
    if (selectedSubCategoryId) {
      setSelectedSubCategoryId("");
      setSelectedActionId("");
    }
    setSelectedCategoryId(categoryId);
  };

  const handleChangeSubCategory = (subCategoryId: string) => {
    setSelectedSubCategoryId(subCategoryId);
  };

  const handleChangeAction = (actionId: string) => {
    setSelectedActionId(actionId);
  };

  const handleHowManyChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedHowMany(event.target.value!);
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    const cat = categories?.find((item) => item.id === selectedCategoryId);
    const subCat = subCategories?.find(
      (item) => item.id === selectedSubCategoryId
    );
    const action = actions?.find((item) => item.id === selectedActionId);

    const newData: ActionListModel = {
      id: faker.number.int({ min: 0, max: 100 }).toString()!,
      category: cat!,
      subCategory: subCat!,
      action: action!,
      howMany: selectedHowMany!,
    };
    onSubmit(newData);
    clearInputs();
    onClose();
  };

  const clearInputs = () => {
    setSelectedCategoryId("");
    setSelectedSubCategoryId("");
    setSelectedActionId("");
    setSelectedHowMany("");
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{t("addAction")}</DialogTitle>
      <DialogContent>
        <DialogContentText marginBottom={3}>
          {t("addActionDescription")}
        </DialogContentText>

        <Grid paddingInline={2} container spacing={2} gap={2}>
          <Grid xs={6}>
            <DefaultSelector
              value={selectedCategoryId}
              values={categories!}
              label={t("category")}
              onChange={(e) => handleChangeCategory(e.target.value)}
              required={FieldType.Required}
            />
          </Grid>
          {selectedCategoryId !== "" ? (
            <Grid xs={6}>
              <DefaultSelector
                value={selectedSubCategoryId}
                values={subCategories!}
                label={t("subCategory")}
                onChange={(e) => handleChangeSubCategory(e.target.value)}
                required={FieldType.Required}
              />
            </Grid>
          ) : null}
          {selectedSubCategoryId !== "" ? (
            <Grid xs={6}>
              <DefaultSelector
                value={selectedActionId}
                values={actions!}
                label={t("action")}
                onChange={(e) => handleChangeAction(e.target.value)}
                required={FieldType.Required}
              />
            </Grid>
          ) : null}
          {selectedActionId !== "" ? (
            <Grid xs={6}>
              {" "}
              <DefaultTextField
                fullwidth={false}
                label={t("howMany")}
                value={selectedHowMany!}
                onChange={handleHowManyChange}
              ></DefaultTextField>
            </Grid>
          ) : null}
        </Grid>
      </DialogContent>
      <DialogActions>
        <DefaultButton autoFocus onClick={handleSubmit}>
          {update ? "Update" : "Add"}
        </DefaultButton>
      </DialogActions>
    </Dialog>
  );
}
