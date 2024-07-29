/**
 * Provides a context for managing an action list in a Information's actions section.
 * The `ActionListProvider` component initializes the action list with the provided `initialList` prop.
 * The `ActionListContext.Consumer` component can be used to access the action list and the `addItem` function to add new items to the list.
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import {
  ActionListContext,
  ActionListProvider,
} from "../../src/context/actionsListContext";
import { ActionListModel } from "@/app/[locale]/(mainPages)/form/models/ActionListModel";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

describe("ActionListContext", () => {
  const initialList: ActionListModel[] = [];

  it("should provide the initial list", () => {
    /**
     * Renders a list of actions with an initial empty list.
     * The list is rendered inside a div with the data-testid "list".
     * The length of the list is asserted to be 0, indicating that the initial list is empty.
     */
    const { getByTestId } = render(
      <ActionListProvider initialList={initialList}>
        <ActionListContext.Consumer>
          {({ list }) => (
            <List data-testid="list">
              {list.map((item) => (
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
              ))}
            </List>
            // <div data-testid="list">
            //   {list.map((item) => (
            //     <div key={item.id}>{item.action?.name}</div>
            //   ))}
            // </div>
          )}
        </ActionListContext.Consumer>
      </ActionListProvider>
    );

    const listElement = getByTestId("list");
    expect(listElement.children.length).toBe(0);
  });

  it("should add a new item to the list", () => {
    const { getByTestId } = render(
      <ActionListProvider initialList={initialList}>
        <ActionListContext.Consumer>
          {({ list, addItem }) => (
            <div>
              <div data-testid="list">
                {list.map((item) => (
                  <div key={item.id}>{item.action?.name}</div>
                ))}
              </div>
              <button
                onClick={() =>
                  addItem({
                    id: "3",
                    category: { id: "1", name: "cat 1" },
                    subCategory: {
                      id: "1",
                      name: "subcat 1",
                      categoryId: "1",
                      actions: [
                        { id: "1", name: "action 1" },
                        { id: "2", name: "action 2" },
                      ],
                    },
                    action: { id: "1", name: "action 1" },
                    howMany: "3",
                  })
                }
              >
                Add Item
              </button>
            </div>
          )}
        </ActionListContext.Consumer>
      </ActionListProvider>
    );

    const listElement = getByTestId("list");
    expect(listElement.children.length).toBe(0);

    const addButton = listElement.nextSibling;
    fireEvent.click(addButton!);

    expect(listElement.children.length).toBe(1);
    expect(listElement.children[0].textContent).toBe("action 1");
  });

  // Add more tests for updateItem and removeItem
});
