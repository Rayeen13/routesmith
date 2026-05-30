import { RoutesmithConfig } from "@riyan/routesmith";

const config: RoutesmithConfig = {
  screensDir: "./src/screens",
  output: "./src/generated/routes.ts",

  naming: {
    removeSuffix: "Screen",
    routeCase: "pascal",
  },

  router: {
    enabled: true,
    style: "camel",
  },
};

export default config;
