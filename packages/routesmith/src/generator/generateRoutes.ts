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

const getRouterMethodName = (
  routeName: string,
  style?: "camel" | "pascal" | "to",
) => {
  switch (style) {
    case "camel":
      return toCamelCase(routeName);

    case "pascal":
      return toPascalCase(routeName);

    default:
      return toPascalCase(routeName);
  }
};

export const generateRoutes = (
  screens: ScreenInfo[],
  config: RoutesmithConfig,
) => {
  const routeInfos = screens.map((screen) => {
    const baseRouteName = getRouteName(
      screen.name,
      config.naming?.removeSuffix,
    );

    const routeName = applyRouteCase(baseRouteName, config.naming?.routeCase);

    return {
      screen,
      routeName,
    };
  });

  const routes = routeInfos
    .map(({ screen, routeName }) => {
      return `  ${routeName}: '${screen.name}',`;
    })
    .join("\n");

  const routerMethods = routeInfos
    .map(({ routeName }) => {
      const methodName = getRouterMethodName(routeName, config.router?.style);

      return `  ${methodName}: () => Routes.${routeName},`;
    })
    .join("\n");

  const router = config.router?.enabled
    ? config.router.style === "to"
      ? `
export const router = {
  to: {
${routeInfos
  .map(({ routeName }) => `    ${routeName}: () => Routes.${routeName},`)
  .join("\n")}
  },
} as const;
`
      : `
export const router = {
${routerMethods}
} as const;
`
    : "";

  return `
export const Routes = {
${routes}
} as const;
${router}
`;
};
