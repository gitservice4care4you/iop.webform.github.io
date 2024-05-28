type Category = {
  id: number;
  name: string | null;
};

type SubCategory = {
  id: number;
  name: string | null;
};

type Action = {
  id: number;
  name: string | null;
};

type ActionListModel = {
  id: number | null;
  category: Category | null;
  subCategory: SubCategory | null;
  action: Action | null;
  howMany: number | null;
} & {
  toString(): string;
};

// class ActionListModel {
//   toString(): string {
//     return `${this.id}, ${this.category.name}, ${this.subCategory.name}, ${this.action.name}, ${this.howMany}`;
//   }
// }
