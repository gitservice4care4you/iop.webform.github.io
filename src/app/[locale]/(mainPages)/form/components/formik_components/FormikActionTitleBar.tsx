// /**
//  * This component represents a title bar for an action list. It includes
//  * a plus button which opens an AddActionModal for adding new actions to the list.
//  * The title also contains a red (*) symbol to indicate that it is required.
//  * It uses context to access and modify the list of actions.
import { Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import FormikAddActionDialog from "./FormikAddActionDialog";
import { ActionListContext } from "@/context/actionsListContext";
import { useTranslations } from "next-intl";
import { faker } from "@faker-js/faker";
import DefaultButton from "@/components/button/DefaultButton";
import { ActionListModel } from "../../models/ActionListModel";
import { FieldArrayRenderProps, useField, useFormikContext } from "formik";
type Props = {
  arrayMethods: FieldArrayRenderProps;
};

const FormikActionTitleBar = (props: Props) => {
  const { setFieldValue } = useFormikContext();

  const [field, meta] = useField("whatHappened");
  /**
   * Translates text using the current locale.
   */
  const t = useTranslations("formpage");

  /**
   * Accesses the action list and its functions from context.
   */
  const { list, addItem } = useContext(ActionListContext);

  /**
   * Tracks whether the AddActionModal is open or closed.
   */
  const [open, setOpen] = React.useState(false);

  /**
   * Opens the AddActionModal.
   */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /**
   * Closes the AddActionModal without saving any changes.
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Saves new action data to the list and closes the modal.
   */
  const handleAddItem = (data: any) => {
    /**
     * Converts the input data into the expected format for the action list.
     */
    const newItem: ActionListModel = data;
    props.arrayMethods.push(newItem);
    /**
     * Adds the new item to the action list.
     */
    addItem(newItem);
  };
  return (
    <Stack
      marginBottom={2}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"end"}
    >
      {/** Renders the AddActionModal for adding new actions. */}
      <FormikAddActionDialog
        open={open}
        onClose={handleClose}
        onSubmit={(data) =>
          handleAddItem({
            id: faker.number.int({ min: 0, max: 100 }),
            category: {
              id: data.category?.id,
              name: data.category!.name!,
            },
            subCategory: {
              id: data.subCategory?.id,
              name: data.subCategory!.name,
            },
            action: {
              id: data.action?.id,
              name: data.action!.name,
            },
            howMany: data.howMany,
          })
        }
      />

      <Stack direction={"row"} gap={0.5}>
        {/** Renders the main title of the action list. */}
        <Typography variant={"body1"}>{t("whatActions")}</Typography>
        {/** Renders a red (*) symbol to indicate that it is required. */}
        <Typography variant={"body1"} color={"red"}>
          *
        </Typography>
      </Stack>

      {/** Renders the plus button to open the AddActionModal. */}
      <DefaultButton size="small" onClick={handleClickOpen}>
        +
      </DefaultButton>
    </Stack>
  );
};

export default FormikActionTitleBar;
