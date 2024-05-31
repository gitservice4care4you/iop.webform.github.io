// Category interface
export interface Category {
  id: string;
  name: string;
}

// Category data
export const categoriesData: Category[] = [
  { id: "1", name: "Network" },
  { id: "2", name: "Server" },
  { id: "3", name: "Application" },
  { id: "4", name: "Security" },
  { id: "5", name: "Hardware" },
  { id: "6", name: "Software" },
  { id: "7", name: "Database" },
  { id: "8", name: "Storage" },
  { id: "9", name: "Backup" },
  { id: "10", name: "Virtualization" },
  { id: "11", name: "Cloud" },
  { id: "12", name: "Email" },
  { id: "13", name: "Web" },
  { id: "14", name: "Mobile" },
  { id: "15", name: "Desktop" },
  { id: "16", name: "Printing" },
  { id: "17", name: "Collaboration" },
  { id: "18", name: "Identity" },
  { id: "19", name: "Monitoring" },
  { id: "20", name: "Automation" },
  { id: "21", name: "Compliance" },
  { id: "22", name: "Change Management" },
  { id: "23", name: "Asset Management" },
  { id: "24", name: "Incident Management" },
  { id: "25", name: "Problem Management" },
  { id: "26", name: "Knowledge Management" },
  { id: "27", name: "Service Management" },
  { id: "28", name: "Configuration Management" },
  { id: "29", name: "Release Management" },
  { id: "30", name: "Project Management" },
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
    name: "Connectivity",
    categoryId: "1",
    actions: [
      { id: "1", name: "Investigate" },
      { id: "2", name: "Resolve" },
      { id: "3", name: "Escalate" },
    ],
  },
  {
    id: "2",
    name: "Configuration",
    categoryId: "1",
    actions: [
      { id: "1", name: "Update" },
      { id: "2", name: "Test" },
      { id: "3", name: "Implement" },
      { id: "4", name: "Verify" },
      { id: "5", name: "Document" },
    ],
  },
  {
    id: "3",
    name: "Hardware",
    categoryId: "2",
    actions: [
      { id: "1", name: "Replace" },
      { id: "2", name: "Repair" },
    ],
  },
  {
    id: "4",
    name: "Software",
    categoryId: "2",
    actions: [
      { id: "1", name: "Install" },
      { id: "2", name: "Upgrade" },
      { id: "3", name: "Uninstall" },
      { id: "4", name: "Configure" },
    ],
  },
  {
    id: "5",
    name: "Performance",
    categoryId: "3",
    actions: [
      { id: "1", name: "Optimize" },
      { id: "2", name: "Tune" },
      { id: "3", name: "Monitor" },
    ],
  },
  {
    id: "6",
    name: "Bugs",
    categoryId: "3",
    actions: [
      { id: "1", name: "Troubleshoot" },
      { id: "2", name: "Fix" },
      { id: "3", name: "Patch" },
      { id: "4", name: "Report" },
    ],
  },
  {
    id: "7",
    name: "Virus",
    categoryId: "4",
    actions: [
      { id: "1", name: "Scan" },
      { id: "2", name: "Remove" },
      { id: "3", name: "Quarantine" },
      { id: "4", name: "Update" },
    ],
  },
  {
    id: "8",
    name: "Unauthorized Access",
    categoryId: "4",
    actions: [
      { id: "1", name: "Investigate" },
      { id: "2", name: "Block" },
      { id: "3", name: "Restrict" },
    ],
  },
  {
    id: "9",
    name: "Firmware",
    categoryId: "5",
    actions: [
      { id: "1", name: "Update" },
      { id: "2", name: "Rollback" },
    ],
  },
  {
    id: "10",
    name: "Drivers",
    categoryId: "5",
    actions: [
      { id: "1", name: "Install" },
      { id: "2", name: "Uninstall" },
      { id: "3", name: "Update" },
      { id: "4", name: "Rollback" },
    ],
  },
  {
    id: "11",
    name: "Installation",
    categoryId: "6",
    actions: [
      { id: "1", name: "Install" },
      { id: "2", name: "Uninstall" },
      { id: "3", name: "Configure" },
    ],
  },
  {
    id: "12",
    name: "Upgrades",
    categoryId: "6",
    actions: [
      { id: "1", name: "Upgrade" },
      { id: "2", name: "Rollback" },
      { id: "3", name: "Test" },
    ],
  },
  {
    id: "13",
    name: "Structure",
    categoryId: "7",
    actions: [
      { id: "1", name: "Optimize" },
      { id: "2", name: "Reorganize" },
      { id: "3", name: "Migrate" },
    ],
  },
  {
    id: "14",
    name: "Performance",
    categoryId: "7",
    actions: [
      { id: "1", name: "Optimize" },
      { id: "2", name: "Tune" },
      { id: "3", name: "Monitor" },
      { id: "4", name: "Analyze" },
    ],
  },
  {
    id: "15",
    name: "Capacity",
    categoryId: "8",
    actions: [
      { id: "1", name: "Expand" },
      { id: "2", name: "Optimize" },
      { id: "3", name: "Monitor" },
    ],
  },
];
