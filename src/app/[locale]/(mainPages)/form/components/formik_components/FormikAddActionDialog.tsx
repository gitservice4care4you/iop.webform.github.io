"use client";
import React, { useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useTranslations } from "next-intl";
import { Grid } from "@mui/material";
import { faker } from "@faker-js/faker";
import { FieldType } from "@/shared/enum/selector";

import DefaultButton from "@/components/button/DefaultButton";
import DefaultSelector from "@/components/select/default_selctor/DefaultSelector";
import {
  Action,
  categoriesData,
  Category,
  subCategoriesData,
  SubCategory,
} from "../../fakeData";
import { ActionListModel } from "../../models/ActionListModel";
import DefaultTextField from "../DefaultTextField";
import { useField } from "formik";

type Props = {
  open: boolean;
  update?: boolean;
  data?: ActionListModel | null;
  onClose: () => void;
  onSubmit: (data: ActionListModel) => void;
};
const validationRules = {
  category: { required: true },
  subCategory: { required: true },
  action: { required: true },
  howMany: { required: true }, // Assuming you want to allow only numbers
};
export default function FormikAddActionDialog(props: Props) {
  /**
   * Initializes the state variables for the AddActionDialog component.
   *
   * @param props - The props passed to the AddActionDialog component.
   * @param props.open - Whether the dialog is open.
   * @param props.update - Whether the dialog is in update mode.
   * @param props.data - The data for the action being added or updated.
   * @param props.onClose - A function to call when the dialog is closed.
   * @param props.onSubmit - A function to call when the form is submitted.
   */
  const { open, update, data, onClose, onSubmit } = props;
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const t = useTranslations("formpage");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  /**
   * Initializes the state variables for the AddActionDialog component.
   *
   * @param itemId - The ID of the action being added or updated.
   * @param categories - The list of categories available for the action.
   * @param subCategories - The list of sub-categories available for the selected category.
   * @param actions - The list of actions available for the selected sub-category.
   * @param selectedCategoryId - The ID of the selected category.
   * @param selectedSubCategoryId - The ID of the selected sub-category.
   * @param selectedActionId - The ID of the selected action.
   * @param selectedHowMany - The selected value for the "How Many" field.
   */
  const [itemId, setItemID] = React.useState<string>(
    data && data.id ? data.id : ""
  );
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

  /* -------------------------------------------------------------------------- */
  /*                               // Use Effects                               */
  /* -------------------------------------------------------------------------- */
  /**
   * Initializes the state variables for the AddActionDialog component when the dialog is in update mode.
   *
   * This effect is triggered when the `data` prop changes, which indicates that the dialog is in update mode.
   * It sets the initial values of the state variables based on the data provided in the `data` prop.
   *
   * @param data - The data for the action being added or updated.
   */
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
      setItemID(data.id);
      setSelectedHowMany(howMany!);
    }
  }, [data]);

  /**
   * Initializes the `subCategories` state variable based on the selected category.
   *
   * This effect is triggered when the `selectedCategoryId` state variable changes. It filters the `subCategoriesData` array to find all the sub-categories that belong to the selected category, and sets the `subCategories` state variable with the filtered array.
   *
   * @param selectedCategoryId - The ID of the selected category.
   * @param categoriesData - The array of all categories.
   * @param subCategoriesData - The array of all sub-categories.
   * @returns void
   */
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
    // const newErrors = validateFields("category"); //TODO: problem is here of the initialized error border and message of the category field
    // setErrors(newErrors);
    setSubCategories(subCats);
  }, [selectedCategoryId]);

  /**
   * Initializes the `actions` state variable based on the selected sub-category.
   *
   * This effect is triggered when the `selectedSubCategoryId` state variable changes. It filters the `subCategories` array to find all the actions that belong to the selected sub-category, and sets the `actions` state variable with the filtered array.
   *
   * @param selectedSubCategoryId - The ID of the selected sub-category.
   * @param subCategories - The array of all sub-categories.
   * @returns void
   */
  useEffect(() => {
    const actionsList: Action[] =
      subCategories?.flatMap((subCat) =>
        subCat.id === selectedSubCategoryId ? subCat.actions : []
      ) || [];
    setActions(actionsList);
  }, [selectedSubCategoryId, subCategories]);

  /**
   * Handles the change of the selected category.
   *
   * This function is called when the user selects a new category. It clears the selected sub-category and action, and then sets the new selected category ID.
   *
   * @param categoryId - The ID of the selected category.
   * @returns void
   */
  const handleChangeCategory = (categoryId: string) => {
    if (selectedSubCategoryId) {
      setSelectedSubCategoryId("");
      setSelectedActionId("");
    }
    setSelectedCategoryId(categoryId);
  };

  /**
   * Handles the change of the selected sub-category.
   *
   * This function is called when the user selects a new sub-category. It sets the `selectedSubCategoryId` state variable to the provided `subCategoryId`.
   *
   * @param subCategoryId - The ID of the selected sub-category.
   * @returns void
   */
  const handleChangeSubCategory = (subCategoryId: string) => {
    setSelectedSubCategoryId(subCategoryId);
  };

  /**
   * Handles the change of the selected action.
   *
   * This function is called when the user selects a new action. It sets the `selectedActionId` state variable to the provided `actionId`.
   *
   * @param actionId - The ID of the selected action.
   * @returns void
   */
  const handleChangeAction = (actionId: string) => {
    setSelectedActionId(actionId);
  };

  /**
   * Handles the change of the selected "How Many" value.
   *
   * This function is called when the user changes the value in the "How Many" input field. It updates the `selectedHowMany` state variable with the new value.
   *
   * @param event - The React change event object containing the new value.
   * @returns void
   */
  const handleHowManyChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedHowMany(event.target.value!);
  };

  /**
   * Handles the submission of the AddActionDialog form.
   *
   * This function is called when the user submits the form. It first finds the selected category, sub-category, and action from the corresponding state variables. If any of these required fields are missing, it logs an error and returns. Otherwise, it creates a new `ActionListModel` object with the selected values and the `selectedHowMany` value, and calls the `onSubmit` callback function with this new data. Finally, it clears the input fields and closes the dialog.
   *
   * @returns void
   */
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    const errorsNow = validateFields();
    if (Object.keys(errorsNow).length === 0) {
      const cat = categories?.find((item) => item.id === selectedCategoryId);
      const subCat = subCategories?.find(
        (item) => item.id === selectedSubCategoryId
      );
      const action = actions?.find((item) => item.id === selectedActionId);

      if (!cat || !subCat || !action) {
        console.error("Missing required fields for creating an action");
        return;
      }

      const newData: ActionListModel = {
        id: itemId || faker.number.int({ min: 0, max: 100 }).toString(),
        category: cat,
        subCategory: subCat,
        action: action,
        howMany: selectedHowMany,
      };

      onSubmit(newData);
      clearInputs();
      onClose();
    } else {
      setErrors(errorsNow);
    }
  };

  const clearInputs = () => {
    setSelectedCategoryId("");
    setSelectedSubCategoryId("");
    setSelectedActionId("");
    setSelectedHowMany("");
  };

  const validateFields = (fieldName?: string) => {
    const newErrors: { [key: string]: string } = {};

    switch (fieldName) {
      case "category":
        // Validate category
        if (selectedCategoryId == "" && validationRules.category.required) {
          newErrors["category"] = t("validation.general");
        }
        break;

      case "subCat":
        // Validate subCategory
        if (!selectedSubCategoryId && validationRules.subCategory.required) {
          newErrors["subCategory"] = t("validation.general");
        }
      case "action":
        // Validate action
        if (!selectedActionId && validationRules.action.required) {
          newErrors["action"] = t("validation.general");
        }
      case "howMany":
        // Validate howMany
        if (validationRules.howMany.required && !selectedHowMany) {
          newErrors["howMany"] = t("validation.general");
        }
      default:
        if (selectedCategoryId == "" && validationRules.category.required) {
          newErrors["category"] = t("validation.general");
        }
        if (!selectedSubCategoryId && validationRules.subCategory.required) {
          newErrors["subCategory"] = t("validation.general");
        }
        if (!selectedActionId && validationRules.action.required) {
          newErrors["action"] = t("validation.general");
        }
        if (validationRules.howMany.required && !selectedHowMany) {
          newErrors["howMany"] = t("validation.general");
        }
    }

    return newErrors;
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
              value={
                selectedCategoryId === undefined ||
                selectedCategoryId === null ||
                categories!.length === 0
                  ? ""
                  : selectedCategoryId
              }
              error={errors["category"]}
              values={categories!}
              label={t("category")}
              onChange={(e) => handleChangeCategory(e.target.value)}
              required={FieldType.Required}
            />
          </Grid>
          {selectedCategoryId !== "" ? (
            <Grid xs={6}>
              <DefaultSelector
                value={
                  selectedSubCategoryId === undefined ||
                  selectedSubCategoryId === null ||
                  subCategories!.length === 0
                    ? ""
                    : selectedSubCategoryId
                }
                error={errors["subCategory"]}
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
                value={
                  selectedActionId === undefined ||
                  selectedActionId === null ||
                  actions!.length === 0
                    ? ""
                    : selectedActionId
                }
                values={actions!}
                error={errors["action"]}
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
                type="number"
                error={errors["howMany"]}
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
