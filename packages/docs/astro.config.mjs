// @ts-check

import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "PolicyGen",
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/imothee/policygen",
				},
			],
			sidebar: [
				{
					label: "Start Here",
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: "Getting Started", slug: "getting-started" },
					],
				},
				{
					label: "Reference",
					autogenerate: { directory: "reference" },
				},
			],
		}),
	],
});
