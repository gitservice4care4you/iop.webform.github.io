// Category interface
export interface Category {
  id: string;
  name: string;
}

// Category data
export const categoriesData: Category[] = [
  { id: "1", name: "Physical" },
  { id: "2", name: "Economic" },
  { id: "3", name: "Legal" },
  { id: "4", name: "Social" },
  { id: "5", name: "Psychological" },
];

// Subcategory interface
export interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
  actions: Action[];
}

// Action interface
export interface Action {
  id: string;
  name: string;
}

// Subcategory data
export const subCategoriesData: SubCategory[] = [
  {
    id: "1",
    name: "Sexual",
    categoryId: "1",
    actions: [
      { id: "1", name: "Harassment (verbal / online)" },
      { id: "2", name: "Rape" },
      { id: "3", name: "Abuse (touching and following)" },
      { id: "4", name: "Grooming" },
      { id: "5", name: "Duplicate" },
    ],
  },
  {
    id: "2",
    name: "Physical Harm",
    categoryId: "1",
    actions: [
      { id: "1", name: "Mutilation of a person's body" },
      { id: "2", name: "Attempted murder" },
    ],
  },
  {
    id: "3",
    name: "Illegal procedure",
    categoryId: "2",
    actions: [{ id: "1", name: "Economic harassment (authorities)" }],
  },
  {
    id: "4",
    name: "Harassment",
    categoryId: "2",
    actions: [
      { id: "1", name: "Economic harassment (personal or non-government)" },
    ],
  },
  {
    id: "5",
    name: "Personal Freedom",
    categoryId: "3",
    actions: [{ id: "1", name: "Slavery or bonded servitude" }],
  },
  {
    id: "6",
    name: "Imprisonment",
    categoryId: "3",
    actions: [
      {
        id: "1",
        name: "Imprisonment in labor camp",
      },
      {
        id: "2",
        name: "Detention at home, in jail, labor camp, psychiatric hospital or other",
      },
    ],
  },
  {
    id: "7",
    name: "Social Image",
    categoryId: "4",
    actions: [
      {
        id: "1",
        name: "Smear campaigns, libel and slander (excluding online)",
      },
    ],
  },
  {
    id: "8",
    name: "Threat",
    categoryId: "5",
    actions: [{ id: "1", name: "Death threat" }],
  },
];
