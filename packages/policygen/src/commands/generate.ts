import { Command } from "commander";
import { loadConfig } from "../utils/loadConfig";
import { renderTemplate } from "../utils/renderTemplate";

// Abstracted generation functions
async function generatePrivacyPolicy() {
  console.log("Generating privacy policy...");
  const config = loadConfig();

  if (!config) {
    console.error("❌ No config found. Please run `policygen init` first.");
    return;
  }

  // Check for a privacyFilePath in the config
  if (!config.output.privacyFilePath) {
    console.log("⚠️ privacyFilePath is not set, skipping");
    return;
  }

  try {
    await renderTemplate(config, "privacy");
    console.log("✅ Privacy policy generated successfully.");
  } catch (error) {
    console.error("❌ Failed to generate privacy policy:", error);
  }
}

async function generateTermsOfService() {
  console.log("Generating terms of service...");
  const config = loadConfig();

  if (!config) {
    console.error("❌ No config found. Please run `policygen init` first.");
    return;
  }

  // Check for a termsFilePath in the config
  if (!config.output.termsFilePath) {
    console.log("⚠️ termsFilePath is not set, skipping");
    return;
  }

  try {
    await renderTemplate(config, "terms");
    console.log("✅ Terms of service policy generated successfully.");
  } catch (error) {
    console.error("❌ Failed to generate terms of service policy:", error);
  }
}

async function generateAllPolicies() {
  console.log("Generating all policies...");
  await generatePrivacyPolicy();
  await generateTermsOfService();
}

// Main `generate` command
export const generateCommand = new Command("generate")
  .description("Generate policies")
  .argument("[type]", "Type of generation: all, privacy, or terms", "all") // Default to "all"
  .action(async (type) => {
    switch (type) {
      case "privacy":
        await generatePrivacyPolicy();
        break;
      case "terms":
        await generateTermsOfService();
        break;
      default:
        await generateAllPolicies();
        break;
    }
  });

// Subcommands for `generate:privacy` and `generate:terms`
export const generatePrivacyCommand = new Command("generate:privacy")
  .description("Generate the privacy policy")
  .action(async () => {
    await generatePrivacyPolicy();
  });

export const generateTermsCommand = new Command("generate:terms")
  .description("Generate the terms of service")
  .action(async () => {
    await generateTermsOfService();
  });
