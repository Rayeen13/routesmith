import { ScreenInfo } from "./types";
import { RoutesmithConfig } from "../types";

const getRouteName = (screenName: string, removeSuffix?: string) => {
  if (!removeSuffix) {
    return screenName;
  }

  if (screenName.endsWith(removeSuffix)) {
    return screenName.slice(0, -removeSuffix.length);
  }

  return screenName;
};

export const generateRoutes = (
  screens: ScreenInfo[],
  config: RoutesmithConfig,
) => {
  const routes = screens
    .map((screen) => {
      const routeName = getRouteName(screen.name, config.naming?.removeSuffix);

      return `  ${routeName}: '${screen.name}',`;
    })
    .join("\n");

  return `
export const Routes = {
${routes}
} as const;
`;
};
