import { ActionListModel } from "@/app/[locale]/(mainPages)/form/models/ActionListModel";
import React, { createContext, useState, useEffect, useMemo } from "react";

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
  const [list, setList] = useState<ActionListModel[]>(initialList);

  useEffect(() => {
    // Fetch the list from an API or load from localStorage here
  }, []);

  const addItem = (item: ActionListModel) => {
    setList((prevList) => [...prevList, item]);
    // Save the updated list to an API or localStorage here
  };

  const updateItem = (id: string, updatedItem: ActionListModel) => {
    setList((prevList) =>
      prevList.map((item) => (item.id === id ? updatedItem : item))
    );
    // Update the item on an API or localStorage here
  };

  const removeItem = (id: string) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
    // Remove the item from an API or localStorage here
  };

  const contextValue = useMemo(
    () => ({ list, addItem, updateItem, removeItem }),
    [list]
  );

  return (
    <ActionListContext.Provider value={contextValue}>
      {children}
    </ActionListContext.Provider>
  );
};
