const LINES_DATA = [
  { id: 1, label: "خط یک", color: "#D40000" },
  { id: 2, label: "خط دو", color: "#003380" },
  { id: 3, label: "خط سه", color: "#00AAD4" },
  { id: 4, label: "خط چهار", color: "#FFCD00", textColor: "#080404" },
  { id: 5, label: "خط پنج", color: "#008130" },
  { id: 6, label: "خط شش", color: "#FF549A" },
  { id: 7, label: "خط هفت", color: "#AB00D5" },
  { id: "e1", label: "خط پرند", color: "#D40000" },
  { id: "e4", label: "خط فرودگاه", color: "#FFCD00", textColor: "#080404" },
  { id: "e5", label: "خط گلشهر", color: "#008130" },
  { id: "exp5", label: "خط پنج تندرو", color: "#008130" },

];

export const getAllLines = () => {
  return LINES_DATA;
};
