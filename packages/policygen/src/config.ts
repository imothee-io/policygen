export enum CSSFramework {
	tailwind = "tailwind",
	daisyui = "daisyui",
	classes = "classes",
}

export enum DisputeResolution {
	arbitration = "arbitration",
	litigation = "litigation",
}

export enum LegalBasis {
	advertising = "advertising",
	marketing = "marketing",
	analytics = "analytics",
	security = "security",
	fraudPrevention = "fraudPrevention",
}

export enum LiabilityLimitationType {
	amountPaid = "amount_paid",
	amount = "amount",
	minAmountPaidOrAmount = "minAmountPaidOrAmount",
}

export enum Locations {
	us = "us",
	eu = "eu",
	uk = "uk",
	other = "other",
}

export enum PersonalInformation {
	name = "name",
	email = "email",
	phone = "phone",
	address = "address",
	password = "password",
	ipAddress = "ipAddress",
	deviceId = "deviceId",
	creditCard = "creditCard",
	locationData = "locationData",
	anonymizedUsageData = "anonymizedUsageData",
}

export enum Platforms {
	web = "web",
	mobile = "mobile",
	desktop = "desktop",
}

export enum ProhibitedUses {
	crawling = "crawling",
	illegal = "illegal",
	harmful = "harmful",
	infringing = "infringing",
	abusive = "abusive",
	spam = "spam",
	advertising = "advertising",
	impersonation = "impersonation",
	accountTransfer = "accountTransfer",
}

export enum RefundPolicy {
	none = "none",
	full = "full",
	prorata = "prorata",
}

export enum RefundType {
	full = "full",
	prorata = "prorata",
}

export enum SensitiveInformation {
	ssn = "ssn",
	financial = "financial",
	health = "health",
	biometric = "biometric",
	genetic = "genetic",
	political = "political",
	sexualOrientation = "sexualOrientation",
	criminalHistory = "criminalHistory",
	religion = "religion",
}

export enum ServiceRequirements {
	accounts = "accounts",
	communication = "communication",
	orders = "orders",
}

export enum ThirdPartyData {
	advertising = "advertising",
	analytics = "analytics",
	socialMedia = "socialMedia",
	purchase = "purchase",
	email = "email",
	support = "support",
	crm = "crm",
	job = "job",
	address = "address",
	behavior = "behavior",
}

export enum Locale {
	en = "en",
}

export enum FileType {
	html = "html",
	astro = "astro",
}

export type EntityConfig = {
	name: string;
	website: string;
	address: string;
};

export type PrivacyConfig = {
	privacyEmail: string;
	platforms: Platforms[];
	locations: Locations[];
	socialSignIn: boolean;
	personalInformation: PersonalInformation[];
	sensitiveInformation: SensitiveInformation[];
	thirdPartyData: ThirdPartyData[];
	paymentData: boolean;
	paymentProcessors: string[];
	appUsageData: boolean;
	thirdPartyDisclosure: boolean;
	thirdPartyDisclosureEntities: string[];
	thirdPartySharing: boolean;
	thirdPartySharingEntities: string[];
	securityMeasures: boolean;
	webTracking: boolean;
	thirdPartyAnalytics: boolean;
	serviceRequirements: ServiceRequirements[];
	legalBasis: LegalBasis[];
	dataRetentionPeriod?: string;
	usStatePrivacyLaws: boolean;
	privacyPage?: string;
	dpo: boolean;
	dpoName?: string;
	dpoEmail?: string;
	dpoPhone?: string;
};

export type TermsConfig = {
	underEighteen: boolean;
	underThirteen: boolean;
	purchasableGoods: boolean;
	subscription: boolean;
	freeTrial: boolean;
	autoRenew: boolean;
	refundPolicy: RefundPolicy;
	userContent: boolean;
	userContentLicense: boolean;
	userAccounts: boolean;
	governingLaw: string;
	disputeResolution: DisputeResolution;
	mediation: boolean;
	prohibitedUses: ProhibitedUses[];
	serviceSLA: boolean;
	serviceSLAAmount: number;
	serviceSLATimeframe?: string;
	serviceSLARefund: boolean;
	serviceSLARefundType?: RefundType;
	serviceSLACustom?: string;
	liabilityLimitation: boolean;
	liabilityLimitationType?: LiabilityLimitationType;
	liabilityLimitationTimeframe?: string;
	liabilityLimitationAmount: number;
	supportEmail: string;
};

export type OutputConfig = {
	// Individual file paths for privacy and terms
	privacyFilePath?: string;
	termsFilePath?: string;

	// File type
	fileType: FileType;

	// CSS framework
	cssFramework: CSSFramework;

	// Locales
	locales: Locale[];
};

export type PolicygenConfig = {
	output: OutputConfig;
	entity: EntityConfig;
	privacy?: PrivacyConfig;
	terms?: TermsConfig;
};

export const defaultEntityConfig: EntityConfig = {
	name: "",
	website: "",
	address: "",
};

export const defaultPrivacyConfig: PrivacyConfig = {
	privacyEmail: "",
	platforms: [Platforms.web],
	locations: [],
	socialSignIn: false,
	personalInformation: [],
	sensitiveInformation: [],
	thirdPartyData: [],
	paymentData: false,
	paymentProcessors: [],
	appUsageData: false,
	thirdPartyDisclosure: false,
	thirdPartyDisclosureEntities: [],
	thirdPartySharing: false,
	thirdPartySharingEntities: [],
	securityMeasures: false,
	webTracking: false,
	thirdPartyAnalytics: false,
	serviceRequirements: [],
	legalBasis: [],
	dataRetentionPeriod: undefined,
	usStatePrivacyLaws: false,
	privacyPage: undefined,
	dpo: false,
	dpoName: undefined,
	dpoEmail: undefined,
	dpoPhone: undefined,
};

export const defaultTermsConfig: TermsConfig = {
	supportEmail: "",
	underEighteen: false,
	underThirteen: false,
	purchasableGoods: false,
	subscription: false,
	freeTrial: false,
	autoRenew: false,
	refundPolicy: RefundPolicy.none,
	userContent: false,
	userContentLicense: false,
	userAccounts: false,
	governingLaw: "California",
	disputeResolution: DisputeResolution.litigation,
	mediation: false,
	prohibitedUses: [],
	serviceSLA: false,
	serviceSLAAmount: 0,
	serviceSLATimeframe: undefined,
	serviceSLARefund: false,
	serviceSLARefundType: undefined,
	serviceSLACustom: undefined,
	liabilityLimitation: false,
	liabilityLimitationType: undefined,
	liabilityLimitationTimeframe: undefined,
	liabilityLimitationAmount: 0,
};

export const defaultOutputConfig: OutputConfig = {
	privacyFilePath: undefined,
	termsFilePath: undefined,
	fileType: FileType.html,
	cssFramework: CSSFramework.classes,
	locales: [Locale.en],
};

export const defaultConfig: PolicygenConfig = {
	output: defaultOutputConfig,
	entity: defaultEntityConfig,
	privacy: defaultPrivacyConfig,
	terms: defaultTermsConfig,
};
