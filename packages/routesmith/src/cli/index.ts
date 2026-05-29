import * as fs from "fs";
import * as path from "path";

import { loadConfig } from "./loadConfig";
import { scanScreens } from "../generator/scanScreens";
import { generateRoutes } from "../generator/generateRoutes";

async function main() {
  const config = await loadConfig();

  const screensPath = path.resolve(process.cwd(), config.screensDir);

  const outputPath = path.resolve(process.cwd(), config.output);

  const screens = scanScreens(screensPath);

  const output = generateRoutes(screens);

  fs.writeFileSync(outputPath, output);

  console.log("Routes generated successfully.");
  console.log(`Screens: ${screensPath}`);
  console.log(`Output: ${outputPath}`);
}

main();
