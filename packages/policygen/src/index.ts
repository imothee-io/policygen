#!/usr/bin/env node
import { Command } from "commander";
import {
  generateCommand,
  generatePrivacyCommand,
  generateTermsCommand,
} from "./commands/generate";
import { initCommand } from "./commands/init";

//import { updateCommand } from "./commands/update";

const program = new Command();

// Get the package version from package.json
const currentVersion = require("../package.json").version || "0.5.0";

program
  .name("policygen")
  .description("Create terms and privacy policies")
  .version(currentVersion);

program.addCommand(initCommand);
program.addCommand(generateCommand);
program.addCommand(generatePrivacyCommand);
program.addCommand(generateTermsCommand);

program.parse(process.argv);
