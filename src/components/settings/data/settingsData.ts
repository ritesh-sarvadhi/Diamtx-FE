// Mock data for different settings sections
export interface SettingItem {
  key: number;
  name: string;
  code: string;
  sequence: number;
  active: boolean;
  display: boolean;
  default: boolean;
  likeKeywords: string;
}

export const getSettingsData = (sectionKey: string): SettingItem[] => {
  const baseData: SettingItem[] = [
    { key: 1, name: "E", code: "E", sequence: 1, active: true, display: true, default: false, likeKeywords: "E,e" },
    { key: 2, name: "F", code: "F", sequence: 2, active: true, display: true, default: false, likeKeywords: "F" },
    { key: 3, name: "G", code: "G", sequence: 3, active: true, display: true, default: false, likeKeywords: "G" },
    { key: 4, name: "H", code: "H", sequence: 4, active: true, display: true, default: false, likeKeywords: "H,H-,WHITE (H)" },
    { key: 5, name: "I", code: "I", sequence: 5, active: false, display: false, default: false, likeKeywords: "I" },
    { key: 6, name: "J", code: "J", sequence: 6, active: true, display: true, default: false, likeKeywords: "J" },
    { key: 7, name: "K", code: "K", sequence: 7, active: true, display: true, default: false, likeKeywords: "K" },
    { key: 8, name: "D", code: "D", sequence: 8, active: false, display: false, default: false, likeKeywords: "D,D*,d" },
    { key: 9, name: "L", code: "L", sequence: 9, active: true, display: true, default: false, likeKeywords: "L" },
    { key: 10, name: "N", code: "N", sequence: 10, active: true, display: true, default: false, likeKeywords: "N" },
    { key: 11, name: "O", code: "O", sequence: 11, active: false, display: true, default: false, likeKeywords: "-" },
    { key: 12, name: "P", code: "P", sequence: 12, active: false, display: true, default: false, likeKeywords: "-" },
    { key: 13, name: "Q", code: "Q", sequence: 13, active: false, display: true, default: false, likeKeywords: "-" },
    { key: 14, name: "R", code: "R", sequence: 14, active: false, display: true, default: false, likeKeywords: "-" },
  ];

  // Modify data based on section
  return baseData.map(item => ({
    ...item,
    name: sectionKey === "white" ? item.name : `${item.name}_${sectionKey}`,
    code: sectionKey === "white" ? item.code : `${item.code}_${sectionKey}`,
  }));
};

export const getSectionTitle = (sectionKey: string): string => {
  const titles: { [key: string]: string } = {
    "white": "White",
    "clarity": "Clarity",
    "company-designation": "Company Designation",
    "fancy-color": "Fancy Color",
    "business-type": "Business Type",
    "cut": "Cut",
    "intensity": "Intensity",
    "lab": "Lab",
    "overtone": "Overtone",
    "fluorescence": "Fluorescence",
    "symmetry": "Symmetry",
    "polish": "Polish",
    "shape": "Shape",
    "ha": "H&A",
  };
  return titles[sectionKey] || "Settings";
};

export const getMenuItems = () => [
  { key: "white", label: "White" },
  { key: "clarity", label: "Clarity" },
  { key: "company-designation", label: "Company Designation" },
  { key: "fancy-color", label: "Fancy Color" },
  { key: "business-type", label: "Business Type" },
  { key: "cut", label: "Cut" },
  { key: "intensity", label: "Intensity" },
  { key: "lab", label: "Lab" },
  { key: "overtone", label: "Overtone" },
  { key: "fluorescence", label: "Fluorescence" },
  { key: "symmetry", label: "Symmetry" },
  { key: "polish", label: "Polish" },
  { key: "shape", label: "Shape" },
  { key: "ha", label: "H&A" },
];
