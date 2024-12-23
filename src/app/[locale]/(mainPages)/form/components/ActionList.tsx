import React, { useContext } from "react";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  ActionListContext,
  ActionListProvider,
} from "@/context/actionsListContext";
import AddActionDialog from "./AddActionDialog";
import { ActionListModel } from "../models/ActionListModel";
import CacheProviderRTL from "@/components/cacheProviderRTL/CacheProviderRTL";
import theme from "@/styles/theme";

type Props = {
  onDeleteClick?: (id: string) => void;
  onEditClick?: (id: string) => void;
  values: ActionListModel[] | undefined;
  error?: boolean;
};

const ActionList = (props: Props) => {
  const { list, updateItem, removeItem } = useContext(ActionListContext);
  const [open, setOpen] = React.useState(false);
  const [currentListData, setCurrentListData] =
    React.useState<ActionListModel | null>();

  if (props.values != undefined) {
    props.values.forEach((item) => list.push(item));
  }
  const handleEditDialogOpen = (data: ActionListModel) => {
    setCurrentListData(data);
    setOpen(true);
  };

  const handleClose = () => {
    // addItem(data);
    setCurrentListData(null);
    console.log();
    setOpen(false);
  };

  const handleUpdateItem = (data: ActionListModel) => {
    const updatedItem: ActionListModel = data;
    console.log(`actionList Page:${updatedItem.id}`);
    updateItem(updatedItem.id!, updatedItem);
  };

  return (
    <CacheProviderRTL>
      <AddActionDialog
        open={open}
        update={true}
        onClose={handleClose}
        data={currentListData && currentListData}
        onSubmit={handleUpdateItem}
      />
      <List
        sx={{
          width: "100%",
          bgcolor: "common.white",
          border: "1px solid ",
          borderColor: props.error ? theme.palette.error.main : "#ccc",
          borderRadius: "4px",
        }}
      >
        {Array.isArray(list) && list.length === 0
          ? emptyList()
          : list!.map((action) => {
              return (
                <React.Fragment key={action.id}>
                  <ListItem key={action.id} alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Stack direction={"row"} alignItems={"center"}>
                          {action!.action!.name}
                          <Box
                            width={"25px"}
                            height={"25px"}
                            marginInline={2}
                            sx={{
                              backgroundColor: "primary.main",

                              borderRadius: "25px",
                              // boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                              border: "1px solid black",
                            }}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <Typography color={"common.white"}>
                              {action.howMany}
                            </Typography>
                          </Box>
                        </Stack>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {action!.category!.name}
                          </Typography>
                          {` - ${action!.subCategory!.name}`}
                        </React.Fragment>
                      }
                    />
                    <IconButton
                      aria-label="edit"
                      size="medium"
                      sx={{ color: "grey" }}
                      onClick={() => handleEditDialogOpen(action)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="medium"
                      sx={{ color: "red" }}
                      onClick={() => removeItem(action.id!)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                  <Divider variant="middle" component="li" />
                </React.Fragment>
              );
            })}
      </List>
    </CacheProviderRTL>
  );

  function emptyList(): React.ReactNode {
    return (
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="No actions added yet."
          sx={{ color: "grey.400" }}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              ></Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    );
  }
};

export default ActionList;
