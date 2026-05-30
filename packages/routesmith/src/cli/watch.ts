import * as path from "path";
import chokidar from "chokidar";

import { loadConfig } from "./loadConfig";
import { generate } from "./generate";

export async function watch() {
  const config = await loadConfig();

  const screensPath = path.resolve(process.cwd(), config.screensDir);

  console.log(`Watching: ${screensPath}`);

  const watcher = chokidar.watch(screensPath);

  let ready = false;
  let timeout: NodeJS.Timeout;

  watcher.on("ready", () => {
    ready = true;
    console.log("Routesmith watcher ready.");
  });

  watcher.on("all", (event, file) => {
    if (!ready) return;

    if (event !== "add" && event !== "change" && event !== "unlink") {
      return;
    }

    console.log(`[${event}] ${file}`);

    clearTimeout(timeout);

    timeout = setTimeout(async () => {
      try {
        await generate();
      } catch (error) {
        console.error("Failed to generate routes:", error);
      }
    }, 300);
  });
}
