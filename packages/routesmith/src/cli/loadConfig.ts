import * as fs from "fs";
import * as path from "path";
import { require as tsxRequire } from "tsx/cjs/api";

import { RoutesmithConfig } from "../types";

export const loadConfig = async (): Promise<RoutesmithConfig> => {
  const configPath = path.resolve(process.cwd(), "routesmith.config.ts");

  if (!fs.existsSync(configPath)) {
    throw new Error(`Routesmith config not found: ${configPath}`);
  }

  console.log(`Loading config from: ${configPath}`);

  const config = tsxRequire(configPath, __filename);

  return config.default;
};
