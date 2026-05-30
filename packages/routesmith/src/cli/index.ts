#!/usr/bin/env node

import { generate } from "./generate";
import { watch } from "./watch";
import { init } from "./init";

function showHelp() {
  console.log(`
Routesmith

Usage:
  routesmith <command>

Commands:
  init        Create routesmith.config.ts
  generate    Generate routes
  watch       Watch screens and regenerate routes

Examples:
  routesmith init
  routesmith generate
  routesmith watch
`);
}

async function main() {
  const command = process.argv[2];

  if (!command) {
    showHelp();
    process.exit(0);
  }

  switch (command) {
    case "generate":
      await generate();
      break;

    case "watch":
      await watch();
      break;

    case "init":
      await init();
      break;

    case "help":
    case "--help":
    case "-h":
      showHelp();
      break;

    default:
      console.error(`Unknown command: ${command}`);
      console.log();
      showHelp();
      process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
