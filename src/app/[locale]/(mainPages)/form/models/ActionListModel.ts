import { Action, Category, SubCategory } from "../fakeData";

export type ActionListModel = {
  id: string;
  category: Category | null;
  subCategory: SubCategory | null;
  action: Action | null;
  howMany: string;
} & {
  toString(): string;
};
