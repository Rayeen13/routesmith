import { ScreenInfo } from "./types";

export const generateRoutes = (screens: ScreenInfo[]) => {
  const routes = screens
    .map((screen) => `  ${screen.name}: '${screen.name}',`)
    .join("\n");

  return `
export const Routes = {
${routes}
} as const;
`;
};
