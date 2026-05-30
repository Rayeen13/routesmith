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

const toCamelCase = (value: string) => {
  return value.charAt(0).toLowerCase() + value.slice(1);
};

const toPascalCase = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const applyRouteCase = (routeName: string, routeCase?: "camel" | "pascal") => {
  if (routeCase === "camel") {
    return toCamelCase(routeName);
  }

  return toPascalCase(routeName);
};

export const generateRoutes = (
  screens: ScreenInfo[],
  config: RoutesmithConfig,
) => {
  const routes = screens
    .map((screen) => {
      const baseRouteName = getRouteName(
        screen.name,
        config.naming?.removeSuffix,
      );

      const routeName = applyRouteCase(baseRouteName, config.naming?.routeCase);

      return `  ${routeName}: '${screen.name}',`;
    })
    .join("\n");

  return `
export const Routes = {
${routes}
} as const;
`;
};
