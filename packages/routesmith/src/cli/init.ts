import * as fs from "fs";
import * as path from "path";

export async function init() {
  const configPath = path.resolve(process.cwd(), "routesmith.config.ts");

  if (fs.existsSync(configPath)) {
    console.log("routesmith.config.ts already exists.");
    return;
  }

  const configContent = `import { RoutesmithConfig } from "@riyan/routesmith";

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
`;

  fs.writeFileSync(configPath, configContent);

  console.log("Created routesmith.config.ts");
}
