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
import CacheProviderRTL from "@/app/[locale]/components/cacheProviderRTL/CacheProviderRTL";
import {
  ActionListContext,
  ActionListProvider,
} from "@/context/actionsListContext";
import AddActionDialog from "./AddActionDialog";
import { ActionListModel } from "../models/ActionListModel";

type Props = {
  onDeleteClick?: (id: string) => void;
  onEditClick?: (id: string) => void;
};

const ActionList = (props: Props) => {
  const { list, updateItem, removeItem } = useContext(ActionListContext);
  const [open, setOpen] = React.useState(false);
  const [currentListData, setCurrentListData] =
    React.useState<ActionListModel | null>();

  const handleClickOpen = (data: ActionListModel) => {
    setCurrentListData(data);
    setOpen(true);
  };

  const handleClose = () => {
    // addItem(data);
    // setCurrentListData(null);
    setOpen(false);
  };

  const handleUpdateItem = (data: ActionListModel) => {
    const updatedItem: ActionListModel = data;
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
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        {Array.isArray(list) && list.length === 0 ? (
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
        ) : (
          list!.map((action) => {
            return (
              <>
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
                    onClick={() => handleClickOpen(action)} //TODO: make this with dialog
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
              </>
            );
          })
        )}
      </List>
    </CacheProviderRTL>
  );
};

export default ActionList;
