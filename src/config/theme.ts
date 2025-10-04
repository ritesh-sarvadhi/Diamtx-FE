import { appConfig } from "./app.config";

export const themeConfig = {
  token: {
    colorPrimary: appConfig.theme.primaryColor,
  },
  components: {
    Button: {
      colorPrimary: appConfig.theme.primaryColor,
      primaryColor: "#fff",
      primaryShadow: "0 2px 0 rgba(70, 245, 39, 0.1)",
      controlOutline: "rgba(70, 245, 39, 0.1)",
      controlOutlineWidth: 1,
      defaultShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
    },
  },
};
