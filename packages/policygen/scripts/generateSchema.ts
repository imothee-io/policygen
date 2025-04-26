import fs from "fs";
import path from "path";
import * as TJS from "typescript-json-schema";

// Path to the TypeScript configuration file
const tsconfigPath = path.resolve(__dirname, "../tsconfig.json");

// Get the current version (e.g., from package.json)
const version = require("../package.json").version || "0.0.0";
const [major, minor] = version.split(".");

// Output paths for the schema
const docsOutputPath = path.resolve(
	__dirname,
	`../../docs/public/schemas/${major}.${minor}/schema.json`,
);
const distOutputPath = path.resolve(__dirname, "../dist/config_schema.json");

// TypeScript settings for the schema generator
const settings: TJS.PartialArgs = {
	required: true,
	noExtraProps: true,
	titles: true,
	topRef: true,
};

// Generate the schema for the `PolicygenConfig` type
const program = TJS.getProgramFromFiles(
	[path.resolve(__dirname, "../src/config.ts")],
	{
		skipLibCheck: true,
		esModuleInterop: true,
	},
);
const schema = TJS.generateSchema(program, "PolicygenConfig", settings);

// Add the build number to the schema
if (schema) {
	// Add `if/then` for `privacyFilePath` requiring `privacy`
	if (schema.properties?.output) {
		schema.allOf = schema.allOf || [];

		// Add condition for `privacyFilePath`
		schema.allOf.push({
			if: {
				properties: {
					output: {
						type: "object",
						properties: { privacyFilePath: { type: "string" } },
						required: ["privacyFilePath"],
					},
				},
			},
			// biome-ignore lint/suspicious/noThenProperty: <explanation>
			then: {
				required: ["privacy"],
			},
		});

		// Add condition for `termsFilePath`
		schema.allOf.push({
			if: {
				properties: {
					output: {
						type: "object",
						properties: { termsFilePath: { type: "string" } },
						required: ["termsFilePath"],
					},
				},
			},
			// biome-ignore lint/suspicious/noThenProperty: <explanation>
			then: {
				required: ["terms"],
			},
		});
	}

	// Ensure the output directories exist
	fs.mkdirSync(path.dirname(docsOutputPath), { recursive: true });
	fs.mkdirSync(path.dirname(distOutputPath), { recursive: true });

	// Write the schema to the `docs/public/schemas` folder
	fs.writeFileSync(docsOutputPath, JSON.stringify(schema, null, 2), "utf-8");
	console.log(`✅ Schema generated and exported to ${docsOutputPath}`);

	// Write the schema to the `dist` folder
	fs.writeFileSync(distOutputPath, JSON.stringify(schema, null, 2), "utf-8");
	console.log(`✅ Schema generated and exported to ${distOutputPath}`);
} else {
	console.error("❌ Failed to generate schema.");
}
