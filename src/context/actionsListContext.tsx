/**
 * Provides a context for managing a list of `ActionListModel` items, including functionality to add, update, and remove items.
 *
 * The `ActionListProvider` component is responsible for managing the state of the list and exposing the necessary actions through the `ActionListContext`.
 *
 * The `ActionListContext` provides the following properties:
 * - `list`: The current list of `ActionListModel` items.
 * - `addItem`: A function to add a new `ActionListModel` item to the list.
 * - `updateItem`: A function to update an existing `ActionListModel` item in the list.
 * - `removeItem`: A function to remove an `ActionListModel` item from the list.
 *
 * The `ActionListProvider` component can be used to wrap components that need access to the `ActionListContext`.
 */
import { ActionListModel } from "@/app/[locale]/(mainPages)/form/models/ActionListModel";
import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";

interface ActionListContextValue {
  list: ActionListModel[];
  addItem: (item: ActionListModel) => void;
  updateItem: (id: string, updatedItem: ActionListModel) => void;
  removeItem: (id: string) => void;
}

export const ActionListContext = createContext<ActionListContextValue>({
  list: [],
  addItem: () => {},
  updateItem: () => {},
  removeItem: () => {},
});

interface ListProviderProps {
  children: React.ReactNode;
  initialList?: ActionListModel[];
}

export const ActionListProvider: React.FC<ListProviderProps> = ({
  children,
  initialList = [],
}) => {
  /**
   * Maintains the state of the list of `ActionListModel` items.
   * The `list` state variable holds the current list of `ActionListModel` items.
   * The `setList` function can be used to update the `list` state.
   */
  const [list, setList] = useState<ActionListModel[]>(initialList);

  useEffect(() => {
    // Fetch the list from an API or load from localStorage here
  }, []);

  /**
   * Adds a new `ActionListModel` item to the list.
   * @param item - The `ActionListModel` item to add to the list.
   */
  const addItem = (item: ActionListModel) => {
    setList((prevList) => [...prevList, item]);
    // Save the updated list to an API or localStorage here
  };

  /**
   * Updates an existing `ActionListModel` item in the list.
   * @param id - The unique identifier of the item to update.
   * @param updatedItem - The updated `ActionListModel` item to replace the existing item.
   */
  const updateItem = useCallback(
    (id: string, updatedItem: ActionListModel) => {
      setList((prevList) => {
        const updatedList: ActionListModel[] = prevList.map((item) => {
          if (item.id === id) {
            return updatedItem;
          }
          return item;
        });
        return updatedList;
      });
      // Update the item on an API or localStorage here
    },
    [list]
  );

  /**
   * Removes an existing `ActionListModel` item from the list.
   * @param id - The unique identifier of the item to remove.
   */
  const removeItem = (id: string) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
    // Remove the item from an API or localStorage here
  };

  /**
   * Creates a memoized object containing the current list of `ActionListModel` items, and functions to add, update, and remove items from the list.
   * This object is provided as the value of the `ActionListContext` to be consumed by components in the application.
   * The memoization ensures that the object reference remains stable unless the dependencies (`list`, `addItem`, `updateItem`, `removeItem`) change.
   */
  const contextValue = useMemo(
    () => ({ list, addItem, updateItem, removeItem }),
    [list, addItem, updateItem, removeItem]
  );

  return (
    <ActionListContext.Provider value={contextValue}>
      {children}
    </ActionListContext.Provider>
  );
};
