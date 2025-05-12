import { Command } from "commander";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import {
	CSSFramework,
	defaultEntityConfig,
	defaultOutputConfig,
	defaultPrivacyConfig,
	defaultTermsConfig,
	DisputeResolution,
	FileType,
	LegalBasis,
	LiabilityLimitationType,
	Locale,
	Locations,
	PersonalInformation,
	Platforms,
	type PolicygenConfig,
	ProhibitedUses,
	RefundPolicy,
	RefundType,
	SensitiveInformation,
	ServiceRequirements,
	ThirdPartyData,
} from "../config";

export function enumToStringArray<T extends Record<string, string | number>>(
	enumObj: T,
): string[] {
	return Object.values(enumObj).filter(
		(value) => typeof value === "string",
	) as string[];
}

export const initCommand = new Command("init")
	.description("Initialize the project")
	.option("--default", "Use default configuration values without prompting")
	.action(async (options) => {
		const configPath = path.resolve(process.cwd(), "policygen.json");

		console.log(
			"📦 Initializing policygen in the current directory:",
			configPath,
		);

		// Check if the policygen.json file already exists
		if (fs.existsSync(configPath)) {
			console.log(
				"⚠️ A policygen.json file already exists at the project root.",
				process.cwd(),
			);
			return;
		}

		// If --default flag is passed, skip prompts and use default values
		if (options.default) {
			const currentVersion = require("../../package.json").version || "0.0.0";
			const [currentMajor, currentMinor] = currentVersion.split(".");

			// Create the default configuration
			const newConfig: PolicygenConfig & { $schema: string } = {
				$schema: `https://policygen.xyz/schemas/${currentMajor}.${currentMinor}/schema.json`,
				output: defaultOutputConfig,
				entity: defaultEntityConfig,
				privacy: defaultPrivacyConfig,
				terms: defaultTermsConfig,
			};

			// Write the default config to policygen.json
			fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2), "utf-8");
			console.log(
				"✅ policygen.json has been created successfully with default values!",
			);
			return;
		}

		const outputAnswers = await inquirer.prompt([
			{
				type: "input",
				name: "privacyFilePath",
				message:
					"Where do you want to output the privacy policy? (leave blank to not generate)",
			},
			{
				type: "input",
				name: "termsFilePath",
				message:
					"Where do you want to output the terms of service? (leave blank to not generate)",
			},
			{
				type: "select",
				name: "fileType",
				message: "What file type do you want to use?",
				choices: enumToStringArray(FileType),
				default: defaultOutputConfig.fileType,
			},
			{
				type: "select",
				name: "cssFramework",
				message: "Which CSS framework are you using?",
				choices: enumToStringArray(CSSFramework),
				default: defaultOutputConfig.cssFramework.toString(),
			},
			{
				type: "checkbox",
				name: "locales",
				message: "What languages do you want to write your policies out into?",
				choices: enumToStringArray(Locale),
				default: defaultOutputConfig.locales,
			},
		]);

		const entityAnswers = await inquirer.prompt([
			{
				type: "input",
				name: "name",
				message: "What is the name of your entity?",
				required: true,
			},
			{
				type: "input",
				name: "website",
				message: "What is the website URL of your entity?",
				required: true,
			},
			{
				type: "input",
				name: "address",
				message: "What is the public address of your entity? (Optional)",
			},
		]);

		if (outputAnswers.privacyFilePath) {
			console.log(
				"Please answer the following questions for the privacy policy:",
			);
		}

		const privacyAnswers = outputAnswers.privacyFilePath
			? await inquirer.prompt([
					{
						type: "input",
						name: "privacyEmail",
						message: "What is the email address for privacy questions?",
						required: true,
					},
					{
						type: "checkbox",
						name: "platforms",
						message: "Which platforms Do you operate on?",
						choices: enumToStringArray(Platforms),
						default: defaultPrivacyConfig.platforms,
					},
					{
						type: "checkbox",
						name: "locations",
						message: "Which regions Do you operate in?",
						choices: enumToStringArray(Locations),
						default: defaultPrivacyConfig.locations,
					},

					{
						type: "confirm",
						name: "socialSignIn",
						message: "Do you support social sign-in?",
						default: defaultPrivacyConfig.socialSignIn,
					},
					{
						type: "checkbox",
						name: "personalInformation",
						message: "What personal information Do you collect?",
						choices: enumToStringArray(PersonalInformation),
					},
					{
						type: "checkbox",
						name: "sensitiveInformation",
						message: "What sensitive information Do you collect?",
						choices: enumToStringArray(SensitiveInformation),
					},
					{
						type: "checkbox",
						name: "thirdPartyData",
						message: "What third-party data Do you use?",
						choices: enumToStringArray(ThirdPartyData),
					},
					{
						type: "confirm",
						name: "paymentData",
						message: "Do you collect payment data?",
						default: defaultPrivacyConfig.paymentData,
					},
					{
						type: "input",
						name: "paymentProcessors",
						message: "Which payment processors do you use? (comma-separated)",
						filter: (input: string) =>
							input.split(",").map((item: string) => item.trim()),
						when: (answers) => answers.paymentData,
					},
					{
						type: "confirm",
						name: "appUsageData",
						message: "Do you store logs or app usage data?",
						default: defaultPrivacyConfig.appUsageData,
					},
					{
						type: "confirm",
						name: "thirdPartyDisclosure",
						message:
							"Do you disclose personal information to third parties? If you use third-party services that collect data, set this to true.",
						default: defaultPrivacyConfig.thirdPartyDisclosure,
					},
					{
						type: "input",
						name: "thirdPartyDisclosureEntities",
						message:
							"Third party entities you disclose personal information to? (comma-separated)",
						filter: (input: string) =>
							input.split(",").map((item: string) => item.trim()),
						when: (answers) => answers.thirdPartyDisclosure,
					},
					{
						type: "confirm",
						name: "thirdPartySharing",
						message:
							"Do you sell/share personal information with third parties?",
						default: defaultPrivacyConfig.thirdPartySharing,
					},
					{
						type: "input",
						name: "thirdPartySharingEntities",
						message:
							"Third party entities you share personal information with? (comma-separated)",
						filter: (input: string) =>
							input.split(",").map((item: string) => item.trim()),
						when: (answers) => answers.thirdPartyDisclosure,
					},
					{
						type: "confirm",
						name: "securityMeasures",
						message:
							"Do you have robust security measures in place to protect personal information?",
						default: defaultPrivacyConfig.securityMeasures,
					},
					{
						type: "confirm",
						name: "webTracking",
						message: "Do you use web tracking?",
						default: defaultPrivacyConfig.webTracking,
					},
					{
						type: "confirm",
						name: "thirdPartyAnalytics",
						message: "Do you use third-party analytics services?",
						default: defaultPrivacyConfig.thirdPartyAnalytics,
					},
					{
						type: "checkbox",
						name: "serviceRequirements",
						message: "What do you need to perform to deliver your service?",
						choices: enumToStringArray(ServiceRequirements),
					},
					{
						type: "checkbox",
						name: "legalBasis",
						message: "What is the legal basis for processing data?",
						choices: enumToStringArray(LegalBasis),
					},
					{
						type: "input",
						name: "dataRetentionPeriod",
						message:
							"What is your data retention period (e.g., '1 year')? (Optional)",
					},
					{
						type: "confirm",
						name: "usStatePrivacyLaws",
						message: "Do you comply with US state privacy laws?",
						default: defaultPrivacyConfig.usStatePrivacyLaws,
					},
					{
						type: "input",
						name: "privacyPage",
						message: "What is the URL of your privacy policy page? (Optional)",
					},
					{
						type: "confirm",
						name: "dpo",
						message: "Do you have a Data Protection Officer (DPO)?",
						default: defaultPrivacyConfig.dpo,
					},
					{
						type: "input",
						name: "dpoName",
						message: "What is the name of your DPO?",
						required: true,
						when: (answers) => answers.dpo,
					},
					{
						type: "input",
						name: "dpoEmail",
						message: "What is the email address of your DPO?",
						required: true,
						when: (answers) => answers.dpo,
					},
					{
						type: "input",
						name: "dpoPhone",
						message: "What is the phone number of your DPO? (Optional)",
						when: (answers) => answers.dpo,
					},
				])
			: undefined;

		if (outputAnswers.termsFilePath) {
			console.log(
				"Please answer the following questions for the privacy policy:",
			);
		}

		const termsAnswers = outputAnswers.termsFilePath
			? await inquirer.prompt([
					{
						type: "input",
						name: "supportEmail",
						message: "What is the email address for support questions?",
						required: true,
					},
					{
						type: "confirm",
						name: "underEighteen",
						message: "Do you allow users under 18?",
						default: defaultTermsConfig.underEighteen,
					},
					{
						type: "confirm",
						name: "underThirteen",
						message: "Do you allow users under 13?",
						default: defaultTermsConfig.underThirteen,
					},
					{
						type: "confirm",
						name: "purchasableGoods",
						message: "Do you sell purchasable goods?",
						default: defaultTermsConfig.purchasableGoods,
					},
					{
						type: "confirm",
						name: "subscription",
						message: "Do you offer subscriptions?",
						default: defaultTermsConfig.subscription,
					},
					{
						type: "confirm",
						name: "freeTrial",
						message: "Do you offer free trials?",
						default: defaultTermsConfig.freeTrial,
						when: (answers) => answers.subscription,
					},
					{
						type: "confirm",
						name: "autoRenew",
						message: "Do you offer auto-renewal for subscriptions?",
						default: defaultTermsConfig.autoRenew,
						when: (answers) => answers.subscription,
					},
					{
						type: "select",
						name: "refundPolicy",
						message: "What is your refund policy?",
						choices: enumToStringArray(RefundPolicy),
						default: defaultTermsConfig.refundPolicy,
					},
					{
						type: "confirm",
						name: "userContent",
						message: "Do you allow user-generated content?",
						default: defaultTermsConfig.userContent,
					},
					{
						type: "confirm",
						name: "userContentLicense",
						message:
							"Do you assign yourself a license of user uploaded content?",
						default: defaultTermsConfig.userContentLicense,
					},
					{
						type: "confirm",
						name: "userAccounts",
						message: "Do you require user accounts?",
						default: defaultTermsConfig.userAccounts,
					},
					{
						type: "input",
						name: "governingLaw",
						message: "What location do you want for your governing law clause?",
						default: defaultTermsConfig.governingLaw,
						required: true,
					},
					{
						type: "list",
						name: "disputeResolution",
						message: "What is your dispute resolution method?",
						choices: enumToStringArray(DisputeResolution),
						default: defaultTermsConfig.disputeResolution,
					},
					{
						type: "confirm",
						name: "mediation",
						message: "Do you support mediation for disputes?",
						default: defaultTermsConfig.mediation,
					},
					{
						type: "checkbox",
						name: "prohibitedUses",
						message: "What are the prohibited uses of your service?",
						choices: enumToStringArray(ProhibitedUses),
					},
					{
						type: "confirm",
						name: "serviceSLA",
						message: "Do you provide a service-level agreement (SLA)?",
						default: defaultTermsConfig.serviceSLA,
					},
					{
						type: "input",
						name: "serviceSLACustom",
						message:
							"Do you have custom SLA terms? Shown instead of default SLA terms.",
						default: defaultTermsConfig.serviceSLACustom,
						when: (answers) => answers.serviceSLA,
					},
					{
						type: "number",
						name: "serviceSLAAmount",
						message: "What is the SLA amount (e.g., Uptime)?",
						default: defaultTermsConfig.serviceSLAAmount,
						when: (answers) => answers.serviceSLA && !answers.serviceSLACustom,
					},
					{
						type: "input",
						name: "serviceSLATimeframe",
						message: "What is the SLA timeframe (e.g., '30 days')?",
						default: defaultTermsConfig.serviceSLATimeframe,
						when: (answers) => answers.serviceSLA && !answers.serviceSLACustom,
					},
					{
						type: "confirm",
						name: "serviceSLARefund",
						message: "Does your SLA include refunds?",
						default: defaultTermsConfig.serviceSLARefund,
						when: (answers) => answers.serviceSLA,
					},
					{
						type: "list",
						name: "serviceSLARefundType",
						message: "What type of SLA refund is provided?",
						choices: enumToStringArray(RefundType),
						default: defaultTermsConfig.serviceSLARefundType,
						when: (answers) => answers.serviceSLARefund,
					},
					{
						type: "confirm",
						name: "liabilityLimitation",
						message: "Do you limit liability?",
						default: defaultTermsConfig.liabilityLimitation,
					},
					{
						type: "list",
						name: "liabilityLimitationType",
						message: "What type of liability limitation is applied?",
						choices: enumToStringArray(LiabilityLimitationType),
						default: defaultTermsConfig.liabilityLimitationType,
						when: (answers) => answers.liabilityLimitation,
					},
					{
						type: "input",
						name: "liabilityLimitationTimeframe",
						message:
							"What is the liability limitation timeframe (e.g., '6 months')?",
						default: defaultTermsConfig.liabilityLimitationTimeframe,
						when: (answers) => answers.subscription,
					},
					{
						type: "number",
						name: "liabilityLimitationAmount",
						message: "What is the liability limitation amount?",
						default: defaultTermsConfig.liabilityLimitationAmount,
						when: (answers) =>
							answers.liabilityLimitationType === "amount" ||
							answers.liabilityLimitationType === "minAmountPaidOrAmount",
					},
				])
			: undefined;

		const currentVersion = require("../../package.json").version || "0.0.0";
		const [currentMajor, currentMinor] = currentVersion.split(".");

		// Merge answers with the default config
		const newConfig: PolicygenConfig & { $schema: string } = {
			$schema: `https://policygen.xyz/schemas/${currentMajor}.${currentMinor}/schema.json`,
			output: {
				...defaultOutputConfig,
				...outputAnswers,
			},
			entity: {
				...defaultEntityConfig,
				...entityAnswers,
			},
			privacy: {
				...defaultPrivacyConfig,
				...privacyAnswers,
			},
			terms: {
				...defaultTermsConfig,
				...termsAnswers,
			},
		};

		// Write the new config to policygen.json
		fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2), "utf-8");
		console.log("✅ policygen.json has been created successfully!");
	});
