import * as fs from "fs";
import * as path from "path";

import { ScreenInfo } from "./types";

export const scanScreens = (screensDir: string): ScreenInfo[] => {
  const files = fs.readdirSync(screensDir);

  return files
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => ({
      name: path.basename(file, ".tsx"),
      path: path.join(screensDir, file),
    }));
};
